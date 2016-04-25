MyPortal

////////////////////////////////////////
Build:

Insure that you have installed the latest update for Visual Studio 2013 (version 5).

To Build the "Portal" project, these three software must be installed.
The installers can be found in the solution root folder in the OEM folder.
Using the latest version may break the build.

==> TODO: copy program folder 

 1- NodeJS runtime with NPM package manager
    Ensure that the path is saved in the user PATH variable.

 2- Git client
    Ensure that the path is saved in the user PATH variable.

 3- Typescript compiler (version 1.5) for VisualStudio 2013

The following packages will make your life easier, but are not required. 

 4- 'Web Essentials for 2013 for update 5, http://vswebessentials.com/
    This extension will be useful to make your typescript coding easier. It 
    also add features such as TSlint and support for LESS stylesheets

 5- NPM tool GULP to run build scripts from the command line
    execute the following command to install the software globally.
    the location of the install packages should be in C:\Users\<user>\AppData\Roaming\npm
    npm install gulp -g
 
 6- NPM tool BOWER to help you update the JavaScript libraries
    execute the following command to install the software globally: 
    npm install bower -g

 7- NPM tool TSD to help you update the Typescript definition files
    execute the following command to install the software globally: 
    npm install tsd -g

  8- Grunt Luncher Extension: allow you to execute grunt or gulp build script
     https://visualstudiogallery.msdn.microsoft.com/dcbc5325-79ef-4b72-960e-0a51ee33a0ff

  9- Package Intellisense Extension to help you manage npm and bower package and give you
     intellisence
	 https://visualstudiogallery.msdn.microsoft.com/65748cdb-4087-497e-a394-2e3449c8e61e

////////////////////////////////////////
Provided Scripts:

    ConfigureNodePackages.bat, executed each time as a pre build event. Insure that
    all NodeJs packages are installed correctly to execute the Gulp build script.
    Node packages are not added to the source control.
    If you get the following error 'Error: ENOENT, stat
    'C:\Users\<user>\AppData\Roaming\npm', then manually create the'npm' directory.

////////////////////////////////////////
Testing:

	Open the index-tests.html page in a browser window. it will execute the 
	Jasmine testing on all available tests. 
	The jasmine boot.js has been copied and modified to not wxecute the test on
	load as this was causing issues with require.js. the file being used is
	boot-witouh-onload.js, this file needs to be updated manually.

	sinon.js and jasmine-sinon.js has been installed for testing convenience.

	sinon-1.17.2 is a concatenated version of all sinon tools into a single file.
	It needs to be updated manually to.

	To show the Unit Tests executed on the Typescript/JavaScript code in the 
	Test Explorer window, a third party plug-in must be installed. Go to Tools > 
	Extensions and Updates and install: 'Chutzpah Test Adapter for the Test Explorer'.
	For additional details on the extension, go to: http://mmanela.github.io/chutzpah/
