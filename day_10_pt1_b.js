class Graph {
  constructor(pipeCount) {
    this.connectedPipes = new Map()
  }
  getPipe(p) {
    return this.connectedPipes.get(p)
  }
  addPipe(p) {
    this.connectedPipes.set(p, [])
  }

  addConnector(p1, p2) {
    this.connectedPipes.get(p1).push(p2)
    this.connectedPipes.get(p2).push(p1)
  }
}

let startingPipeLocation

//read input
const pipes = require("fs")
  .readFileSync("day_10_input.txt")
  .toString()
  .split(/\r\n/)
  .map((row, indexRow) => {
    let segmentedRow = row.split("")
    segmentedRow.forEach((x, indexCol) => {
      if (x === "S") {
        startingPipeLocation = [parseInt(indexRow), parseInt(indexCol)]
      }
    })
    return segmentedRow
  })
console.table(pipes)

const pipeGraph = new Graph()

// start by adding our starting pipe to our graph and populating our stack
pipeGraph.addPipe(startingPipeLocation.join())
let connectedToStart = findStartingPipeConnections(startingPipeLocation)
addConnectionsToGraph(startingPipeLocation, connectedToStart)
console.log(pipeGraph)

//initial state of stack is whatever is connected to the start
let stack = connectedToStart

while (true) {
  let currentPipe = stack.shift()
  //if pipe not in graph add it
  if (!pipeGraph.getPipe(currentPipe)) {
    pipeGraph.addPipe(currentPipe.join())
  }
  let connectedPipes = getConnectedPipes(currentPipe)
  addConnectionsToGraph(currentPipe, connectedPipes)
}

function findStartingPipeConnections(startingPipeLocation) {
  let [row, col] = startingPipeLocation
  let adjacentPipes = [
    [parseInt(row) - 1, parseInt(col)],
    [parseInt(row) + 1, parseInt(col)],
    [parseInt(row), parseInt(col) + 1],
    [parseInt(row), parseInt(col) - 1],
  ]
  console.log({ adjacentPipes })
  let connectedPipes = []
  adjacentPipes.forEach((adjPipe) => {
    //check for edge cases
    if (checkForEdgeCase(adjPipe[0], adjPipe[1])) {
      let connectedToAdjPipe = getConnectedPipes(adjPipe).join("")
      if (connectedToAdjPipe.includes(startingPipeLocation)) {
        connectedPipes.push(adjPipe)
      }
    }
  })
  return connectedPipes
}

function getConnectedPipes(pipeLocation) {
  let [row, col] = pipeLocation
  let pipeType = pipes[row][col]
  let connectedPipes = []
  let [up, down, right, left] = [
    [parseInt(row) - 1, parseInt(col)],
    [parseInt(row) + 1, parseInt(col)],
    [parseInt(row), parseInt(col) + 1],
    [parseInt(row), parseInt(col) - 1],
  ]
  switch (pipeType) {
    case "|":
      connectedPipes.push(up, down)
      break
    case "-":
      connectedPipes.push(right, left)
      break
    case "L":
      connectedPipes.push(up, right)
      break
    case "J":
      connectedPipes.push(left, up)
      break
    case "7":
      connectedPipes.push(down, left)
      break
    case "F":
      connectedPipes.push(down, right)
    default:
      return pipeLocation
  }
  let scrubbedConnectedPipes = connectedPipes.filter((pipe) =>
    checkForEdgeCase(pipe)
  )

  return scrubbedConnectedPipes
}

function checkForEdgeCase(row, col) {
  return 0 <= row < pipes.length && 0 <= col < pipes[0].length
}
function addConnectionsToGraph(p, connectedPipes) {
  connectedPipes.forEach((pipe) => {
    if (!pipeGraph.getPipe(pipe)) {
      pipeGraph.addPipe(pipe.join())
    }
    pipeGraph.addConnector(p.join(), pipe.join())
  })
}
