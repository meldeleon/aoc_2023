//create a graph clas

const { get } = require("http")

class Graph {
  constructor(pipeCount) {
    this.pipeCount = pipeCount
    this.connectedPipes = new Map()
  }
  addPipe(p) {
    this.connectedPipes.set(p, [])
  }
  addConnector(p1, p2) {
    this.connectedPipes.get(p1).push(p2)
    this.connectedPipes.get(p2).push(p1)
  }
  printGraph() {
    let getKeys = this.connectedPipes.keys()

    for (let i of getKeys) {
      let getVals = this.connectedPipes.get(i)
      let concat = ""
      for (let j of getVals) {
        concat += j + " "
        console.log(i + " => " + cocat)
      }
    }
  }

  // bfs(p)
  // dfs(p)
}

//constants for mapping data
const pipeTypes = {
  "|": ["N", "S"],
  "-": ["E", "W"],
  L: ["N", "E"],
  J: ["N", "W"],
  7: ["S", "W"],
  F: ["S", "E"],
  ".": null,
}

//establish order for directions
const directions = ["N", "E", "S", "W"]

//define direction matches i.e. if a pipe flow south and the pipe below it flows north
const matches = {
  N: "S",
  S: "N",
  E: "W",
  W: "E",
}

let startingPipe

//create pipemap data structure
const pipeMap = require("fs")
  .readFileSync("day_10_input.txt")
  .toString()
  .split(/\r\n/)
  .map((row, indexRow) => {
    let segmentedRow = row.split("")
    segmentedRow.forEach((x, indexCol) => {
      if (x === "S") {
        startingPipe = [parseInt(indexRow), parseInt(indexCol)]
      }
    })
    return segmentedRow
  })

//create a copy of the map for marking the "inner loop"
let loopMap = returnEmptyMap(pipeMap.length, pipeMap[0].length)
//mark the starting value of loopMap
markLoopMap(startingPipe)
let loopStack = findConnectingPipes(startingPipe)
console.log({ loopStack })
let visitedTiles = new Set()

while (true) {
  //grab a connected tile from the stack
  let connectedTile = loopStack.shift()
  //if we have visited a tile, add to set
  visitedTiles.add(connectedTile.join(","))
  console.log({ connectedTile })
  //mark tile as connected
  markLoopMap(connectedTile)
  //find where that tile has connections and push to stack
  let newConnections = findConnectingPipes(connectedTile)
  newConnections.forEach((connectedTile) => {
    if (!visitedTiles.has(connectedTile.join(","))) {
      loopStack.push(connectedTile)
    }
  })
  console.table(loopMap)
  console.log({ loopStack })
  if (compareArr(connectedTile, startingPipe) || loopStack.length <= 0) {
    break
  }
}

function findConnectingPipes(originTile) {
  let connected = []
  let originCol = originTile[0]
  let originRow = originTile[1]
  let originTileType = pipeMap[originCol][originRow]
  let originFlowDirections = pipeTypes[originTileType]
  console.log()
  let tileLocations = [
    [originCol + 1, originRow],
    [originCol, originRow + 1],
    [originCol - 1, originRow],
    [originCol, originRow - 1],
  ]
  //iterate over each location, if the location is connected, return connected locations
  tileLocations.forEach((location, index) => {
    if (location[0] < pipeMap.length && location[1] < pipeMap[0].length) {
      let directionFromOriginTile = directions[index]
      let tileType = pipeMap[location[0]][location[1]]
      let flowDirections = returnTileTypeDirections(tileType)
      //we are currently in a connected tile, with flow directions, if a flow direction matches the direction we came from, it is connected
      let match = matches[directionFromOriginTile]
      console.log({ tileType }, { flowDirections }, { match })
      if (flowDirections && flowDirections.includes(match)) {
        console.log(`a match was found between ${location} and ${originTile}`)
        connected.push(location)
      }
    }
  })
  console.log({ connected })
  return connected
}

function returnTileTypeDirections(tileType) {
  for (type in pipeTypes) {
    let typeStr = `${type}`
    if (typeStr === tileType) {
      return pipeTypes[type]
    }
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

function markLoopMap(location) {
  //console.log({ location })
  //make a copy of the entire row from pipemap
  let copyOfLocationFromPipeMap = [...pipeMap[location[0]]]
  //mark in the loopmap a copy of the pipemap value
  loopMap[location[0]][location[1]] = copyOfLocationFromPipeMap[location[1]]
}

function compareArr(arrA, arrB) {
  return arrA.join(",") === arrB.join(",")
}
