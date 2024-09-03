import { prisma } from "@/lib/prisma";
import {
  createTravelBodySchema,
  findTravelsSearchParamsSchema,
} from "@/lib/zod/schemas/travels";
import { NextRequest, NextResponse } from "next/server";

// GET /api/travel – find travels
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const searchParamsRaw = {
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: searchParams.get("pageSize")
        ? Number(searchParams.get("pageSize"))
        : 10,
      originId: searchParams.get("originId"),
      destinationId: searchParams.get("destinationId"),
    };

    const { destinationId, originId, page, pageSize } =
      findTravelsSearchParamsSchema.parse(searchParamsRaw);

    const query = {
      AND: [
        {
          steps: {
            some: {
              locationId: originId,
            },
          },
        },
        {
          steps: {
            some: {
              locationId: destinationId,
            },
          },
        },
      ],
    };

    const [originTravelSteps, destinationTravelSteps] =
      await prisma.$transaction([
        prisma.travelStep.findMany({
          where: {
            locationId: originId,
          },
          select: {
            id: true,
          },
        }),
        prisma.travelStep.findMany({
          where: {
            locationId: destinationId,
          },
          select: {
            id: true,
          },
        }),
      ]);

    const travelStepsIds = [];

    travelStepsIds.push(
      ...originTravelSteps.map((travelStep) => travelStep.id)
    );

    travelStepsIds.push(
      ...destinationTravelSteps.map((travelStep) => travelStep.id)
    );

    const [travels, travelsCount] = await prisma.$transaction([
      prisma.$queryRaw`
        SELECT 
          t.*,
          json_agg(
            jsonb_build_object(
              'id', ts."id",
              'order', ts."order",
              'durationTime', ts."durationTime",
              'location', jsonb_build_object(
                'id', p."id",
                'city', p."city",
                'state', p."state",
                'name', p."name"
              )
            )
            ORDER BY ts."order"
          ) as steps
        FROM "travels" t
        JOIN "travel_steps" o ON o."travelId" = t."id"
        JOIN "travel_steps" d ON d."travelId" = t."id"
        JOIN "travel_steps" ts ON ts."travelId" = t."id"
        JOIN "places" p ON p."id" = ts."locationId"
        WHERE o."locationId" = ${originId}
          AND d."locationId" = ${destinationId}
          AND o."order" < d."order"
        GROUP BY t."id"
        ORDER BY t."id"
        LIMIT ${pageSize} OFFSET ${page * pageSize};
      `,
      prisma.travel.count({
        where: query,
      }),
    ]);

    const totalPages = Math.ceil(travelsCount / pageSize);
    const hasNextPage = page + 1 !== totalPages && totalPages !== 1;
    const hasPreviousPage = page !== 0;

    const meta = {
      page: page + 1,
      pageSize,
      totalCount: travelsCount,
      hasNextPage,
      hasPreviousPage,
    };

    return NextResponse.json(
      {
        meta,
        result: travels,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

// POST /api/travel – create a travel
export async function POST(req: Request) {
  try {
    const { steps, description, name, driverId } = createTravelBodySchema.parse(
      await req.json()
    );

    const driver = await prisma.driver.findUnique({
      where: {
        id: driverId,
      },
    });

    if (!driver) {
      return new Response("Motorista não encontrado.", { status: 404 });
    }

    const locationsIds = steps.map((step) => step.locationId);

    const places = await prisma.place.findMany({
      where: {
        id: {
          in: locationsIds,
        },
      },
    });

    const hasValidLocations =
      places.length > 0 &&
      places.every((place) => locationsIds.includes(place.id));

    if (!hasValidLocations) {
      return new Response("Paradas inválidas.", { status: 400 });
    }

    const travel = await prisma.travel.create({
      data: {
        name,
        description,
        driverId,
        steps: {
          create: steps.map((step) => ({
            durationTime: step.durationTime,
            locationId: step.locationId,
            order: step.order,
          })),
        },
      },
      include: {
        steps: true,
      },
    });

    return NextResponse.json(
      {
        travel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
