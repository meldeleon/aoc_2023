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

let solutionArr = []

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    let currentChar = matrix[y][x]
    //check if gear, and then check adjaceny and store adjacency numbers
    if (currentChar === "*") {
      let adjacentPositions = returnAdjacentNumbersPosition(y, x)
      let fullNumbers = adjacentPositions.map((coord) =>
        printFullNumbers(coord[0], coord[1])
      )
      let dedupedNum = Array.from(new Set(fullNumbers))
      //console.log(dedupedNum)
      if (dedupedNum.length === 2) {
        solutionArr.push(parseInt(dedupedNum[0]) * parseInt(dedupedNum[1]))
      }
    }
  }
}
console.log(solutionArr.reduce(sum, 0))

function sum(acc, a) {
  return acc + a
}

function returnAdjacentNumbersPosition(y, x) {
  //console.log(matrix[y][x])
  let positions = []
  for (let j = y - 1; j <= y + 1; j++) {
    for (let i = x - 1; i <= x + 1; i++) {
      //console.log({ j }, { i })
      if (j >= 0 && i >= 0 && j < matrix.length && i < matrix[j].length) {
        let currentChar = matrix[j][i]
        //console.log(currentChar)
        if (checkNumber(parseInt(currentChar))) {
          //console.log("is number")
          positions.push([j, i])
        }
      }
    }
  }
  return positions
}

function checkNumber(char) {
  return /^\d+$/.test(char)
}
function printFullNumbers(y, x) {
  let fullNumber = []
  let i = x
  //increase the x until we find not a number
  if (i >= 0 && i < matrix[y].length) {
    while (true) {
      if (!checkNumber(matrix[y][i])) {
        break
      } else {
        fullNumber.push(matrix[y][i])
      }
      i++
    }
  }
  let j = x
  if (j >= 0 && j < matrix[y].length) {
    while (true) {
      j--
      if (!checkNumber(matrix[y][j])) {
        break
      } else {
        fullNumber.unshift(matrix[y][j])
      }
    }
  }
  return fullNumber.join("")
}
