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
      steps: {
        some: {
          locationId: {
            in: [originId, destinationId],
          },
        },
      },
    };

    const [travels, travelsCount] = await prisma.$transaction([
      prisma.travel.findMany({
        where: query,
        skip: page * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          steps: {
            select: {
              id: true,
              location: {
                select: {
                  id: true,
                  name: true,
                  city: true,
                  state: true,
                },
              },
            },
          },
          driver: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
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
    return NextResponse.json(error);
  }
}
