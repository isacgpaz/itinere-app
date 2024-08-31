import { prisma } from "@/lib/prisma";
import {
  createPlaceBodySchema,
  findPlacesSearchParamsSchema,
} from "@/lib/zod/schemas/places";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/place – find places
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const searchParamsRaw = {
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: searchParams.get("pageSize")
        ? Number(searchParams.get("pageSize"))
        : 10,
      search: searchParams.get("search") ?? undefined,
    };

    const { search, page, pageSize } =
      findPlacesSearchParamsSchema.parse(searchParamsRaw);

    const query: Prisma.PlaceWhereInput = {};

    if (search) {
      query.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          state: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const [places, placesCount] = await prisma.$transaction([
      prisma.place.findMany({
        where: query,
        skip: page * pageSize,
        take: pageSize,
      }),
      prisma.place.count({
        where: query,
      }),
    ]);

    const totalPages = Math.ceil(placesCount / pageSize);
    const hasNextPage = page + 1 !== totalPages && totalPages !== 1;
    const hasPreviousPage = page !== 0;

    const meta = {
      page: page + 1,
      pageSize,
      totalCount: placesCount,
      hasNextPage,
      hasPreviousPage,
    };

    return NextResponse.json(
      {
        meta,
        result: places,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

// POST /api/place – create a place
export async function POST(req: Request) {
  try {
    const { name, city, state } = createPlaceBodySchema.parse(await req.json());

    const place = await prisma.place.create({
      data: {
        name,
        city,
        state,
      },
    });

    return NextResponse.json(
      {
        place,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
