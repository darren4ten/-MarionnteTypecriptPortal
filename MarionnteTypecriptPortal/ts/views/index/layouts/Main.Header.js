var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ts/modules/index/Data"], function (require, exports, ID) {
    var HeaderLayout = (function (_super) {
        __extends(HeaderLayout, _super);
        function HeaderLayout(options) {
            _super.call(this, _.extend({
                template: 'index.main.header',
                tagName: 'div',
                id: 'headerId',
                className: 'leftButtonAction',
                regions: {
                    navbarRegion: '#header-nav'
                }
            }, options));
        }
        HeaderLayout.prototype.onShow = function () {
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
            var d = data;
            var m = new ID.NavbarItemModel(d);
            this.navbarRegion.show(new NavbarItemView(m));
        };
        return HeaderLayout;
    })(Marionette.LayoutView);
    exports.HeaderLayout = HeaderLayout;
    var NavbarItemView = (function (_super) {
        __extends(NavbarItemView, _super);
        function NavbarItemView(item) {
            this.model = item;
            var extendedOpts = _.extend(item, {
                tagName: 'div',
                id: item.get('id'),
                template: "index.main.header.navbar",
                events: {
                    'click': 'onSelect'
                }
            });
            _super.call(this, extendedOpts);
        }
        return NavbarItemView;
    })(Marionette.ItemView);
    exports.NavbarItemView = NavbarItemView;
});
//# sourceMappingURL=Main.Header.js.map