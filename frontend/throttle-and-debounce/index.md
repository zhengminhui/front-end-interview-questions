# throttle and debounce

```javascript
// throttle
function _throttle(fn, delay) {
  let now, lastExec, timer, context, args;

  const execute = function () {
    fn.apply(context, args);
    lastExec = now;
  };

  return function () {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
      return false;
    }

    if (lastExec) {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      // first time
      execute();
    }
  };
}

var para = "a";
function _log(para) {
  var local = "2";
  console.log(1, local, this.para);
}
window.onscroll = _throttle(_log.bind(this), 1000);

// debounce
function _debounce(fn, wait) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, wait);
  };
}

function _log() {
  console.log(1);
}
window.onscroll = _debounce(_log, 500);
```
