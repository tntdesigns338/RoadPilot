"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Language = "English" | "Spanish";

const loginCopy = {
  English: {
    language: "Language",
    english: "English",
    spanish: "Spanish",
    eyebrow: "Returning driver",
    title: "Log back in to RoadPilot.",
    help: "Enter the same email you used before. RoadPilot will bring back your saved account and vehicle details.",
    email: "Email",
    password: "Password",
    remember: "Remember this email",
    login: "Log in",
    demoLogin: "Use demo login",
    startTrial: "Start a new trial",
    looking: "Looking up your account...",
    notFoundHelp: "Start a new trial if this is your first time.",
    failed: "Could not log in.",
    found: "Account found. Opening dashboard..."
  },
  Spanish: {
    language: "Idioma",
    english: "Ingles",
    spanish: "Espanol",
    eyebrow: "Chofer de regreso",
    title: "Entra otra vez a RoadPilot.",
    help: "Usa el mismo correo que usaste antes. RoadPilot cargara tu cuenta y vehiculo guardado.",
    email: "Correo",
    password: "Contrasena",
    remember: "Recordar este correo",
    login: "Entrar",
    demoLogin: "Usar demo",
    startTrial: "Empezar prueba nueva",
    looking: "Buscando tu cuenta...",
    notFoundHelp: "Empieza una prueba nueva si es tu primera vez.",
    failed: "No se pudo entrar.",
    found: "Cuenta encontrada. Abriendo tablero..."
  }
};

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [language, setLanguage] = useState<Language>("English");

  useEffect(() => {
    setSavedEmail(localStorage.getItem("roadpilot_last_email") || "");
    setLanguage((localStorage.getItem("roadpilot_language") as Language) || "English");
  }, []);

  const text = loginCopy[language];

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    localStorage.setItem("roadpilot_language", nextLanguage);
  }

  async function login(formData: FormData) {
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const rememberMe = formData.get("rememberMe") === "on";

    setMessage(text.looking);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error ? `${result.error} ${text.notFoundHelp}` : text.failed);
      return;
    }

    if (rememberMe) {
      localStorage.setItem("roadpilot_last_email", email);
    } else {
      localStorage.removeItem("roadpilot_last_email");
    }

    localStorage.setItem(
      "roadpilot_signup",
      JSON.stringify({
        userId: result.userId,
        name: result.name,
        email: result.email,
        accountType: result.accountType,
        trialEndsAt: result.trialEndsAt
      })
    );

    if (result.language === "es") {
      localStorage.setItem("roadpilot_language", "Spanish");
    }

    setMessage(text.found);
    router.push("/dashboard");
  }

  function useDemoLogin() {
    localStorage.setItem(
      "roadpilot_signup",
      JSON.stringify({
        userId: "demo-driver",
        name: "Demo Driver",
        email: "demo@roadpilot.app",
        accountType: "driver",
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      })
    );
    localStorage.setItem("roadpilot_last_email", "demo@roadpilot.app");
    router.push("/dashboard");
  }

  return (
    <>
      <div className="language-switch" aria-label="Language preference">
        <span>{text.language}</span>
        <button
          className={language === "English" ? "active" : ""}
          type="button"
          onClick={() => changeLanguage("English")}
        >
          {text.english}
        </button>
        <button
          className={language === "Spanish" ? "active" : ""}
          type="button"
          onClick={() => changeLanguage("Spanish")}
        >
          {text.spanish}
        </button>
      </div>
      <p className="eyebrow">{text.eyebrow}</p>
      <h1>{text.title}</h1>
      <p>{text.help}</p>
      <form action={login} className="signup-form">
        <label className="wide">
          {text.email}
          <input name="email" type="email" placeholder="driver@example.com" defaultValue={savedEmail} required />
        </label>
        <label className="wide">
          {text.password}
          <input name="password" type="password" placeholder="Demo only for now" />
        </label>
        <label className="wide check-label">
          <input name="rememberMe" type="checkbox" defaultChecked />
          {text.remember}
        </label>
        <button type="submit">{text.login}</button>
        <button className="secondary-action" type="button" onClick={useDemoLogin}>
          {text.demoLogin}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
      <div className="actions">
        <a href="/signup">{text.startTrial}</a>
      </div>
    </>
  );
}
