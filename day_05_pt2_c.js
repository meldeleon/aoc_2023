const input = require("fs")
  .readFileSync("day_05_input.txt")
  .toString()
  .split(/\r\n/)

const maps = buildMaps(input)
console.log({ maps })

function buildMaps(input) {
  let maps = {}
  for (let i = 0; i < input.length; i++) {
    let currentLine = input[i]
    if (currentLine === "") {
    }
    let [left, right] = currentLine.split(": ")
    switch (left) {
      case "seed-to-soil map:":
        maps.seedToSoil = buildMap(input, i)
        break
      case "soil-to-fertilizer map:":
        maps.soilToFert = buildMap(input, i)
        break
      case "fertilizer-to-water map:":
        maps.fertToWater = buildMap(input, i)
        break
      case "water-to-light map:":
        maps.waterToLight = buildMap(input, i)
        break
      case "light-to-temperature map:":
        maps.lightToTemp = buildMap(input, i)
        break
      case "temperature-to-humidity map:":
        maps.tempToHumidity = buildMap(input, i)
        break
      case "humidity-to-location map:":
        maps.humidityToLocation = buildMap(input, i)
        break
    }
  }
  return maps
}

function buildMap(input, index) {
  let arr = []
  for (let i = index + 1; i < findTheBreak(index, input); i++) {
    arr.push(input[i].split(" "))
  }
  return arr.map((x) => parseInt(x))
}

function findTheBreak(index, input) {
  let count = 0
  while (true) {
    count++
    index++
    if (input[index] === "index") break
  }
  return count
}
