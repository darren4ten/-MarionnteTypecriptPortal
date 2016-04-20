var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var FooterLayout = (function (_super) {
        __extends(FooterLayout, _super);
        function FooterLayout(options) {
            _super.call(this, _.extend({
                template: 'index.main.footer',
                tagName: 'div',
                id: 'footerId',
                className: 'leftButtonAction',
                events: {
                    'click .buttonJobApproveEnable ': 'onClickApproveJobButton',
                }
            }, options));
        }
        return FooterLayout;
    })(Marionette.LayoutView);
    exports.FooterLayout = FooterLayout;
});
//# sourceMappingURL=Main.Footer.js.map