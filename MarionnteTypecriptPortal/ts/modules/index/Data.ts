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