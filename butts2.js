let expansionMultiplier = 1
let galaxies = [
  [ 0, 3 ], [ 1, 7 ],
  [ 2, 0 ], [ 4, 6 ],
  [ 5, 1 ], [ 6, 9 ],
  [ 8, 7 ], [ 9, 0 ],
  [ 9, 4 ]
]

let emptyRows = [ 3, 7 ]
let emptyCols = [ 2, 5, 8 ] 

let expandedGalaxies = expandGalaxyLocations(galaxies, emptyRows, emptyCols)
console.log(expandedGalaxies)


function expandGalaxyLocations(galaxies, emptyRows, emptyCols) {
  return galaxies.map((galaxy) => {
    let [row, col] = galaxy
    let addToRow = nthEmptyRowOrCol(row, emptyRows) * expansionMultiplier
    let addToCol =nthEmptyRowOrCol(col, emptyCols) * expansionMultiplier
    let expandedRow = row + addToRow
    let expandedCol = col + addToCol
    console.log(`for galaxy ${galaxy} we added [+${addToRow}, +${addToCol}]`)
    return [expandedRow, expandedCol]
  })
}


 
function nthEmptyRowOrCol(rowOrCol, emptiesArr) {
  //check for left edge case
  if (rowOrCol < emptiesArr[0]) {
    return 0
  //check for right edge case
  } else if (rowOrCol >= emptiesArr[emptiesArr.length - 1]) {
    return emptiesArr.length
  } else {
  for (let i = 0; i < emptiesArr.length; i++) {
    currentEmpty = emptiesArr[i]
    if (rowOrCol >= currentEmpty && rowOrCol < emptiesArr[i + 1]) {
      return i + 1
    } 
  }
}
}

/*
[
  [ 0, 4 ],  [ 1, 9 ],
  [ 2, 0 ],  [ 5, 8 ],
  [ 6, 1 ],  [ 7, 12 ],
  [ 10, 9 ], [ 11, 0 ],
  [ 11, 5 ]
]

*/