@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ================================
echo   Development Server
echo ================================
echo.
echo Checking dependencies...

REM Node.js and npm check
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed
    pause
    exit /b 1
)

npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not available
    pause
    exit /b 1
)

echo Node.js environment: OK
echo.

REM Check package.json
if not exist "package.json" (
    echo Error: package.json not found
    echo Current directory: %cd%
    pause
    exit /b 1
)

echo Starting development server...
echo Browser will open automatically
echo Press Ctrl+C to stop server
echo.
echo ================================
echo.

REM Start server and open browser after delay
start /MIN cmd /c "timeout /t 10 >nul && start http://localhost:4321/ && timeout /t 2 >nul && start http://localhost:4322/"

echo Starting server... Browser will open automatically
npm run dev

pause