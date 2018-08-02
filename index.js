/*
Sample input:
5 3
1 1 E
RFRFRFRF

RF RF RF RF
*/
let sampleInput0 = `
5 3
1 1 E
RFRFRFRF
`

/* Sample Output0
1 1 E
*/

let sampleInput2 =`
  5 3
  0 3 W
  LLFFFLFLFL
`
/*  Sample output
2 3 S
*/

let sampleInput = sampleInput2

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
  xPos: parseInt(robotStartX),
  yPos: parseInt(robotStartY),
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

let _updateLocation = (previousLocation, direction) => {
  console.log('previousLocation: ', previousLocation)
  console.log('direction: ', direction)
  let newLocation
  switch (direction) {
    case 'N':
      // y++
      newLocation = previousLocation
      newLocation.yPos = parseInt(previousLocation.yPos) + 1
      console.log('New location is +1 y? ', newLocation)
      break
    case 'E':
      // x++
      newLocation = previousLocation
      newLocation.xPos = parseInt(previousLocation.xPos) + 1
      console.log('New location is +1 x? ', newLocation)
      break
    case 'S':
      // y--
      newLocation = previousLocation
      newLocation.yPos = parseInt(previousLocation.yPos) - 1
      console.log('New location is -1 Y? ', newLocation)
      break
    case 'W':
      // x--
      newLocation = previousLocation
      newLocation.xPos = parseInt(previousLocation.xPos) - 1
      console.log('New location is -1 X? ', newLocation)
      break
  }
  console.log('returning newlocation: ', newLocation)
  return newLocation
}

movementInstructions.map((instruction, index) => {
  console.log(`${index}: `, instruction)
  switch (instruction) {
    case 'R':
      console.log('Right turn')
      movementHistory.push({
        xPos: movementHistory[movementHistory.length - 1].xPos, // last xPos
        yPos: movementHistory[movementHistory.length - 1].yPos, // last xPos
        direction: _parseNewDirection(movementHistory[movementHistory.length - 1].direction, instruction)
      })
      break
    case 'L':
      console.log('Left turn')
      movementHistory.push({
        xPos: movementHistory[movementHistory.length - 1].xPos, // last xPos
        yPos: movementHistory[movementHistory.length - 1].yPos, // last xPos
        direction: _parseNewDirection(movementHistory[movementHistory.length - 1].direction, instruction)
      })
      break
    case 'F':
      console.log('Move "forward"')
      // Detect if the robot has gone off the edge of the planet
      let newLocation = _updateLocation({
        xPos: movementHistory[movementHistory.length - 1].xPos,
        yPos: movementHistory[movementHistory.length - 1].yPos},
      movementHistory[movementHistory.length - 1].direction)

      // check if fallen off the planet gridWorld

      // check if a previous robot 'scent' is present

      movementHistory.push({
        xPos: newLocation.xPos, // last xPos
        yPos: newLocation.yPos, // last xPos
        direction: movementHistory[movementHistory.length - 1].direction
      })
      break
  }

  console.log('Last position: ', movementHistory[movementHistory.length - 1])
  console.log(' ')
})

/* TODOs
  - ensure all inputs are uppercase
*/
