/*
 * Copyright (C) 2015 Kodak
 *
 * http://www.kodak.com
 *
 * Reproduction or disclosure of this file or its contents without the prior
 * written consent of Kodak is prohibited.
 *
 * Description:
 *    Console Logger, has 5 level: Trace 0 to Error 4.
 *    Can be change at the console prompt: AReview.SetLogLevel(x) where x is the
 *    level we want.  The default level is pass from the server.
 */
define(["require", "exports"], function (require, exports) {
    (function (LogLevel) {
        LogLevel[LogLevel["Trace"] = 0] = "Trace";
        LogLevel[LogLevel["Debug"] = 1] = "Debug";
        LogLevel[LogLevel["Info"] = 2] = "Info";
        LogLevel[LogLevel["Warning"] = 3] = "Warning";
        LogLevel[LogLevel["Error"] = 4] = "Error";
    })(exports.LogLevel || (exports.LogLevel = {}));
    var LogLevel = exports.LogLevel;
    var Logger = (function () {
        function Logger(namespace) {
            this.namespace = namespace;
        }
        Logger.initialize = function () {
            var initialLog = $("#reviewApplication").attr("initialloglevel");
            if (typeof initialLog === 'string') {
                var initialLogLevel = parseInt(initialLog);
                if (initialLogLevel >= LogLevel.Debug && initialLogLevel <= LogLevel.Error) {
                    Logger.logLevel = initialLogLevel;
                }
            }
        };
        Logger.setLogLevel = function (logLevel) {
            if (logLevel === void 0) { logLevel = null; }
            var log = new Logger('Logger');
            // Return current level if no params provided
            if (logLevel === null) {
                return Logger.logLevel;
            }
            if (typeof logLevel !== 'number' || logLevel < LogLevel.Trace || logLevel > LogLevel.Error) {
                var currentLogLevel = Logger.logLevel;
                Logger.logLevel = LogLevel.Warning;
                log.warning('Logging level can be set from {0}:{1} to {2}:{3}, current level: {4}:{5}', LogLevel.Trace.toString(), LogLevel[LogLevel.Trace], LogLevel.Error.toString(), LogLevel[LogLevel.Error], currentLogLevel.toString(), LogLevel[currentLogLevel]);
                Logger.logLevel = currentLogLevel;
                return Logger.logLevel;
            }
            // Only change if different
            if (Logger.logLevel !== logLevel) {
                Logger.logLevel = LogLevel.Info;
                log.info('Logging level set to: {0}:{1}', logLevel.toString(), LogLevel[logLevel]);
                Logger.logLevel = logLevel;
                // set Backbone Radio Debug mode
                Backbone.Radio.DEBUG = (logLevel === LogLevel.Debug || logLevel === LogLevel.Trace);
            }
            return Logger.logLevel;
        };
        Logger.prototype.info = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (Logger.logLevel > LogLevel.Info)
                return;
            var formattedMessage = Logger.formatMessage(message, args);
            this.logMessage(LogLevel.Info, formattedMessage);
        };
        Logger.prototype.error = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (Logger.logLevel > LogLevel.Error)
                return;
            var formattedMessage = Logger.formatMessage(message, args);
            this.logMessage(LogLevel.Error, formattedMessage);
        };
        Logger.prototype.warning = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (Logger.logLevel > LogLevel.Warning)
                return;
            var formattedMessage = Logger.formatMessage(message, args);
            this.logMessage(LogLevel.Warning, formattedMessage);
        };
        Logger.prototype.debug = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (Logger.logLevel > LogLevel.Debug)
                return;
            var formattedMessage = Logger.formatMessage(message, args);
            this.logMessage(LogLevel.Debug, formattedMessage);
        };
        Logger.prototype.trace = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (Logger.logLevel > LogLevel.Trace)
                return;
            var formattedMessage = Logger.formatMessage(message, args);
            this.logMessage(LogLevel.Debug, formattedMessage);
        };
        Logger.format = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var formattedMessage = Logger.formatMessage(message, args);
            return formattedMessage;
        };
        Logger.formatMessage = function (message, args) {
            if (typeof args === 'undefined') {
                args = [];
            }
            var formattedMessage = message.replace(/{(\d+)}/g, (function (match, argsNumber) {
                return (typeof args[argsNumber] != 'undefined' ? args[argsNumber] : match);
            }));
            return formattedMessage;
        };
        Logger.prototype.logMessage = function (logLevel, formattedMessage) {
            // get time
            var date = new Date();
            var formattedDate = date.toDateString() + ' ' + date.toLocaleTimeString() + ' ' + ('00' + date.getMilliseconds().toString()).slice(-3) + 'ms';
            formattedMessage = formattedDate + ', ' + this.namespace + ': ' + formattedMessage;
            if (typeof window.console !== 'undefined') {
                switch (logLevel) {
                    case LogLevel.Info:
                        window.console.info(formattedMessage);
                        break;
                    case LogLevel.Error:
                        window.console.error(formattedMessage);
                        break;
                    case LogLevel.Warning:
                        window.console.warn(formattedMessage);
                        break;
                    case LogLevel.Debug:
                        if (typeof window.console.debug !== 'undefined') {
                            // debug not supported under IE
                            window.console.debug(formattedMessage);
                        }
                        else {
                            window.console.log(formattedMessage);
                        }
                        break;
                }
            }
        };
        Logger.logLevel = LogLevel.Info;
        return Logger;
    })();
    exports.Logger = Logger;
});
//# sourceMappingURL=Logger.js.map