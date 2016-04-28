/*
* Description:
*   QueryString Value
*/

import L = require('ts/utilities/Logger');

export enum SiteContext {
    Preview,
    Arrage,
    Learning,
    Index
}

export class ParametersManager {
    private static log: L.Logger;
    private static sessionId: string;
    private static previewMode: string;
    private static siteContext: SiteContext;

    //For Arrange
    private static isShowRejectedOnly: boolean = false;
    private static isShowApproveStatus: boolean = true;


    //job info
    private static jobName: string;
    private static rightHandSpread: boolean;

    public static initialize(): void {
        if (_.isUndefined(ParametersManager.log)) {
            ParametersManager.log = new L.Logger('utilities.ParametersManager');
        }

        var insiteContext: string = $("#application").attr("sitecontext");
        switch ($("#application").attr("sitecontext")) {
            case "index":
                ParametersManager.siteContext = SiteContext.Index;
                break;
            case "preview":
                ParametersManager.siteContext = SiteContext.Preview;
                break;
            case "arrange":
                ParametersManager.siteContext = SiteContext.Arrage;
                break;
            case "learning":
                ParametersManager.siteContext = SiteContext.Learning;
                break;
        }
    }

    public static getSessionId(): string {
        if (_.isUndefined(ParametersManager.sessionId)) {
            ParametersManager.sessionId = ParametersManager.getUrlParam('SessionId');
        }
        return ParametersManager.sessionId;
    }

    private static getUrlParam(name: string): any {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return r[2];
        return null;
    }

    public static getChannelName(): string {
        var reg = new RegExp("/#(.*)\?/");
        var r = window.location.hash.match(reg);
        if (r != null)
            return r[1];
        return null;
    }

    public static getUrlHashParam(name: string): string {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.hash.substr(1).match(reg);
        if (r != null)
            return r[2];
        return null;
    }

    public static getPreviewMode(): string {
        if (_.isUndefined(ParametersManager.previewMode)) {
            ParametersManager.previewMode = ParametersManager.getUrlParam('PreviewMode');
        }
        return ParametersManager.previewMode;
    }

    public static getSiteContext(): SiteContext {
        return this.siteContext;
    }

    public static getShowRejectOnly(): boolean {
        return ParametersManager.isShowRejectedOnly;
    }

    public static setShowRejectOnly(isShowRejectedOnly: boolean): void {
        ParametersManager.isShowRejectedOnly = isShowRejectedOnly;
    }

    public static getShowApproveStatus(): boolean {
        return ParametersManager.isShowApproveStatus;
    }

    public static setShowApproveStatus(isShowApproveStatus: boolean): void {
        ParametersManager.isShowApproveStatus = isShowApproveStatus;
    }

    public static getJobName(): string {
        return ParametersManager.jobName;
    }

    public static getMockupData() {
      
        //抓取数据
        //var items = $(".post-item");
        //var data = [];
        //for (var i = 0; i < items.length; i++) {
        //    var obj = { id: 0, imgUrl: '', title: '', desc: '', url: '', dataUrl: '', shareCount: 0, likeCount: 0, commentCount: 0 };
        //    var cur = $(items[i]);
        //    obj.id = cur.find('.icon-like')[0].getAttribute('data-id');
        //    obj.dataUrl = 'post/' + obj.id;
        //    var img = cur.find('.pitem-cover')[0].getAttribute('style');
        //    obj.desc = cur.find('.pitem-content').get(0).innerText;
        //    obj.url = img.match(/\(.*\)/)[0];
        //    obj.url = obj.url.substr(1, obj.url.length - 2);
        //    obj.imgUrl = "images/items/" + obj.url.match(/[0-9]+\/(.*)/)[1];
        //    obj.title = cur.find('.pitem-title').text();
        //    obj.shareCount = cur.find(".info-item").get(0).innerText;
        //    obj.commentCount = cur.find(".info-item").get(1).innerText;
        //    obj.likeCount = cur.find(".info-item").get(2).innerText;
        //    data.push(obj);
        //}
        //console.log(data);
        //console.log(JSON.stringify(data));

    }

}