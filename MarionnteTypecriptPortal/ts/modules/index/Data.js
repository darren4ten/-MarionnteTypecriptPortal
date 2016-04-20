var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var RecommendItemModel = (function (_super) {
        __extends(RecommendItemModel, _super);
        function RecommendItemModel(attrs, opts) {
            _super.call(this, attrs, opts);
        }
        return RecommendItemModel;
    })(Backbone.Model);
    exports.RecommendItemModel = RecommendItemModel;
    var NavbarItemModel = (function (_super) {
        __extends(NavbarItemModel, _super);
        function NavbarItemModel(attrs, opts) {
            _super.call(this, attrs, opts);
        }
        return NavbarItemModel;
    })(Backbone.Model);
    exports.NavbarItemModel = NavbarItemModel;
});
//# sourceMappingURL=Data.js.map