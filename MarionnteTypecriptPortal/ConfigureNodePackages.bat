@echo off
REM Two software must be installed on the user computer:
REM   - NodeJs runtime including NPM package manager: http://nodejs.org/download/
REM   - Git Client: http://msysgit.github.io/ ensure that that program folder 
REM     is added to the PATH variable so it can be called from everywhere.

REM install all the needed packages
echo NODE MODULES CHECK 

IF NOT "%1"=="" GOTO Continue

echo NodeJS version
call node --version
echo.
echo NPM version
call npm --version
echo.
echo Git version
call git --version
echo.

:Continue
echo Installing node packages based on package.json. This is only executed if the node_modules has not been created yet.
set PROJECT_FOLDER=%1
set PROJECT_FOLDER2=node_modules
set PROJECT_FOLDER3=%PROJECT_FOLDER%%PROJECT_FOLDER2%
IF EXIST %PROJECT_FOLDER3% GOTO NodeExists

echo.
echo Executing node packages installation
call npm install
echo.

:NodeExists
echo Done