class EventEmitter {
  private events: Record<string, (params) => void>;

  constructor() {
    this.events = {};
  }

  add<T>(name: string, listener: (params: T) => void) {
    this.events[name] = listener;
  }

  emit<U>(name: string, args?: U) {
    if (this.events[name]) {
      this.events[name](args);
    }
  }
}

const emitter = new EventEmitter();

export default emitter;
