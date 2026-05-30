import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Enter your email." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id,email,name,account_type,language")
      .eq("email", email)
      .maybeSingle();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json(
        { error: "No RoadPilot account found for that email." },
        { status: 404 }
      );
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("status,trial_ends_at,plan")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return NextResponse.json({
      userId: user.id,
      name: user.name,
      email: user.email,
      accountType: user.account_type || "driver",
      language: user.language || "en",
      status: subscription?.status || "active",
      plan: subscription?.plan || "solo",
      trialEndsAt: subscription?.trial_ends_at || null
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not log in." },
      { status: 400 }
    );
  }
}
