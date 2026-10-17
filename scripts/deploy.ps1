param (
    [string]$DistDir = "dist",
    [string]$HostName = "ssh.og7psbi.webhostingaruba.it",
    [int]$Port = 2222,
    [string]$Username = "ro6xrb6-andromeda",
    [string]$RemoteDir = ".",
    [string]$IdentityFile = "$env:USERPROFILE\.ssh\id_ed25519"
)

Write-Host "Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed"
    exit $LASTEXITCODE
}

Write-Host "Deploying to Aruba via SCP..." -ForegroundColor Cyan
# Usa rsync-like copia o SCP standard. Con SCP nativo di Windows/OpenSSH.
# SCP non supporta bene l'aggiornamento solo file cambiati, ma va bene per caricamento base.
$scpCommand = "scp -o StrictHostKeyChecking=accept-new -P $Port -i `"$IdentityFile`" -r $DistDir\* ${Username}@${HostName}:$RemoteDir"

Write-Host "Running: $scpCommand"
Invoke-Expression $scpCommand

if ($LASTEXITCODE -ne 0) {
    Write-Error "Deploy failed"
    exit $LASTEXITCODE
}

Write-Host "Deploy completed successfully!" -ForegroundColor Green
