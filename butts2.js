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

function returnExpansionMultiplier(galaxyPos, emptiesArr) {
  for (let i = 0; i < emptiesArr.length; i++) {
    currentEmpty = emptiesArr[i]
    if (galaxyPos <= emptiesArr[0]) {
      return -1
    } else if (galaxyPos > emptiesArr[emptiesArr.length - 1]) {
      return emptiesArr.length
    } else if (galaxyPos > currentEmpty && galaxyPos < emptiesArr[i + 1]) {
      return i + 1
    }
  }
}

let emptyRows = [2, 5, 8, 12]

console.log(returnExpansionMultiplier(109002030230, emptyRows))
