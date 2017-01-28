@ECHO off
:LOOPSTART:
PAUSE
CLS
ECHO Press any key to run Browserify in new window
START "Running Browserify..." browserifyRun.bat
GOTO :LOOPSTART: