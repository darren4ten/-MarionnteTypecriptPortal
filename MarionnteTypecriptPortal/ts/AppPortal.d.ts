/*
* Description:
*    Application configuration file.
*/

declare module AppPortal {
    class AppPortal extends Marionette.Application {

        constructor();
        setLogLevel(logLevel: number): void;
        setHostUrl(hostUrl: string): void;
        setSessionId(sessionId: string): void
    }
}

declare var APortal: AppPortal.AppPortal;