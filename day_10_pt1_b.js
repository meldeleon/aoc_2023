class Graph {
  constructor(pipeCount) {
    this.connectedPipes = new Map()
  }
  getPipe(p) {
    return this.connectedPipes.get(p)
  }
  addPipe(p) {
    this.connectedPipes.set(p, new Set())
  }
  addConnector(p1, p2) {
    this.connectedPipes.get(p1).add(p2)
    this.connectedPipes.get(p2).add(p1)
  }
  calculateDistance(p1, p2) {
    let [path1Start, path2Start] = this.connectedPipes.get(p1)
    let path1 = this.buildPath(p1, path1Start, p2)
    let path2 = this.buildPath(p1, path2Start, p2)
    console.log(path1, path2)
    if (path1.length <= path2.length) {
      return path1.length
    } else {
      return path2.length
    }
  }
  buildPath(p1, pathStart, p2) {
    let path = [p1, pathStart]
    let endCondition = false
    if (pathStart === p2) {
      return path
    } else {
      while (true) {
        let currentPipe = path[path.length - 1]
        let nextPipes = []
        this.connectedPipes
          .get(currentPipe)
          .forEach((pipe) => nextPipes.push(pipe))
        for (let i = 0; i < nextPipes.length; i++) {
          if (!path.includes(nextPipes[i])) {
            path.push(nextPipes[i])
            console.log(`we are pushing ${nextPipes[i]} to the path`)
          }
          if (nextPipes[i] === p2) {
            endCondition = true
          }
        }
        if (endCondition) {
          return path
          break
        }
      }
    }
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
//building the graph
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
  // console.log(count)
  // console.log(pipeGraph)
}
console.log(pipeGraph.connectedPipes)

//create a loop array
let distances = []
for (let pipe of pipeGraph.connectedPipes) {
  console.log(pipe[0])
  let distance = pipeGraph.calculateDistance(
    startingPipeLocation.join(),
    pipe[0]
  )
  distances.push(distance)
  console.log(distances)
}
let solution = Math.max(...distances)
console.log(distances)
console.log(`the solution is ${solution}`)

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
  connectedPipes.forEach((pipe) => {
    //if pipe has not been added, add it.
    if (!pipeGraph.getPipe(pipe.join())) {
      // console.log(
      //   `${pipe} not found, adding it now, ${pipeGraph.getPipe(pipe)}`
      // )
      pipeGraph.addPipe(pipe.join())
    }
    //if the pipe alread has the connector, do nothing
    pipeGraph.addConnector(p.join(), pipe.join())
  })
  connectionsHaveBeenAdded.add(p.join())
}
