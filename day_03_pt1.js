let input = require("fs")
  .readFileSync("day_03_input.txt")
  .toString()
  .split(/\r\n/)

let matrix = []

for (let y = 0; y < input.length; y++) {
  let row = []
  for (let x = 0; x < input[y].length; x++) {
    row.push(input[y][x])
  }
  matrix.push(row)
}

//console.table(matrix)

//check each character for adjacency, and the push that number (in it wholeness to a soluton array)
let solutionArr = []
for (let y = 0; y < matrix.length; y++) {
  let numberString = []
  let adjacency = false
  for (let x = 0; x < matrix[y].length; x++) {
    let currentChar = matrix[y][x]
    let nextChar = matrix[y][x + 1]
    //if it's a number with a number following it, push to string, and check for adjacency
    //console.log({ currentChar })
    if (checkNumber(currentChar) && checkNumber(nextChar)) {
      //console.log("is non ending number")
      numberString.push(currentChar)
      if (checkAdjacentforSymbols(y, x)) {
        //console.log("has adjacency")
        adjacency = true
      }
    } else if (checkNumber(currentChar) && !checkNumber(nextChar)) {
      //console.log("is an ending number")
      numberString.push(currentChar)
      if (checkAdjacentforSymbols(y, x)) {
        //console.log("has adjacency")
        adjacency = true
      }
      if (adjacency) {
        solutionArr.push(parseInt(numberString.join("")))
      }
      numberString = []
      adjacency = false
    }
  }
}

console.log(solutionArr.reduce(sum, 0))

function sum(acc, a) {
  return acc + a
}

function checkAdjacentforSymbols(y, x) {
  for (let j = y - 1; j <= y + 1; j++) {
    for (let i = x - 1; i <= x + 1; i++) {
      //console.log({ j }, { i })
      if (j > 0 && i > 0 && j < matrix.length && i < matrix[j].length) {
        let currentChar = matrix[j][i]
        //console.log(currentChar)
        if (currentChar !== "." && !checkNumber(currentChar)) {
          return true
        }
      }
    }
  }
  return false
}

function checkNumber(char) {
  return /^\d+$/.test(char)
}

// x - 1, y
// x + 1, y
// x, y - 1
// x, y + 1
// x - 1, y - 1
// x + 1, y + 1
