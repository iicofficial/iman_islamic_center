@echo off
echo ========================================
echo    Quick Vercel Deployment Check
echo ========================================
echo.
echo Checking git status...
git status
echo.
echo ----------------------------------------
echo Latest commits:
git log -3 --oneline
echo.
echo ----------------------------------------
echo.
echo To push your changes:
echo   1. git add .
echo   2. git commit -m "Your message"
echo   3. git push origin main
echo.
echo Then check Vercel at: https://vercel.com
echo Live site: https://iman-islamic-center.vercel.app
echo.
pause
