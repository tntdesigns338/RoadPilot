import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">RoadPilot</p>
        <h1>Truck-safe navigation with live driver intel.</h1>
        <p>
          Plan routes for big trucks, cars, motorcycles, bicycles, and fleets with
          clearance-aware routing, driver reports, saved places, and monthly plans.
        </p>
        <div className="actions">
          <Link href="/signup">Start free trial</Link>
          <Link href="/login">Log in</Link>
          <Link href="/plans">View plans</Link>
          <Link href="/support">Support</Link>
        </div>
        <div className="footer-links">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/support">Support</Link>
        </div>
      </section>
    </main>
  );
}
