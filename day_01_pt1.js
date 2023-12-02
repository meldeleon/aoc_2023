let data = require("fs")
  .readFileSync("day_01_input.txt")
  .toString()
  .split(/\r\n/)

let solution = []

for (let i = 0; i < data.length; i++) {
  let numString = data[i].match(/[0-9]/g).join("")
  let num = `${numString[0]}${numString.charAt(numString.length - 1)}`
  solution.push(parseInt(num))
}

function sum(acc, a) {
  return acc + a
}

console.log(solution.reduce(sum, 0))
