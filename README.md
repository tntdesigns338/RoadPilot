# RoadPilot

RoadPilot is a truck-first navigation web app starter with trial signup, login, saved vehicles, driver reports, stops, roadside help, and English/Spanish modes.

## Open The App

Double-click this file from the main project folder:

```text
CLICK_TO_OPEN_ROADPILOT.bat
```

Then open:

```text
http://localhost:3000
```

## Main Screens

- `/signup` starts a 7-day free trial with no card required.
- `/login` lets returning drivers log in by email or use demo login.
- `/dashboard` is the driver map app.
- `/onboarding` is the first-time truck setup screen.
- `/plans` shows monthly plan choices after the free trial.

## What Works Now

- 7-day free trial signup
- Login by email lookup
- Demo login for testing
- Saved vehicle garage
- Multiple vehicles with active vehicle switch
- English/Spanish preference
- Map-style driving dashboard
- Road/satellite visual toggle
- Live GPS tracking
- Live Mapbox route lookup when `MAPBOX_TOKEN` is set
- Stops, fuel, rest areas, hotels, food, repair
- Driver reports and place messages
- Roadside help demo workflow
- Optional fuel/checklist/offline-route tools
- Monthly plans page with Stripe checkout starter

## Important

Read `LAUNCH_CHECKLIST.md` before taking real customer payments.

The app now supports live Mapbox route lookup. The visual map background is still RoadPilot's built-in map view; a full embedded Mapbox/Google map canvas can be added later.

Stripe Payment Links are the recommended first payment setup. Stripe webhooks should be added later so paid accounts are marked active automatically.
PayPal can be used first by adding PayPal subscription links to `.env.local`.

The easiest Stripe setup is Stripe Payment Links. Paste those links here:

```text
NEXT_PUBLIC_STRIPE_SOLO_PAYMENT_LINK=
NEXT_PUBLIC_STRIPE_TEAM_PAYMENT_LINK=
NEXT_PUBLIC_STRIPE_ENTERPRISE_PAYMENT_LINK=
```

In each Stripe Payment Link, set the confirmation/redirect page to:

```text
http://localhost:3000/payment-success
```

When the app is published online, replace `localhost:3000` with the real website domain.

```text
NEXT_PUBLIC_PAYPAL_SOLO_LINK=
NEXT_PUBLIC_PAYPAL_TEAM_LINK=
NEXT_PUBLIC_PAYPAL_ENTERPRISE_LINK=
```

## Publish Online

Use Vercel or another Next.js host.

1. Upload/connect this `real-app-starter` app.
2. Add the environment variables from `PRODUCTION_ENV_TEMPLATE.txt`.
3. Set `NEXT_PUBLIC_APP_URL` to the live website address.
4. Restart/redeploy the website.
5. Test signup, dashboard route planning, GPS, plans, and payment success.

## Developer Commands

```bash
npm install
npm run dev
npm run build
```

Use `npm.cmd` instead of `npm` in PowerShell if Windows blocks scripts.
