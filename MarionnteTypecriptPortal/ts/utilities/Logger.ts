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

export enum LogLevel {
    Trace = 0,
    Debug = 1,
    Info = 2,
    Warning = 3,
    Error = 4
}

export class Logger {
    private static logLevel: LogLevel = LogLevel.Info;
    private namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    public static initialize(): void {
        var initialLog: string = $("#reviewApplication").attr("initialloglevel");
        if (typeof initialLog === 'string') {
            var initialLogLevel: LogLevel = parseInt(initialLog);
            if (initialLogLevel >= LogLevel.Debug && initialLogLevel <= LogLevel.Error) {
                Logger.logLevel = initialLogLevel;
            }
        }
    }

    public static setLogLevel(logLevel: LogLevel = null): number {
        var log: Logger = new Logger('Logger');

        // Return current level if no params provided
        if (logLevel === null)
        {
            return Logger.logLevel;
        }

        if (typeof logLevel !== 'number' || logLevel < LogLevel.Trace || logLevel > LogLevel.Error) {
            var currentLogLevel = Logger.logLevel;
            Logger.logLevel = LogLevel.Warning;
            log.warning('Logging level can be set from {0}:{1} to {2}:{3}, current level: {4}:{5}',
                LogLevel.Trace.toString(), LogLevel[LogLevel.Trace],
                LogLevel.Error.toString(), LogLevel[LogLevel.Error],
                currentLogLevel.toString(), LogLevel[currentLogLevel]);
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
    }

    public info(message: string, ...args: any[]): void {
        if (Logger.logLevel > LogLevel.Info)
            return;

        var formattedMessage: string = Logger.formatMessage(message, args);
        this.logMessage(LogLevel.Info, formattedMessage);
    }

    public error(message: string, ...args: any[]): void {
        if (Logger.logLevel > LogLevel.Error)
            return;
        var formattedMessage: string = Logger.formatMessage(message, args);
        this.logMessage(LogLevel.Error, formattedMessage);
    }

    public warning(message: string, ...args: any[]): void {
        if (Logger.logLevel > LogLevel.Warning)
            return;

        var formattedMessage: string = Logger.formatMessage(message, args);
        this.logMessage(LogLevel.Warning, formattedMessage);
    }

    public debug(message: string, ...args: any[]): void {
        if (Logger.logLevel > LogLevel.Debug)
            return;

        var formattedMessage: string = Logger.formatMessage(message, args);
        this.logMessage(LogLevel.Debug, formattedMessage);
    }

    public trace(message: string, ...args: any[]): void {
        if (Logger.logLevel > LogLevel.Trace)
            return;

        var formattedMessage: string = Logger.formatMessage(message, args);
        this.logMessage(LogLevel.Debug, formattedMessage);
    }

    public static format(message: string, ...args: any[]): string {
        var formattedMessage: string = Logger.formatMessage(message, args);
        return formattedMessage;
    }

    private static formatMessage(message: string, args: any[]): string {
        if (typeof args === 'undefined') {
            args = [];
        }

        var formattedMessage: string =
            message.replace(/{(\d+)}/g, ((match?: string, argsNumber?: number) => {
                return (typeof args[argsNumber] != 'undefined' ? args[argsNumber] : match);
            }));

        return formattedMessage;
    }

    private logMessage(logLevel: LogLevel, formattedMessage: string): void {
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
                    } else {
                        window.console.log(formattedMessage);
                    }
                    break;
            }
        }
    }
}
