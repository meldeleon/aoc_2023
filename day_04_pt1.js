let input = require("fs")
  .readFileSync("day_04_input.txt")
  .toString()
  .split(/\r\n/)

let solutionArray = []
for (let i = 0; i < input.length; i++) {
  let [left, right] = input[i].split(" | ")

  let winningNumbers = left
    .replaceAll("  ", " ")
    .split(" ")
    .splice(2, left.length)

  let cardNumbers = right.replaceAll("  ", " ").split(" ")
  let winners = cardNumbers.filter((x) => winningNumbers.includes(x))
  //console.log({ winners })
  if (winners.length > 0) {
    solutionArray.push(2 ** (winners.length - 1))
  }
  //console.log(solutionArray)
}

function sum(acc, a) {
  return acc + a
}

console.log(solutionArray.reduce(sum, 0))
