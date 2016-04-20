var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ts/utilities/ParametersManager', 'ts/views/index/AppView', "backbone.radio.shim", "backbone.marionette.dust"], function (require, exports, PAM, AI) {
    var AppPortal = (function (_super) {
        __extends(AppPortal, _super);
        //private indexAppView: AI.AppView;
        function AppPortal() {
            var _this = this;
            this.appStarted = false;
            // Fix IE cache problem. If we get data via ajax get in IE and cache is enabled, the result will always be same although you really return a different
            // result from backend(Only IE has this problem). So we need to disable cache.
            $.ajaxSetup({ cache: false });
            //MLOC.MessageLocalization.initialize();
            PAM.ParametersManager.initialize();
            this.on("start", function () {
                switch (PAM.ParametersManager.getSiteContext()) {
                    case PAM.SiteContext.Index:
                        {
                            console.log("PAM.InsiteContext.Index");
                            _this.indexAppView = new AI.AppView();
                            _this.indexAppView.render();
                            console.log("this.portal.index");
                        }
                        ;
                        break;
                    default:
                        {
                            console.log("this.portal.default");
                        }
                        ;
                        break;
                }
            });
            _super.call(this);
        }
        AppPortal.prototype.setLogLevel = function (logLevel) {
        };
        AppPortal.prototype.setHostUrl = function (hostUrl) {
            if (hostUrl === void 0) { hostUrl = null; }
            //this.previewModule.setHostUrl(hostUrl);
        };
        AppPortal.prototype.setSessionId = function (sessionId) {
        };
        return AppPortal;
    })(Marionette.Application);
    exports.AppPortal = AppPortal;
});
//# sourceMappingURL=AppPortal.js.map