MyPromise.any = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : [];
    let len = promises.length;
    // 用于收集所有 reject
    let errs = [];
    // 如果传入的是一个空数组，那么就直接返回 AggregateError
    if (len === 0)
      return reject(new AggregateError("All promises were rejected"));
    promises.forEach((promise) => {
      promise.then(
        (value) => {
          resolve(value);
        },
        (err) => {
          len--;
          errs.push(err);
          if (len === 0) {
            reject(new AggregateError(errs));
          }
        }
      );
    });
  });
};
