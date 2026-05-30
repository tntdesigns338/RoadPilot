import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.MAPBOX_TOKEN || "";

  if (!token) {
    return NextResponse.json({
      ready: false,
      message: "Mapbox token is missing."
    });
  }

  if (!token.startsWith("pk.")) {
    return NextResponse.json({
      ready: false,
      message: "Use a public Mapbox token that starts with pk. for browser map routing."
    });
  }

  return NextResponse.json({
    ready: true,
    token
  });
}
