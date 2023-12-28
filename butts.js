let visited = new Set()

visited.add('1,1')
visited.add('1,2')

let test = new Set('1,2', '1,3')

function moveForward(pipes){
  for (pipe of pipes){
    if (!visited.has(pipe)){
      return pipe
    }
  }
}

console.log(moveForward(['1,2','1,4']))