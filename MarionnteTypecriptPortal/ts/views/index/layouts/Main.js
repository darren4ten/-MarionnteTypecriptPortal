var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ts/views/index/Layouts/Main.Footer", "ts/views/index/Layouts/Main.Header", "ts/views/index/Layouts/Main.Recommends", "ts/modules/index/Data"], function (require, exports, MF, MH, MR, ID) {
    var MainLayout = (function (_super) {
        __extends(MainLayout, _super);
        function MainLayout(options) {
            if (options === void 0) { options = {}; }
            options.template = "index.main";
            // options.el = "#mainRegion";
            options.regions = {
                mainRegion: ".mainRegion",
                headerRegion: "#headerRegion",
                bannerRegion: "#bannerRegion",
                recommendRegion: "#display-container",
                searchRegion: "search-container",
                relatedSearchRegion: "#related-search",
                footerRegion: "#footerRegion"
            };
            _super.call(this, options);
        }
        MainLayout.prototype.onBeforeShow = function () {
            // set up all layouts
            //var headerLayout = new MF.FooterLayout({ model: this.model });
            //console.log($('#mainRegion'));
            //this.getRegion("mainRegion").show(headerLayout);
        };
        MainLayout.prototype.showRecommends = function () {
            var datas = [];
            for (var i = 0; i < 10; i++) {
                datas.push(new ID.RecommendItemModel({
                    "id": "" + i, "link": "#testLink" + i, "imgUrl": "#imgUrl" + i,
                    "title": "title " + i, "desc": "desc " + i, "dataUrl": "#dataUrl" + i, "likeCount": 23, "commentCount": 434, "shareCount": 355
                }));
            }
            var recommendView = new MR.RecommendsCompositeView(datas);
            this.recommendRegion.show(recommendView);
        };
        MainLayout.prototype.onShow = function () {
            var headerLayout = new MH.HeaderLayout({ model: null });
            this.headerRegion.show(headerLayout);
            this.showRecommends();
            var footerLayout = new MF.FooterLayout({ model: null });
            this.footerRegion.show(footerLayout);
        };
        return MainLayout;
    })(Marionette.LayoutView);
    exports.MainLayout = MainLayout;
});
//# sourceMappingURL=Main.js.map