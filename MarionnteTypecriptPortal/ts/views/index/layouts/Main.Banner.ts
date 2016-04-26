import ID = require("ts/modules/index/Data");
import C = require("ts/modules/Constants");
export class BannerLayout extends Marionette.LayoutView<Backbone.Model>{
    private navbarRegion: Marionette.Region;
    private bannerRegion: Marionette.Region;
    private navbarModel: ID.NavbarItemModel;
    private globalChannel: Backbone.Radio.Channel;
    constructor(options) {
        super(_.extend({
            template: 'index.main.banner',
            tagName: 'div',
            id: 'headerId',
            className: '',
            regions: {
                bannerRegion: '#topRegion'
            }
        }, options));
        this.globalChannel = Backbone.Radio.channel(C.kGlobalChannel);
        this.globalChannel.reply(C.kGlobalShowBanners, () => {
            APortal.getRegion('bannerRegion').show(new BannerLayout(null));
        });
    }

    public onShow() {
        $("#topRegion").prop('class', "banner-wrapper");
    }

}


