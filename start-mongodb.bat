@echo off
echo Starting MongoDB...
echo.
echo If MongoDB is not installed, download from:
echo https://www.mongodb.com/try/download/community
echo.
echo Creating data directory...
if not exist "C:\data\db" mkdir "C:\data\db"
echo.
echo Starting MongoDB server...
echo Press Ctrl+C to stop MongoDB
echo.
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
pause