"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function saveVehicle(formData: FormData) {
    const signup = JSON.parse(localStorage.getItem("roadpilot_signup") || "{}");
    const vehicle = {
      userId: signup.userId,
      vehicleType: signup.vehicleType || "big_truck",
      heightFt: formData.get("heightFt"),
      weightLbs: formData.get("weightLbs"),
      lengthFt: formData.get("lengthFt"),
      trailerType: formData.get("trailerType"),
      hazmat: formData.get("hazmat") === "on",
      avoidTolls: formData.get("avoidTolls") === "on"
    };

    setMessage("Saving truck profile...");

    const response = await fetch("/api/profile/vehicle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle)
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Could not save vehicle profile.");
      return;
    }

    localStorage.setItem(
      "roadpilot_vehicle",
      JSON.stringify(vehicle)
    );

    router.push("/dashboard");
  }

  return (
    <form action={saveVehicle} className="signup-form">
      <label>
        Truck height
        <input name="heightFt" type="number" step="0.1" placeholder="13.6" required />
      </label>
      <label>
        Truck weight
        <input name="weightLbs" type="number" placeholder="78000" required />
      </label>
      <label>
        Truck length
        <input name="lengthFt" type="number" placeholder="72" required />
      </label>
      <label>
        Trailer type
        <select name="trailerType" defaultValue="dry_van">
          <option value="dry_van">53 ft dry van</option>
          <option value="reefer">Reefer</option>
          <option value="flatbed">Flatbed</option>
          <option value="box_truck">Box truck</option>
          <option value="car">No trailer</option>
        </select>
      </label>
      <label className="wide check-label">
        <input name="hazmat" type="checkbox" />
        Hazmat load
      </label>
      <label className="wide check-label">
        <input name="avoidTolls" type="checkbox" defaultChecked />
        Avoid tolls when possible
      </label>
      <button type="submit">Continue to dashboard</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}
