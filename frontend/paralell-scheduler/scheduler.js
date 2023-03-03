class Scheduler {
  constructor(count) {
    this.allowTask = count;
    this.runningTask = 0;
    this.taskArr = [];
  }

  add(asyncTaskFn) {
    this.taskArr.push(asyncTaskFn);
    this.#run();
  }

  #run() {
    while (this.runningTask < this.allowTask && this.taskArr.length) {
      const fn = this.taskArr.shift();
      fn().then(() => {
        this.runningTask--;
        this.#run();
      });
      this.runningTask++;
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
