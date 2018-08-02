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

let _parseNewDirection = (lastDirection, instructionDirection) => {
  let newDirection
  switch (lastDirection) {
    case 'N':
      switch (instructionDirection) {
        case 'R':
          newDirection = 'E'
          break
        case 'L':
          newDirection = 'W'
          break
      }
      break

    case 'E':
      switch (instructionDirection) {
        case 'R':
          newDirection = 'S'
          break
        case 'L':
          newDirection = 'N'
          break
      }
      break

    case 'S':
      switch (instructionDirection) {
        case 'R':
          newDirection = 'W'
          break
        case 'L':
          newDirection = 'E'
          break
      }
      break

    case 'W':
      switch (instructionDirection) {
        case 'R':
          newDirection = 'N'
          break
        case 'L':
          newDirection = 'S'
          break
      }
      break
  }
  return newDirection
}

movementInstructions.map((instruction, index) => {
  console.log(`${index}: `, instruction)
  switch (instruction) {
    case 'R':
      console.log('Right turn')
      movementHistory.push({
        xPos: movementHistory[0].xPos, // last xPos
        yPos: movementHistory[0].yPos, // last xPos
        direction: _parseNewDirection(movementHistory[movementHistory.length - 1].direction, instruction)
      })
      break
    case 'L':
      console.log('Left turn')
      movementHistory.push({
        xPos: movementHistory[0].xPos, // last xPos
        yPos: movementHistory[0].yPos, // last xPos
        direction: _parseNewDirection(movementHistory[movementHistory.length - 1].direction, instruction)
      })
      break
    case 'F':
      console.log('Move "forward"')
      movementHistory.push({
        xPos: null, // last xPos
        yPos: null, // last xPos
        direction: movementHistory[0].direction
      })
      break
  }

  console.log('Last move: ', movementHistory[movementHistory.length - 1])
})

/* TODOs
  - ensure all inputs are uppercase
*/
