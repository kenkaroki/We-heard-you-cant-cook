@echo off
echo deleting previous builds...
call rmdir /s /q gh-pages-production

echo forking website repository...
call git clone --single-branch --branch gh-pages-production https://github.com/kenkaroki/We-heard-you-cant-cook gh-pages-production
echo entering webistes source code directory......
call cd website

echo installing dependencies......
call npm install .

echo building......
call npm run build

echo entering build directory......
call cd build

echo moving files to final dir...

robocopy . ..\..\gh-pages-production\ /E /XD ".git"

echo pushing live...
cd ..\..\gh-pages-production

call git add .

echo Getting dynamic info...

REM Get git username
for /f "delims=" %%u in ('git config user.name') do set "username=%%u"

REM Get current UTC time
for /f "tokens=1-4 delims=/: " %%a in ('powershell -command "(Get-Date).ToUniversalTime().ToString('HH:mm:ss')"') do set "timestamp=%%a:%%b:%%c GMT"

REM Get IP info JSON from ipinfo.io
curl -s https://ipinfo.io/json > temp.json

REM Parse latitude and longitude
for /f "tokens=1 delims=," %%a in ('powershell -Command "(Get-Content temp.json | ConvertFrom-Json).loc"') do set "latitude=%%a"
for /f "tokens=2 delims=," %%a in ('powershell -Command "(Get-Content temp.json | ConvertFrom-Json).loc"') do set "longitude=%%a"

REM Parse city and country
for /f "delims=" %%a in ('powershell -Command "(Get-Content temp.json | ConvertFrom-Json).city"') do set "city=%%a"
for /f "delims=" %%a in ('powershell -Command "(Get-Content temp.json | ConvertFrom-Json).country"') do set "country=%%a"

REM Delete temp file
del temp.json

REM Compose commit message
set "message=Deployed by %username% at %timestamp%, latitude %latitude%, longitude %longitude%, location %city%, %country%"

SET /P changedetail=Add your change commit message:
REM Commit
git commit -am "%changedetail%  %message%"

REM Push
git push origin gh-pages-production

REM cleaning up
echo cleaning up...
call cd ..

echo Done.
pause


