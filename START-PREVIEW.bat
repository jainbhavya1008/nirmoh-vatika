@echo off
cd /d "%~dp0"
echo.
echo  Nirmoh Vatika preview is starting...
echo  Open this address in your browser:  http://localhost:8000/
echo  To stop the preview, press Ctrl+C in this window (or just close it).
echo.
start "" http://localhost:8000/
py -3.11 -m http.server 8000 || py -m http.server 8000 || python -m http.server 8000
pause
