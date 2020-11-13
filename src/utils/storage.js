/**
 * 封装 localStorage
 */
export default {
  set(key, value) {
    window && window.localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    let value = window.localStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
    return value;
  },
  remove(key) {
    window && window.localStorage.removeItem(key);
  },
  clear() {
    window && window.localStorage.clear();
  },
};
