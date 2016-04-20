import MF = require("ts/views/index/Layouts/Main.Footer");
import MH = require("ts/views/index/Layouts/Main.Header");
import MR = require("ts/views/index/Layouts/Main.Recommends");
import ID = require("ts/modules/index/Data");
export class MainLayout extends Marionette.LayoutView < Backbone.Model > {
    mainRegion: Marionette.Region;
    headerRegion: Marionette.Region;
    bannerRegion: Marionette.Region;
    recommendRegion: Marionette.Region;
    searchRegion: Marionette.Region;
    relatedSearchRegion: Marionette.Region;
    footerRegion: Marionette.Region;

    constructor(options: any = {}) {
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
        super(options);
    }

    public onBeforeShow(): void {
        // set up all layouts
        //var headerLayout = new MF.FooterLayout({ model: this.model });
        //console.log($('#mainRegion'));
        //this.getRegion("mainRegion").show(headerLayout);
    }

    public showRecommends() {
        var datas: ID.RecommendItemModel[] = [];
        for (var i = 0; i < 10; i++) {
            datas.push(new ID.RecommendItemModel({
                "id": "" + i, "link": "#testLink" + i, "imgUrl": "#imgUrl" + i,
                "title": "title " + i, "desc": "desc " + i, "dataUrl": "#dataUrl" + i, "likeCount": 23, "commentCount": 434, "shareCount": 355
            }));
        }
        var recommendView = new MR.RecommendsCompositeView(datas);
        this.recommendRegion.show(recommendView);
    }

    public onShow() {
        var headerLayout = new MH.HeaderLayout({ model: null });
        this.headerRegion.show(headerLayout);

        this.showRecommends();

        var footerLayout = new MF.FooterLayout({ model: null });
        this.footerRegion.show(footerLayout);
    }
}