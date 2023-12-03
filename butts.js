let matrix = [
  ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
  [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
  [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
  [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ["6", "1", "7", "*", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", "+", ".", "5", "8", "."],
  [".", ".", "5", "9", "2", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "7", "5", "5", "."],
  [".", ".", ".", "$", ".", "*", ".", ".", ".", "."],
  [".", "6", "6", "4", ".", "5", "9", "8", ".", "."],
]

console.table(matrix)

console.log(returnAdjacentNumbersPosition(1, 3))

console.log(printFullNumbers(0, 2))

function returnAdjacentNumbersPosition(y, x) {
  console.log(matrix[y][x])
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
