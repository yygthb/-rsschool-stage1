class EventEmitter {
  private events: Record<string, (params) => void>;

  constructor() {
    this.events = {};
  }

  add(name: string, listener: (params) => void) {
    this.events[name] = listener;
  }

  emit(name: string, args) {
    if (this.events[name]) {
      this.events[name](args);
    }
  }
}

const emitter = new EventEmitter();

export default emitter;
