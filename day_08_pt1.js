const input = require("fs")
  .readFileSync("day_08_input.txt")
  .toString()
  .split(/\r\n/)
// console.log(input)

const instructions = input[0].split("")
const maps = input.slice(2, input.length)

const objMaps = {}

for (let i = 0; i < maps.length; i++) {
  let currentMap = maps[i]
  let [origin, destinations] = currentMap.split(" = ")
  let [left, right] = destinations.replaceAll(/\(|\)/g, "").split(", ")
  objMaps[origin] = {
    L: left,
    R: right,
  }
}

// console.log(objMaps.AAA)

//repeat instruction until ZZZ is found
let count = 0
let destination = "AAA"
let i = 0
while (true) {
  let denominator = instructions.length
  let direction = instructions[i % denominator]
  console.log({ destination, direction })
  destination = objMaps[destination][direction]
  count++
  console.log({ destination })
  if (destination === "ZZZ") {
    break
  }
  i++
}
// for (let i = 0; i < instructions.length + 5; i++) {}

console.log(count)
