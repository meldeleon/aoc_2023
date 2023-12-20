const input = require("fs")
  .readFileSync("day_05_input.txt")
  .toString()
  .split(/\n/)

//create a data structure for our maps
let seedRanges = []
const maps = buildMaps(input)
console.log(seedRanges, maps)

//iterate over each map
for (mapName in maps) {
  //find ranges in map
  let mapRangeNumbers = maps[mapName]
  //declare transformed seed ranges
  let newSeedRanges = []
  //iterate over each range in map
  for (mapRangeNumber of mapRangeNumbers) {
    let [newOrigin, mapRange] = [
      mapRangeNumber[0],
      returnRange(mapRangeNumber[1], mapRangeNumber[2]),
    ]
    console.log({ newOrigin }, { mapRange })
    //iterate over seed ranges, and apply map ranges
    for (seedRange of seedRanges) {
      newSeedRanges.push(applyMapToRanges(seedRange, mapRange, newOrigin))
    }
    seedRanges = newSeedRanges
  }
}

// functions to adjust ranges of our seed ranges, rangeA will always be the seed range and rangeB will always be a map range
function applyMapToRanges(rangeA, rangeB, newOrigin) {
  let [startA, endA] = rangeA
  let [startB, endB] = rangeB
  let shift = startA - newOrigin
  //no intersection [ A ] [ B ]
  if ((startA < startB && endA < startB) || (startB < startA && endB < endA)) {
    // range A will remain unchanged
    return [rangeA]
  }
  //A & B intersect, with A on the left and B on the right [ A [ ] B ]
  else if (startA < startB && endA >= startB && endA < endB) {
    //split the ranges into three; retain the left range, throw away the right range and shift the middle range.
    let [left, center, right] = [
      [startA, startB - 1],
      [startB, endA],
      [endA + 1, endB],
    ]
    return [left, shiftRange(center, shift)]
  }
  //B & A intersect, with B of the left and A on the right [ B [ ] A ]
  else if (startB < startA && endB >= startA && endB < endA) {
    // split the ranges into three, throw away the left range, shift the middle range and retain the right range
    let [left, center, right] = [
      [startB, startA - 1],
      [startA, endB],
      [endB + 1, endA],
    ]
    return [shiftRange(center, shift), right]
  }
  //A is a superset of B [ A [ B ]]
  else if (startB >= startA && endB <= endA) {
    //split the range into three; retain the left/right range and shift the middle range
    let [left, center, right] = [
      [startA, startB - 1],
      [startB, endB],
      [endB + 1, endA],
    ]
    return [left, shiftRange(center, shift), right]
  }
  //B is a superset of A  [ B [A]]
  else if (startA >= startB && endA <= endB) {
    //retain the entirety of rangeA, shifted
    return [shiftRange(rangeA, shift)]
  } else {
    return `edge case found with ${rangeA} and ${rangeB}`
  }
}

function shiftRange(range, shift) {
  let [start, end] = range
  let [newStart, newEnd] = [start - shift, end - shift]
  return [newStart, newEnd]
}

// functions to build data structure
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
          seedRanges = returnSeedRange(right)
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
    let intMapArr = mapArr.map((x) => parseInt(x))
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
  //console.log(`break found at index=${index}`)
  return index
}
function returnSeedRange(seedIdsStr) {
  let seedRange = []
  let numbers = seedIdsStr.split(" ")
  let intNumbers = numbers.map((x) => parseInt(x))
  for (let i = 0; i < intNumbers.length; i += 2) {
    seedRange.push(returnRange(intNumbers[i], intNumbers[i + 1]))
  }
  return seedRange
}
function returnRange(start, length) {
  return [start, start + length - 1]
}
