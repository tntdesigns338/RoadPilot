"use client";

import { useEffect, useMemo, useState } from "react";

type Signup = {
  userId?: string;
  name?: string;
  email?: string;
  accountType?: string;
  vehicleType?: string;
  trialEndsAt?: string;
};

type Vehicle = {
  id?: string;
  name?: string;
  vehicleType?: string;
  heightFt?: string;
  weightLbs?: string;
  lengthFt?: string;
  trailerType?: string;
  hazmat?: boolean;
  avoidTolls?: boolean;
};

type RouteResult = {
  start: string;
  destination: string;
  miles: number;
  time: string;
  warning: string;
  fuel: string;
  eta: string;
  provider?: string;
};

type DriverReport = {
  type: string;
  note: string;
  time: string;
};

type FleetDriver = {
  name: string;
  status: string;
};

type SavedPlace = {
  name: string;
  kind: string;
};

type Trip = {
  route: string;
  when: string;
};

type PlaceMessage = {
  placeName: string;
  driver: string;
  note: string;
  time: string;
};

type GpsPosition = {
  latitude: number;
  longitude: number;
  accuracy: number;
  speedMph?: number;
};

type ClientCoordinate = [number, number];

type Language = "English" | "Spanish";

const copy = {
  English: {
    language: "Language",
    english: "English",
    spanish: "Spanish",
    drive: "Drive",
    vehicle: "Vehicle",
    reports: "Reports",
    stops: "Stops",
    drivers: "Drivers",
    trips: "Trips",
    trial: "Trial",
    settings: "Settings",
    liveMap: "Live driving map",
    from: "From",
    to: "To",
    planRoute: "Plan route",
    vehicleGarage: "Vehicle garage",
    vehicleTitle: "Add or change your vehicle.",
    vehicleHelp: "Enter it once. RoadPilot keeps it here until you change it.",
    vehicleName: "Vehicle name",
    vehicleType: "Vehicle type",
    height: "Height",
    weight: "Weight",
    length: "Length",
    trailer: "Trailer",
    hazmat: "Hazmat load",
    avoidTolls: "Avoid tolls when possible",
    saveVehicle: "Save vehicle to app",
    currentVehicle: "Current vehicle",
    noHazmat: "No hazmat",
    hazmatOn: "Hazmat on",
    truckSafety: "Truck safety",
    routeCost: "Route cost",
    roadside: "Roadside",
    optionalTools: "Optional tools",
    showOptional: "Show optional tools",
    hideOptional: "Hide optional tools",
    preferences: "Preferences.",
    saveSettings: "Save settings",
    currentSettings: "Current settings"
    ,
    avoidTollsShort: "Avoid tolls",
    leaveMessage: "Leave a message for drivers",
    post: "Post",
    trialCard: "Trial",
    freeUntil: "Free until",
    noCardTrial: "No card is required until the trial ends.",
    weather: "Weather",
    clearRoad: "Clear road",
    compliance: "Compliance",
    parkingForecast: "Parking forecast",
    liveSpeed: "Live speed",
    roadsideHelp: "Roadside help",
    requestHelp: "Request help on the route.",
    turnByTurn: "Turn by turn",
    drivingDirections: "Driving directions.",
    driverReports: "Driver reports",
    helpDrivers: "Help other drivers.",
    reportType: "Report type",
    note: "Note",
    postReport: "Post driver report",
    stopsAlong: "Stops along the route.",
    savePlace: "Save place",
    addDriver: "Add another driver.",
    driverName: "Driver name",
    inviteDriver: "Invite driver",
    noDrivers: "No extra drivers yet",
    addDriverOnly: "Add a second driver only if you need one.",
    recentRoutes: "Recent routes.",
    noTrips: "No trips yet",
    planRouteAbove: "Plan a route above and it will show here.",
    freeTrial: "7-day free trial.",
    noCardToday: "No card required today.",
    afterTrial: "After the trial, drivers can choose a monthly plan if they want to keep using paid features.",
    payLater: "Set up payment later",
    units: "Units",
    parkingAlerts: "Parking alerts",
    parkingOn: "Parking alerts on",
    parkingOff: "Parking alerts off",
    savedVehicles: "Saved vehicles",
    activeVehicle: "Active vehicle",
    setActive: "Set active",
    noSavedVehicles: "No saved vehicles yet",
    newVehicle: "New vehicle",
    deleteVehicle: "Delete",
    switchAccount: "Switch account",
    logOut: "Log out",
    signInRequired: "Log in to use RoadPilot.",
    signInHelp: "Your saved vehicles, language, stops, and reports load after you log in.",
    goToLogin: "Go to login",
    startTrial: "Start free trial",
    signedInAs: "Signed in as",
    trialEnds: "Trial ends"
    ,
    startGps: "Start GPS",
    stopGps: "Stop GPS",
    gps: "GPS",
    gpsReady: "GPS ready",
    gpsWaiting: "Waiting for GPS permission...",
    gpsUnsupported: "GPS is not supported in this browser.",
    gpsDenied: "GPS permission was denied.",
    gpsLive: "Live GPS tracking",
    coordinates: "Coordinates",
    accuracy: "Accuracy"
  },
  Spanish: {
    language: "Idioma",
    english: "Ingles",
    spanish: "Espanol",
    drive: "Manejar",
    vehicle: "Vehiculo",
    reports: "Reportes",
    stops: "Paradas",
    drivers: "Choferes",
    trips: "Viajes",
    trial: "Prueba",
    settings: "Ajustes",
    liveMap: "Mapa de manejo",
    from: "De",
    to: "A",
    planRoute: "Planear ruta",
    vehicleGarage: "Mis vehiculos",
    vehicleTitle: "Agrega o cambia tu vehiculo.",
    vehicleHelp: "Ponlo una vez. RoadPilot lo guarda hasta que lo cambies.",
    vehicleName: "Nombre del vehiculo",
    vehicleType: "Tipo de vehiculo",
    height: "Altura",
    weight: "Peso",
    length: "Largo",
    trailer: "Remolque",
    hazmat: "Carga peligrosa",
    avoidTolls: "Evitar peajes cuando se pueda",
    saveVehicle: "Guardar vehiculo",
    currentVehicle: "Vehiculo actual",
    noHazmat: "Sin carga peligrosa",
    hazmatOn: "Carga peligrosa activada",
    truckSafety: "Seguridad del camion",
    routeCost: "Costo de ruta",
    roadside: "Ayuda en carretera",
    optionalTools: "Herramientas opcionales",
    showOptional: "Mostrar herramientas opcionales",
    hideOptional: "Ocultar herramientas opcionales",
    preferences: "Preferencias.",
    saveSettings: "Guardar ajustes",
    currentSettings: "Ajustes actuales",
    avoidTollsShort: "Evitar peajes",
    leaveMessage: "Deja un mensaje para choferes",
    post: "Publicar",
    trialCard: "Prueba",
    freeUntil: "Gratis hasta",
    noCardTrial: "No se necesita tarjeta hasta que termine la prueba.",
    weather: "Clima",
    clearRoad: "Ruta despejada",
    compliance: "Cumplimiento",
    parkingForecast: "Pronostico de parqueo",
    liveSpeed: "Velocidad",
    roadsideHelp: "Ayuda en carretera",
    requestHelp: "Pide ayuda en la ruta.",
    turnByTurn: "Paso a paso",
    drivingDirections: "Direcciones de manejo.",
    driverReports: "Reportes de choferes",
    helpDrivers: "Ayuda a otros choferes.",
    reportType: "Tipo de reporte",
    note: "Nota",
    postReport: "Publicar reporte",
    stopsAlong: "Paradas en la ruta.",
    savePlace: "Guardar parada",
    addDriver: "Agregar otro chofer.",
    driverName: "Nombre del chofer",
    inviteDriver: "Invitar chofer",
    noDrivers: "No hay choferes extras",
    addDriverOnly: "Agrega un segundo chofer solo si lo necesitas.",
    recentRoutes: "Rutas recientes.",
    noTrips: "No hay viajes todavia",
    planRouteAbove: "Planea una ruta arriba y aparecera aqui.",
    freeTrial: "Prueba gratis de 7 dias.",
    noCardToday: "No se necesita tarjeta hoy.",
    afterTrial: "Despues de la prueba, los choferes pueden escoger un plan mensual si quieren seguir usando funciones pagadas.",
    payLater: "Configurar pago despues",
    units: "Unidades",
    parkingAlerts: "Alertas de parqueo",
    parkingOn: "Alertas de parqueo activadas",
    parkingOff: "Alertas de parqueo apagadas",
    savedVehicles: "Vehiculos guardados",
    activeVehicle: "Vehiculo activo",
    setActive: "Usar este",
    noSavedVehicles: "Todavia no hay vehiculos guardados",
    newVehicle: "Nuevo vehiculo",
    deleteVehicle: "Borrar",
    switchAccount: "Cambiar cuenta",
    logOut: "Cerrar sesion",
    signInRequired: "Inicia sesion para usar RoadPilot.",
    signInHelp: "Tus vehiculos, idioma, paradas y reportes guardados cargan despues de iniciar sesion.",
    goToLogin: "Ir a iniciar sesion",
    startTrial: "Empezar prueba gratis",
    signedInAs: "Sesion iniciada como",
    trialEnds: "Prueba termina"
    ,
    startGps: "Iniciar GPS",
    stopGps: "Detener GPS",
    gps: "GPS",
    gpsReady: "GPS listo",
    gpsWaiting: "Esperando permiso de GPS...",
    gpsUnsupported: "Este navegador no soporta GPS.",
    gpsDenied: "Permiso de GPS rechazado.",
    gpsLive: "GPS en vivo",
    coordinates: "Coordenadas",
    accuracy: "Precision"
  }
};

const defaultReports: DriverReport[] = [
  { type: "Low bridge", note: "13 ft 2 in clearance ahead. Big trucks use bypass.", time: "8:12 AM" },
  { type: "Parking", note: "25 open spaces at Northline Travel Center.", time: "8:24 AM" },
  { type: "Traffic", note: "Slowdown near downtown split.", time: "8:41 AM" }
];

const places = [
  {
    name: "Northline Travel Center",
    type: "Truck stop",
    detail: "Parking, showers, diesel",
    review: "Clean showers. Lot fills after 8 PM.",
    x: 33,
    y: 63
  },
  {
    name: "Blue Ridge Diesel",
    type: "Fuel",
    detail: "$3.81 diesel",
    review: "Fast pumps. Easy big-rig entry.",
    x: 58,
    y: 39
  },
  {
    name: "Mile 214 Rest Area",
    type: "Rest area",
    detail: "Open, 18 truck spaces",
    review: "Quiet stop. Bathrooms open.",
    x: 72,
    y: 24
  },
  {
    name: "Express Repair Bay",
    type: "Repair",
    detail: "Tires and roadside help",
    review: "Good for tire checks. Call ahead.",
    x: 45,
    y: 49
  },
  {
    name: "Greenline Motel",
    type: "Hotel",
    detail: "Truck parking behind building",
    review: "Ask front desk before parking overnight.",
    x: 78,
    y: 55
  },
  {
    name: "South Fork Cafe",
    type: "Food",
    detail: "Open 24 hours",
    review: "Large gravel lot next door.",
    x: 24,
    y: 42
  }
];

const demoDirections = [
  "Head north on Industrial Blvd",
  "Keep right for truck bypass",
  "Continue 146 miles on I-35",
  "Take exit 214 toward fuel and rest area",
  "Arrive on the right"
];

const defaultVehicle: Vehicle = {
  id: "default-truck",
  name: "My truck",
  vehicleType: "Big truck",
  heightFt: "13.6",
  weightLbs: "78000",
  lengthFt: "72",
  trailerType: "53 ft dry van",
  hazmat: false,
  avoidTolls: true
};

async function getBrowserMapboxToken() {
  const response = await fetch("/api/routes/mapbox-token", { cache: "no-store" });
  const data = await response.json();

  if (!data.ready || !data.token) {
    throw new Error(data.message || "Mapbox public token is not ready.");
  }

  return String(data.token);
}

async function geocodeMapboxInBrowser(place: string, token: string): Promise<ClientCoordinate> {
  const url =
    `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(place)}` +
    `&limit=1&country=us&access_token=${encodeURIComponent(token)}`;
  const response = await fetch(url);
  const data = await response.json();
  const coordinate = data.features?.[0]?.geometry?.coordinates;

  if (!response.ok || !coordinate) {
    throw new Error(data.message || `Mapbox could not find ${place}.`);
  }

  return coordinate;
}

async function planMapboxInBrowser({
  start,
  destination,
  avoidTolls
}: {
  start: string;
  destination: string;
  avoidTolls: boolean;
}) {
  const token = await getBrowserMapboxToken();
  const [startCoordinate, destinationCoordinate] = await Promise.all([
    geocodeMapboxInBrowser(start, token),
    geocodeMapboxInBrowser(destination, token)
  ]);
  const exclusions = avoidTolls ? "&exclude=toll" : "";
  const url =
    `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/` +
    `${startCoordinate.join(",")};${destinationCoordinate.join(",")}` +
    `?alternatives=true&geometries=geojson&overview=full&steps=true${exclusions}&access_token=${encodeURIComponent(token)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || !data.routes?.[0]) {
    throw new Error(data.message || "Mapbox could not calculate this route.");
  }

  const bestRoute = data.routes[0];
  const steps = bestRoute.legs?.[0]?.steps
    ?.map((step: { maneuver?: { instruction?: string } }) => step.maneuver?.instruction)
    .filter(Boolean)
    .slice(0, 8) || [];

  return {
    miles: Math.round((bestRoute.distance / 1609.344) * 10) / 10,
    durationMinutes: Math.max(1, Math.round(bestRoute.duration / 60)),
    steps
  };
}

type AccountVehicleProfile = {
  vehicle_type?: string;
  trailer_type?: string;
  height_ft?: number;
  length_ft?: number;
  weight_lbs?: number;
  hazmat_enabled?: boolean;
  avoid_tolls?: boolean;
};

function vehicleFromProfile(profile: AccountVehicleProfile): Vehicle {
  return {
    ...defaultVehicle,
    vehicleType: profile.vehicle_type || defaultVehicle.vehicleType,
    trailerType: profile.trailer_type || defaultVehicle.trailerType,
    heightFt: profile.height_ft ? String(profile.height_ft) : defaultVehicle.heightFt,
    lengthFt: profile.length_ft ? String(profile.length_ft) : defaultVehicle.lengthFt,
    weightLbs: profile.weight_lbs ? String(profile.weight_lbs) : defaultVehicle.weightLbs,
    hazmat: Boolean(profile.hazmat_enabled),
    avoidTolls: profile.avoid_tolls ?? true
  };
}

export default function DashboardSummary() {
  const [signup, setSignup] = useState<Signup>({});
  const [accountChecked, setAccountChecked] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle>(defaultVehicle);
  const [vehicleDraft, setVehicleDraft] = useState<Vehicle>(defaultVehicle);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([defaultVehicle]);
  const [vehicleSaveMessage, setVehicleSaveMessage] = useState("Vehicle is saved in the app.");
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeDirections, setRouteDirections] = useState(demoDirections);
  const [routeStatus, setRouteStatus] = useState("Mapbox ready when your key is saved and the app is restarted.");
  const [reports, setReports] = useState<DriverReport[]>(defaultReports);
  const [fleetDrivers, setFleetDrivers] = useState<FleetDriver[]>([]);
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [billingStatus, setBillingStatus] = useState("Trial active - no card required");
  const [mapView, setMapView] = useState<"road" | "satellite">("road");
  const [vehicleMode, setVehicleMode] = useState("Big truck");
  const [isDriving, setIsDriving] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [gpsWatchId, setGpsWatchId] = useState<number | null>(null);
  const [gpsPosition, setGpsPosition] = useState<GpsPosition | null>(null);
  const [gpsStatus, setGpsStatus] = useState("GPS ready");
  const [placeFilter, setPlaceFilter] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(places[0]);
  const [placeMessages, setPlaceMessages] = useState<PlaceMessage[]>([]);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [roadsideStatus, setRoadsideStatus] = useState("No roadside request");
  const [offlineStatus, setOfflineStatus] = useState("Not downloaded");
  const [showOptionalPlanning, setShowOptionalPlanning] = useState(false);
  const [language, setLanguage] = useState<Language>("English");
  const [routeOptions, setRouteOptions] = useState({
    avoidLowBridges: true,
    avoidTolls: true,
    hazmatSafe: false
  });
  const [checklist, setChecklist] = useState({
    tires: false,
    brakes: false,
    lights: false,
    documents: false
  });
  const [settings, setSettings] = useState({
    language: "English" as Language,
    units: "Miles / feet",
    parkingAlerts: true,
    avoidTolls: true
  });

  useEffect(() => {
    async function loadDashboard() {
      const savedSignup = JSON.parse(localStorage.getItem("roadpilot_signup") || "{}");
      const savedVehicle = {
        ...defaultVehicle,
        ...JSON.parse(localStorage.getItem("roadpilot_vehicle") || "{}")
      };
      const savedVehicleList = JSON.parse(localStorage.getItem("roadpilot_vehicle_list") || "[]");
      const nextVehicleList = savedVehicleList.length > 0 ? savedVehicleList : [savedVehicle];

      setSignup(savedSignup);
      setAccountChecked(true);
      const savedLanguage = (localStorage.getItem("roadpilot_language") as Language) || "English";
      setLanguage(savedLanguage);
      setSettings((current) => ({ ...current, language: savedLanguage }));
      setVehicle(savedVehicle);
      setVehicleDraft(savedVehicle);
      setVehicleList(nextVehicleList);
      if (savedVehicle.vehicleType) setVehicleMode(savedVehicle.vehicleType);

      if (savedSignup.userId && savedSignup.userId !== "demo-driver") {
        const response = await fetch(`/api/profile/vehicle?userId=${savedSignup.userId}`);
        const result = await response.json();

        if (response.ok && result.profile) {
          const accountVehicle = {
            ...savedVehicle,
            ...vehicleFromProfile(result.profile)
          };
          setVehicle(accountVehicle);
          setVehicleDraft(accountVehicle);
          setVehicleList((current) => {
            const nextList = [
              accountVehicle,
              ...current.filter((item) => item.id !== accountVehicle.id && item.name !== accountVehicle.name)
            ];
            localStorage.setItem("roadpilot_vehicle_list", JSON.stringify(nextList));
            return nextList;
          });
          if (accountVehicle.vehicleType) setVehicleMode(accountVehicle.vehicleType);
          localStorage.setItem("roadpilot_vehicle", JSON.stringify(accountVehicle));
          setVehicleSaveMessage("Vehicle loaded from your account.");
        }
      }
    }

    loadDashboard();
  }, []);

  useEffect(() => {
    setReports(JSON.parse(localStorage.getItem("roadpilot_reports") || JSON.stringify(defaultReports)));
    setFleetDrivers(JSON.parse(localStorage.getItem("roadpilot_fleet") || "[]"));
    setSavedPlaces(JSON.parse(localStorage.getItem("roadpilot_saved_places") || "[]"));
    setTrips(JSON.parse(localStorage.getItem("roadpilot_trips") || "[]"));
    setPlaceMessages(JSON.parse(localStorage.getItem("roadpilot_place_messages") || "[]"));
  }, []);

  useEffect(() => {
    return () => {
      if (gpsWatchId !== null) {
        navigator.geolocation.clearWatch(gpsWatchId);
      }
    };
  }, [gpsWatchId]);

  const trialEnd = signup.trialEndsAt
    ? new Date(signup.trialEndsAt).toLocaleDateString()
    : "Not started";

  const activeRoute = useMemo<RouteResult>(() => {
    return route || {
      start: "Chicago, IL",
      destination: "Dallas, TX",
      miles: 926,
      time: "13h 40m",
      eta: "6:05 AM",
      warning: "Truck-safe route preview. Low bridges, tolls, hazmat, and parking alerts are visible.",
      fuel: "$436 estimated diesel"
    };
  }, [route]);

  const filteredPlaces = useMemo(() => {
    if (placeFilter === "All") return places;
    if (placeFilter === "Gas") return places.filter((place) => place.type === "Fuel");
    return places.filter((place) => place.type === placeFilter);
  }, [placeFilter]);

  const selectedPlaceMessages = useMemo(() => {
    return placeMessages.filter((message) => message.placeName === selectedPlace.name);
  }, [placeMessages, selectedPlace.name]);

  const checklistDone = Object.values(checklist).filter(Boolean).length;
  const text = copy[language];

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setSettings((current) => ({ ...current, language: nextLanguage }));
    localStorage.setItem("roadpilot_language", nextLanguage);
  }

  async function planRoute(formData: FormData) {
    const start = String(formData.get("start") || "Chicago, IL");
    const destination = String(formData.get("destination") || "Dallas, TX");
    const height = Number(vehicle.heightFt || 13.6);
    const weight = Number(vehicle.weightLbs || 78000);
    const mode = String(formData.get("vehicleMode") || vehicleMode);

    let warning = `${mode} route ready. `;
    if (mode === "Big truck" || mode === "Truck") warning += "Bridge clearance and truck restrictions checked. ";
    if (height > 13.5) warning += "Avoiding bridges under your height. ";
    if (weight > 80000) warning += "Check overweight permit before departure. ";
    if (vehicle.hazmat) warning += "Hazmat routing is on. ";
    if (vehicle.avoidTolls) warning += "Tolls avoided where possible.";

    const demoRoute = {
      start,
      destination,
      miles: mode === "Bicycle" ? 42 : 926,
      time: mode === "Bicycle" ? "4h 18m" : "13h 40m",
      eta: mode === "Bicycle" ? "1:42 PM" : "6:05 AM",
      warning: warning.trim(),
      fuel: mode === "Car" ? "$126 estimated gas" : mode === "Motorcycle" ? "$48 estimated fuel" : "$436 estimated diesel",
      provider: "demo"
    };

    setRouteStatus("Checking Mapbox route...");
    setRoute(demoRoute);
    setIsDriving(false);

    try {
      const response = await fetch("/api/routes/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start,
          destination,
          heightFt: height,
          weightLbs: weight,
          lengthFt: Number(vehicle.lengthFt || 72),
          hazmat: Boolean(vehicle.hazmat || routeOptions.hazmatSafe),
          avoidTolls: Boolean(vehicle.avoidTolls || routeOptions.avoidTolls)
        })
      });
      const data = await response.json();
      const liveRoute = data.route;

      if (liveRoute?.status === "live") {
        const minutes = Number(liveRoute.durationMinutes || 0);
        const hours = Math.floor(minutes / 60);
        const restMinutes = minutes % 60;
        const eta = new Date(Date.now() + minutes * 60 * 1000).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit"
        });

        setRoute({
          start,
          destination,
          miles: Number(liveRoute.miles || demoRoute.miles),
          time: hours > 0 ? `${hours}h ${restMinutes}m` : `${restMinutes}m`,
          eta,
          warning: liveRoute.message || warning.trim(),
          fuel: demoRoute.fuel,
          provider: "Mapbox live"
        });
        setRouteDirections(liveRoute.steps?.length ? liveRoute.steps : demoDirections);
        setRouteStatus("Mapbox live route is working.");
      } else {
        const browserRoute = await planMapboxInBrowser({
          start,
          destination,
          avoidTolls: Boolean(vehicle.avoidTolls || routeOptions.avoidTolls)
        });
        const minutes = Number(browserRoute.durationMinutes || 0);
        const hours = Math.floor(minutes / 60);
        const restMinutes = minutes % 60;
        const eta = new Date(Date.now() + minutes * 60 * 1000).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit"
        });

        setRoute({
          start,
          destination,
          miles: Number(browserRoute.miles || demoRoute.miles),
          time: hours > 0 ? `${hours}h ${restMinutes}m` : `${restMinutes}m`,
          eta,
          warning: "Mapbox live route loaded in the browser. Truck settings are still checked by RoadPilot.",
          fuel: demoRoute.fuel,
          provider: "Mapbox live"
        });
        setRouteDirections(browserRoute.steps?.length ? browserRoute.steps : demoDirections);
        setRouteStatus("Mapbox live route is working in the browser.");
      }
    } catch {
      setRouteDirections(demoDirections);
      setRouteStatus("Demo route shown. Check that your Mapbox token starts with pk. and restart the app.");
    }

    const nextTrips = [
      { route: `${start} to ${destination}`, when: "Just now" },
      ...trips
    ];
    setTrips(nextTrips);
    localStorage.setItem("roadpilot_trips", JSON.stringify(nextTrips));
  }

  function postReport(formData: FormData) {
    const report = {
      type: String(formData.get("type") || "Traffic"),
      note: String(formData.get("note") || ""),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    };

    if (!report.note.trim()) return;

    const nextReports = [report, ...reports];
    setReports(nextReports);
    localStorage.setItem("roadpilot_reports", JSON.stringify(nextReports));
  }

  function quickReport(type: string, note: string) {
    const report = {
      type,
      note,
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    };

    const nextReports = [report, ...reports];
    setReports(nextReports);
    localStorage.setItem("roadpilot_reports", JSON.stringify(nextReports));
  }

  function requestRoadside(kind: string) {
    setRoadsideStatus(`${kind} request sent at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`);
  }

  function inviteDriver(formData: FormData) {
    const name = String(formData.get("driverName") || "").trim();
    if (!name) return;

    const nextDrivers = [{ name, status: "Invite pending" }, ...fleetDrivers];
    setFleetDrivers(nextDrivers);
    localStorage.setItem("roadpilot_fleet", JSON.stringify(nextDrivers));
  }

  function savePlace(formData: FormData) {
    const name = String(formData.get("placeName") || "").trim();
    const kind = String(formData.get("placeKind") || "Truck stop");
    if (!name) return;

    const nextPlaces = [{ name, kind }, ...savedPlaces];
    setSavedPlaces(nextPlaces);
    localStorage.setItem("roadpilot_saved_places", JSON.stringify(nextPlaces));
  }

  function addSelectedStop() {
    const nextPlaces = [
      { name: selectedPlace.name, kind: selectedPlace.type },
      ...savedPlaces.filter((place) => place.name !== selectedPlace.name)
    ];

    setSavedPlaces(nextPlaces);
    localStorage.setItem("roadpilot_saved_places", JSON.stringify(nextPlaces));
  }

  function postPlaceMessage(formData: FormData) {
    const note = String(formData.get("placeMessage") || "").trim();
    if (!note) return;

    const nextMessages = [
      {
        placeName: selectedPlace.name,
        driver: signup.name || "Driver",
        note,
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      },
      ...placeMessages
    ];

    setPlaceMessages(nextMessages);
    localStorage.setItem("roadpilot_place_messages", JSON.stringify(nextMessages));
  }

  function keepVehicleChange(field: keyof Vehicle, value: string | boolean) {
    const nextVehicle = {
      ...defaultVehicle,
      ...vehicleDraft,
      id: vehicleDraft.id || crypto.randomUUID(),
      [field]: value
    };

    setVehicleDraft(nextVehicle);
    setVehicle(nextVehicle);
    if (field === "vehicleType") setVehicleMode(String(value));
    localStorage.setItem("roadpilot_vehicle", JSON.stringify(nextVehicle));
    setVehicleSaveMessage("Saved automatically. Change it only when needed.");
  }

  function saveVehicleToList(nextVehicle: Vehicle) {
    const vehicleToSave = {
      ...defaultVehicle,
      ...nextVehicle,
      id: nextVehicle.id || crypto.randomUUID()
    };
    const nextList = [
      vehicleToSave,
      ...vehicleList.filter((item) => item.id !== vehicleToSave.id)
    ];

    setVehicleList(nextList);
    localStorage.setItem("roadpilot_vehicle_list", JSON.stringify(nextList));
    return vehicleToSave;
  }

  function setActiveVehicle(nextVehicle: Vehicle) {
    const activeVehicle = {
      ...defaultVehicle,
      ...nextVehicle
    };

    setVehicle(activeVehicle);
    setVehicleDraft(activeVehicle);
    setVehicleMode(activeVehicle.vehicleType || "Big truck");
    localStorage.setItem("roadpilot_vehicle", JSON.stringify(activeVehicle));
    setVehicleSaveMessage(`${activeVehicle.name || activeVehicle.vehicleType} is active for routing.`);
  }

  function startNewVehicle() {
    const newVehicle = {
      ...defaultVehicle,
      id: crypto.randomUUID(),
      name: ""
    };

    setVehicleDraft(newVehicle);
    setVehicleSaveMessage("Enter the new vehicle, then save it.");
  }

  function deleteVehicle(vehicleId?: string) {
    if (!vehicleId) return;

    const nextList = vehicleList.filter((item) => item.id !== vehicleId);
    setVehicleList(nextList);
    localStorage.setItem("roadpilot_vehicle_list", JSON.stringify(nextList));

    if (vehicle.id === vehicleId) {
      const nextActive = nextList[0] || defaultVehicle;
      setActiveVehicle(nextActive);
    }
  }

  async function saveVehicle(formData: FormData) {
    const nextVehicle = {
      id: vehicleDraft.id || crypto.randomUUID(),
      name: String(formData.get("vehicleName") || "My truck"),
      vehicleType: String(formData.get("vehicleType") || "Big truck"),
      heightFt: String(formData.get("heightFt") || "13.6"),
      weightLbs: String(formData.get("weightLbs") || "78000"),
      lengthFt: String(formData.get("lengthFt") || "72"),
      trailerType: String(formData.get("trailerType") || "53 ft dry van"),
      hazmat: formData.get("hazmat") === "on",
      avoidTolls: formData.get("avoidTolls") === "on"
    };

    const savedVehicle = saveVehicleToList(nextVehicle);

    setVehicle(savedVehicle);
    setVehicleDraft(savedVehicle);
    setVehicleMode(savedVehicle.vehicleType || "Big truck");
    localStorage.setItem("roadpilot_vehicle", JSON.stringify(savedVehicle));
    setVehicleSaveMessage("Vehicle saved in this app.");

    if (!signup.userId) {
      return;
    }

    const response = await fetch("/api/profile/vehicle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: signup.userId,
        ...nextVehicle
      })
    });

    if (response.ok) {
      setVehicleSaveMessage("Vehicle saved to your account. You will not need to enter it next time.");
    } else {
      setVehicleSaveMessage("Vehicle saved on this device. Sign in again later to save it to your account.");
    }
  }

  function saveSettings(formData: FormData) {
    const nextLanguage = String(formData.get("language") || "English") as Language;
    changeLanguage(nextLanguage);
    setSettings({
      language: nextLanguage,
      units: String(formData.get("units") || "Miles / feet"),
      parkingAlerts: formData.get("parkingAlerts") === "on",
      avoidTolls: formData.get("avoidTolls") === "on"
    });
  }

  function logOut() {
    localStorage.removeItem("roadpilot_signup");
    localStorage.removeItem("roadpilot_vehicle");
    localStorage.removeItem("roadpilot_vehicle_list");
    window.location.href = "/login";
  }

  function startGpsNavigation() {
    if (!("geolocation" in navigator)) {
      setGpsStatus(text.gpsUnsupported);
      return;
    }

    setGpsStatus(text.gpsWaiting);
    setIsDriving(true);

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const speedMetersPerSecond = position.coords.speed;
        setGpsPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          speedMph: speedMetersPerSecond ? speedMetersPerSecond * 2.23694 : undefined
        });
        setGpsStatus(text.gpsLive);
      },
      () => {
        setGpsStatus(text.gpsDenied);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 12000
      }
    );

    setGpsWatchId(watchId);
  }

  function stopGpsNavigation() {
    if (gpsWatchId !== null) {
      navigator.geolocation.clearWatch(gpsWatchId);
    }
    setGpsWatchId(null);
    setIsDriving(false);
    setGpsStatus(text.gpsReady);
  }

  if (accountChecked && !signup.userId) {
    return (
      <section className="signin-required">
        <p className="eyebrow">{text.settings}</p>
        <h2>{text.signInRequired}</h2>
        <p>{text.signInHelp}</p>
        <div className="actions">
          <a href="/login">{text.goToLogin}</a>
          <a href="/signup">{text.startTrial}</a>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="account-bar">
        <div>
          <span>{text.signedInAs}</span>
          <strong>{signup.name || signup.email || "Driver"}</strong>
          <p>{signup.email || "No email saved"}</p>
        </div>
        <div>
          <span>{text.trialEnds}</span>
          <strong>{trialEnd}</strong>
          <p>{vehicle.name || vehicle.vehicleType || "Big truck"}</p>
        </div>
        <button type="button" onClick={logOut}>
          {text.switchAccount}
        </button>
      </div>
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
      <nav className="dashboard-nav" aria-label="Dashboard sections">
        <a href="#drive">{text.drive}</a>
        <a href="#vehicle">{text.vehicle}</a>
        <a href="#reports">{text.reports}</a>
        <a href="#saved">{text.stops}</a>
        <a href="#fleet">{text.drivers}</a>
        <a href="#history">{text.trips}</a>
        <a href="#billing">{text.trial}</a>
        <a href="#settings">{text.settings}</a>
      </nav>

      <section className="drive-layout" id="drive">
        <aside className="drive-panel">
          <p className="eyebrow">{text.liveMap}</p>
          <h2>{activeRoute.start} to {activeRoute.destination}</h2>
          <form action={planRoute} className="drive-search">
            <label>
              {text.from}
              <input name="start" placeholder="Chicago, IL" defaultValue={activeRoute.start} required />
            </label>
            <label>
              {text.to}
              <input name="destination" placeholder="Dallas, TX" defaultValue={activeRoute.destination} required />
            </label>
            <label>
              {text.vehicle}
              <select
                name="vehicleMode"
                value={vehicleMode}
                onChange={(event) => setVehicleMode(event.target.value)}
              >
                <option>Big truck</option>
                <option>Truck</option>
                <option>Car</option>
                <option>Motorcycle</option>
                <option>Bicycle</option>
              </select>
            </label>
            <button type="submit">{text.planRoute}</button>
          </form>

          <div className="route-filters" aria-label="Search along route">
            {["All", "Truck stop", "Gas", "Rest area", "Hotel", "Food", "Repair"].map((filter) => (
              <button
                className={placeFilter === filter ? "active" : ""}
                key={filter}
                type="button"
                onClick={() => setPlaceFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="route-options">
            <label>
              <input
                checked={routeOptions.avoidLowBridges}
                type="checkbox"
                onChange={(event) => setRouteOptions({ ...routeOptions, avoidLowBridges: event.target.checked })}
              />
              Avoid low bridges
            </label>
            <label>
              <input
                checked={routeOptions.avoidTolls}
                type="checkbox"
                onChange={(event) => setRouteOptions({ ...routeOptions, avoidTolls: event.target.checked })}
              />
              {text.avoidTollsShort}
            </label>
            <label>
              <input
                checked={routeOptions.hazmatSafe}
                type="checkbox"
                onChange={(event) => setRouteOptions({ ...routeOptions, hazmatSafe: event.target.checked })}
              />
              Hazmat safe
            </label>
          </div>

          <div className="route-choice active">
            <span>{activeRoute.provider === "Mapbox live" ? "Mapbox live route" : "Best route"}</span>
            <strong>{activeRoute.time}</strong>
            <p>{activeRoute.miles} miles - ETA {activeRoute.eta}</p>
          </div>
          <article className={`route-result ${activeRoute.provider === "Mapbox live" ? "ok" : ""}`}>
            <span>Map setup</span>
            <strong>{activeRoute.provider === "Mapbox live" ? "Connected" : "Demo route until Mapbox answers"}</strong>
            <p>{routeStatus}</p>
          </article>
          <div className="route-choice">
            <span>Alternate</span>
            <strong>14h 15m</strong>
            <p>Fewer low-clearance alerts</p>
          </div>

          <button className="secondary-action" type="button" onClick={() => setIsDriving(!isDriving)}>
            {isDriving ? "Stop driving mode" : "Start driving mode"}
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={gpsWatchId === null ? startGpsNavigation : stopGpsNavigation}
          >
            {gpsWatchId === null ? text.startGps : text.stopGps}
          </button>
          <button className="secondary-action" type="button" onClick={() => setVoiceGuidance(!voiceGuidance)}>
            Voice guidance {voiceGuidance ? "on" : "off"}
          </button>
        </aside>

        <div className={`map-stage ${mapView}`}>
          <div className="map-toolbar">
            <div className="map-tabs" aria-label="Map view">
              <button className={mapView === "road" ? "active" : ""} type="button" onClick={() => setMapView("road")}>
                Road
              </button>
              <button className={mapView === "satellite" ? "active" : ""} type="button" onClick={() => setMapView("satellite")}>
                Satellite
              </button>
            </div>
            <div className="map-status">{vehicleMode} mode</div>
          </div>
          <div className="map-controls" aria-label="Map controls">
            <button type="button" onClick={() => setMapZoom(Math.min(1.25, mapZoom + 0.05))}>+</button>
            <button type="button" onClick={() => setMapZoom(Math.max(0.9, mapZoom - 0.05))}>-</button>
            <button type="button" onClick={gpsWatchId === null ? startGpsNavigation : stopGpsNavigation}>GPS</button>
          </div>
          <div className="quick-report-bar" aria-label="Quick reports">
            <button type="button" onClick={() => quickReport("Police", "Police reported on shoulder ahead.")}>
              Police
            </button>
            <button type="button" onClick={() => quickReport("Hazard", "Road hazard reported in right lane.")}>
              Hazard
            </button>
            <button type="button" onClick={() => quickReport("Parking", "Parking availability updated by driver.")}>
              Parking
            </button>
            <button type="button" onClick={() => quickReport("Low bridge", "Low bridge warning added to route.")}>
              Bridge
            </button>
            <button className="sos-button" type="button" onClick={() => requestRoadside("SOS")}>
              SOS
            </button>
          </div>

          <div className="map-zoom-layer" style={{ transform: `scale(${mapZoom})` }}>
            <div className="map-city city-a">Chicago</div>
            <div className="map-city city-b">St. Louis</div>
            <div className="map-city city-c">Springfield</div>
            <div className="map-city city-d">Dallas</div>
            <div className="route-line route-shadow" />
            <div className="route-line" />
            <div className="route-progress" />
            <div className={`driver-dot ${isDriving ? "moving" : ""} ${gpsWatchId !== null ? "gps-live" : ""}`}>
              <span />
            </div>

            {filteredPlaces.map((place) => (
              <button
                className={`map-place ${selectedPlace.name === place.name ? "active" : ""}`}
                key={place.name}
                style={{ left: `${place.x}%`, top: `${place.y}%` }}
                type="button"
                title={`${place.name}: ${place.detail}`}
                onClick={() => setSelectedPlace(place)}
              >
                <span>{place.type.slice(0, 1)}</span>
              </button>
            ))}

            <div className="map-warning bridge">13 ft 2 in bridge</div>
            <div className="map-warning scale">Weigh station open</div>
          </div>
          <div className="map-card">
            <span>{activeRoute.time}</span>
            <strong>{activeRoute.miles} miles</strong>
            <p>{activeRoute.warning}</p>
          </div>
          <div className="place-popover">
            <span>{selectedPlace.type}</span>
            <strong>{selectedPlace.name}</strong>
            <p>{selectedPlace.detail}</p>
            <blockquote>{selectedPlace.review}</blockquote>
            <div className="place-actions">
              <button type="button" onClick={addSelectedStop}>Add stop</button>
              <button type="button" onClick={() => setPlaceFilter(selectedPlace.type)}>Show type</button>
            </div>
            <form action={postPlaceMessage} className="place-message-form">
              <input name="placeMessage" placeholder={text.leaveMessage} />
              <button type="submit">{text.post}</button>
            </form>
            <div className="place-message-list">
              {selectedPlaceMessages.length === 0 ? (
                <p>No driver messages here yet.</p>
              ) : (
                selectedPlaceMessages.slice(0, 3).map((message, index) => (
                  <p key={`${message.time}-${index}`}>
                    <strong>{message.driver}</strong>: {message.note}
                  </p>
                ))
              )}
            </div>
          </div>
          {isDriving && (
            <div className="driving-hud">
              <span>Next turn</span>
              <strong>Keep right in 2.1 mi</strong>
              <p>Truck bypass toward I-35 South. {gpsStatus}. Voice guidance {voiceGuidance ? "on" : "off"}.</p>
            </div>
          )}
        </div>
      </section>

      <div className="drive-info-grid">
        <article>
          <span>{text.trialCard}</span>
          <strong>{text.freeUntil} {trialEnd}</strong>
          <p>{text.noCardTrial}</p>
        </article>
        <article>
          <span>{text.truckSafety}</span>
          <strong>{vehicle.name || vehicle.vehicleType || "Big truck"}</strong>
          <p>{vehicle.heightFt || "13.6"} ft high - {vehicle.weightLbs || "78000"} lb - {vehicle.lengthFt || "72"} ft long</p>
        </article>
        <article>
          <span>{text.routeCost}</span>
          <strong>{activeRoute.fuel}</strong>
          <p>{vehicle.avoidTolls ? "Avoid tolls when possible" : "Tolls allowed"}</p>
        </article>
        <article>
          <span>{text.weather}</span>
          <strong>{text.clearRoad}</strong>
          <p>Light wind. No severe alerts on this demo route.</p>
        </article>
        <article>
          <span>{text.compliance}</span>
          <strong>4h 25m drive left</strong>
          <p>Rest break suggested near Mile 214.</p>
        </article>
        <article>
          <span>{text.parkingForecast}</span>
          <strong>Medium risk</strong>
          <p>Stop before 8 PM near major cities.</p>
        </article>
        <article>
          <span>{text.liveSpeed}</span>
          <strong>{gpsPosition?.speedMph ? `${gpsPosition.speedMph.toFixed(0)} mph` : isDriving ? "GPS active" : "Ready"}</strong>
          <p>{gpsStatus}</p>
        </article>
        <article>
          <span>{text.gps}</span>
          <strong>{gpsPosition ? `${gpsPosition.latitude.toFixed(5)}, ${gpsPosition.longitude.toFixed(5)}` : text.coordinates}</strong>
          <p>{gpsPosition ? `${text.accuracy}: ${gpsPosition.accuracy.toFixed(0)} m` : text.startGps}</p>
        </article>
        <article>
          <span>{text.roadside}</span>
          <strong>{roadsideStatus}</strong>
          <p>Demo request only. Real emergency calls must use local emergency services.</p>
        </article>
      </div>

      <section className="route-planner" id="vehicle">
        <p className="eyebrow">{text.vehicleGarage}</p>
        <h2>{text.vehicleTitle}</h2>
        <p>{text.vehicleHelp}</p>
        <form action={saveVehicle} className="signup-form">
          <label>
            {text.vehicleName}
            <input
              name="vehicleName"
              onChange={(event) => keepVehicleChange("name", event.target.value)}
              placeholder="Blue Peterbilt"
              value={vehicleDraft.name || ""}
            />
          </label>
          <label>
            {text.vehicleType}
            <select
              name="vehicleType"
              onChange={(event) => keepVehicleChange("vehicleType", event.target.value)}
              value={vehicleDraft.vehicleType || "Big truck"}
            >
              <option>Big truck</option>
              <option>Truck</option>
              <option>Car</option>
              <option>Motorcycle</option>
              <option>Bicycle</option>
            </select>
          </label>
          <label>
            {text.height}
            <input
              name="heightFt"
              onChange={(event) => keepVehicleChange("heightFt", event.target.value)}
              placeholder="13.6"
              value={vehicleDraft.heightFt || ""}
            />
          </label>
          <label>
            {text.weight}
            <input
              name="weightLbs"
              onChange={(event) => keepVehicleChange("weightLbs", event.target.value)}
              placeholder="78000"
              value={vehicleDraft.weightLbs || ""}
            />
          </label>
          <label>
            {text.length}
            <input
              name="lengthFt"
              onChange={(event) => keepVehicleChange("lengthFt", event.target.value)}
              placeholder="72"
              value={vehicleDraft.lengthFt || ""}
            />
          </label>
          <label>
            {text.trailer}
            <select
              name="trailerType"
              onChange={(event) => keepVehicleChange("trailerType", event.target.value)}
              value={vehicleDraft.trailerType || "53 ft dry van"}
            >
              <option>53 ft dry van</option>
              <option>Reefer</option>
              <option>Flatbed</option>
              <option>Tanker</option>
              <option>Car hauler</option>
              <option>No trailer</option>
            </select>
          </label>
          <label className="wide check-label">
            <input
              checked={vehicleDraft.hazmat || false}
              name="hazmat"
              onChange={(event) => keepVehicleChange("hazmat", event.target.checked)}
              type="checkbox"
            />
            {text.hazmat}
          </label>
          <label className="wide check-label">
            <input
              checked={vehicleDraft.avoidTolls ?? true}
              name="avoidTolls"
              onChange={(event) => keepVehicleChange("avoidTolls", event.target.checked)}
              type="checkbox"
            />
            {text.avoidTolls}
          </label>
          <button type="submit">{text.saveVehicle}</button>
          <button className="secondary-action" type="button" onClick={startNewVehicle}>
            {text.newVehicle}
          </button>
          <p className="form-message">{vehicleSaveMessage}</p>
        </form>
        <article className="route-result">
          <span>{text.currentVehicle}</span>
          <strong>{vehicle.name || vehicle.vehicleType || "Big truck"}</strong>
          <p>{vehicle.trailerType || "53 ft dry van"} - {vehicle.hazmat ? text.hazmatOn : text.noHazmat}</p>
        </article>
        <div className="vehicle-list">
          <p className="eyebrow">{text.savedVehicles}</p>
          {vehicleList.length === 0 ? (
            <article className="route-result">
              <span>{text.noSavedVehicles}</span>
            </article>
          ) : (
            vehicleList.map((savedVehicle) => (
              <article className="vehicle-card" key={savedVehicle.id || savedVehicle.name}>
                <span>
                  {vehicle.id === savedVehicle.id ? text.activeVehicle : savedVehicle.vehicleType}
                </span>
                <strong>{savedVehicle.name || savedVehicle.vehicleType}</strong>
                <p>{savedVehicle.heightFt} ft - {savedVehicle.weightLbs} lb - {savedVehicle.trailerType}</p>
                <div className="vehicle-actions">
                  <button type="button" onClick={() => setActiveVehicle(savedVehicle)}>
                    {text.setActive}
                  </button>
                  <button type="button" onClick={() => deleteVehicle(savedVehicle.id)}>
                    {text.deleteVehicle}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="route-planner">
        <p className="eyebrow">{text.roadsideHelp}</p>
        <h2>{text.requestHelp}</h2>
        <div className="roadside-grid">
          {[
            ["Tire service", "Flat tire or blowout help"],
            ["Tow truck", "Heavy-duty tow request"],
            ["Fuel delivery", "Out of fuel or DEF"],
            ["Mobile repair", "Basic roadside repair"]
          ].map(([kind, detail]) => (
            <button className="roadside-card" key={kind} type="button" onClick={() => requestRoadside(kind)}>
              <span>{kind}</span>
              <strong>{detail}</strong>
            </button>
          ))}
        </div>
        <article className="route-result">
          <span>Status</span>
          <strong>{roadsideStatus}</strong>
          <p>This is a demo workflow for the trial app. It does not contact real emergency services yet.</p>
        </article>
      </section>

      <section className="route-planner optional-planning">
        <p className="eyebrow">{text.optionalTools}</p>
        <h2>Fuel, permits, offline map, and checklist.</h2>
        <p>Drivers can skip this and keep using the map.</p>
        <button
          className="secondary-action"
          type="button"
          onClick={() => setShowOptionalPlanning(!showOptionalPlanning)}
        >
          {showOptionalPlanning ? text.hideOptional : text.showOptional}
        </button>
      </section>

      {showOptionalPlanning && (
        <>
          <section className="route-planner">
            <p className="eyebrow">Trip planning</p>
            <h2>Before you roll.</h2>
            <div className="planning-grid">
              <article className="route-result">
                <span>Fuel plan</span>
                <strong>2 fuel stops suggested</strong>
                <p>Stop near Blue Ridge Diesel and Northline Travel Center to keep a 120 mile reserve.</p>
              </article>
              <article className="route-result">
                <span>Permits and restrictions</span>
                <strong>{Number(vehicle.weightLbs || 78000) > 80000 ? "Permit check needed" : "Standard weight"}</strong>
                <p>{routeOptions.avoidLowBridges ? "Low bridge avoidance is on." : "Low bridge avoidance is off."}</p>
              </article>
              <article className="route-result">
                <span>Offline map</span>
                <strong>{offlineStatus}</strong>
                <p>Download the route before leaving weak service areas.</p>
              </article>
            </div>
            <button
              className="secondary-action"
              type="button"
              onClick={() => setOfflineStatus("Downloaded for this route")}
            >
              Download offline route
            </button>
          </section>

          <section className="route-planner">
            <p className="eyebrow">Pre-trip checklist</p>
            <h2>{checklistDone} of 4 checked.</h2>
            <div className="checklist-grid">
              {[
                ["tires", "Tires inspected"],
                ["brakes", "Brakes checked"],
                ["lights", "Lights working"],
                ["documents", "Documents ready"]
              ].map(([key, label]) => (
                <label className="check-card" key={key}>
                  <input
                    checked={checklist[key as keyof typeof checklist]}
                    type="checkbox"
                    onChange={(event) =>
                      setChecklist({ ...checklist, [key]: event.target.checked })
                    }
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="route-planner">
        <p className="eyebrow">{text.turnByTurn}</p>
        <h2>{text.drivingDirections}</h2>
        <div className="directions-list">
          {routeDirections.map((direction, index) => (
            <article className="direction-step" key={direction}>
              <span>{index + 1}</span>
              <strong>{direction}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="route-planner" id="reports">
        <p className="eyebrow">{text.driverReports}</p>
        <h2>{text.helpDrivers}</h2>
        <form action={postReport} className="signup-form">
          <label>
            {text.reportType}
            <select name="type" defaultValue="Parking">
              <option>Parking</option>
              <option>Hazard</option>
              <option>Police</option>
              <option>Fuel price</option>
              <option>Low bridge</option>
              <option>Traffic</option>
            </select>
          </label>
          <label>
            {text.note}
            <input name="note" placeholder="Example: parking full on east side" required />
          </label>
          <button type="submit">{text.postReport}</button>
        </form>
        <div className="report-list">
          {reports.map((report, index) => (
            <article className="route-result" key={`${report.time}-${index}`}>
              <span>{report.type} - {report.time}</span>
              <strong>{report.note}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="route-planner" id="saved">
        <p className="eyebrow">Truck stops, fuel, rest areas</p>
        <h2>{text.stopsAlong}</h2>
        <div className="place-grid">
          {filteredPlaces.map((place) => (
            <article className="route-result" key={place.name}>
              <span>{place.type}</span>
              <strong>{place.name}</strong>
              <p>{place.detail}</p>
              <p>{place.review}</p>
            </article>
          ))}
        </div>
        <form action={savePlace} className="signup-form">
          <label>
            Place name
            <input name="placeName" placeholder="Red River Travel Plaza" required />
          </label>
          <label>
            Type
            <select name="placeKind" defaultValue="Truck stop">
              <option>Truck stop</option>
              <option>Fuel</option>
              <option>Repair</option>
              <option>Hotel</option>
              <option>Rest area</option>
            </select>
          </label>
          <button type="submit">{text.savePlace}</button>
        </form>
        <div className="report-list">
          {savedPlaces.map((place, index) => (
            <article className="route-result" key={`${place.name}-${index}`}>
              <span>{place.kind}</span>
              <strong>{place.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="route-planner" id="fleet">
        <p className="eyebrow">{text.drivers}</p>
        <h2>{text.addDriver}</h2>
        <form action={inviteDriver} className="signup-form">
          <label className="wide">
            {text.driverName}
            <input name="driverName" placeholder="Maria Lopez" required />
          </label>
          <button type="submit">{text.inviteDriver}</button>
        </form>
        <div className="report-list">
          {fleetDrivers.length === 0 ? (
            <article className="route-result">
              <span>{text.noDrivers}</span>
              <p>{text.addDriverOnly}</p>
            </article>
          ) : (
            fleetDrivers.map((driver, index) => (
              <article className="route-result" key={`${driver.name}-${index}`}>
                <span>{driver.status}</span>
                <strong>{driver.name}</strong>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="route-planner" id="history">
        <p className="eyebrow">{text.trips}</p>
        <h2>{text.recentRoutes}</h2>
        <div className="report-list">
          {trips.length === 0 ? (
            <article className="route-result">
              <span>{text.noTrips}</span>
              <p>{text.planRouteAbove}</p>
            </article>
          ) : (
            trips.map((trip, index) => (
              <article className="route-result" key={`${trip.route}-${index}`}>
                <span>{trip.when}</span>
                <strong>{trip.route}</strong>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="route-planner" id="billing">
        <p className="eyebrow">{text.trial}</p>
        <h2>{text.freeTrial}</h2>
        <article className="route-result">
          <span>{billingStatus}</span>
          <strong>{text.noCardToday}</strong>
          <p>{text.afterTrial}</p>
        </article>
        <button
          className="secondary-action"
          type="button"
          onClick={() => {
            setBillingStatus("Ready for payment setup after trial ends");
            window.location.href = "/plans";
          }}
        >
          {text.payLater}
        </button>
      </section>

      <section className="route-planner" id="settings">
        <p className="eyebrow">{text.settings}</p>
        <h2>{text.preferences}</h2>
        <form action={saveSettings} className="signup-form">
          <label>
            {text.language}
            <select name="language" value={language} onChange={(event) => changeLanguage(event.target.value as Language)}>
              <option value="English">{text.english}</option>
              <option value="Spanish">{text.spanish}</option>
            </select>
          </label>
          <label>
            {text.units}
            <select name="units" defaultValue={settings.units}>
              <option>Miles / feet</option>
              <option>Kilometers / meters</option>
            </select>
          </label>
          <label className="wide check-label">
            <input name="parkingAlerts" type="checkbox" defaultChecked={settings.parkingAlerts} />
            {text.parkingAlerts}
          </label>
          <label className="wide check-label">
            <input name="avoidTolls" type="checkbox" defaultChecked={settings.avoidTolls} />
            {text.avoidTollsShort}
          </label>
          <button type="submit">{text.saveSettings}</button>
        </form>
        <article className="route-result">
          <span>{text.currentSettings}</span>
          <strong>{settings.language} - {settings.units}</strong>
          <p>{settings.parkingAlerts ? text.parkingOn : text.parkingOff}</p>
        </article>
        <button className="secondary-action" type="button" onClick={logOut}>
          {text.switchAccount}
        </button>
      </section>
    </>
  );
}
