export default {
  isString: function (item) {
    return Object.prototype.toString.call(item) === '[object String]'
  },
  isNotBlank: function (str) {
    return Object.prototype.toString.call(str) === '[object String]' && str.length > 0
  }
}
