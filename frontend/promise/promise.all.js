function pAll(arr) {
  return new Promise((resolve, reject) => {
    let resolvedArr = [];
    let resolvedNum = 0;
    arr.forEach((p, index) => {
      p.then((res) => {
        resolvedNum++;
        resolvedArr[index] = res;
        if (resolvedNum === arr.length) {
          resolve(resolvedArr);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  });
}

function timer(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // time % 2 === 0 ? resolve(time) : reject(time);
      resolve(time);
      console.log(time);
    }, time * 100);
  });
}

const arr = [timer(3), timer(2), timer(4)];
pAll(arr)
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
