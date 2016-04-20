/*
* Description:
*    Local Storage, can store any data structure to the browser local storage
*    (only cleared when browser cache is cleared).
*    Support namespace to regroup items together and has basic list capability.
*/
define(["require", "exports", 'ts/utilities/Logger'], function (require, exports, L) {
    var LocalStorage = (function () {
        function LocalStorage(namespace) {
            this.serialize = function (value) {
                return JSON.stringify(value);
            };
            this.deserialize = function (value) {
                if (typeof value != 'string') {
                    return undefined;
                }
                try {
                    return JSON.parse(value);
                }
                catch (e) {
                    return value || undefined;
                }
            };
            if (_.isUndefined(LocalStorage.log)) {
                LocalStorage.log = new L.Logger('Utilities.LocalStorage');
            }
            if (!LocalStorage.isEnable) {
                var localStorageName = 'localStorage';
                var isLocalStorageNameSupported;
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
                    }
                    catch (e) {
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
        LocalStorage.prototype.get = function (key) {
            var nKey = this.namespaceKey(key);
            var value = LocalStorage.storage.getItem(nKey);
            var deSerializedValue = this.deserialize(value);
            LocalStorage.log.trace('Retrieving {0} value (as string): {1}', nKey, value);
            return deSerializedValue;
        };
        LocalStorage.prototype.getAllValues = function () {
            var values = [];
            for (var i = 0; i < LocalStorage.storage.length; i++) {
                var key = LocalStorage.storage.key(i);
                if (key.indexOf(this.namespace) === 0) {
                    values.push(LocalStorage.storage.getItem(key));
                }
            }
            LocalStorage.log.trace('Retrieving {0} values from {1}', values.length, this.namespace);
            return values;
        };
        LocalStorage.prototype.getAllKeyValues = function () {
            var values = [];
            for (var i = 0; i < LocalStorage.storage.length; i++) {
                var key = LocalStorage.storage.key(i);
                if (key.indexOf(this.namespace) === 0) {
                    var keyWithoutNamespace = key.substr(this.namespace.length + 1);
                    values.push({ key: keyWithoutNamespace, value: LocalStorage.storage.getItem(key) });
                }
            }
            LocalStorage.log.trace('Retrieving {0} key/values from {1}', values.length, this.namespace);
            return values;
        };
        LocalStorage.prototype.set = function (key, value) {
            var nKey = this.namespaceKey(key);
            if (_.isUndefined(value)) {
                LocalStorage.storage.removeItem(nKey);
                LocalStorage.log.trace('Removing {0} value', nKey);
            }
            else {
                LocalStorage.storage.setItem(this.namespaceKey(key), this.serialize(value));
                LocalStorage.log.trace('Setting {0} value to {1}', nKey, value.toString());
            }
        };
        LocalStorage.prototype.clear = function () {
            var keys = [];
            for (var i = 0; i < LocalStorage.storage.length; i++) {
                var key = LocalStorage.storage.key(i);
                if (key.indexOf(this.namespace) === 0) {
                    keys.push(key);
                }
            }
            _.each(keys, function (keyValue) { LocalStorage.storage.removeItem(keyValue); });
            LocalStorage.log.trace('Clearing {0} values from {1}', keys.length, this.namespace);
        };
        LocalStorage.clearAll = function () {
            LocalStorage.storage.clear();
            LocalStorage.log.trace('Clearing all values');
        };
        LocalStorage.prototype.namespaceKey = function (key) {
            return this.namespace + '.' + key;
        };
        LocalStorage.isEnable = false;
        return LocalStorage;
    })();
    exports.LocalStorage = LocalStorage;
});
//# sourceMappingURL=LocalStorage.js.map