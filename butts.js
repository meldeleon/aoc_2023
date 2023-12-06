function intersection(range1, range2) {
  let [startA, endA] = range1
  let [startB, endB] = range2
  let left, center, right
  if (startA <= endB && startB <= endA) {
    let largerStart = Math.max(startA, startB)
    let smallerEnd = Math.min(endA, endB)
    center = [largerStart, smallerEnd]
    //chop off the left
    if (center[0] > startA) {
      left = [startA, center[0] - 1]
    } else {
      left = null
    }
    //chop off the right
    if (center[1] < endA) {
      right = [center[1] + 1, endA]
    } else {
      right = null
    }
    return [left, center, right]
  } else {
    return false
  }
}
