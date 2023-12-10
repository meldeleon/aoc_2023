const input = require("fs")
  .readFileSync("day_05_input.txt")
  .toString()
  .split(/\n/)

// console.log({ input })

//create a data structure for our maps
const maps = buildMaps(input)
console.log(maps)


function buildMaps(input) {
  let maps = {}
  for (let i = 0; i < input.length; i++) {
    let currentLine = input[i]
    if (currentLine === "" || !isNaN(parseInt(currentLine[0]))) {
      //if blank or a starts with a number do nothing
    } else {
    let [left, right] = currentLine.split(": ")
    switch (left) {
      case "seeds":
        maps.seeds = buildSeedList(right)
        break
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
  }
  return maps
}

function buildMap(input, index) {
  let arr = []
  for (let i = index + 1; i < findTheBreak(index, input); i++) {
    let mapArr = input[i].split(" ")
    let intMapArr = mapArr.map(x => parseInt(x))
    arr.push(intMapArr)
  }
  return arr
}

function findTheBreak(index, input) {
  //this is to find the number of lines that a specific map has ranges for
  while (true) {    
    index++
    if (input[index] === "" || index === input.length) break
  }
  console.log(`break found at index=${index}`)
  return index
}
function buildSeedList(seedIdsStr){
  let seedList = []
  let seeds = seedIdsStr.split(" ")
  seeds.forEach((seedId) => {
    seedList.push({
      seed: parseInt(seedId),
      soil: 0,
      fert: 0,
      water: 0,
      light: 0,
      temp: 0,
      humidity: 0,
      location: 0,
    })
  })
  return seedList
}

function buildRanges(start, count) {
  return [start, start + count - 1]
}
