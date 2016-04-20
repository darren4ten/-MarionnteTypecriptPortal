export class FooterLayout extends Marionette.LayoutView<Backbone.Model>{
    constructor(options) {
        super(_.extend({
            template: 'index.main.footer',
            tagName: 'div',
            id: 'footerId',
            className: 'leftButtonAction',
            events: {
                'click .buttonJobApproveEnable ': 'onClickApproveJobButton',
            }
        }, options));
    }

}
