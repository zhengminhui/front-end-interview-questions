function batchLimit(arr, concurrent) {
  const resolvedArr = [];

  return new Promise((resolveBatch, reject) => {
    // doneTaskNum 记录的是已经遍历的任务的位置
    let doneTaskNum = 0;

    // 生成一个新的线程
    function thread(threadId) {
      return new Promise((resolveThread, reject) => {
        // 在当前线程中,通过递归向 microTaskQueue 中添加任务
        function enqueue() {
          const cur = arr.shift();
          // finalArrIndex 记录的是，在最终结果数组里的位置，
          // 因为异步任务返回时间不确定，需要提前保存该任务的位置信息
          const finalArrIndex = doneTaskNum;
          doneTaskNum++;

          if (cur) {
            const task = cur();

            task["task"]
              .then((res) => {
                console.log(`thread ${threadId} finished a task: ${task.id}`, {
                  finalArrIndex,
                  doneTaskNum,
                });
                resolvedArr[finalArrIndex] = res;
                enqueue();
              })
              .catch((err) => {
                resolvedArr[finalArrIndex] = err;
                enqueue();
              });
          } else {
            resolveThread();
          }
        }
        enqueue();
      });
    }

    // 待线程池里所有数据返回才返回最终结果
    let pool = [];
    for (let id = 0; id < concurrent; id++) {
      pool.push(thread(id));
    }
    return Promise.all(pool).then(() => {
      resolveBatch(resolvedArr);
    });
  });
}

// const tasks = createTasks(16);
const tasks = [
  () => timer(10),
  () => timer(1),
  () => timer(2),
  () => timer(3),
  () => timer(4),
  () => timer(4),
  () => timer(3),
  () => timer(2),
  () => timer(1),
];
const concurrent = 2;
batchLimit(tasks, concurrent).then((res) => {
  console.log("batch", res);
});

function timer(time) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time * 500);
  });
  // 返回id主要是想打印出来看当前是哪一个
  return {
    id: time,
    task: p,
  };
}

function createTasks(num) {
  const arr = [];
  for (let i = num; i > 0; i--) {
    const fn = () => timer(i);
    arr.push(fn);
  }
  return arr;
}
