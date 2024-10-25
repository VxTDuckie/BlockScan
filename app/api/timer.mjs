// timer.mjs
export class Timer {
  constructor() {
    this.startTime = 0;
    this.endTime = 0;
    this.duration = 0;
    this.isRunning = false;
  }

  start() {
    this.startTime = Date.now();
    this.isRunning = true;
  }

  stop() {
    if (this.isRunning) {
      this.endTime = Date.now();
      this.isRunning = false;
      this.duration = Math.floor((this.endTime - this.startTime) / 1000); // Convert to seconds
      return this.duration; // Return the duration when stopping
    }
    return this.duration;
  }

  getTime() {
    if (this.isRunning) {
      const currentTime = Date.now();
      return Math.floor((currentTime - this.startTime) / 1000);
    }
    return this.duration;
  }
}