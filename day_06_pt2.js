let input = require("fs")
  .readFileSync("day_06_input.txt")
  .toString()
  .split(/\r\n/)

const acceleration = 1
let time = parseInt(input[0].match(/[0-9]/g).join(""))
let distance = parseInt(input[1].match(/[0-9]/g).join(""))

let solutions = []
let winningCount = 0

for (let j = 0; j <= time; j++) {
  let raceResult = returnDistance(j, acceleration, time)
  if (raceResult > distance) {
    winningCount++
  }
}
solutions.push(winningCount)

console.log(solutions.reduce(multiply, 1))

function multiply(a, b) {
  return a * b
}

function returnDistance(seconds, acceleration, time) {
  let speed = seconds * acceleration
  let adjustedTime = time - seconds
  return adjustedTime * speed
}
