:root {
  --ink: #f8feff;
  --muted: #9db5c8;
  --line: rgba(0, 229, 255, 0.28);
  --blue: #00e5ff;
  --blue-dark: #008cff;
  --green: #39ff14;
  --soft: rgba(0, 229, 255, 0.1);
  --card: rgba(8, 16, 30, 0.92);
  --page: #050912;
  --glow-blue: 0 0 24px rgba(0, 229, 255, 0.24);
  --glow-green: 0 0 24px rgba(57, 255, 20, 0.2);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: var(--ink);
  background:
    radial-gradient(circle at 16% 10%, rgba(0, 229, 255, 0.2), transparent 28%),
    radial-gradient(circle at 84% 20%, rgba(57, 255, 20, 0.14), transparent 28%),
    linear-gradient(135deg, #050912 0%, #071323 48%, #04070f 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.hero {
  width: min(760px, 100%);
  padding: 32px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  box-shadow: var(--glow-blue), 0 20px 50px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(16px);
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--green);
  font-weight: 850;
  text-shadow: 0 0 12px rgba(57, 255, 20, 0.55);
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
}

h2 {
  margin: 0;
  font-size: 1.4rem;
}

p {
  color: var(--muted);
  line-height: 1.55;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--blue-dark), var(--blue));
  color: #00121a;
  font-weight: 850;
  text-decoration: none;
  box-shadow: var(--glow-blue);
}

.actions a + a {
  border: 1px solid var(--line);
  background: rgba(0, 229, 255, 0.08);
  color: var(--blue);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.footer-links a {
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
}

.signup-card {
  width: min(680px, 100%);
}

.signup-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 22px;
}

label {
  display: grid;
  gap: 6px;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 750;
}

input,
select {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 11px 12px;
  color: var(--ink);
  background: rgba(1, 10, 20, 0.86);
  font: inherit;
}

input:focus,
select:focus {
  outline: 0;
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(57, 255, 20, 0.16), var(--glow-green);
}

.signup-form button,
.form-button,
.secondary-action {
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--blue-dark), var(--blue));
  color: #00121a;
  font: inherit;
  font-weight: 850;
  text-decoration: none;
  box-shadow: var(--glow-blue);
}

.secondary-action {
  width: 100%;
  margin-top: 12px;
  border: 1px solid var(--line);
  background: rgba(57, 255, 20, 0.08);
  color: var(--green);
  box-shadow: var(--glow-green);
}

.wide {
  grid-column: 1 / -1;
}

.check-label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
}

.check-label input {
  width: 18px;
  height: 18px;
  accent-color: var(--green);
}

.trial-note {
  display: grid;
  gap: 4px;
  margin-top: 14px;
  padding: 12px;
  border: 1px solid rgba(57, 255, 20, 0.3);
  border-radius: 8px;
  background: rgba(57, 255, 20, 0.08);
  box-shadow: var(--glow-green);
}

.trial-note span {
  color: var(--muted);
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;
}

.plan-card {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.08);
  box-shadow: inset 0 0 20px rgba(0, 229, 255, 0.06);
}

.plan-card span {
  color: var(--green);
  font-weight: 900;
}

.plan-card strong {
  font-size: 1.6rem;
}

.plan-card p {
  margin: 0;
}

.plan-actions {
  display: grid;
  gap: 8px;
}

.plan-actions button {
  min-height: 42px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--blue-dark), var(--blue));
  color: #00121a;
  font: inherit;
  font-weight: 900;
}

.plan-actions button + button {
  border: 1px solid var(--line);
  background: rgba(0, 229, 255, 0.08);
  color: var(--blue);
}

.setup-checks {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.setup-check {
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.07);
}

.setup-check.ok {
  border-color: rgba(57, 255, 20, 0.45);
}

.setup-check.bad {
  border-color: rgba(255, 68, 68, 0.55);
}

.setup-check span {
  color: var(--green);
  font-size: 0.82rem;
  font-weight: 900;
}

.setup-check.bad span {
  color: #ffb3b3;
}

.setup-check strong {
  display: block;
  margin-top: 3px;
}

.setup-check p {
  margin: 4px 0 0;
}

.form-message {
  grid-column: 1 / -1;
  margin: 0;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(57, 255, 20, 0.08);
  color: var(--green);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;
}

.dashboard-nav {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  gap: 8px;
  margin: 20px -8px 0;
  padding: 8px;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(5, 9, 18, 0.92);
  backdrop-filter: blur(10px);
  box-shadow: var(--glow-blue);
}

.account-bar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  margin-top: 20px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.07);
  box-shadow: var(--glow-blue);
}

.account-bar span {
  display: block;
  color: var(--green);
  font-size: 0.78rem;
  font-weight: 900;
}

.account-bar strong {
  display: block;
  margin-top: 2px;
}

.account-bar p {
  margin: 2px 0 0;
  font-size: 0.86rem;
}

.account-bar button {
  min-height: 38px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0 12px;
  background: rgba(5, 9, 18, 0.86);
  color: var(--blue);
  font: inherit;
  font-weight: 850;
}

.language-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 8px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(5, 9, 18, 0.92);
  box-shadow: var(--glow-blue);
}

.language-switch span {
  color: var(--muted);
  font-size: 0.86rem;
  font-weight: 850;
}

.language-switch button {
  min-height: 32px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0 10px;
  background: rgba(0, 229, 255, 0.1);
  color: var(--blue);
  font: inherit;
  font-size: 0.86rem;
  font-weight: 850;
}

.language-switch button.active {
  border-color: rgba(57, 255, 20, 0.55);
  background: rgba(57, 255, 20, 0.16);
  color: var(--green);
  box-shadow: var(--glow-green);
}

.dashboard-nav a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.12);
  color: var(--blue);
  font-size: 0.86rem;
  font-weight: 850;
  text-decoration: none;
  white-space: nowrap;
}

.drive-layout {
  display: grid;
  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
  gap: 14px;
  margin-top: 18px;
  min-height: 620px;
}

.drive-panel {
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(4, 11, 23, 0.96);
  box-shadow: var(--glow-blue);
}

.drive-panel h2 {
  line-height: 1.15;
}

.drive-search {
  display: grid;
  gap: 10px;
}

.drive-search button,
.map-tabs button {
  min-height: 40px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--blue-dark), var(--blue));
  color: #00121a;
  font: inherit;
  font-weight: 850;
  box-shadow: var(--glow-blue);
}

.route-choice {
  padding: 12px;
  border: 1px solid rgba(0, 229, 255, 0.22);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.07);
}

.route-choice.active {
  border-color: rgba(57, 255, 20, 0.55);
  box-shadow: var(--glow-green);
}

.route-choice span,
.drive-info-grid span {
  display: block;
  color: var(--green);
  font-size: 0.8rem;
  font-weight: 850;
}

.route-choice strong {
  display: block;
  margin-top: 3px;
  font-size: 1.45rem;
}

.route-choice p {
  margin: 4px 0 0;
}

.route-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.route-filters button,
.map-controls button,
.place-actions button {
  min-height: 34px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.1);
  color: var(--blue);
  font: inherit;
  font-size: 0.84rem;
  font-weight: 850;
}

.route-filters button {
  padding: 0 10px;
}

.route-filters button.active {
  border-color: rgba(57, 255, 20, 0.55);
  background: rgba(57, 255, 20, 0.14);
  color: var(--green);
  box-shadow: var(--glow-green);
}

.route-options {
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px solid rgba(0, 229, 255, 0.22);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.06);
}

.route-options label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
}

.route-options input {
  width: 16px;
  height: 16px;
  accent-color: var(--green);
}

.map-stage {
  position: relative;
  min-height: 620px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background:
    linear-gradient(31deg, transparent 0 47%, rgba(255, 255, 255, 0.1) 48% 52%, transparent 53%),
    linear-gradient(126deg, transparent 0 42%, rgba(255, 255, 255, 0.12) 43% 47%, transparent 48%),
    linear-gradient(86deg, transparent 0 56%, rgba(57, 255, 20, 0.12) 57% 59%, transparent 60%),
    linear-gradient(0deg, rgba(0, 229, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 229, 255, 0.08) 1px, transparent 1px),
    #071321;
  background-size: auto, auto, auto, 78px 78px, 78px 78px, auto;
  box-shadow: inset 0 0 48px rgba(0, 229, 255, 0.12), var(--glow-blue);
}

.map-stage.satellite {
  background:
    radial-gradient(circle at 24% 26%, rgba(44, 96, 63, 0.95), transparent 22%),
    radial-gradient(circle at 77% 19%, rgba(20, 75, 88, 0.92), transparent 26%),
    radial-gradient(circle at 61% 78%, rgba(71, 82, 48, 0.85), transparent 27%),
    linear-gradient(37deg, transparent 0 49%, rgba(216, 223, 210, 0.16) 50% 52%, transparent 53%),
    linear-gradient(117deg, transparent 0 38%, rgba(216, 223, 210, 0.18) 39% 41%, transparent 42%),
    #08130f;
}

.map-stage::before,
.map-stage::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.map-stage::before {
  background:
    linear-gradient(28deg, transparent 0 18%, rgba(0, 229, 255, 0.18) 19% 20%, transparent 21%),
    linear-gradient(151deg, transparent 0 66%, rgba(0, 229, 255, 0.16) 67% 68%, transparent 69%),
    linear-gradient(95deg, transparent 0 31%, rgba(255, 255, 255, 0.12) 32% 33%, transparent 34%);
}

.map-stage::after {
  background: radial-gradient(circle at center, transparent 36%, rgba(3, 7, 14, 0.28));
}

.map-toolbar {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  pointer-events: none;
}

.map-tabs {
  display: flex;
  gap: 8px;
  pointer-events: auto;
}

.map-tabs button {
  min-width: 82px;
  border: 1px solid var(--line);
  background: rgba(5, 9, 18, 0.86);
  color: var(--blue);
}

.map-tabs button.active {
  background: linear-gradient(135deg, var(--blue-dark), var(--blue));
  color: #00121a;
}

.map-status {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid rgba(57, 255, 20, 0.45);
  border-radius: 8px;
  background: rgba(4, 11, 23, 0.86);
  color: var(--green);
  font-weight: 850;
  box-shadow: var(--glow-green);
}

.route-line,
.route-shadow,
.route-progress {
  position: absolute;
  left: 18%;
  top: 17%;
  width: 64%;
  height: 66%;
  border-right: 8px solid var(--blue);
  border-bottom: 8px solid var(--blue);
  border-radius: 20% 38% 45% 28%;
  transform: rotate(-18deg);
  z-index: 2;
}

.route-shadow {
  border-width: 15px;
  border-color: rgba(0, 0, 0, 0.34);
  filter: blur(1px);
  z-index: 1;
}

.map-zoom-layer {
  position: absolute;
  inset: 0;
  transform-origin: 50% 52%;
  transition: transform 180ms ease;
  z-index: 1;
}

.route-progress {
  width: 39%;
  height: 45%;
  border-color: var(--green);
  box-shadow: 0 0 18px rgba(57, 255, 20, 0.72);
  z-index: 3;
}

.driver-dot {
  position: absolute;
  left: 44%;
  top: 48%;
  z-index: 5;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #00121a;
  border: 3px solid var(--green);
  box-shadow: 0 0 22px rgba(57, 255, 20, 0.78);
}

.driver-dot span {
  width: 13px;
  height: 13px;
  border-radius: 2px;
  background: var(--blue);
  transform: rotate(45deg);
}

.driver-dot.moving {
  animation: drivePulse 1.3s ease-in-out infinite;
}

.driver-dot.gps-live {
  border-color: var(--blue);
  box-shadow: 0 0 28px rgba(0, 229, 255, 0.82);
}

@keyframes drivePulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.12);
  }
}

.map-place {
  position: absolute;
  z-index: 4;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 2px solid #00121a;
  border-radius: 50%;
  background: var(--green);
  color: #00121a;
  font-weight: 950;
  box-shadow: var(--glow-green);
}

.map-place.active {
  width: 40px;
  height: 40px;
  border-color: var(--blue);
  background: var(--blue);
  box-shadow: 0 0 24px rgba(0, 229, 255, 0.78);
}

.map-warning {
  position: absolute;
  z-index: 4;
  padding: 8px 10px;
  border: 1px solid rgba(57, 255, 20, 0.42);
  border-radius: 8px;
  background: rgba(5, 9, 18, 0.88);
  color: var(--ink);
  font-size: 0.82rem;
  font-weight: 850;
  box-shadow: var(--glow-green);
}

.map-warning.bridge {
  left: 50%;
  top: 31%;
}

.map-warning.scale {
  left: 21%;
  top: 72%;
}

.map-city {
  position: absolute;
  z-index: 3;
  color: rgba(248, 254, 255, 0.78);
  font-size: 0.9rem;
  font-weight: 850;
  text-shadow: 0 1px 8px #000;
}

.city-a {
  right: 16%;
  top: 15%;
}

.city-b {
  right: 30%;
  top: 42%;
}

.city-c {
  left: 35%;
  bottom: 27%;
}

.city-d {
  left: 24%;
  bottom: 11%;
}

.map-card {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 5;
  width: min(320px, calc(100% - 32px));
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(4, 11, 23, 0.92);
  box-shadow: var(--glow-blue);
}

.map-controls {
  position: absolute;
  right: 14px;
  top: 66px;
  z-index: 6;
  display: grid;
  gap: 8px;
}

.map-controls button {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  padding: 0;
  background: rgba(4, 11, 23, 0.9);
  color: var(--green);
  font-size: 1.15rem;
  box-shadow: var(--glow-green);
}

.quick-report-bar {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 64px;
  z-index: 5;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.quick-report-bar button {
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(4, 11, 23, 0.88);
  color: var(--blue);
  font: inherit;
  font-size: 0.86rem;
  font-weight: 850;
  white-space: nowrap;
  box-shadow: var(--glow-blue);
}

.quick-report-bar .sos-button {
  border-color: rgba(255, 68, 68, 0.75);
  background: rgba(255, 68, 68, 0.22);
  color: #ffb3b3;
  box-shadow: 0 0 24px rgba(255, 68, 68, 0.28);
}

.place-popover,
.driving-hud {
  position: absolute;
  z-index: 6;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(4, 11, 23, 0.94);
  box-shadow: var(--glow-blue);
}

.place-popover {
  left: 16px;
  bottom: 16px;
  width: min(300px, calc(100% - 32px));
  padding: 14px;
}

.place-popover span,
.driving-hud span {
  display: block;
  color: var(--green);
  font-size: 0.8rem;
  font-weight: 850;
}

.place-popover strong,
.driving-hud strong {
  display: block;
  margin-top: 3px;
  font-size: 1.15rem;
}

.place-popover p,
.place-popover blockquote,
.driving-hud p {
  margin: 8px 0 0;
  color: var(--muted);
  line-height: 1.45;
}

.place-popover blockquote {
  padding-left: 10px;
  border-left: 3px solid var(--green);
}

.place-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
}

.place-actions button:first-child {
  background: linear-gradient(135deg, var(--blue-dark), var(--blue));
  color: #00121a;
}

.place-message-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  margin-top: 12px;
}

.place-message-form input {
  min-width: 0;
  min-height: 36px;
  padding: 8px 10px;
}

.place-message-form button {
  min-height: 36px;
  border: 0;
  border-radius: 8px;
  padding: 0 12px;
  background: var(--green);
  color: #00121a;
  font: inherit;
  font-weight: 900;
}

.place-message-list {
  display: grid;
  gap: 6px;
  margin-top: 10px;
}

.place-message-list p {
  margin: 0;
  padding: 8px;
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.08);
  font-size: 0.86rem;
}

.place-message-list strong {
  display: inline;
  font-size: inherit;
  color: var(--ink);
}

.driving-hud {
  left: 50%;
  bottom: 18px;
  width: min(360px, calc(100% - 32px));
  padding: 14px;
  transform: translateX(-50%);
  border-color: rgba(57, 255, 20, 0.5);
  box-shadow: var(--glow-green);
}

.map-card span {
  display: block;
  color: var(--green);
  font-weight: 850;
}

.map-card strong {
  display: block;
  margin-top: 2px;
  font-size: 1.4rem;
}

.map-card p {
  margin: 8px 0 0;
}

.drive-info-grid,
.place-grid,
.planning-grid,
.checklist-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.roadside-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.roadside-card {
  display: grid;
  gap: 6px;
  min-height: 98px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.08);
  color: var(--ink);
  font: inherit;
  text-align: left;
  box-shadow: inset 0 0 20px rgba(0, 229, 255, 0.05);
}

.roadside-card span {
  color: var(--green);
  font-size: 0.82rem;
  font-weight: 900;
}

.roadside-card strong {
  font-size: 1rem;
}

.checklist-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.check-card {
  display: flex;
  align-items: center;
  min-height: 72px;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.07);
  color: var(--ink);
  font-weight: 850;
}

.check-card input {
  width: 18px;
  height: 18px;
  accent-color: var(--green);
}

.drive-info-grid article {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.07);
}

.drive-info-grid strong {
  display: block;
  margin-top: 4px;
}

.drive-info-grid p {
  margin: 5px 0 0;
}

.directions-list {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}

.direction-step {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.07);
}

.direction-step span {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--green);
  color: #00121a;
  font-weight: 950;
}

.summary-grid article {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.07);
  box-shadow: inset 0 0 20px rgba(0, 229, 255, 0.05);
}

.summary-grid span,
.summary-grid p {
  color: var(--muted);
}

.summary-grid span {
  display: block;
  margin-bottom: 5px;
  font-size: 0.82rem;
  font-weight: 850;
}

.summary-grid strong {
  display: block;
  font-size: 1.05rem;
}

.summary-grid p {
  margin: 5px 0 0;
  font-size: 0.9rem;
}

.route-planner {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}

.optional-planning {
  padding: 16px;
  border: 1px dashed rgba(57, 255, 20, 0.45);
  border-radius: 8px;
  background: rgba(57, 255, 20, 0.06);
}

.optional-planning p {
  margin-bottom: 0;
}

.signin-required {
  margin-top: 22px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.07);
  box-shadow: inset 0 0 20px rgba(0, 229, 255, 0.06);
}

.route-result {
  margin-top: 14px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.08);
  box-shadow: inset 0 0 20px rgba(0, 229, 255, 0.06);
}

.report-list {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.route-result span {
  display: block;
  margin-bottom: 5px;
  color: var(--green);
  font-size: 0.82rem;
  font-weight: 850;
}

.route-result strong {
  display: block;
  font-size: 1.1rem;
}

.vehicle-list {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.vehicle-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px 12px;
  align-items: center;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.08);
  box-shadow: inset 0 0 20px rgba(0, 229, 255, 0.06);
}

.vehicle-card span,
.vehicle-card p,
.vehicle-card strong {
  grid-column: 1;
}

.vehicle-card span {
  color: var(--green);
  font-size: 0.82rem;
  font-weight: 850;
}

.vehicle-card strong {
  font-size: 1.1rem;
}

.vehicle-card p {
  margin: 0;
}

.vehicle-actions {
  grid-column: 2;
  grid-row: 1 / span 3;
  display: grid;
  gap: 8px;
}

.vehicle-actions button {
  min-height: 38px;
  border: 0;
  border-radius: 8px;
  padding: 0 12px;
  background: var(--green);
  color: #00121a;
  font: inherit;
  font-weight: 900;
}

.vehicle-actions button + button {
  border: 1px solid var(--line);
  background: rgba(0, 229, 255, 0.08);
  color: var(--blue);
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 12px 0;
}

.result-grid p {
  margin: 0;
  padding: 10px;
  border-radius: 8px;
  background: rgba(5, 9, 18, 0.78);
  color: var(--ink);
  font-weight: 800;
}

@media (max-width: 640px) {
  .signup-form,
  .summary-grid,
  .result-grid,
  .plan-grid,
  .drive-layout,
  .drive-info-grid,
  .place-grid,
  .roadside-grid,
  .planning-grid,
  .checklist-grid,
  .account-bar {
    grid-template-columns: 1fr;
  }

  .map-stage {
    min-height: 560px;
  }

  .map-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .map-card {
    right: 12px;
    bottom: auto;
    top: 160px;
  }

  .place-popover {
    bottom: 96px;
  }

  .driving-hud {
    bottom: 10px;
  }

  .drive-layout {
    min-height: 0;
  }
}
