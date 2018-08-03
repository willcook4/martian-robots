let sampleInput = `
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
`

sampleInput = sampleInput.replace(/\s/g, '') // remove whitespaces
console.log(sampleInput);
let gridWorldWidth = sampleInput[0]
// console.log('gridWorldWidth:', gridWorldWidth);
let gridWorldHeight = sampleInput[1]

robotInstructions = sampleInput.substring(2)
console.log('robotInstructions: ', robotInstructions)

console.log('AFF: ', robotInstructions.match(/\d\d[A-Z]+[^\d]/gi))
let robots = robotInstructions.match(/\d\d[A-Z]+[^\d]/gi)
