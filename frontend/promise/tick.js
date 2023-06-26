console.log(1);
setTimeout(function () {
  console.log(2);
  setTimeout(function () {
    console.log(3);
    Promise.resolve(4)
      .then((res) => {
        console.log(res); // 4
        setTimeout(function () {
          console.log(6);
        }, 0);
      })
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        console.log(res);
      });
    // process.nextTick(function () {
    //   console.log('next tick queue is higher than micro task queue');
    // });
  }, 0);
  setTimeout(function () {
    console.log(5);
  }, 0);
}, 0);
