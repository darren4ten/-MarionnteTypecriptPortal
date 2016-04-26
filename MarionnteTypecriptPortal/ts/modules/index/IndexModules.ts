import ID = require("ts/modules/index/Data");
import C = require("ts/modules/Constants");
import HM = require("ts/modules/index/HeaderModule");
import FM = require("ts/modules/index/FilterModule");
import RM = require("ts/modules/index/RecommendsModule");
export class IndexModules extends Marionette.Object {
    private collection: ID.RecommendCollection;
    private globalChannel: Backbone.Radio.Channel;
    constructor(opts: any = {}) {
        super();
        this.globalChannel = Backbone.Radio.channel(C.kGlobalChannel);
        var headerModule = new HM.HeaderModule();
        var filterModule = new FM.FilterModule();
        var recommendsModule = new RM.RecommendsModule();
    }
    public start(afterStartCallback?: () => void): void {
    }

    public setHostUrl(hostUrl: string = null): void {
        //var currentHostUrl = N.Network.hostUrl(hostUrl);
        //this.log.info("Current Host Url: {0}", currentHostUrl);
    }
}