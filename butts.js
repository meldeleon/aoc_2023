let data = "onetwone1"

let numArray = [
  ...data.matchAll(
    /(?=([0-9]|zero|one|two|three|four|five|six|seven|eight|nine))/g
  ),
]

let parsed = numArray.map((x) => {
  return x[1]
})

console.log(parsed)

// const numDefArr = [
//   "zero",
//   "one",
//   "two",
//   "three",
//   "four",
//   "five",
//   "six",
//   "seven",
//   "eight",
//   "nine",
// ]

// solution =
// numDefArr.forEach( x=> {
//   let check = data.indexOf(x)
// })
