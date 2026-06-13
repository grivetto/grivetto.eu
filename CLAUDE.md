# GRIVETTO-EU | lang:it/en | for-AI-parsing | optimize=results-over-format

<user>
identity: "Sergio Grivetto | Senior IT Specialist"
domain: "grivetto.eu"
hosting: "Aruba Hosting (FTP Plain, Passive Mode)"
</user>

<gates label="GATES | Priority: gates > rules > rhythm | Stop on failure">

GATE-1 BUILD:
  trigger: any-code-change
  action: run-command("powershell -ExecutionPolicy Bypass -Command \"npm.cmd run build\"")
  policy: "Ensure local Vite build succeeds before staging, committing or deploying"

GATE-2 DEPLOY:
  trigger: deploy-request
  action: run-command("python scripts/deploy_ftp.py")
  pre-requisite: "GATE-1 BUILD must pass successfully"

</gates>

<rules>

COMMANDS:
  dev-server: "powershell -ExecutionPolicy Bypass -Command \"npm.cmd run dev\""
  linter: "powershell -ExecutionPolicy Bypass -Command \"npm.cmd run lint\""
  preview: "powershell -ExecutionPolicy Bypass -Command \"npm.cmd run preview\""

WEBSITE-ARCHITECTURE:
  framework: "React 19 + Vite (Rolldown-Vite)"
  routing: "Custom client-side routing logic in App.jsx via window.history (popstate listeners)"
  languages: "LanguageProvider context supporting ['en', 'it', 'es', 'th'] via translations.js"
  seo: "Dynamic JSON-LD Person schema & meta tag injection in App.jsx based on language and page view"
  styling: "Vanilla CSS (custom grids, glassmorphism, glowing cyberpunk/modern effects)"

CORE-PAGES-AND-MODULES:
  home: "src/pages/Home.jsx (instant static load, main landing page)"
  portfolio: "src/pages/Portfolio.jsx (showcase of IT projects and skills)"
  resume: "src/Resume.jsx (interactive CV with timeline and certificates)"
  vintage-portal: "src/pages/VintagePortal.jsx (retro/terminal themed alternative homepage)"
  links: "LinksView in App.jsx (directory of early Internet pioneers & Netscape resources)"

INTERACTIVE-WIDGETS:
  denaro-machine: "src/components/DenaroMachine.jsx (fetches live trading stats from /denaro-live.json)"
  web-terminal: "src/components/WebTerminal.jsx (interactive retro CLI environment)"
  asciinema-demo: "src/AsciinemaDemo.jsx (terminal recording playback simulation)"
  games: "RubiksCube.jsx, TetrisGame.jsx, NeonTicTacToe.jsx, QuizApp.jsx (retro web games)"

</rules>

<rhythm>
versioning: "Use 3-part semver in package.json. Bump version on code updates."
deployment-flow: "1. Build locally -> 2. Deploy via FTP script -> 3. Push commit & tag to branch 'work-in-progress'"
</rhythm>

<conn>
ftp-host: "ftp.grivetto.eu"
ftp-directory: "/www.grivetto.eu"
</conn>

<ref label="on-demand Read only">
[App.jsx](file:///c:/dev/grivetto.eu/src/App.jsx) → "Main router, language state, meta/schema tags, and fallback loaders"
[translations.js](file:///c:/dev/grivetto.eu/src/translations.js) → "Static translation dictionaries for EN, IT, ES, TH languages"
[deploy_ftp.py](file:///c:/dev/grivetto.eu/scripts/deploy_ftp.py) → "Automated deployment script compiling assets and uploading to Aruba FTP"
</ref>
