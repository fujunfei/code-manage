function SetBy(arr) {
  this.set = []
  this.dealData(arr)
}
// 数据去重
SetBy.prototype.dealData = function(arr) {
  if (!(arr instanceof Array)) {
    console.warn('arguments must be array')
    return []
  }
  arr.forEach(i => {
    let exsit = false
    this.set.forEach(s => {
      if (s===i) exsit = true
    })
    if (!exsit) this.set.push(i)
  })
}
SetBy.prototype.add = function(arg) {
  this.dealData([arg])
}

let set = new SetBy([1,2,3,2,1])