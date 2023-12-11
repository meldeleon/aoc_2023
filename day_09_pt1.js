const input = require("fs")
  .readFileSync("day_09_input.txt")
  .toString()
  .split(/\n/)
  .map(intArr => intArr
    .split(" ")
        .map( x => parseInt(x)))
console.log(input)

//let predictedSequences = predictNext(sequences)
//console.log({sequences}, {predictedSequences})
// let sumPredictions = sumPredictions(predictedSequences)
// console.log({sumPredictions})

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

function predictNext(sequences){
    //make a deep copy
    let newSequences = sequences.map(sequence => sequence.map(x => x))
    console.log(newSequences)
    newSequences[sequences.length-1].push(0)
    for (let i = sequences.length -2 ; i >= 0; i++){
        let previousSeqDifference = sequences[i+1][0]
        newSequences[i].push(previousSeqDifference)
    }
    return newSequences
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
function sum (acc, a){
    return acc + a
}

