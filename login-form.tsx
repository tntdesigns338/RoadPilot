import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const priceChecks = [
  { plan: "Solo Driver", envName: "STRIPE_SOLO_PRICE_ID", priceId: process.env.STRIPE_SOLO_PRICE_ID },
  { plan: "Team", envName: "STRIPE_FLEET_PRICE_ID", priceId: process.env.STRIPE_FLEET_PRICE_ID },
  { plan: "Enterprise", envName: "STRIPE_ENTERPRISE_PRICE_ID", priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID }
];

export async function GET() {
  const hasSecretKey = Boolean(process.env.STRIPE_SECRET_KEY);

  if (!hasSecretKey) {
    return NextResponse.json({
      ok: false,
      message: "STRIPE_SECRET_KEY is missing.",
      checks: priceChecks.map((item) => ({
        plan: item.plan,
        envName: item.envName,
        ok: false,
        message: "Cannot check price until STRIPE_SECRET_KEY is set."
      }))
    });
  }

  try {
    const stripe = getStripe();
    const checks = await Promise.all(
      priceChecks.map(async (item) => {
        if (!item.priceId) {
          return {
            plan: item.plan,
            envName: item.envName,
            ok: item.plan === "Enterprise",
            message: item.plan === "Enterprise" ? "Optional price is blank." : `${item.envName} is blank.`
          };
        }

        try {
          const price = await stripe.prices.retrieve(item.priceId);
          return {
            plan: item.plan,
            envName: item.envName,
            ok: true,
            message: `${price.id} is valid.`
          };
        } catch (error) {
          return {
            plan: item.plan,
            envName: item.envName,
            ok: false,
            message: error instanceof Error ? error.message : "Stripe could not find this price."
          };
        }
      })
    );

    return NextResponse.json({
      ok: checks.every((item) => item.ok),
      message: "Stripe setup checked.",
      checks
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Stripe setup check failed.",
        checks: []
      },
      { status: 400 }
    );
  }
}
