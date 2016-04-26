export interface INavbarItem {
    id: string;
    href: string;
    desc: string;
    text: string;
    subItems?: INavbarItem[];
}

export interface INavbarItems {
    items: INavbarItem[];
}

export interface IRecommendItem {
    id: string;
    link: string;
    imgUrl: string;
    title: string;
    desc: string;
    dataUrl: string;
    likeCount?: number;
    commentCount?: number;
    shareCount?: number;
}
export class RecommendItemModel extends Backbone.Model {
    constructor(attrs: IRecommendItem, opts?: any) {
        super(attrs, opts);
    }
}

export class NavbarItemModel extends Backbone.Model {
    constructor(attrs?: INavbarItems, opts?: any) {
        super(attrs, opts);
    }
}

export class RecommendCollection extends Backbone.PageableCollection<RecommendItemModel> {
    constructor(attrs?: IRecommendItem[], opts: any = {}) {
        var extendOpts = _.extend(opts, {
            model: RecommendItemModel
        });

        var models: RecommendItemModel[] = _.map(attrs, (r) => {
            return new RecommendItemModel(r);
        });
        super(models, extendOpts);

        this.url = "testRecommends.js?catid=test";
    }

}

export interface IFilterItem {
    title: string;
    clzTitle: string;
    items: {
        clzItem: string;
        channel: string;
        text: string;
    }[];

}

export class FilterItem extends Backbone.Model {
    constructor(attrs: IFilterItem, opt: any = {}) {
        super(attrs, opt);
    }
}

export class FilterItemCollection extends Backbone.Collection<FilterItem> {
    constructor(attrs: IFilterItem[], opts: any = {}) {
        var extendsOpt = _.extend(opts, {
            model: FilterItem
        });
        super(attrs, extendsOpt);
    }

    // 从liwushuo抓取样例数据
    getData() {
        //var con = $(".filter-container .filter-class");
        //var obj = [];
        //for (var i = 0; i < con.length; i++) {
        //    var cur = $(con[i]);
        //    var item = {};
        //    item.title = '';
        //    item.clzTitle = cur.attr('class');
        //    item.items = [];
        //    var itemsJQ = cur.find('li');
        //    for (var j = 0; j < itemsJQ.length; j++) {
        //        var itemLine = {};
        //        var curItem = $(itemsJQ[j]);
        //        itemLine.clzItem = curItem.attr('class');
        //        itemLine.channel = curItem.find('a').data('channel');
        //        itemLine.text = curItem.find('a').text();
        //        item.items.push(itemLine);
        //    }
        //    cur.find('li').remove();
        //    item.title = cur.text();
        //    obj.push(item);
        //}
        //console.log(obj);
        //console.log(JSON.stringify(obj));
    }
}

