const universe = require("fs")
  .readFileSync("day_11_input.txt")
  .toString()
  .split(/\r\n/)
  .map((x) => x.split(""))
console.table(universe)
let expandedUniverse = expandUniverse(universe)

//functions to expand the universe
function expandUniverse(universe) {
  //return which columns need to be expanded
  let newUniverse = universe.map((row) => {
    return row.map((col) => col)
  })
  let columnsToExpand = returnEmptyColumns(universe)
  //expand rows
  for (let row = 0; row < universe.length; row++) {
    let currentRow = universe[row]
    if (currentRow.every((x) => x === ".")) {
      console.log(`empty row found`)
      newUniverse.splice(row, 0, [...currentRow])
    }
  }
  for (let row = 0; row < newUniverse.length; row++) {
    for (let col = 0; col < newUniverse[row].length; col++) {
      if (columnsToExpand.includes(col)) {
        newUniverse[row].splice(col, 0, ".")
      }
    }
  }
  return newUniverse
}
function returnEmptyColumns(universe, columnNumber) {
  let columns = []
  for (let row = 0; row < universe.length; row++) {
    for (let col = 0; col < universe[0].length; col++) {
      if (columns[col]) {
        columns[col].push(universe[row][col])
      } else {
        columns[col] = [universe[row][col]]
      }
    }
  }
  let columnNumbers = []
  columns.forEach((column, index) => {
    if (column.every((x) => x === ".")) {
      columnNumbers.push(index)
    }
  })
  return columnNumbers
}
