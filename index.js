/*
Sample input:
5 3
1 1 E
RFRFRFRF
*/
let sampleInput = `
5 3
1 1 E
RFRFRFRF
`

/* Sample Output
1 1 E

*/

sampleInput = sampleInput.replace(/\s/g, '')
console.log('sampleInput: ', sampleInput)
let gridWorldWidth = sampleInput[0]
// console.log('gridWorldWidth:', gridWorldWidth);
let gridWorldHeight = sampleInput[1]
// console.log('gridWorldHeight: ', gridWorldHeight);
