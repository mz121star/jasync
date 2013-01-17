/** @license MIT License (c) copyright Jarrick */

/**
 * jasync
 * A lightweight deferred implementation
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 0.1.1
 */

(function () {
    var root = this,
        jasync = function () {
            this.resolveCallbacks = [];
            this.rejectCallbacks = [];
            this.alwaysCallback;
            this.stats;
        },
        initjasync = function () {
            var callbacks = Array.prototype.slice.apply(arguments);
            var _tempj = new jasync();
            for (var i = 0, l = callbacks.length; i < l; i++) {
                if (callbacks[i] !== "undefined") {
                    callbacks[i].then(function () {
                        console.log("over！" + i);
                    })
                }
            }
            return _tempj;
        }, _invokeAlways = function (value) {
            if (this.alwaysCallback !== "undefined" && typeof  this.alwaysCallback === "function") {
                this.alwaysCallback(value);
            }
        };
    jasync.when = function () {
        return  initjasync(arguments);
    };
    jasync.prototype = {
        then:function (onresolved, onreject) {
            if (typeof  onresolved === "function") this.resolveCallbacks.push(onresolved);
            if (typeof  onreject === "function") this.rejectCallbacks.push(onreject);
            return this;
        },
        always:function (callback) {
            if (typeof  callback === "function") this.alwaysCallback = callback;
            return this;
        },
        resolve:function (value) {
            for (var i = 0, l = this.resolveCallbacks.length; i < l; i++) this.resolveCallbacks[i](value);
            _invokeAlways.call(this, value);
        },
        reject:function (value) {
            for (var i = 0, l = this.rejectCallbacks.length; i < l; i++) this.rejectCallbacks[i](value);
            _invokeAlways.call(this, value);
        }
    };
    /*export jasync to window or server */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = jasync;
        }
        exports.jasync = jasync;
    } else if (typeof define === 'function' && define.amd) {
        // Register as a named module with AMD.
        define('underscore', function () {
            return jasync;
        });
    } else {
        root['jasync'] = jasync;
    }
}).call(this);