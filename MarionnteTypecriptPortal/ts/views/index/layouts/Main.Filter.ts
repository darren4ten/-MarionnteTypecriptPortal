import ID = require("ts/modules/index/Data");
import C = require("ts/modules/Constants");
export class FilterCompositeView extends Marionette.CompositeView<ID.FilterItem, FilterItemView>{
    template: string;
    globalChannel: Backbone.Radio.Channel;
    constructor(models: ID.FilterItemCollection, opts: any = {}) {
        this.collection = models || new ID.FilterItemCollection(null);
        this.template = "index.main.filter";
        this.childView = FilterItemView;
        this.childViewContainer = "#filter";
        super(opts);
        this.globalChannel = Backbone.Radio.channel(C.kGlobalChannel);
        this.globalChannel.reply(C.kGlobalShowFilters, (collection: ID.FilterItemCollection) => {
            this.collection.reset(collection.models);
            this.render();
        });
    }

    public onShow() {
        $("#topRegion").attr('class', 'filterClz')
    }

    // Remove wrapped div of the container
    attachHtml(a: FilterCompositeView, b: FilterItemView) {
        a.$el.find("#filter").append(b.$el.children());
    }
}

export class FilterItemView extends Marionette.ItemView<ID.FilterItem>{
    template: string;
    constructor(model: ID.IFilterItem, opts: any = {}) {
        this.template = "index.main.filter.item";
        super(model);

    }
}