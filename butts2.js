let test = [ [ 0, 3, 6, 9, 12, 15 ], [ 3, 3, 3, 3, 3 ], [ 0, 0, 0, 0 ] ]

console.log(fillNext(test))

function fillNext(sequences){
    //create new sequences
    let newSequences = sequences.map(seq => seq.map(x => x))
    // push a zero on the last sequence
    sequences[sequences.length-1].push(0)
    for (let i = sequences.length -2; i >=0; i--){
        let previousSeq = sequences[i+1]
        let currentSeq = sequences[i]
        let predictedValue = previousSeq[previousSeq.length-1] + currentSeq[currentSeq.length-1]
        newSequences[i].push(predictedValue)
    }
    console.log(newSequences)
    return newSequences[0][newSequences[0].length-1]
} 