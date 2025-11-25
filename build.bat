@echo off
cd /d "%~dp0"

echo Building project...
echo.

npm run build

echo.
echo Build completed!
echo Press any key to exit...
pause >nul
