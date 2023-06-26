const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time * 100);
  });
};

const time = [1, 3, 5];

const sequencePromise = (arr, init) => {
  console.time("sequence");

  return arr.reduce((prev, next) => {
    return prev.then(() => {
      return delay(next).then((res) => {
        init += res;
        return init;
      });
    });
  }, Promise.resolve(init));
};

// const sequencePromise = (arr, init) => {
//   console.time("sequence");
//   return new Promise((resolve, reject) => {
//     let sum = 0;
//     const result = arr.reduce((prev, current) => {
//       return delay(current).then((res) => {
//         sum = sum + res;
//         return sum;
//       });
//     }, init);
//     resolve(result);
//   });
// };

sequencePromise(time, 0)
  .then((res) => {
    // sequence should roughly equal to summation of time
    console.timeEnd("sequence");
    console.log("sequence sum", res);
  })
  .catch((err) => {
    console.error(err);
  });

// /**********************  parallel with promise all **************************/
// const parallelPromise = (arr) => {
//   return Promise.all(arr);
// };

// const arr1 = [1, 2, 3].map((time) => delay(time));

// parallelPromise(arr1).then((res) => {
//   console.log("parallelPromise", res);
// });

// /************************  async await  ************************/
const asyncSum = async (arr, sum) => {
  console.time("async");

  for (const time of arr) {
    const val = await delay(time);
    console.log("wait", new Date());
    sum += val;
  }
  return sum;
};

const arr3 = [1, 3, 5];

asyncSum(arr3, 0).then((sum) => {
  console.timeEnd("async");
  console.log("async sum", sum);
});
