function findOverlap(startingVal1, endingVal1, startingVal2, endingVal2) {
  let largerStart = Math.max(startingVal1, startingVal2)
  let smallerEnd = Math.min(endingVal1, endingVal2)
  return [largerStart, smallerEnd]
}

console.log(findOverlap(0, 5, 1, 10))
