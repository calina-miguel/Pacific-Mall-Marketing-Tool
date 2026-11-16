@echo off
git add .
git commit -m "Auto-deployed update"
git push origin main
echo Deployment synced to GitHub. Vercel will now update your live URL automatically.
pause