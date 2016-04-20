({
    // node libraries\require\r-2.1.9.js -o build.js
    //optimize: 'none',
    baseUrl: './',
    name: './bower_components/almond/almond',
    include: [
        './ts/AppConfig',
        'backbone.marionette.dust',
        'backbone.radio.shim'
    ],
    wrap: true,
    out: './ts/appP.js', // save with a 'P' postfix so it does not overwrite the main portal file
    fileExclusionRegExp: /^(r|build|app)\.js$/,
    mainConfigFile: './ts/AppConfig.js',
    optimize: 'uglify',
    preserveLicenseComments: false
})
