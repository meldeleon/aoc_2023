let input = require("fs")
  .readFileSync("day_04_input.txt")
  .toString()
  .split(/\r\n/)

let cards = {}

for (let i = 0; i < input.length; i++) {
  let [left, right] = input[i].split(" | ")
  let leftArr = left.replaceAll("   ", "  ").replaceAll("  ", " ").split(" ")
  //console.log(leftArr)
  let cardId = parseInt(leftArr[1].replace(":", ""))
  //console.log({ cardId })
  let winningNumbers = leftArr.splice(2, left.length)
  let cardNumbers = right.replaceAll("  ", " ").split(" ")
  let winners = cardNumbers.filter((x) => winningNumbers.includes(x))
  cards[cardId] = {
    won: winners.length,
    count: 1,
  }
}

for (card in cards) {
  for (let h = 0; h < cards[card].count; h++) {
    for (
      let i = parseInt(card) + 1;
      i <= cards[card].won + parseInt(card);
      i++
    ) {
      cards[i].count++
    }
  }
  console.log(cards)
}

let solutionArray = []

for (card in cards) {
  solutionArray.push(cards[card].count)
}

console.log(solutionArray.reduce(sum, 0))
function sum(acc, a) {
  return acc + a
}
