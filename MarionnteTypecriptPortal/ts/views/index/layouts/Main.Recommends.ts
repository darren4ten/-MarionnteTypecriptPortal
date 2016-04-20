import ID = require("ts/modules/index/Data");
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
    constructor(opts?: ID.RecommendItemModel[]) {
        this.collection = new Backbone.Collection(opts);
        this.childViewContainer = "#reco-list";
        var extendedOpts = _.extend(opts, {
            template: "index.main.recommends",
            childView: RecommendItemView,
            //childViewOptions: { currentModel: opts.currentModel },
            tagName: 'div',
            className: this.className,
            //collectionEvents: {
            //    'reset': () => {
            //        this.render();
            //    },
            //    'update': 'collectionUpdate'
            //},
            //events: {
            //    'click .fileItem': 'onChangePageItem'
            //}
        });
        super(extendedOpts);
    }
}