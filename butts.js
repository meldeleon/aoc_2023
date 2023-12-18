class Graph {
  constructor() {
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
  printGraph() {
    let getKeys = this.connectedPipes.keys()

    for (let i of getKeys) {
      let getVals = this.connectedPipes.get(i)
      let concat = ""
      for (let j of getVals) {
        concat += j + " "
        console.log(i + " => " + concat)
      }
    }
  }
}

const butts = new Graph()

butts.addPipe("0,1")
butts.addPipe("0,2")
butts.addConnector("0,1", "0,2")

let pipe = "0,1"
console.log(butts.getPipe(pipe))
pipe = "0,5"
console.log(butts.getPipe(pipe))
