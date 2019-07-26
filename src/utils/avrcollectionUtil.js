/**
 * 求 A - B
 * @param A 数组
 * @param B 数组
 */
export default {
  getDifferenceArr: function (A, B) {
    const precondition = Array.isArray(A) && Array.isArray(B)
    if (!precondition) {
      throw Error('传数组')
    }
    return A.filter(function (a) {
      const contain = B.some(function (b) {
        return a === b
      })
      return !contain
    })
  },
  /**
   * 求A∩B
   * @param A
   * @param B
   * @returns {*}
   */
  getIntersectionArr: function (A, B) {
    const precondition = Array.isArray(A) && Array.isArray(B)
    if (!precondition) {
      throw Error('传数组')
    }
    return A.filter(function (a) {
      const contain = B.some(function (b) {
        return a === b
      })
      return contain
    })
  },
  getSumArr: function (A, B) {
    const precondition = Array.isArray(A) && Array.isArray(B)
    if (!precondition) {
      throw Error('传数组')
    }
    const arr = []
    A.forEach(function (a) {
      arr.push(a)
    })
    B.forEach(function (b) {
      arr.push(b)
    })
    return arr
  }
}
