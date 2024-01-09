const records = require("fs")
  .readFileSync("day_12_input.txt")
  .toString()
  .split(/\r\n/)
  .map((line) => {
    let [record, checksum] = line.split(" ")
    return [record.split(""), checksum.split(",").map((x) => parseInt(x))]
  })

//console.log(records)

const solutions = []

records.forEach((line) => {
  let [record, checksum] = line
  let possibleRecords = generatePossibleRecords(record, checksum)
  solutions.push(possibleRecords.length)
})

console.log(`the solutions is ${solutions.reduce(sum, 0)}`)

//function that returns all possible combinations for unknown values
function generatePossibleRecords(brokenRecord, checksum) {
  let possiblePaths = [[]]
  let unknownTubsIndices = returnUnknownIndices(brokenRecord)
  //iterate over the unknown indices
  for (let i = 0; i < unknownTubsIndices.length; i++) {
    //create an array for new possible paths
    let newPossiblePaths = []
    //
    for (let j = 0; j < possiblePaths.length; j++) {
      //copy path, add 0 to it
      let newPath0 = [...possiblePaths[j], "."]
      newPossiblePaths.push(newPath0)
      //copy path, add # to it
      let newPath1 = [...possiblePaths[j], "#"]
      newPossiblePaths.push(newPath1)
    }
    possiblePaths = newPossiblePaths
  }
  //console.log({ possiblePaths })
  let healedRecords = []
  possiblePaths.forEach((path) => {
    let healedRecord = [...brokenRecord]
    //iterate over all unknown indices
    unknownTubsIndices.forEach((tubIndex, pathIndex) => {
      //we are replacing the unknown tubs with possibly known tubs
      healedRecord.splice(tubIndex, 1, path[pathIndex])
    })
    //console.log(healedRecord)
    if (validateRecord(healedRecord, checksum)) {
      healedRecords.push(healedRecord)
    }
  })
  return healedRecords
}

//create a function that takes a record, and then returns true if it works with checksum, this has some assumption that there are no unknowns in the record
function validateRecord(healedRecord, checksum) {
  let contiguousArr = []
  let currentContiguous = []
  for (let i = 0; i < healedRecord.length; i++) {
    //check if current tub is broken, and there another tub after it
    if (healedRecord[i] === "#" && healedRecord[i + 1]) {
      currentContiguous.push(healedRecord[i])
    }
    //check if tub is functioning and we have previously added tubs to the currentContiguous Arr
    else if (healedRecord[i] === "." && currentContiguous.length > 0) {
      contiguousArr.push(currentContiguous.length)
      currentContiguous = []
    }
    //check the edge case -- if last & broken
    else if (i === healedRecord.length - 1 && healedRecord[i] === "#") {
      currentContiguous.push(healedRecord[i])
      contiguousArr.push(currentContiguous.length)
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
