var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.handles = {};
    }
    EventEmitter.prototype.on = function (name, listener) {
        if (!this.handles[name]) {
            this.handles[name] = [];
        }
        this.handles[name].push({ listener: listener, once: false });
        return this;
    };
    EventEmitter.prototype.once = function (name, listener) {
        if (!this.handles[name]) {
            this.handles[name] = [];
        }
        this.handles[name].push({ listener: listener, once: true });
        return this;
    };
    EventEmitter.prototype.off = function (name, listener) {
        if (this.handles[name]) {
            this.handles[name] = this.handles[name].filter(function (item) { return item.listener !== listener; });
        }
        return this;
    };
    EventEmitter.prototype.emit = function (name) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handler = this.handles[name];
        if (handler) {
            for (var i = 0, len = handler.length; i < len; i++) {
                (_a = handler[i]).listener.apply(_a, args);
                if (handler[i].once) {
                    this.off(name, handler[i].listener);
                }
            }
        }
        return this;
    };
    EventEmitter.prototype.clear = function () {
        delete this.handles;
        return this;
    };
    return EventEmitter;
}());
