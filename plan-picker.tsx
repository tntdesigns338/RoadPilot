import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const supabase = getSupabaseAdmin();

  if (!userId) {
    return NextResponse.json(
      { error: "Missing user ID. Please sign in again." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("driver_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ profile: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = getSupabaseAdmin();

  if (!body.userId) {
    return NextResponse.json(
      { error: "Missing user ID. Please start signup again." },
      { status: 400 }
    );
  }

  const profilePayload = {
    user_id: body.userId,
    vehicle_type: body.vehicleType || "big_truck",
    trailer_type: body.trailerType,
    height_ft: Number(body.heightFt),
    length_ft: Number(body.lengthFt),
    weight_lbs: Number(body.weightLbs),
    hazmat_enabled: Boolean(body.hazmat),
    avoid_tolls: Boolean(body.avoidTolls),
    parking_alerts: true
  };

  const { data: existingProfile, error: lookupError } = await supabase
    .from("driver_profiles")
    .select("id")
    .eq("user_id", body.userId)
    .maybeSingle();

  if (lookupError) {
    return NextResponse.json({ error: lookupError.message }, { status: 400 });
  }

  const query = existingProfile
    ? supabase
        .from("driver_profiles")
        .update(profilePayload)
        .eq("id", existingProfile.id)
    : supabase.from("driver_profiles").insert(profilePayload);

  const { data, error } = await query.select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ profile: data });
}
