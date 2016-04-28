import ID = require("ts/modules/index/Data");
import C = require("ts/modules/Constants");
import FV = require("ts/views/index/layouts/Main.Filter");
export class FilterModule extends Marionette.Object {
    private filterCollection: ID.FilterItemCollection;
    private globalChannel: Backbone.Radio.Channel;
    constructor(opts: any = {}) {
        super();
        this.filterCollection = new ID.FilterItemCollection([]);
        this.globalChannel = Backbone.Radio.channel(C.kGlobalChannel);
        this.globalChannel.reply(C.kGlobalRequestFilters, (callback: (data: ID.FilterItemCollection) => any) => {
            return this.getFilters(callback);
        });
    }

    private getFilters(callback) {
        var fv = new FV.FilterCompositeView(null);
        APortal.getRegion('bannerRegion').show(fv);
        this.filterCollection.fetch({
            url: "testFilterItems.js?catid=test",
            success: (data: ID.FilterItemCollection) => {
                this.filterCollection = data;//new ID.FilterItemCollection(data);
                callback && callback(data);
            }
        });
    }

   

}