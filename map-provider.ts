import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const TRIAL_DAYS = 7;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DAYS);
    const supabase = getSupabaseAdmin();

    const { data: user, error: userError } = await supabase
      .from("users")
      .upsert(
        {
          email: body.email,
          name: body.name,
          account_type: body.accountType || "driver",
          language: "en"
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    const { error: subscriptionError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        plan: body.accountType === "fleet" ? "fleet" : "solo",
        status: "trialing",
        trial_ends_at: trialEndsAt.toISOString()
      });

    if (subscriptionError) {
      return NextResponse.json({ error: subscriptionError.message }, { status: 400 });
    }

    return NextResponse.json({
      userId: user.id,
      accountType: body.accountType || "driver",
      status: "trialing",
      trialDays: TRIAL_DAYS,
      trialEndsAt: trialEndsAt.toISOString(),
      paymentRequiredToday: false,
      nextStep: "Save the user and driver profile in Supabase."
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not start trial." },
      { status: 400 }
    );
  }
}
