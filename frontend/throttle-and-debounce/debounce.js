/**
 * 想象一辆车，10分钟后出发，这时候上来一个人，于是再等10分钟后出发。
 * 比如输入框搜索关键词，每次keydown 都请求，会影响交互，增加后端压力，所以需要防抖。
 * 对于一个 resize, scroll, mousemove, keydown 等事件的回调函数 fn，当事件触发 n 秒后才会执行回调。
 * 如果 n 秒内事件又被触发，则清空定时器，重新计时，n 秒后再执行。
 *
 * 实现方法，通过记录一个timeout 计时器，如果事件触发时，计时器存在，清除之，
 * 然后创建新的计时器，指导计时器正常到时间执行回调函数。
 * @param {*} fn
 * @param {*} wait
 * @returns
 */
function debounce(fn, wait) {
  let timeout;
  return function () {
    // 需要处理 context 和 event 的传参问题
    const thatArg = this;
    const args = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      fn.apply(thatArg, args);
    }, wait);
  };
}
