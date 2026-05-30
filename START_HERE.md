# Start Here

## Open RoadPilot

1. Go back to the main RoadPilot folder.
2. Double-click:

```text
CLICK_TO_OPEN_ROADPILOT.bat
```

3. Wait for the black window to say the app is ready.
4. Open:

```text
http://localhost:3000
```

## What To Test

1. Click `Start free trial`.
2. Create a trial account.
3. Add the first vehicle.
4. Open the dashboard.
5. Go to `Vehicle`.
6. Save another vehicle.
7. Click `Set active`.
8. Try English and Spanish.
9. Try `Switch account`.
10. Log back in with the same email.
11. Open `/plans` to see the monthly plan choices.
12. In Stripe Payment Links, set the success redirect to `/payment-success`.

## If The App Does Not Open

Close the black window, then double-click `CLICK_TO_OPEN_ROADPILOT.bat` again.

## What Is Still Demo

- The map looks and works like a driving map, but it is not connected to real GPS/routing yet.
- Roadside help is a demo request only.
- Stripe billing is not live yet.
- The Plans page is ready, but real Stripe charging needs live Stripe keys.
- Easiest Stripe option: use Stripe Payment Links and paste them into `.env.local`.
- PayPal buttons are ready, but they need your PayPal subscription links in `.env.local`.
- Password login is visual/demo. Real password auth still needs Supabase Auth.

## Next Real Launch Steps

1. Read `LAUNCH_CHECKLIST.md`.
2. Rotate the exposed Stripe secret key.
3. Publish the app online.
4. Add live Stripe Payment Links.
5. Change `NEXT_PUBLIC_APP_URL` to the live website URL.
6. Add Terms, Privacy, and support contact pages.
7. Connect a real map provider.
8. Finish Supabase Auth password login.
9. Store reports, stops, and saved vehicles fully in Supabase.
10. Test with real drivers before charging monthly.
