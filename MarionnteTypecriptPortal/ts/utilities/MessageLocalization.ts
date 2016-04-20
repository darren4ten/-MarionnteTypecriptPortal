/*
 * Description:
 *    Message localization, the language local code is pass from the server.
 *    This wil lread the correct local property file  to get the translated strings.
 *    If the string Id is not found, it will fetch the default value or leave it as 
 *    is if the default value is not available.
 */

import LOG = require('ts/utilities/Logger');

export class MessageLocalization {

    private static log: LOG.Logger;
    public static localeLanguageCode: string;

    public static initialize(): void {
        if (MessageLocalization.log === undefined) { MessageLocalization.log = new LOG.Logger('Utilities.MessageLocalization'); }
        
        MessageLocalization.localeLanguageCode = $("#application").attr("localelanguage");

        // default to English if nothing is passed
        if (typeof MessageLocalization.localeLanguageCode !== 'string' || MessageLocalization.localeLanguageCode.length <= 1) {
            MessageLocalization.localeLanguageCode = 'en'; 
        }

        // initial properties
        jQuery.i18n.properties({
            name: 'messagesP',
            path: 'messages/',
            mode: 'map',
            language: MessageLocalization.localeLanguageCode,
            cache: 'true',
            callback: (() => {
                MessageLocalization.log.debug('Initiated to "{0}" language', MessageLocalization.localeLanguageCode);
            })
        });

        // set dust helper
        if (typeof dust.helpers.i18n === 'undefined') {
            dust.helpers.i18n = ((chunk, ctx, bodies, params) => {
                var messageKey: string = '';
                if (typeof params.key === 'string') {
                    messageKey = params.key;
                }
                var messageArgsArray: string[] = [];
                if (typeof params.args === 'string') {
                    messageArgsArray = params.args.split(';');
                }

                var messageValueArray: string[] = [];
                for (var i = 0; i < messageArgsArray.length; i++) {
                    var contextValue = ctx._get(false, [messageArgsArray[i]], ctx, "h");
                    messageValueArray.push(contextValue !== undefined ? contextValue : messageArgsArray[i] );
                }

                switch (messageValueArray.length) {
                    case 0:
                        return chunk.write($.i18n.prop(messageKey));
                    case 1:
                        return chunk.write($.i18n.prop(messageKey, messageValueArray[0]));
                    case 2:
                        return chunk.write($.i18n.prop(messageKey, messageValueArray[0], messageValueArray[1]));
                    case 3:
                        return chunk.write($.i18n.prop(messageKey, messageValueArray[0], messageValueArray[1], messageValueArray[2]));
                    case 4:
                        return chunk.write($.i18n.prop(messageKey, messageValueArray[0], messageValueArray[1], messageValueArray[2], messageValueArray[3]));
                    case 5:
                        return chunk.write($.i18n.prop(messageKey, messageValueArray[0], messageValueArray[1], messageValueArray[2], messageValueArray[3], messageValueArray[4]));
                    default:
                        MessageLocalization.log.warning('Exceeding localization argument limit (5 arguments) for message key {0}', messageKey);
                        return chunk.write($.i18n.prop(messageKey, messageValueArray[0], messageValueArray[1], messageValueArray[2], messageValueArray[3], messageValueArray[4]));
                }
            });
        }
    }
}