var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ts/views/index/Layouts/Main"], function (require, exports, M) {
    var AppView = (function (_super) {
        __extends(AppView, _super);
        function AppView(options) {
            if (options === void 0) { options = {}; }
            options.el = "#application";
            options.template = false;
            options.regions = {
                mainRegion: "#mainRegion",
            };
            _super.call(this, options);
            this.showMain();
        }
        AppView.prototype.onShow = function () {
            console.log("Index AppView onShow.");
            this.showMain();
        };
        AppView.prototype.showMain = function () {
            this.mainRegion.empty();
            var mainLayout = new M.MainLayout({ model: null });
            this.mainRegion.show(mainLayout);
        };
        return AppView;
    })(Marionette.LayoutView);
    exports.AppView = AppView;
});
//# sourceMappingURL=AppView.js.map