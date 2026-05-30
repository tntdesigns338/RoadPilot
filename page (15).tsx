import { NextResponse } from "next/server";
import { planTruckRoute } from "@/lib/map-provider";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const route = await planTruckRoute(body);

    return NextResponse.json({ route });
  } catch (error) {
    return NextResponse.json(
      {
        route: {
          provider: process.env.MAP_PROVIDER || "mapbox",
          status: "error",
          message: error instanceof Error ? error.message : "Route lookup failed."
        }
      },
      { status: 200 }
    );
  }
}
