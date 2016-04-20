/*
* Description:
*    Portal application configuration file.
*/
/// <reference path="AppPortal.d.ts" />
require.config({
    baseUrl: './',
    paths: {
        'backbone.radio.shim': 'javascript_components/backbone.radio/backbone.radio.shim',
        'backbone.marionette.dust': 'javascript_components/marionette.dust/backbone.marionette.dust'
    },
    shim: {
        'backbone.radio.shim': {
            exports: 'Marionette'
        },
        'backbone.marionette.dust': {
            exports: 'Marionette'
        }
    },
    waitSeconds: 20
});
var APortal = null;
require(['ts/AppPortal'], function (AP) {
    // Start Review App
    APortal = new AP.AppPortal();
    APortal.start();
});
//# sourceMappingURL=AppConfig.js.map