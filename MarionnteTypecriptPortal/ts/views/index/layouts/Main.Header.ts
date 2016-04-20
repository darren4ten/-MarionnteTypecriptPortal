import ID = require("ts/modules/index/Data");
export class HeaderLayout extends Marionette.LayoutView<Backbone.Model>{
    navbarRegion: Marionette.Region;
    constructor(options) {
        super(_.extend({
            template: 'index.main.header',
            tagName: 'div',
            id: 'headerId',
            className: 'leftButtonAction',
            regions: {
                navbarRegion: '#header-nav'
            }
            //events: {
            //    'click .buttonJobApproveEnable ': 'onClickApproveJobButton',
            //}
        }, options));
    }

    public onShow() {
        var data = {
            "items": [
                {
                    "id": "1", "href": "#id1", "desc": "navbar item 1", "text": "navitem1",
                    "subItems": [{ "id": 11, "href": "#id11", "desc": "navbar item  11", "text": "navitem11" },
                        { "id": 12, "href": "#id12", "desc": "navbar item 12", "text": "navitem12" }]
                },
                {
                    "id": "2", "href": "#id2", "desc": "navbar item 2", "text": "navitem2",
                    "subItems": [{ "id": 21, "href": "#id21", "desc": "navbar item  21", "text": "navitem21" },
                        { "id": 22, "href": "#id22", "desc": "navbar item 22", "text": "navitem22" }]
                },
                { "id": "2", "href": "#id2", "desc": "navbar item 2", "text": "navitem2" },
                { "id": "3", "href": "#id3", "desc": "navbar item 3", "text": "navitem3" }
            ]

        };
        var d: ID.INavbarItems = data;
        var m = new ID.NavbarItemModel(d);
        this.navbarRegion.show(new NavbarItemView(m));
    }

}

export class NavbarItemView extends Marionette.ItemView<Backbone.Model>{
    constructor(item) {
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
