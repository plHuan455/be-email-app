/* eslint-disable no-unused-expressions */

export const Direction = Object.freeze({
  Up: 0,
  Down: 1,
});

export default class Inertia {
  constructor({
    velocity = 0,
    value = 0,
    fps = 30,
    max,
    min,
    acceleration,
    direction = Direction.Up,
    onStart,
    onChange,
    onStop,
  }) {
    this.velocity = velocity;
    this.value = value;
    this.max = max;
    this.min = min;
    this.acceleration = acceleration;
    this.interval = 1000 / fps;
    this.direction = direction;
    this.onStart = onStart;
    this.onChange = onChange;
    this.onStop = onStop;

    // bind functions
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this._run = this._run.bind(this);
  }

  stop() {
    if (this._running) {
      this._running = false;
      this.onChange?.call(this, this.value);
      this.onStop?.call(this);
    }
  }

  start() {
    this.onStart?.call(this);
    this._running = true;
    this._run();
  }

  to(nextValue, time) {
    //
    const t = time / 1000;
    const s = Math.abs(nextValue - this.value);
    
    if (s > 0) {
      this.velocity = Math.abs((2 * s) / t);
      this.acceleration = this.velocity / t;
      this.direction = nextValue > this.value ? Direction.Up : Direction.Down;

      this.start();
    } else {
      this.onStop?.call(this);

    }
  }

  _run() {
    window.setTimeout(() => {
      if (!this._running) {
        return;
      }
      const time = this.interval / 1000;
      const v1 = this.velocity;
      let v2 = Math.floor(v1 - this.acceleration * time); // v2 = v1 - at
      v2 = v2 > 0 ? v2 : 0;
      //
      const distance =
        this.acceleration !== 0
          ? (v1 * v1 - v2 * v2) / (2 * this.acceleration)
          : 0; // v1^2 - v2^2 = 2as

      const nextValue =
        this.direction === Direction.Up
          ? this.value + distance
          : this.value - distance;

      this.velocity = v2;

      if (typeof this.max !== "undefined" && nextValue >= this.max) {
        // update and stop
        this.value = this.max;
        this.stop();
        return;
      }
      if (typeof this.min !== "undefined" && nextValue <= this.min) {
        // update and stop
        this.value = this.min;
        this.stop();
        return;
      }

      // update value
      this.value = nextValue;

      if (v2 === 0) {
        this.stop();
        return;
      }
      this.onChange?.call(this, this.value);
      window.requestAnimationFrame(this._run);
    }, this.interval);
  }
}
