'use strict';

Backbone.Marionette.Renderer.render = function (template, data) {
    var html;
    // Template must be compiled and in the dust cache. Recommend pre-compiling
    // and loading the templates as scripts at app start.
    dust.render(template, data, function (err, out) {

        if (typeof (err) !== 'undefined' && err !== null) {
            window.console.error(err.message);
        } else {
            html = out;
            html = html.trim();
        }
    });
    return html;
};
