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

//globals
console.table(pipes)
const pipeGraph = new Graph()
const connectionsHaveBeenAdded = new Set()

// start by adding our starting pipe to our graph and populating our stack
let connectedToStart = findStartingPipeConnections(startingPipeLocation)
let stack = connectedToStart
pipeGraph.addPipe(startingPipeLocation.join())
addConnectionsToGraph(startingPipeLocation, connectedToStart)

let count = 0
while (true) {
  let currentPipe = stack.shift()
  //if the current pipe is not in graph add it
  if (!pipeGraph.getPipe(currentPipe)) {
    pipeGraph.addPipe(currentPipe.join())
  }
  //find all connected pipes and add them to the graph
  let connectedPipes = getConnectedPipes(currentPipe)
  addConnectionsToGraph(currentPipe, connectedPipes)

  //iterate over each connected pipe, and if it's been added before do not push to stack, otherwise push to stack
  connectedPipes.forEach((pipe) => {
    if (!connectionsHaveBeenAdded.has(pipe.join())) {
      stack.push(pipe)
    }
  })
  if (stack <= 0) {
    break
  }
  count++
  console.log(count)
  console.log(pipeGraph)
}

function findStartingPipeConnections(startingPipeLocation) {
  let [row, col] = startingPipeLocation
  let adjacentPipes = [
    [parseInt(row) - 1, parseInt(col)],
    [parseInt(row) + 1, parseInt(col)],
    [parseInt(row), parseInt(col) + 1],
    [parseInt(row), parseInt(col) - 1],
  ]
  // console.log({ adjacentPipes })
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
  if (!pipeGraph.getPipe(p)) {
    pipeGraph.addPipe(p.join())
  }
  connectedPipes.forEach((pipe) => {
    if (!pipeGraph.getPipe(pipe)) {
      pipeGraph.addPipe(pipe.join())
    }
    pipeGraph.addConnector(p.join(), pipe.join())
  })
  connectionsHaveBeenAdded.add(p.join())
}
