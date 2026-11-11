@echo off
title Murali Granites & Marbles - Local Studio Server
echo =========================================================
echo    Murali Granites & Marbles - Local Studio Launcher
echo =========================================================
echo.
echo Initializing local environment and starting server...

:: 1. Check Python
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python detected. Starting high-speed multi-threaded server...
    start "" "http://localhost:8092/"
    python scripts/serve.py
    goto finish
)

:: 2. Check py launcher
where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python launcher detected. Starting server...
    start "" "http://localhost:8092/"
    py scripts/serve.py
    goto finish
)

:: 3. Check Node / npx
where npx >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js detected. Starting via npx serve...
    start "" "http://localhost:8092/"
    npx serve -l 8092 -s .
    goto finish
)

:: 4. Fallback to native Windows PowerShell (Zero installation needed)
echo [Notice] Python was not found in PATH.
echo [OK] Starting built-in Windows PowerShell local server...
start "" "http://localhost:8092/"
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\serve_windows.ps1"

:finish
echo Server closed.
pause

