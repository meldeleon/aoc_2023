let test1 = [0, 1, 2, 3]
let test2 = [0, 0, 0, 0]

console.log(seqIsZero(test1))
console.log(seqIsZero(test2))


function seqIsZero(sequence) {
    let total = sequence.reduce(sum, 0)
    return total === 0
}

function sum(a, b) {
    return a + b
}