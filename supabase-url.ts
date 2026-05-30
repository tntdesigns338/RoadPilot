import DashboardSummary from "./dashboard-summary";

export default function DashboardPage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Dashboard</p>
        <h1>RoadPilot driver map.</h1>
        <p>
          Plan truck-safe routes, save your vehicle, find stops, and share
          reports with other drivers.
        </p>
        <DashboardSummary />
      </section>
    </main>
  );
}
