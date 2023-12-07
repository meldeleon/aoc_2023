const cardTypes = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
]

let input = require("fs")
  .readFileSync("day_07_input.txt")
  .toString()
  .split(/\r\n/)

const hands = input.map((line) => {
  let [hand, bid] = line.split(" ")
  return {
    hand: hand,
    bid: bid,
    outcome: evaluateHand(hand),
  }
})

hands.sort((a, b) => {
  if (a.outcome > b.outcome) {
    return 1
  } else if (b.outcome > a.outcome) {
    return -1
  } else {
    if (tieBreaker(a.hand, b.hand)) {
      return 1
    } else {
      return -1
    }
  }
})

console.log(hands)

let solution = []

for (let i = 0; i < hands.length; i++) {
  let rank = i + 1
  solution.push(rank * parseInt(hands[i].bid))
}

console.log(solution.reduce(sum, 0))

function sum(acc, a) {
  return acc + a
}

function evaluateHand(str) {
  let hand = str.split("")
  let matches = []
  for (let h = 0; h < cardTypes.length; h++) {
    matches.push(0)
  }
  for (let i = 0; i < hand.length; i++) {
    let currentCard = hand[i]
    for (let j = 0; j < cardTypes.length; j++) {
      if (currentCard === cardTypes[j]) {
        matches[j]++
      }
    }
  }
  let sortedMatches = matches.sort().reverse()
  if (sortedMatches[0] === 5) {
    return 7
  } else if (sortedMatches[0] === 4) {
    return 6
  } else if (sortedMatches[0] === 3 && sortedMatches[1] === 2) {
    return 5
  } else if (sortedMatches[0] === 3 && sortedMatches[1] !== 2) {
    return 3
  } else if (sortedMatches[0] === 2 && sortedMatches[1] === 2) {
    return 2
  } else if (sortedMatches[0] === 2 && sortedMatches[1] !== 2) {
    return 1
  } else {
    return 0
  }
}

//true if a wins; false if a loses
function tieBreaker(a, b) {
  let hand1 = a.split("")
  let hand2 = b.split("")
  for (let i = 0; i < hand1.length; i++) {
    //console.log(hand1, hand2)
    let hand1Val = cardTypes.indexOf(hand1[i])
    let hand2Val = cardTypes.indexOf(hand2[i])
    //console.log({ hand1Val }, { hand2Val })
    if (hand1Val !== hand2Val) {
      if (hand1Val === returnSmaller(hand1Val, hand2Val)) {
        return true
      } else {
        return false
      }
    }
  }
}

function returnSmaller(a, b) {
  return Math.min(a, b)
}
