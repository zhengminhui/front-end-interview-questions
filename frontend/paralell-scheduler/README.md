# Implement a Scheduler class executing N tasks in parallel

Given a scheduler class, implement the constructor and add function. To make it log the output in following order.

```javascript
class Scheduler {
  constructor(count) {}

  add(asyncTaskFn) {}
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

// it should output in this order:
// 2 (after 500ms)
// 3 (after 800ms)
// 1 (after 1000ms)
// 4 (after 1200ms)
```
