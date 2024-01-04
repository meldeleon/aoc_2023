let test = [0, 1]
let butts = copyArr(test)
butts.push(1)
console.log(butts)
function copyArr(arr) {
  let copy = arr.map((x) => x)
  return copy
}
