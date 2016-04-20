/*
* Description:
*   QueryString Value
*/
define(["require", "exports", 'ts/utilities/Logger'], function (require, exports, L) {
    (function (SiteContext) {
        SiteContext[SiteContext["Preview"] = 0] = "Preview";
        SiteContext[SiteContext["Arrage"] = 1] = "Arrage";
        SiteContext[SiteContext["Learning"] = 2] = "Learning";
        SiteContext[SiteContext["Index"] = 3] = "Index";
    })(exports.SiteContext || (exports.SiteContext = {}));
    var SiteContext = exports.SiteContext;
    var ParametersManager = (function () {
        function ParametersManager() {
        }
        ParametersManager.initialize = function () {
            if (_.isUndefined(ParametersManager.log)) {
                ParametersManager.log = new L.Logger('utilities.ParametersManager');
            }
            var insiteContext = $("#application").attr("sitecontext");
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
        };
        ParametersManager.getSessionId = function () {
            if (_.isUndefined(ParametersManager.sessionId)) {
                ParametersManager.sessionId = ParametersManager.getUrlParam('SessionId');
            }
            return ParametersManager.sessionId;
        };
        ParametersManager.getCustomerId = function () {
            if (_.isUndefined(ParametersManager.customerId)) {
                ParametersManager.customerId = ParametersManager.getUrlParam('CustId');
            }
            return ParametersManager.customerId;
        };
        ParametersManager.getTokenId = function () {
            if (_.isUndefined(ParametersManager.tokenId)) {
                ParametersManager.tokenId = ParametersManager.getUrlParam('TokenId');
            }
            return ParametersManager.tokenId;
        };
        ParametersManager.getJobId = function () {
            if (_.isUndefined(ParametersManager.jobId)) {
                ParametersManager.jobId = ParametersManager.getUrlParam('JobId');
            }
            return ParametersManager.jobId;
        };
        ParametersManager.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return r[2];
            return null;
        };
        ParametersManager.getIsSpread = function () {
            return ParametersManager.isSpread;
        };
        ParametersManager.setIsSpread = function (isSpread) {
            ParametersManager.isSpread = isSpread;
        };
        ParametersManager.getPreviewMode = function () {
            if (_.isUndefined(ParametersManager.previewMode)) {
                ParametersManager.previewMode = ParametersManager.getUrlParam('PreviewMode');
            }
            return ParametersManager.previewMode;
        };
        ParametersManager.getSiteContext = function () {
            return this.siteContext;
        };
        ParametersManager.getShowRejectOnly = function () {
            return ParametersManager.isShowRejectedOnly;
        };
        ParametersManager.setShowRejectOnly = function (isShowRejectedOnly) {
            ParametersManager.isShowRejectedOnly = isShowRejectedOnly;
        };
        ParametersManager.getShowApproveStatus = function () {
            return ParametersManager.isShowApproveStatus;
        };
        ParametersManager.setShowApproveStatus = function (isShowApproveStatus) {
            ParametersManager.isShowApproveStatus = isShowApproveStatus;
        };
        ParametersManager.getJobName = function () {
            return ParametersManager.jobName;
        };
        ParametersManager.setJobName = function (jobName) {
            ParametersManager.jobName = jobName;
        };
        ParametersManager.getRightHandSpread = function () {
            return ParametersManager.rightHandSpread;
        };
        ParametersManager.setRightHandSpread = function (rightHandSpread) {
            ParametersManager.rightHandSpread = rightHandSpread;
        };
        //For Arrange
        ParametersManager.isShowRejectedOnly = false;
        ParametersManager.isShowApproveStatus = true;
        return ParametersManager;
    })();
    exports.ParametersManager = ParametersManager;
});
//# sourceMappingURL=ParametersManager.js.map