import OnboardingForm from "./onboarding-form";

export default function OnboardingPage() {
  return (
    <main className="shell">
      <section className="hero signup-card">
        <p className="eyebrow">Step 2 of 2</p>
        <h1>Add your vehicle details.</h1>
        <p>
          RoadPilot needs this information so it can avoid unsafe roads, low
          bridges, weight limits, and hazmat restrictions.
        </p>
        <OnboardingForm />
        <div className="trial-note">
          <strong>Still no card needed.</strong>
          <span>You are setting up routing safety first. Payment comes later.</span>
        </div>
      </section>
    </main>
  );
}
