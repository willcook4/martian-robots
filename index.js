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
/* Setup "Landing" */
sampleInput = sampleInput.replace(/\s/g, '')
console.log('sampleInput: ', sampleInput)
let gridWorldWidth = sampleInput[0]
// console.log('gridWorldWidth:', gridWorldWidth);
let gridWorldHeight = sampleInput[1]
// console.log('gridWorldHeight: ', gridWorldHeight);
let robotStartX = sampleInput[2]
console.log('robotStartX: ', robotStartX);
let robotStartY = sampleInput[3]
console.log('robotStartY: ', robotStartY);
let robotStartDirection = sampleInput[4]
console.log('robotStartDirection: ', robotStartDirection);

let movementInstructions = sampleInput.substring(5).split('')
console.log('movementInstructions: ', movementInstructions);

let movementHistory = [] // store the last coordinates and direction

// push in the start position
movementHistory.push({
  xPos: robotStartX,
  yPos: robotStartY,
  direction: robotStartDirection
})

console.log(movementHistory);

movementInstructions.map((instruction, index) => {
  console.log(`${index}: `, instruction)
  switch (instruction) {
    case 'R':
      console.log('Right turn')
      break
    case 'L':
      console.log('Left turn')
      break
    case 'F':
      console.log('Move "forward"')
      break
  }
})

/* TODOs
  - ensure all inputs are uppercase
*/
