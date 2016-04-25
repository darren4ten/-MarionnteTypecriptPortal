/**
 * 使用backbone.radio.shim将Backbone.radio加载到Backbone,
 * 下面两行代码必须加上
 *  
 */
/// <amd-dependency path="backbone.radio.shim" />
/// <amd-dependency path="backbone.marionette.dust" />
import PAM = require('ts/utilities/ParametersManager');
import MLOC = require('ts/utilities/MessageLocalization');
import AI = require('ts/views/index/AppView');
import IM = require("ts/modules/index/IndexModules");
export class AppPortal extends Marionette.Application {
    private appStarted: boolean;
    private indexAppView: AI.AppView;
    //private indexAppView: AI.AppView;
    constructor() {

        this.appStarted = false;

        // Fix IE cache problem. If we get data via ajax get in IE and cache is enabled, the result will always be same although you really return a different
        // result from backend(Only IE has this problem). So we need to disable cache.
        $.ajaxSetup({ cache: false });

        //MLOC.MessageLocalization.initialize();
        PAM.ParametersManager.initialize();
        this.on("start", () => {
            switch (PAM.ParametersManager.getSiteContext()) {
                case PAM.SiteContext.Index: {
                    console.log("PAM.InsiteContext.Index");
                    this.indexAppView = new AI.AppView();
                    this.indexAppView.render();
                    var indexModules: IM.IndexModules = new IM.IndexModules();
                    indexModules.start();
                    console.log("this.portal.index");
                }; break;
                default: {
                    console.log("this.portal.default");
                }; break;
            }
        });

        super();
    }

    public setLogLevel(logLevel: number): void {
    }

    public setHostUrl(hostUrl: string = null): void {
        //this.previewModule.setHostUrl(hostUrl);
    }

    public setSessionId(sessionId: string): void {
    }
}

declare var Aportal: AppPortal.AppPortal;