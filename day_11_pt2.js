const input = require("fs")
  .readFileSync("day_11_input.txt")
  .toString()
  .split(/\r\n/)
  .map((x) => x.split(""))
console.table(input)
const emptyRows = findEmptyRows(input)
const emptyCols = findEmptyCols(input)
const expansionMultiplier = 2
//create a placeholderEmptyRow
console.log(emptyCols, emptyRows)

const galaxies = []
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    if (input[row][col] !== ".") {
      galaxies.push([row, col])
    }
  }
}
console.log(galaxies)
const expandedGalaxies = expandGalaxyLocations(galaxies, emptyRows, emptyCols)
console.log(expandedGalaxies)

//find the combination of all the galaxies
let combinations = new Set()
for (let i = 0; i < expandedGalaxies.length; i++) {
  let galaxyA = expandedGalaxies[i]
  for (let j = 0; j < expandedGalaxies.length; j++) {
    let galaxyB = expandedGalaxies[j]
    if (i !== j) {
      let combinationArr = [galaxyA, galaxyB].sort()
      combinations.add(combinationArr.join())
    }
  }
}
console.table(combinations)

let solution = []
combinations.forEach((combination) => {
  solution.push(findDistance(combination))
})

console.log(`the solution is ${solution.reduce(sum, 0)}`)

function sum(acc, a) {
  return acc + a
}

function findDistance(combination) {
  let [rowA, colA, rowB, colB] = combination.split(",")
  return Math.abs(colA - colB) + Math.abs(rowA - rowB)
}

function expandGalaxyLocations(galaxies, emptyRows, emptyCols) {
  return galaxies.map((galaxy) => {
    let [row, col] = galaxy
    let expandedRow =
      row + returnExpansionMultiplier(row, emptyRows) * expansionMultiplier
    let expandedCol =
      col + returnExpansionMultiplier(col, emptyCols) * expansionMultiplier
    return [expandedRow, expandedCol]
  })
}

function findEmptyRows(universe) {
  let emptyRows = []
  for (let row = 0; row < universe.length; row++) {
    let currentRow = universe[row]
    if (currentRow.every((x) => x === ".")) {
      //console.log(`empty row found`)
      emptyRows.push(row)
    }
  }
  return emptyRows
}

function findEmptyCols(universe) {
  let row = 0
  let emptyCols = []
  for (let col = 0; col < universe[row].length; col++) {
    if (checkIfColEmpty(universe, col)) {
      emptyCols.push(col)
    }
  }
  return emptyCols
}
function checkIfColEmpty(universe, colIndex) {
  let col = []
  for (let row = 0; row < universe.length; row++) {
    col.push(universe[row][colIndex])
  }
  return col.every((x) => x === ".")
}

function returnExpansionMultiplier(galaxyPos, emptiesArr) {
  for (let i = 0; i < emptiesArr.length; i++) {
    currentEmpty = emptiesArr[i]
    if (galaxyPos <= emptiesArr[0]) {
      return 0
    } else if (galaxyPos > emptiesArr[emptiesArr.length - 1]) {
      return emptiesArr.length
    } else if (galaxyPos > currentEmpty && galaxyPos < emptiesArr[i + 1]) {
      return i + 1
    }
  }
}
