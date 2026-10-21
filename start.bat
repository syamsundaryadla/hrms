@echo off
echo ========================================================
echo        Starting Maaya World HRMS (Full Stack)
echo ========================================================
echo.

echo [1/3] Ensuring PostgreSQL Database is running in WSL...
wsl -d Ubuntu -u root service postgresql start >nul 2>&1
echo Database checked on port 5432.
echo.

echo [2/3] Starting Spring Boot Backend (Port 8083)...
start "HRMS Backend" powershell -NoExit -Command "cd '%~dp0backend'; Write-Host 'Starting Spring Boot Backend on http://localhost:8083...' -ForegroundColor Cyan; .\mvnw.cmd spring-boot:run"
echo Backend window launched.
echo.

echo [3/3] Starting Vite React Frontend (Port 5173)...
start "HRMS Frontend" powershell -NoExit -Command "cd '%~dp0'; Write-Host 'Starting Vite Frontend on http://localhost:5173...' -ForegroundColor Green; npm run dev"
echo Frontend window launched.
echo.

echo Waiting 5 seconds before opening browser...
timeout /t 5 /nobreak >nul

start http://localhost:5173

echo.
echo ========================================================
echo   Application successfully launched!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8083
echo   To stop all services anytime, run: stop.bat
echo ========================================================
