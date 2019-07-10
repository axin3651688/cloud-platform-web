export default {
  isString: function (item) {
    return Object.prototype.toString.call(item) === '[object String]'
  }
}
