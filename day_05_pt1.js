let input = require("fs")
  .readFileSync("day_05_input.txt")
  .toString()
  .split(/\n/)

//console.log(input)

let seedsList = []

let maps = {}

//build our data structure of seedsList and Maps:
for (let i = 0; i < input.length; i++) {
  let currentLine = input[i]
  if (currentLine === "") {
  }
  let [left, right] = currentLine.split(": ")
  //console.log({ left }, { right })
  switch (left) {
    case "seeds":
      let seeds = right.split(" ")
      seeds.forEach((seedId) => {
        seedsList.push({
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
      break
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

console.log(maps)

function findTheBreak(i, input) {
  let count = 0
  while (true) {
    count++
    i++
    if (input[i] === "") break
  }
  return count
}

// run the seeds
for (let i = 0; i < seedsList.length; i++) {
  iterateThroughtMapArr(seedsList[i], "seed_to_soil", "seed", "soil")
  iterateThroughtMapArr(seedsList[i], "soil_to_fertilizer", "soil", "fert")
  iterateThroughtMapArr(seedsList[i], "fertilizer_to_water", "fert", "water")
  iterateThroughtMapArr(seedsList[i], "water_to_light", "water", "light")
  iterateThroughtMapArr(seedsList[i], "light_to_temperature", "light", "temp")
  iterateThroughtMapArr(
    seedsList[i],
    "temperature_to_humidity",
    "temp",
    "humidity"
  )
  iterateThroughtMapArr(
    seedsList[i],
    "humidity_to_location",
    "humidity",
    "location"
  )
}

function iterateThroughtMapArr(currentSeed, mapName, origin, valueName) {
  let changed = false
  let number = parseInt(currentSeed[origin])
  for (let j = 0; j < maps[mapName].length; j++) {
    let [destination, source, range] = findDestSrcRange(maps[mapName][j])

    //console.log(number, destination, source, range)
    let newValue = mapStep(number, destination, source, range)
    if (newValue) {
      currentSeed[valueName] = newValue
      //console.log(`we reassign ${currentSeed.seed}.${valueName} to ${newValue}`)
      changed = true
    }
    if (changed === true) {
      break
    }
  }
  if (!changed) {
    currentSeed[valueName] = number
  }
}

function findDestSrcRange(mapArr) {
  let [destination, source, range] = mapArr
  return [parseInt(destination), parseInt(source), parseInt(range)]
}

function mapStep(number, dest, src, range) {
  //check if within range
  if (number >= src && number <= src + range) {
    let difference = number - src
    return dest + difference
  } else {
    return false
  }
}

console.log(maps)
console.log(seedsList)

let locations = []
for (seed in seedsList) {
  locations.push(parseInt(seedsList[seed].location))
}
let solution = Math.min(...locations)
console.log({ solution })
