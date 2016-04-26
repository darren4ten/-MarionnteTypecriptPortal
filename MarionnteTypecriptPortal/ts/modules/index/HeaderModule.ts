import ID = require("ts/modules/index/Data");
import C = require("ts/modules/Constants");
export class HeaderModule extends Marionette.Object {
    private navbarModel: ID.NavbarItemModel;
    private globalChannel: Backbone.Radio.Channel;
    constructor(opts: any = {}) {
        super();
        this.globalChannel = Backbone.Radio.channel(C.kGlobalChannel);
        this.navbarModel = new ID.NavbarItemModel();
        this.navbarModel.fetch({
            url: "testNavitems.js?catid=test",
            success: (data: ID.NavbarItemModel) => {
                this.navbarModel = data;
                this.globalChannel.request(C.kGlobalShowNavbar, this.navbarModel);
            }
        });
        this.globalChannel.reply(C.kGlobalRequestBanners, () => {
            return this.requestBanners();
        });
    }

    private requestBanners() {
        //TODO: Fetch data;
        return null;
    }

}