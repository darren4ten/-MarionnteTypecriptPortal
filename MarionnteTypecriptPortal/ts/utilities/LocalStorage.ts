 /*
 * Description:
 *    Local Storage, can store any data structure to the browser local storage 
 *    (only cleared when browser cache is cleared).
 *    Support namespace to regroup items together and has basic list capability.
 */

import L = require('ts/utilities/Logger');

export class LocalStorage {
    private static log: L.Logger;
    private static isEnable: boolean = false;
    private static storage: Storage;
    private namespace: string;

    constructor(namespace: string) {
        if (_.isUndefined(LocalStorage.log)) { LocalStorage.log = new L.Logger('Utilities.LocalStorage'); }
        if (!LocalStorage.isEnable) {
            var localStorageName = 'localStorage';
            var isLocalStorageNameSupported: boolean;
            try {
                isLocalStorageNameSupported = (localStorageName in window && window[localStorageName]);
            }
            catch (e) {
                isLocalStorageNameSupported = false;
            }

            if (!isLocalStorageNameSupported) {
                LocalStorage.log.warning('Local storage not supported');
            }
            else {
                LocalStorage.storage = window[localStorageName];

                // Do a test
                try {
                    var testKey = '__storejs__';
                    LocalStorage.storage.setItem(testKey, testKey);
                    if (LocalStorage.storage.getItem(testKey) === testKey) {
                        LocalStorage.isEnable = true;
                    }
                    LocalStorage.storage.removeItem(testKey);
                } catch (e) {
                    LocalStorage.isEnable = false;
                    LocalStorage.storage = null;
                }
            }
            if (!LocalStorage.isEnable) {
                LocalStorage.log.warning('Local storage not enabled');
            }
        }

        this.namespace = '[' + namespace + ']';
    }

    public get(key: string): any {
        var nKey = this.namespaceKey(key);

        var value: any = LocalStorage.storage.getItem(nKey);
        var deSerializedValue = this.deserialize(value);

        LocalStorage.log.trace('Retrieving {0} value (as string): {1}', nKey, value);
        return deSerializedValue;
    }

    public getAllValues(): any[] {
        var values: any[] = [];

        for (var i = 0; i < LocalStorage.storage.length; i++) {
            var key = LocalStorage.storage.key(i);
            if (key.indexOf(this.namespace) === 0) {
                values.push(LocalStorage.storage.getItem(key));
            }
        }

        LocalStorage.log.trace('Retrieving {0} values from {1}', values.length, this.namespace);
        return values;
    }

    public getAllKeyValues(): { key: string; value: any }[] {
        var values: { key: string; value: any }[] = [];

        for (var i = 0; i < LocalStorage.storage.length; i++) {
            var key = LocalStorage.storage.key(i);
            if (key.indexOf(this.namespace) === 0) {
                var keyWithoutNamespace: string = key.substr(this.namespace.length + 1);
                values.push({ key: keyWithoutNamespace, value: LocalStorage.storage.getItem(key) });
            }
        }

        LocalStorage.log.trace('Retrieving {0} key/values from {1}', values.length, this.namespace);
        return values;
    }

    public set(key: string, value?: any): void {
        var nKey = this.namespaceKey(key);

        if (_.isUndefined(value)) {
            LocalStorage.storage.removeItem(nKey);
            LocalStorage.log.trace('Removing {0} value', nKey)
        } else {
            LocalStorage.storage.setItem(this.namespaceKey(key), this.serialize(value));
            LocalStorage.log.trace('Setting {0} value to {1}', nKey, value.toString());
        }
    }

    public clear(): void {
        var keys: string[] = [];
        for (var i = 0; i < LocalStorage.storage.length; i++) {
            var key = LocalStorage.storage.key(i);
            if (key.indexOf(this.namespace) === 0) {
                keys.push(key);
            }
        }
        _.each(keys, function (keyValue: string) { LocalStorage.storage.removeItem(keyValue); });
        LocalStorage.log.trace('Clearing {0} values from {1}', keys.length, this.namespace);
    }

    public static clearAll(): void {
        LocalStorage.storage.clear();
        LocalStorage.log.trace('Clearing all values');
    }

    private namespaceKey(key: string): string {
        return this.namespace + '.' + key;
    }

    private serialize = function (value: any): string {
        return JSON.stringify(value);
    }

    private deserialize = function (value: string): any {
        if (typeof value != 'string') {
            return undefined;
        }
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value || undefined;
        }
    }
}