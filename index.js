
// Functions
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

let _checkIfOffGrid = (newLocation) => {
  let offGrid = false
  if (newLocation.xPos > gridWorldWidth) {
    console.log('Robot fell off the Eastern edge at: ', newLocation) // - 1  for last safe position??
    offGrid = true
  }
  if (newLocation.yPos > gridWorldHeight) {
    console.log('Robot fell off the Northern edge at: ', newLocation)
    offGrid = true
  }
  if (newLocation.xPos < 0) {
    console.log('Robot fell off the Southern edge at: ', newLocation)
    offGrid = true
  }
  if (newLocation.yPos < 0) {
    console.log('Robot fell off the Western edge at: ', newLocation)
    offGrid = true
  }
  console.log('Robot is offGrid: ', offGrid)
  return offGrid
}

// let scents = [{xPos: 3, yPos: 3, direction: 'N'}] // TESTING
let scents = []

let _checkForScent = (lastLocation) => {
  let match = false
  scents.map(scent => {
    if (lastLocation.xPos === scent.xPos &&
      lastLocation.yPos === scent.yPos &&
      lastLocation.direction === scent.direction
    ) {
      match = true
    }
  })
  console.log('Previous robot been here? ', match)
  return match
}

/* TODOs
  - ensure all inputs are uppercase
  - Add debugging
  - clean up output
*/


/*
Sample input:
5 3
1 1 E
RFRFRFRF

RF RF RF RF
*/
let sampleInput1 = `
5 3
1 1 E
RFRFRFRF
`

/* Sample Output1
1 1 E
*/

let sampleInput2 = `
5 3
3 2 N
FRRFLLFFRRFLL
`
/* sampleOutput2
  3 3 N LOST
*/

let sampleInput3 =`
  5 3
  0 3 W
  LLFFFLFLFL
`
/*  Sample output3
2 3 S
*/

let sampleInputAll = `
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
`

let sampleInput = sampleInputAll
let debugging = true

sampleInput = sampleInput.replace(/\s/g, '') // remove whitespaces

let gridWorldWidth = sampleInput[0]
if (debugging) { console.log('gridWorldWidth:', gridWorldWidth) }
let gridWorldHeight = sampleInput[1]

let robotInstructions = sampleInput.substring(2)
if (debugging) { console.log('robotInstructions: ', robotInstructions) }

// console.log(': ', robotInstructions.match(/\d\d[A-Z]+[^\d]/gi))
let robots = robotInstructions.match(/\d\d[A-Z]+[^\d]/gi)

robots.map((robot, index) => {
  if (debugging) { console.log('Robot (', index , ') ',robot) }

  let robotStartX = robot[0]
  // console.log('robotStartX: ', robotStartX);
  let robotStartY = robot[1]
  // console.log('robotStartY: ', robotStartY);
  let robotStartDirection = robot[2]
  // console.log('robotStartDirection: ', robotStartDirection);

  let movementInstructions = robot.substring(3).split('')
  console.log('movementInstructions: ', movementInstructions);

  let movementHistory = [] // store the last coordinates and direction

  // // push in the start position
  movementHistory.push({
    xPos: parseInt(robotStartX),
    yPos: parseInt(robotStartY),
    direction: robotStartDirection
  })
  console.log(movementHistory);

  /* Run through the instructions */
  // movementInstructions.map((instruction, index) => {
  for (var i = 0; i < movementInstructions.length; i++) {
    let robotLost = false
    if (robotLost) {
      console.log('SKIPPING ROBOT LOST');
      break
    }

    let instruction = movementInstructions[i]
    console.log(`${i}: `, instruction)
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

        // check if a previous robot 'scent' is present at that location
        let smellForScent = _checkForScent({
          xPos: movementHistory[movementHistory.length - 1].xPos,
          yPos: movementHistory[movementHistory.length - 1].yPos,
          direction: movementHistory[movementHistory.length - 1].direction}
        )
        if (smellForScent) {
          // ignore moevemt, previous robot fell off here
          console.log('ignoring instruction, do not want to fall off like the last one')
          break
        }

        if (_checkIfOffGrid(newLocation) === true) { // no scent, robot is LOST
          console.log('LOST!!!! adding to scents')
          scents.push({
            xPos: movementHistory[movementHistory.length - 1].xPos, // last xPos
            yPos: movementHistory[movementHistory.length - 1].yPos, // last xPos
            direction: movementHistory[movementHistory.length - 1].direction
          })
          console.log('Updated scents: ', scents)
          robotLost = true
          break
        }

        movementHistory.push({
          xPos: newLocation.xPos, // last xPos
          yPos: newLocation.yPos, // last xPos
          direction: movementHistory[movementHistory.length - 1].direction
        })
        break
    }

    // console.log('Last position: ', movementHistory[movementHistory.length - 1])
    if (robotLost) {
      console.log(movementHistory[movementHistory.length - 1].xPos.toString(),
                  // ' ',
                  movementHistory[movementHistory.length - 1].yPos.toString(),
                  // ' ',
                  movementHistory[movementHistory.length - 1].direction,
                  'LOST')
      break
    }
    if (i === (movementInstructions.length - 1)) {
      if (debugging) { console.log('LAST ONE: ') }
      console.log(`${movementHistory[movementHistory.length - 1].xPos.toString()} ${movementHistory[movementHistory.length - 1].yPos.toString()} ${movementHistory[movementHistory.length - 1].direction}`)
      console.log('_____')
    }
    console.log(' ')
  }
})
