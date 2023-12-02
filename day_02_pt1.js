let input = require("fs")
  .readFileSync("day_02_input.txt")
  .toString()
  .split(/\r\n/)

let maximums = {
  blue: 14,
  green: 13,
  red: 12,
}

let games = input.map((gameStr) => {
  let splitByColon = gameStr.split(":")
  let gameName = splitByColon[0]
  let rounds = splitByColon[1].split(";")

  let gameInfo = {
    name: gameName,
    blue: 0,
    green: 0,
    red: 0,
  }
  for (let i = 0; i < rounds.length; i++) {
    let str = rounds[i]
    let strippedStr = str.replaceAll(",", "")
    let currentRound = strippedStr.split(" ")
    for (let j = 0; j < currentRound.length; j++) {
      currentWord = currentRound[j]
      if (j > 0) {
        let count = parseInt(currentRound[j - 1])
        switch (currentWord) {
          case "blue":
            if (count > gameInfo.blue) gameInfo.blue = count
            break
          case "green":
            if (count > gameInfo.green) gameInfo.green = count
            break
          case "red":
            if (count > gameInfo.red) gameInfo.red = count
            break
        }
      }
    }
  }
  return gameInfo
})

let solutionArr = []
for (let i = 0; i < games.length; i++) {
  let currentGame = games[i]
  if (
    currentGame.blue <= maximums.blue &&
    currentGame.green <= maximums.green &&
    currentGame.red <= maximums.red
  ) {
    solutionArr.push(parseInt(currentGame.name.split(" ")[1]))
  } else {
  }
}

console.log(solutionArr.reduce(sum, 0))

function sum(acc, a) {
  return acc + a
}
