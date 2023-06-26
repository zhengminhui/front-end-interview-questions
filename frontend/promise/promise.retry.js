const asyncReturnRandomNumber = async () => {
  return Promise.resolve(Math.floor(Math.random() * 10));
};

function retry(url, times) {
  return function () {
    return new Promise((resolve, reject) => {
      asyncReturnRandomNumber();
      resolve(val);
    })
      .then((val) => {
        if (val % 2 === 0) {
          console.log("Success");
        } else {
          console.log("fail");
        }
        if (count < times) {
          count++;
        }
      })
      .catch((err) => {
        console.log("fail");
        if (count < times) {
          setTimeout(function () {
            retry.apply(this);
          }, 0);
        }

        throw new Error(err);
      });
  };
}
