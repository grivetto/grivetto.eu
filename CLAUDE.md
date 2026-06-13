# GRIVETTO-EU | lang:it/en | for-AI-parsing | optimize=results-over-format

<user>
identity: "Sergio Grivetto | Senior IT Specialist"
domain: "grivetto.eu"
hosting: "Aruba (FTP Plain, Passive Mode)"
servers:
  mc2: "ssh mc2 (hosts cron job for live data export)"
</user>

<gates label="硬性閘門 | 優先序: gates>rules>rhythm | 缺一項=STOP">

GATE-1 BUILD-SYSTEM:
  trigger: any-code-change
  action: run-command("powershell -ExecutionPolicy Bypass -Command \"npm.cmd run build\"")
  policy: "Ensure local build passes before deploying or committing"

GATE-2 DEPLOY-FTP:
  trigger: deploy-request
  action: run-command("python scripts/deploy_ftp.py")
  pre-requisite: "GATE-1 BUILD-SYSTEM must pass successfully"

GATE-3 SSH-MC2:
  trigger: edit-live-data-script
  action: "Edit scripts/export_live_denaro.py locally AND sync to mc2:~/scripts/export_live_denaro.py"
  policy: "Never edit directly on mc2 without keeping the local copy updated"

</gates>

<rules>

BUILD-DEV:
  run-dev: "powershell -ExecutionPolicy Bypass -Command \"npm.cmd run dev\""
  run-lint: "powershell -ExecutionPolicy Bypass -Command \"npm.cmd run lint\""

TECH-STACK:
  core: "React + Vite (Rolldown-Vite)"
  styling: "Vanilla CSS (custom themes, glassmorphism)"
  seo: "JSON-LD schema injection in App.jsx (Last modified/updated info)"

LIVE-DATA:
  file: "/denaro-live.json"
  source: "Generated on mc2 by scripts/export_live_denaro.py via Binance API & local bot status JSONs"
  fallback: "profit: 118.91, trades: 374, winRate: 22.2, capital: 1254.20"

</rules>

<rhythm>
versioning: "Use 3-part semver. Bump version in package.json before deployment."
git-flow: "Branch: work-in-progress. Push tags for releases (e.g. v1.3.1)."
</rhythm>

<conn>
ftp-host: "ftp.grivetto.eu"
ftp-directory: "/www.grivetto.eu"
</conn>

<ref label="on-demand Read only">
[export_live_denaro.py](file:///c:/dev/grivetto.eu/scripts/export_live_denaro.py) → "Aggregates trading bot data and uploads denaro-live.json via FTP"
[deploy_ftp.py](file:///c:/dev/grivetto.eu/scripts/deploy_ftp.py) → "Builds and uploads static distribution files to Aruba hosting"
[DenaroMachine.jsx](file:///c:/dev/grivetto.eu/src/components/DenaroMachine.jsx) → "React component rendering the live bot trading machine UI"
</ref>
