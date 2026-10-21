@echo off
echo Stopping HRMS Backend (Port 8083) and Frontend (Port 5173)...
powershell -NoProfile -Command "(Get-NetTCPConnection -LocalPort 8083,5173 -ErrorAction SilentlyContinue).OwningProcess | Sort-Object -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }"
echo All HRMS application services have been stopped.
pause
