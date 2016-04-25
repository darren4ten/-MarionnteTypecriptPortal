import ID = require("ts/modules/index/Data");
import C = require("ts/modules/Constants");
export class RecommendItemView extends Marionette.ItemView<ID.RecommendItemModel> {
    template: string;
    constructor(opts) {
        this.template = "index.main.recommends.item";
        var extendedOpts = _.extend(opts, {
            tagName: 'div',
            id: opts.model.get('id'),
            template: this.template,
            //events: {
            //    'click .fileItem': 'onSelect'
            //},
            //modelEvents: {
            //    "change:thumbnailUrl": () => {
            //        this.updateThumbnailUrl();
            //    },
            //    "change:approvalState": () => {
            //        this.updateApproveState();
            //    }
            //}
        });

        super(extendedOpts);
    }
}
export class RecommendsCompositeView extends Marionette.CompositeView<ID.RecommendItemModel, RecommendItemView> {
    private globalChannel: Backbone.Radio.Channel;
    constructor(opts?: ID.RecommendItemModel[]) {
        this.collection = new Backbone.Collection(opts);
        this.childViewContainer = "#reco-list";
        var extendedOpts = _.extend(opts, {
            template: "index.main.recommends",
            childView: RecommendItemView,
            //childViewOptions: { currentModel: opts.currentModel },
            tagName: 'div',
            className: this.className,
            /// Collection事件监听方法（1）
            collectionEvents: {
                'reset': () => {
                    console.log("collectionEvents:reset");
                    this.render();
                },
                'update': () => {
                    console.log("collectionEvents:update");
                    this.render();
                },
                //'add': () => {
                //    console.log("collectionEvents:add");
                //    this.render();
                //},
                //'remove': () => {
                //    console.log("collectionEvents:remove");
                //    this.render();
                //},
                'change': () => {
                    console.log("collectionEvents:change");
                    this.render();
                }
            },
            //events: {
            //    'click .fileItem': 'onChangePageItem'
            //}
        });

        super(extendedOpts);

        /// Collection事件监听方法（2）
        //this.collection.on("change reset add remove", () => {
        //    console.log('this.collection.bind("change reset add remove")');
        //    this.render();
        //});

        /// Collection事件监听方法（3）
        //this.listenTo(this.collection, "change reset add remove", () => {
        //    console.log('this.listenTo(this.collection)');
        //    this.render();
        //})


        this.globalChannel = Backbone.Radio.channel(C.kGlobalChannel);
        this.globalChannel.reply(C.kGlobalShowDefaultRecommends, (collection: ID.RecommendCollection) => {
            //不能this.collection = collection;这样会冲掉Collection的events
            this.collection.reset(collection.models);
            console.log("dataChannel.reply " + C.kGlobalShowDefaultRecommends);
        });
    }
}