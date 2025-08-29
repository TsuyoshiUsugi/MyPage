@echo off
cd /d "%~dp0"

echo Starting development server...
echo.

REM Open browser after 8 seconds
powershell -Command "Start-Sleep 8; Start-Process 'http://localhost:4321'"

REM Start development server
npm run dev

echo.
echo Press any key to exit...
pause >nul