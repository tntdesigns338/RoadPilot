import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();
    const priceId = getPriceId(plan);

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price is not configured yet." },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_collection: "always",
      billing_address_collection: "auto",
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/plans?checkout=cancelled`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout is not ready yet." },
      { status: 400 }
    );
  }
}

function getPriceId(plan: string) {
  if (plan === "fleet") return process.env.STRIPE_FLEET_PRICE_ID;
  if (plan === "enterprise") return process.env.STRIPE_ENTERPRISE_PRICE_ID;
  return process.env.STRIPE_SOLO_PRICE_ID;
}
