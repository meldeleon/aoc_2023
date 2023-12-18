const beamModifierMap = require("fs")
  .readFileSync("day_16_input.txt")
  .toString()
  .split(/\r\n/)
  .map((row) => row.split("").map((col) => col))

console.table(beamModifierMap)

class Beam {
  constructor(direction, location) {
    this.direction = direction
    this.location = location
    this.terminated = false
  }
  getDirection() {
    return this.direction
  }

  getLocation() {
    return this.location
  }

  getTermination() {
    return this.terminated
  }

  changeDirection(newDirection) {
    this.direction = newDirection
  }
  changeLocation(newLocation) {
    this.location = newLocation
  }
  terminate() {
    this.terminated = true
  }
}

let energized = returnEmptyMap(
  beamModifierMap.length,
  beamModifierMap[0].length
)

let beams = []
//Create our first beam
beams.push(new Beam("E", [0, 0]))
shineBeam(0)
shineBeam(0)
shineBeam(0)
shineBeam(0)
shineBeam(0)
shineBeam(0)
shineBeam(0)
shineBeam(0)
console.log(JSON.stringify(beams))
console.log({ energized })
let count = 0
// while (true) {
//   console.log("I ran")
//   shineBeam(0)
//   if (beams[0].getTermination()) {
//     break
//   }
//   count++
//   console.log({ count })
// }

function shineBeam(index) {
  //start at the beam starting location
  let currentLocation = beams[index].getLocation()
  let currentDirection = beams[index].getDirection()
  console.log({ currentLocation }, { currentDirection })
  energized[currentLocation[0]][currentLocation[1]] = "#"
  //check what is at the current location
  let beamModifierLoc = beamModifierMap[currentLocation[0]][currentLocation[1]]
  console.log({ beamModifierLoc })
  switch (beamModifierLoc) {
    case ".":
      //if nothing move in current direction
      console.log(moveInDirection(currentDirection, currentLocation))
      if (moveInDirection(currentDirection, currentLocation)) {
        beams[index].changeLocation(
          moveInDirection(currentDirection, currentLocation)
        )
      } else {
        beams[index].terminate()
      }
      break
    case "/":
    case "\\":
      refract(index, beamModifierLoc)
      currentDirection = beams[index].getDirection
      if (moveInDirection(currentDirection, currentLocation)) {
        beams[index].changeLocation(
          moveInDirection(currentDirection, currentLocation)
        )
      } else {
        beams[index].terminate()
      }
      break
    case "|":
    case "-":
      split(index, beamModifierLoc)
      currentDirection = beams[index].getDirection
      if (moveInDirection(currentDirection, currentLocation)) {
        beams[index].changeLocation(
          moveInDirection(currentDirection, currentLocation)
        )
      } else {
        beams[index].terminate()
      }
      break
    default:
      console.error(
        `cannot read beam modifier ${beamModifierLoc}, at ${currentLocation}`
      )
  }
}

function refract(index, refractorType) {
  let beamDirection = beams[index].getDirection()
  let newDirection
  if (refractorType === "\\") {
    switch (beamDirection) {
      case "N":
        newDirection = "W"
        break
      case "E":
        newDirection = "S"
        break
      case "S":
        newDirection = "E"
        break
      case "W":
        newDirection = "N"
      default:
        break
    }
  } else if (refractorType === "/") {
    switch (beamDirection) {
      case "N":
        newDirection = "E"
        break
      case "E":
        newDirection = "N"
        break
      case "S":
        newDirection = "W"
        break
      case "W":
        newDirection = "S"
        break
      default:
        break
    }
    beams[index].changeDirection(newDirection)
  } else {
    console.error(`invalid input ${beamDirection} or ${refractorType}`)
  }
}

function split(index, splitType) {
  let direction = beams[index].getDirection()
  let location = beams[index].getLocation()
  if (splitType === "|") {
    switch (direction) {
      case "N":
      case "S":
        //do nothing
        break
      case "E":
      case "W":
        beams[index].changeDirection("N")
        beams.push(new Beam("S", location))
        break
    }
  }
  if (splitType === "-") {
    switch (direction) {
      case "E":
      case "W":
        //do nothing
        break
      case "N":
      case "S":
        beams[index].changeDirection("E")
        beams.push(new Beam("W", location))
        break
    }
  }
}

function moveInDirection(direction, location) {
  let [row, col] = location
  console.log({ direction }, { row }, { col })
  switch (direction) {
    case "N":
      if (row - 1 < 0) return [row - 1, col]
      else return false
      break
    case "E":
      if (col + 1 < beamModifierMap[0].length) return [row, col + 1]
      else return false
      break
    case "S":
      if (row + 1 > beamModifierMap.length) return [row + 1, col]
      else return false
      break
    case "W":
      if (col - 1 > 0) return [row, col - 1]
      else return false
      break
  }
}

function returnEmptyMap(numRow, numCol) {
  let map = []
  for (let i = 0; i < numRow; i++) {
    map.push([])
    for (let j = 0; j < numCol; j++) {
      map[i].push(".")
    }
  }
  return map
}
