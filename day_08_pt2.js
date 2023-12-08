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
let destinations = Object.keys(objMaps).filter((map) => map[2] === "A")
//console.log({ destinations })
let stepsToZ = []
let cycles = []

let i = 0

destinations.forEach((destination) => {
  let count = 0
  let i = 0
  while (true) {
    let denominator = instructions.length
    let direction = instructions[i % denominator]
    //console.log({ destination, direction })
    destination = objMaps[destination][direction]
    count++
    //console.log({ destination })
    if (destination[2] === "Z") {
      break
    }
    i++
  }
  stepsToZ.push(count)
})

console.log({ stepsToZ })

let n = 1
while (true) {
  let product = Math.min(...stepsToZ) * n
  //console.log(product)
  let modulos = stepsToZ.map((x) => {
    return product % x
  })

  if (checkIfAllZero(modulos)) {
    console.log(product)
    break
  }
  n++
}

function checkIfAllZero(modulos) {
  return modulos.filter((x) => x === 0).length === modulos.length
}
