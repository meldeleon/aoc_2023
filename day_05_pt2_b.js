const input = require("fs")
  .readFileSync("day_05_input.txt")
  .toString()
  .split(/\r\n/)

//build our data structure of seedsList and Maps:
const maps = buildMaps(input)
const seedsLine = formatSeedList(input[0].split(": ")[1].split(" "))
console.log(seedsLine)

//filter the seedlist for soil
let soiledSeeds = applyMapToRanges(seedsLine, maps.seed_to_soil)
console.log({ soiledSeeds })
let fertlizedSeeds = applyMapToRanges(soiledSeeds, maps.soil_to_fertilizer)
console.log({ fertlizedSeeds })
let wateredSeeds = applyMapToRanges(fertlizedSeeds, maps.fertilizer_to_water)
console.log({ wateredSeeds })
let lightedSeeds = applyMapToRanges(wateredSeeds, maps.light_to_temperature)
console.log({ lightedSeeds })
let tempedSeeds = applyMapToRanges(lightedSeeds, maps.temperature_to_humidity)
console.log({ tempedSeeds })
let humidifiedSeeds = applyMapToRanges(tempedSeeds, maps.humidity_to_location)
console.log({ humidifiedSeeds })
let locatedSeeds = applyMapToRanges(humidifiedSeeds, maps.humidity_to_location)
console.log({ locatedSeeds })

function applyMapToRanges(seedList, map) {
  //console.log({ seedList }, { map })
  let newSeedList = []
  for (let i = 0; i < seedList.length; i++) {
    let overlapFound = false
    let start1 = parseInt(seedList[i][0])
    let end1 = parseInt(seedList[i][1])
    for (let j = 0; j < map.length; j++) {
      //console.log(map[j])
      let start2 = parseInt(map[j][1])
      let end2 = start2 + parseInt(map[j][2])
      //console.log({ start1 }, { end1 }, { start2 }, { end2 })
      let [left, center, right] = findOverlap([start1, end1],[start2, end2])
      let rangeChange = findRangeAdjustment(map[j])
      let adjustedOverlap = [center[0] - rangeChange, center[1] - rangeChange]
      if (overlap) {
        newSeedList.push(adjustedOverlap)
        if (left) {
          newSeedList.push(left)
        }
        if (right) {
          newSeedList.push(right)
        }
        overlapFound = true
      } 
    }
    if (!overlapFound) {
      newSeedList.push([start1, end1])
    }
  }
  if (overlapFound) {
    return newSeedList
}

function formatSeedList(seedList) {
  let newSeedList = []
  for (let i = 0; i < seedList.length; i += 2) {
    let start = parseInt(seedList[i])
    let end = start + parseInt(seedList[i + 1])
    newSeedList.push([start, end])
  }
  return newSeedList
}

function intersection(range1, range2) {
  let [startA, endA] = range1
  let [startB, endB] = range2
  let left, center, right
  if (startA <= endB && startB <= endA) {
    let largerStart = Math.max(startA, startB)
    let smallerEnd = Math.min(endA, endB)
    center = [largerStart, smallerEnd]
    //chop off the left
    if (center[0] > startA) {
      left = [startA, center[0] - 1]
    } else {
      left = null
    }
    //chop off the right
    if (center[1] < endA) {
      right = [center[1] + 1, endA]
    } else {
      right = null
    }
    return [left, center, right]
  } else {
    return false
  }
}

function findRangeAdjustment(mapLine) {
  let [dest, src, range] = mapLine
  return src - dest
}
// function generateSeeds(seedsList) {
//   let seeds = []
//   for (let i = 0; i < seedsList.length; i++) {
//     let start = parseInt(seedsList[i][0])
//     let end = parseInt(seedsList[i][1])
//     for (let j = start; j <= end; j++) {
//       seeds.push(j)
//     }
//   }
//   return seeds
// }

function findTheBreak(i, input) {
  let count = 0
  while (true) {
    count++
    i++
    if (input[i] === "") break
  }
  return count
}

function buildMaps(input) {
  let maps = {}
  for (let i = 0; i < input.length; i++) {
    let currentLine = input[i]
    if (currentLine === "") {
    }
    let [left, right] = currentLine.split(": ")
    //console.log({ left }, { right })
    switch (left) {
      case "seed-to-soil map:":
        let seedToSoil = []
        for (let j = i + 1; j < findTheBreak(i, input) + i; j++) {
          seedToSoil.push(input[j].split(" "))
        }
        maps.seed_to_soil = seedToSoil
        break
      case "soil-to-fertilizer map:":
        let soilToFertilizer = []
        for (let j = i + 1; j < findTheBreak(i, input) + i; j++) {
          soilToFertilizer.push(input[j].split(" "))
        }
        maps.soil_to_fertilizer = soilToFertilizer
        break
      case "fertilizer-to-water map:":
        let fertilizerToWater = []
        for (let j = i + 1; j < findTheBreak(i, input) + i; j++) {
          fertilizerToWater.push(input[j].split(" "))
        }
        maps.fertilizer_to_water = fertilizerToWater
        break
      case "water-to-light map:":
        let waterToLight = []
        for (let j = i + 1; j < findTheBreak(i, input) + i; j++) {
          waterToLight.push(input[j].split(" "))
        }
        maps.water_to_light = waterToLight
        break
      case "light-to-temperature map:":
        let lightToTemperature = []
        for (let j = i + 1; j < findTheBreak(i, input) + i; j++) {
          lightToTemperature.push(input[j].split(" "))
        }
        maps.light_to_temperature = lightToTemperature
        break
      case "temperature-to-humidity map:":
        let temperatureToHumidity = []
        for (let j = i + 1; j < findTheBreak(i, input) + i; j++) {
          temperatureToHumidity.push(input[j].split(" "))
        }
        maps.temperature_to_humidity = temperatureToHumidity
        break
      case "humidity-to-location map:":
        let humidityToLocation = []
        for (let j = i + 1; j < input.length; j++) {
          humidityToLocation.push(input[j].split(" "))
        }
        maps.humidity_to_location = humidityToLocation
    }
  }
  return maps
}
