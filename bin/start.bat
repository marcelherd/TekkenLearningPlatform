@echo off
set DATABASE_URL="file:./database.db"
start tlp-recorder.exe
start tlp-webapp.exe