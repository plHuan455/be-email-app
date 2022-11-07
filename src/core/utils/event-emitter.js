export default class EventEmitter {
  constructor() {
    this._listeners = {};
    this.on = this.on.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.emit = this.emit.bind(this);
  }

  on(event, listener) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(listener);
    return this;
  }

  removeEventListener(event, listener) {
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter(
        (l) => l !== listener,
      );
    }
  }
  removeAllEventListeners(event) {
    if (this._listeners[event]) {
      delete this._listeners[event];
    }
  }

  emit(event, ...args) {
    const cbs = this._listeners[event];
    if (cbs) {
      cbs.forEach((cb) => cb(...args));
    }
  }
}
