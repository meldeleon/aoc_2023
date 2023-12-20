let emptyCols = [3, 7]
let galaxies = [
  [0, 3],
  [1, 7],
  [2, 0],
  [4, 6],
  [5, 1],
  [6, 9],
  [8, 7],
  [9, 0],
  [9, 4],
]

function findPositionInEmptyArr(galaxyPos, emptyArr) {
  let count = 0
  let start = 0
  let end = emptyArr.length - 1
  while (true) {
    //find the halfway pt
    let midPoint = Math.floor((start + end) / 2)
    //we are checking if the pt is lower than our number, but the next point must be higher
    let lowerCheck = emptyArr[midPoint]
    let upperCheck = emptyArr[midPoint + 1]
    console.log({ start }, { end }, { midPoint })
    console.log({ lowerCheck }, { upperCheck })
    //edge case: the position is less than index 0
    if (galaxyPos < emptyArr[0]) {
      return 0
    }
    //edge case: poisiton is greater than last val in array
    else if (galaxyPos >= emptyArr[emptyArr.length - 1]) {
      console.log(`butts2`)
      if (midPoint === 0) {
        return 1
      } else {
        return emptyArr.length - 1
      }
    } else if (galaxyPos > lowerCheck && galaxyPos < upperCheck) return midPoint
    else if (galaxyPos < lowerCheck) end = midPoint - 1
    else if (galaxyPos > upperCheck) start = midPoint + 1
    else {
      console.log(
        `something weird happened with input ${galaxyPos}, ${emptyArr}`
      )
    }
    count++
    if (count === 10) break
  }
}

let emptyRows = [2, 5, 8, 12]
console.log(findPositionInEmptyArr(3, emptyRows))
