const exp = require("constants")

const input = require("fs")
  .readFileSync("day_11_input.txt")
  .toString()
  .split(/\r\n/)
  .map((x) => x.split(""))
//console.table(input)
const emptyRows = findEmptyRows(input)
const emptyCols = findEmptyCols(input)
//create a placeholderEmptyRow
const placeholderEmptyRow = []
for (let i = 0; i < input[0].length + emptyCols.length; i++) {
  placeholderEmptyRow.push(".")
}
const expandedUniverse = []

//expanding functions

let galaxyCount = 1
for (let row = 0; row < input.length; row++) {
  expandedUniverse.push([])
  for (let col = 0; col < input[0].length; col++) {
    //iterate over every cell in input
    //if it's a galaxy, replace with galaxy number and push to expanded universe
    let lastRow = expandedUniverse.length - 1
    if (input[row][col] === "#") {
      expandedUniverse[lastRow].push(galaxyCount)
      galaxyCount++
    } else if (emptyCols.includes(col)) {
      expandedUniverse[lastRow].push(".", ".")
    } else {
      expandedUniverse[lastRow].push(".")
    }
  }
  if (emptyRows.includes(row)) {
    expandedUniverse.push(placeholderEmptyRow)
  }
}

//console.table(expandedUniverse)
const galaxies = []
for (let row = 0; row < expandedUniverse.length; row++) {
  for (let col = 0; col < expandedUniverse[row].length; col++) {
    if (expandedUniverse[row][col] !== ".") {
      galaxies.push([row, col])
    }
  }
}

//console.log(galaxies)

//find the combination of all the galaxies
let combinations = new Set()
for (let i = 0; i < galaxies.length; i++) {
  let galaxyA = galaxies[i]
  for (let j = 0; j < galaxies.length; j++) {
    let galaxyB = galaxies[j]
    if (i !== j) {
      let combinationArr = [galaxyA, galaxyB].sort()
      combinations.add(combinationArr.join())
    }
  }
}
//console.table(combinations)

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
