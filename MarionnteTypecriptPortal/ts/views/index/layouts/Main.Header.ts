﻿import ID = require("ts/modules/index/Data");
import C = require("ts/modules/Constants");
export class HeaderLayout extends Marionette.LayoutView<Backbone.Model>{
    private navbarRegion: Marionette.Region;
    private bannerRegion: Marionette.Region;
    private navbarModel: ID.NavbarItemModel;
    private globalChannel: Backbone.Radio.Channel;
    constructor(options) {

        super(_.extend({
            template: 'index.main.header',
            tagName: 'div',
            id: 'headerId',
            className: 'leftButtonAction',
            regions: {
                navbarRegion: '#header-nav'
            },
            events: {
                'click #ntba-home': 'showHome',
                'click .people': 'showFilters',
                'click .menu-panel a': 'showFilters'
            }
        }, options));

        //this.events = () => {
        //    return {
        //        'click #ntba-home': 'showHome',
        //        'click .people': 'showFilters'
        //    };
        //};

        this.globalChannel = Backbone.Radio.channel(C.kGlobalChannel);
        this.globalChannel.reply(C.kGlobalShowNavbar, (model: ID.NavbarItemModel) => {
            this.navbarModel = model;
            this.navbarRegion.show(new NavbarItemView(model));
        });
    }

    public onShow() {

    }

    private showHome() {
        this.globalChannel.request(C.kGlobalShowBanners);
    }

    private showFilters() {
        this.globalChannel.request(C.kGlobalRequestFilters, (data) => {
            this.globalChannel.request(C.kGlobalShowFilters, data);
        });
    }

}

export class NavbarItemView extends Marionette.ItemView<Backbone.Model>{
    constructor(item: any = {}) {
        this.model = item;
        var extendedOpts = _.extend(item, {
            tagName: 'div',
            id: item.get('id'),
            template: "index.main.header.navbar",
            events: {
                'click': 'onSelect'
            }
        });

        super(extendedOpts);
    }
}
