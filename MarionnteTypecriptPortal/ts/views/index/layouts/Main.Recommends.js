var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var RecommendItemView = (function (_super) {
        __extends(RecommendItemView, _super);
        function RecommendItemView(opts) {
            this.template = "index.main.recommends.item";
            var extendedOpts = _.extend(opts, {
                tagName: 'div',
                id: opts.model.get('id'),
                template: this.template,
            });
            _super.call(this, extendedOpts);
        }
        return RecommendItemView;
    })(Marionette.ItemView);
    exports.RecommendItemView = RecommendItemView;
    var RecommendsCompositeView = (function (_super) {
        __extends(RecommendsCompositeView, _super);
        function RecommendsCompositeView(opts) {
            this.collection = new Backbone.Collection(opts);
            this.childViewContainer = "#reco-list";
            var extendedOpts = _.extend(opts, {
                template: "index.main.recommends",
                childView: RecommendItemView,
                //childViewOptions: { currentModel: opts.currentModel },
                tagName: 'div',
                className: this.className,
            });
            _super.call(this, extendedOpts);
        }
        return RecommendsCompositeView;
    })(Marionette.CompositeView);
    exports.RecommendsCompositeView = RecommendsCompositeView;
});
//# sourceMappingURL=Main.Recommends.js.map