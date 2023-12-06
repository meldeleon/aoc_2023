let input = require("fs")
  .readFileSync("day_06_input.txt")
  .toString()
  .split(/\r\n/)

const acceleration = 1
let times = input[0].split(" ").filter((chunk) => !isNaN(parseInt(chunk)))
let distances = input[1].split(" ").filter((chunk) => !isNaN(parseInt(chunk)))
let races = []
for (let i = 0; i < times.length; i++) {
  races.push([parseInt(times[i]), parseInt(distances[i])])
}
let solutions = []
for (let i = 0; i < races.length; i++) {
  let winningCount = 0
  let [time, distance] = races[i]
  for (let j = 0; j <= time; j++) {
    let raceResult = returnDistance(j, acceleration, time)
    if (raceResult > distance) {
      winningCount++
    }
  }
  solutions.push(winningCount)
}

console.log(solutions.reduce(multiply, 1))

function multiply(a, b) {
  return a * b
}

function returnDistance(seconds, acceleration, time) {
  let speed = seconds * acceleration
  let adjustedTime = time - seconds
  return adjustedTime * speed
}
