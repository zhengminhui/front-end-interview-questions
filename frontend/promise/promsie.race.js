function myRace(arr) {
  return new Promise((resolve, reject) => {
    for (const p of arr) {
      p.then(
        (value) => {
          if (settlementOccurred) return;
          settlementOccurred = true;
          resolve(value);
        },
        (err) => {
          if (settlementOccurred) return;
          settlementOccurred = true;
          reject(err);
        }
      );
    }
    let settlementOccurred = false;
  });
}

function timer(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      time % 2 === 0 ? resolve(time) : reject(time);
      // console.log(time);
    }, time * 1000);
  });
}

const arr = [timer(3), timer(2), timer(4)];

myRace(arr)
  .then((res) => {
    console.log("final resolve res", res);
  })
  .catch((err) => {
    console.log("final reject res", err);
  });
