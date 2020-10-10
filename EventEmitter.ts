type EventType = string | symbol;
type Handler<T = any> = (event?: T) => void;
interface Emitter {
    clear(): void;
    emit<T = any>(type: EventType, event?: T): void;
    on<T = any>(type: EventType, handler: Handler<T>): void;
    off<T = any>(type: EventType, handler: Handler<T>): void;
    once<T = any>(type: EventType, handler: Handler<T>): void;
}

class EventEmitter implements Emitter {
    handles: any = {};
    on<T = any>(name: EventType, listener: Handler<T>): EventEmitter {
        if (!this.handles[name]) {
            this.handles[name] = [];
        }
        this.handles[name].push({ listener, once: false });
        return this;
    }
    once<T = any>(name: EventType, listener: Handler<T>): EventEmitter {
        if (!this.handles[name]) {
            this.handles[name] = [];
        }
        this.handles[name].push({ listener, once: true });
        return this;
    }

    off<T = any>(name: EventType, listener: Handler<T>): EventEmitter {
        if (this.handles[name]) {
            this.handles[name] = this.handles[name].filter((item: any) => item.listener !== listener);
        }
        return this;
    }

    emit(name: EventType, ...args: any): EventEmitter {
        const handler = this.handles[name];
        if (handler) {
            for (let i = 0, len = handler.length; i < len; i++) {
                handler[i].listener(...args);
                if (handler[i].once) {
                    this.off(name, handler[i].listener);
                }
            }
        }
        return this;
    }

    clear(): EventEmitter {
        delete this.handles;
        return this;
    }
}
