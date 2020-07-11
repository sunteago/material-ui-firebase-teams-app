export default class Task {
    constructor(task,priority, timestamp) {
      this.done = false;
      this.task = task;
      this.priority = priority;
      this.taskId = Math.random();
    }
  }
  