let butts = [
  [0, 1, 2],
  [6, 7, 8],
]

let test = [3, 4, 5]

butts.splice(1, 0, [...test])

console.log(butts)
