﻿/*
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
    private static jobId: string;
    private static customerId: string;
    private static tokenId: string;
    private static speId: string;
    private static isSpread: boolean;
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

    public static getCustomerId(): string {
        if (_.isUndefined(ParametersManager.customerId)) {
            ParametersManager.customerId = ParametersManager.getUrlParam('CustId');
        }
        return ParametersManager.customerId;
    }

    public static getTokenId(): string {
        if (_.isUndefined(ParametersManager.tokenId)) {
            ParametersManager.tokenId = ParametersManager.getUrlParam('TokenId');
        }
        return ParametersManager.tokenId;
    }

    public static getJobId(): string {
        if (_.isUndefined(ParametersManager.jobId)) {
            ParametersManager.jobId = ParametersManager.getUrlParam('JobId');
        }
        return ParametersManager.jobId;
    }

    private static getUrlParam(name: string): any {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return r[2];
        return null;
    }

    public static getIsSpread(): boolean {
        return ParametersManager.isSpread;
    }

    public static setIsSpread(isSpread: boolean): void {
        ParametersManager.isSpread = isSpread;
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

    public static setJobName(jobName: string): void {
        ParametersManager.jobName = jobName;
    }

    public static getRightHandSpread(): boolean {
        return ParametersManager.rightHandSpread;
    }

    public static setRightHandSpread(rightHandSpread: boolean): void {
        ParametersManager.rightHandSpread = rightHandSpread;
    }

}