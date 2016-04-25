import ID = require("ts/modules/index/Data");
import C = require("ts/modules/Constants");
export class RecommendsModule extends Marionette.Object {
    private collection: ID.RecommendCollection;
    private globalChannel: Backbone.Radio.Channel;
    constructor(opts: any = {}) {
        super();
        this.globalChannel = Backbone.Radio.channel(C.kGlobalChannel);
        this.collection = new ID.RecommendCollection();
        this.collection.fetch({
            success: (data: ID.RecommendCollection) => {
                this.collection = data;
                this.globalChannel.request(C.kGlobalShowDefaultRecommends, data);
                console.log("kGlobalShowDefaultRecommends show data.");
            },
            error: (err) => {
                console.log("RecommendsModule fetch data error." + err);
            }
        });
    }

}