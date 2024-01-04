const records = require("fs")
  .readFileSync("day_12_input.txt")
  .toString()
  .split(/\r\n/)
  .map((line) => {
    let [record, checksum] = line.split(" ")
    return [record.split(""), checksum.split(",").map((x) => parseInt(x))]
  })

console.log(records)

// const solutions = []

// records.forEach((line) => {
//   let [record, checksum] = line
//   let possibleRecords = generatePossibleRecords(record, checksum)
//   solutions.push(possibleRecords.length)
// })

// console.log(solutions)
let test = [
  ["?", "?", "?", ".", "#", "#", "#"],
  [1, 1, 3],
]
let testHealedRecord = ["#", ".", "#", ".", "#", "#", "#"]
console.log(validateRecord(testHealedRecord, test[1]))
// console.log(generatePossibleRecords(test[0], test[1]))

//create a function that takes a record, and then returns true if it works with checksum, this has some assumption that there are no unknowns in the record
function validateRecord(healedRecord, checksum) {
  let contiguousArr = []
  let currentContiguous = []
  for (let i = 0; i < healedRecord.length; i++) {
    if (healedRecord[i] === "#" && healedRecord[i + 1]) {
      currentContiguous.push(healedRecord[i])
    } else if (
      i === healedRecord.length - 1 ||
      (healedRecord[i] === "." && currentContiguous.length > 0)
    ) {
      contiguousArr.push(currentContiguous.length)
      currentContiguous = []
    }
  }
  //console.log({ checksum }, { contiguousArr })
  return compareCheckSums(checksum, contiguousArr)
}

function compareCheckSums(checksumA, checksumB) {
  if (checksumA.length !== checksumB.length) {
    return false
  } else {
    for (let i = 0; i < checksumA.length; i++) {
      if (checksumA[i] !== checksumB[i]) return false
    }
  }
  return true
}

// 2^n
//function that returns all possible combinations for unknown values
function generatePossibleRecords(brokenRecord, checksum) {
  let possiblePaths = [[]]
  let unknownTubsIndices = returnUnknownIndices(brokenRecord)
  for (let i = 0; i < unknownTubsIndices.length; i++) {
    let newPossiblePaths = []
    for (let j = 0; j < possiblePaths.length; j++) {
      //copy path, add 0 to it
      let newPath0 = copyArr(possiblePaths[j])
      newPath0.push(".")
      newPossiblePaths.push(newPath0)
      //copy path, add 1 to it
      let newPath1 = copyArr(possiblePaths[j])
      newPath1.push("#")
      newPossiblePaths.push(newPath1)
    }
    possiblePaths = newPossiblePaths
  }
  console.log({ possiblePaths })
  let healedRecords = []
  possiblePaths.forEach((path) => {
    let healedRecord = copyArr(brokenRecord)
    unknownTubsIndices.forEach((tubIndex, pathIndex) => {
      healedRecord.splice(tubIndex, 1, path[pathIndex])
    })
    console.log({ healedRecord })
    if (validateRecord(healedRecord, checksum)) {
      healedRecords.push(healedRecord)
    }
  })
  return healedRecords
}

function copyArr(arr) {
  let copy = arr.map((x) => x)
  return copy
}

function sum(a, b) {
  return a + b
}

function countBrokenTubs(record) {
  let count = 0
  record.forEach((tub) => {
    if (tub === "#") count++
  })
  return count
}

function returnUnknownIndices(brokenRecord) {
  let indices = []
  brokenRecord.forEach((tub, index) => {
    if (tub === "?") indices.push(index)
  })
  return indices
}
