const input = require("fs")
  .readFileSync("day_09_input.txt")
  .toString()
  .split(/\n/)
  .map(intArr => intArr
    .split(" ")
        .map( x => parseInt(x)))
//console.log(input)
let solutionArr = []

//iterate over each sequence from the input
for (let i=0; i<input.length; i++){
    currentSeq = input[i]
    let builtSequences = buildSequences(currentSeq)
    solutionArr.push(fillPrevious(builtSequences))
}

console.log(solutionArr.reduce(sum,0))



//sequence building functions
function buildSequences(initalSequence){
    let sequences = [initalSequence]
    while (true) {
        //take the latest sequence)
        let lastSeq = sequences[sequences.length-1]
        if (seqIsZero(lastSeq)) break
        sequences.push(findNextSeq(lastSeq))
    }
    return sequences
}

function fillPrevious(sequences){
    let newSequences = sequences.map(seq => seq.map( x => x))
    //unshift a zero onto the last sequence
    sequences[sequences.length-1].unshift(0)
    //iterate over all the sequences
    for (let i = sequences.length - 2; i >= 0; i--){
        let currentSeq = sequences[i]
        let predictedVal = currentSeq[0] - newSequences[i+1][0]
        newSequences[i].unshift(predictedVal)
    }
    return newSequences[0][0]
}


function fillNext(sequences){
    //create new sequences
    let newSequences = sequences.map(seq => seq.map(x => x))
    // push a zero on the last sequence
    sequences[sequences.length-1].push(0)
    for (let i = sequences.length -2; i >=0; i--){
        let currentSeq = sequences[i]
        let previousEndVal = newSequences[i+1][newSequences[i+1].length-1] 
        let currentEndValue = currentSeq[currentSeq.length-1]
        let predictedValue = previousEndVal +  currentEndValue
        newSequences[i].push(predictedValue)
    }
    //console.log({newSequences})
    return newSequences[0][newSequences[0].length-1]
} 

function findNextSeq(sequence) {
    let newSequence = []
    for (let i = 1; i < sequence.length; i++){
        newSequence.push(sequence[i]-sequence[i-1])
        
    }
    return newSequence
}

function seqIsZero(sequence) {
    let total = sequence.reduce(sum, 0)
    return total === 0
}

//math helper functions
function sum (acc, a){
    return acc + a
}

