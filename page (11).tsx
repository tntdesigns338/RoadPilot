import { NextResponse } from "next/server";

function isSet(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

export async function GET() {
  const checks = [
    {
      name: "Supabase",
      ready: isSet(process.env.NEXT_PUBLIC_SUPABASE_URL) && isSet(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    },
    {
      name: "Stripe",
      ready:
        isSet(process.env.NEXT_PUBLIC_STRIPE_SOLO_PAYMENT_LINK) ||
        isSet(process.env.STRIPE_SOLO_PRICE_ID)
    },
    {
      name: "Mapbox",
      ready: isSet(process.env.MAPBOX_TOKEN) || isSet(process.env.NEXT_PUBLIC_MAPBOX_TOKEN)
    },
    {
      name: "Live app URL",
      ready: isSet(process.env.NEXT_PUBLIC_APP_URL) && !process.env.NEXT_PUBLIC_APP_URL?.includes("localhost")
    }
  ];

  return NextResponse.json({
    ready: checks.every((check) => check.ready),
    checks
  });
}
