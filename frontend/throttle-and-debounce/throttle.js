/**
 * 想象一辆车，不等人，每十分钟准时发车。
 * 对于某些事件，比如keydown, 用户疯狂敲击 R 想放大，但是还是只能 cd 之后才触发。
 *
 * @param {*} fn
 * @param {*} wait
 */
function throttle(fn, wait) {
  let timeout;
  let previous;

  return function () {
    const thatArg = this;
    const args = arguments;
    const now = +new Date();

    // 两次触发的时间太短，没有达到应当触发的时间，取消计时器，重新计时
    if (previous && now < previous + wait) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        previous = +new Date();
        // 清除闭包里的变量，防止内存泄漏
        timeout = null;
        fn.apply(thatArg, args);
      }, wait);
    } else {
      // 第一次，或者，时间到了，触发吧
      previous = +new Date();
      fn.apply(thatArg, args);
    }
  };
}

function log() {
  console.log("log", new Date());
}

// throttle in lodash source code
function throttle(func, wait, options) {
  var leading = true,
    trailing = true;

  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading: leading,
    maxWait: wait,
    trailing: trailing,
  });
}
