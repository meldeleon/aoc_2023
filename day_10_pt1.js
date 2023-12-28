class Graph {
  constructor() {
      this.pipes = new Map()
  }
  getPipe(p) {
      return this.pipes.get(p)
  }
  addPipe(p) {
      this.pipes.set(p, new Set())
  }
  addConnector(p1, p2) {
      try
      {
      this.pipes.get(p1).add(p2)
      } 
      catch(error){
          console.log(`error connecting ${p1}, to ${p2}, ${error}`)
      }
  }

}

//we will find S in input parsing
let startingPipeLocation

//parse input => 2D matrix of all the pipes
const pipesMatrix = require("fs").readFileSync("day_10_input.txt")
.toString()
.split(/\n/)
.map((row, indexRow) => {
  let segmentedRow = row.split("")
  segmentedRow.forEach((x, indexCol) => {
    if (x === "S") {
      startingPipeLocation = [parseInt(indexRow), parseInt(indexCol)]
    }
  })
  return segmentedRow
}
)

//console.table(pipesMatrix)

const pipeGraph = new Graph()
//store our pipes in the graph
for (let row = 0; row < pipesMatrix.length; row++) {
  for (let col = 0; col < pipesMatrix[row].length; col++){
      pipeGraph.addPipe([row, col].join(","))
  }
}
//add connections
[...pipeGraph.pipes.keys()].forEach(pipeLocation => {
  let [row, col] = pipeLocation.split(",")
  row = parseInt(row)
  col = parseInt(col)
  let connectedPipes
  if (row === startingPipeLocation[0] && col === startingPipeLocation[1]){
    connectedPipes = findStartingPipeConnections(row, col)
  } else{
    connectedPipes = findConnectedPipes(row, col)
  }
  connectedPipes.forEach(connectedPipe => {
      pipeGraph.addConnector(pipeLocation, connectedPipe.join(','))
  })
})


//start with starting location, and then map store distance from Start in an array

//we will go left and right, incrementing the distance value and when the two paths merge we will stop 
let startStr = startingPipeLocation.join(",")
let [left, right] = pipeGraph.getPipe(startStr)
let lastLeft = startStr
let lastRight = startStr
let steps = 1

while (true || count === 100000){
  if (right === left && right !== undefined) {
      //console.log(`${right} === ${left}`)
      break
  }

  let leftConnected = pipeGraph.getPipe(left)
  nextLeft = moveForward(leftConnected, lastLeft)
  lastLeft = left
  left = nextLeft
  let rightConnected = pipeGraph.getPipe(right)
  nextRight = moveForward(rightConnected, lastRight)
  lastRight = right
  right = nextRight
  steps ++
}

console.log(`the solution is ${steps}`)

//helper functions for traversing graph
function moveForward(pipes, lastPipe){
  for (pipe of pipes){
     if (lastPipe !== pipe){
      return pipe
    }
  }
}


//helper functions for building graph
function findConnectedPipes(row, col){
  let connectorType = pipesMatrix[row][col]
  let connectedPipes = []
  let [up, down, right, left] = [
      [parseInt(row) - 1, parseInt(col)],
      [parseInt(row) + 1, parseInt(col)],
      [parseInt(row), parseInt(col) + 1],
      [parseInt(row), parseInt(col) - 1],
  ]
  switch (connectorType) {
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
    }
    let scrubbedConnectedPipes = connectedPipes.filter((pipe) => checkForEdgeCase(pipe[0], pipe[1]))      
  return scrubbedConnectedPipes
}
function checkForEdgeCase(row, col) {
return (row >= 0 && row < pipesMatrix.length && col >= 0 && col < pipesMatrix[0].length)
}

function findStartingPipeConnections(row, col) {
  //look at all adjacent pipes to the starting pipe
  let adjacentPipes = [
    [parseInt(row) - 1, parseInt(col)],
    [parseInt(row) + 1, parseInt(col)],
    [parseInt(row), parseInt(col) + 1],
    [parseInt(row), parseInt(col) - 1],
  ]
  // initialized which pipes may be connected
  let connectedPipes = []
  //iterate over all adjacent pipes to see what they're connected to
  adjacentPipes.forEach((adjPipe) => {
    //check for edge cases, don't check pipes that are off the grid
    if (checkForEdgeCase(adjPipe[0], adjPipe[1])) {
      //find what pipes the adjacent pipe is connected to
      let pipesConnectedToAdjPipe = findConnectedPipes(adjPipe[0], adjPipe[1])
      //if the adjacent pipe is connected to the starting pipe, push to connected pipes
      pipesConnectedToAdjPipe.forEach( pipeConnectedToAdjPipe => {
        if (pipeConnectedToAdjPipe[0] === row && pipeConnectedToAdjPipe[1] === col)connectedPipes.push(adjPipe)
        
      })
    }
  })
  return connectedPipes
}