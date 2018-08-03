
/* Functions */

// Returns the new direction (N, S, E W) for when a robot turns, instruction direction given( L || R )
// Takes in old direction string and returns new direction string
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

// Takes a previous location and direction and adds the movement to it.
let _updateLocation = (previousLocation, direction) => {
  let newLocation
  switch (direction) {
    case 'N':
      // y++
      newLocation = previousLocation
      newLocation.yPos = parseInt(previousLocation.yPos) + 1
      break
    case 'E':
      // x++
      newLocation = previousLocation
      newLocation.xPos = parseInt(previousLocation.xPos) + 1
      break
    case 'S':
      // y--
      newLocation = previousLocation
      newLocation.yPos = parseInt(previousLocation.yPos) - 1
      break
    case 'W':
      // x--
      newLocation = previousLocation
      newLocation.xPos = parseInt(previousLocation.xPos) - 1
      break
  }
  return newLocation
}

// Check to see if the new location is off the planet grid
// returns Boolean
let _checkIfOffGrid = (newLocation) => {
  let offGrid = false
  if (newLocation.xPos > gridWorldWidth) {
    // Robot fell off the Eastern edge
    offGrid = true
  }
  if (newLocation.yPos > gridWorldHeight) {
    // Robot fell off the Northern edge
    offGrid = true
  }
  if (newLocation.xPos < 0) {
    // Robot fell off the Southern edge
    offGrid = true
  }
  if (newLocation.yPos < 0) {
    // Robot fell off the Western edge
    offGrid = true
  }
  return offGrid
}

// Global record of robot scents, last location before falling off planet
let scents = []

// returns Boolean of scent match on the last location provided
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
  return match
}

/* TODOs
  - ensure all inputs are uppercase
  - tests
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

sampleInput = sampleInput.replace(/\s/g, '') // remove whitespaces
let gridWorldWidth = sampleInput[0] // The width of the planet grid
let gridWorldHeight = sampleInput[1] // The height the planet grid
let robotInstructions = sampleInput.substring(2)
let robots = robotInstructions.match(/\d\d[A-Z]+[^\d]/gi)

robots.map((robot, index) => {
  let robotStartX = robot[0] // robot starting X position
  let robotStartY = robot[1] // robot starting Y position
  let robotStartDirection = robot[2] // robot starting direction
  let movementInstructions = robot.substring(3).split('') // movement instructions for this robot

  let movementHistory = [] // store the last coordinates and direction

  // push in the start position
  movementHistory.push({
    xPos: parseInt(robotStartX),
    yPos: parseInt(robotStartY),
    direction: robotStartDirection
  })

  /* Run through the instructions */
  for (var i = 0; i < movementInstructions.length; i++) { // not mappping as need to break
    let robotLost = false
    if (robotLost) {
      // Skipping the rest of moevement instructions the robot is lost
      break
    }

    let instruction = movementInstructions[i]
    switch (instruction) {
      case 'R':
        movementHistory.push({
          xPos: movementHistory[movementHistory.length - 1].xPos, // last xPos
          yPos: movementHistory[movementHistory.length - 1].yPos, // last xPos
          direction: _parseNewDirection(movementHistory[movementHistory.length - 1].direction, instruction)
        })
        break
      case 'L':
        movementHistory.push({
          xPos: movementHistory[movementHistory.length - 1].xPos, // last xPos
          yPos: movementHistory[movementHistory.length - 1].yPos, // last xPos
          direction: _parseNewDirection(movementHistory[movementHistory.length - 1].direction, instruction)
        })
        break
      case 'F':
        // Move "forward"
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
          break
        }

        if (_checkIfOffGrid(newLocation) === true) { // no scent, robot is LOST
          scents.push({
            xPos: movementHistory[movementHistory.length - 1].xPos, // last xPos
            yPos: movementHistory[movementHistory.length - 1].yPos, // last xPos
            direction: movementHistory[movementHistory.length - 1].direction // last direction
          })
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

    if (robotLost) {
      // Last position report for lost robot
      console.log(`${movementHistory[movementHistory.length - 1].xPos.toString()} ${movementHistory[movementHistory.length - 1].yPos.toString()} ${movementHistory[movementHistory.length - 1].direction} LOST`)
      break
    }
    if (i === (movementInstructions.length - 1)) {
      // LAST movementInstruction
      console.log(`${movementHistory[movementHistory.length - 1].xPos.toString()} ${movementHistory[movementHistory.length - 1].yPos.toString()} ${movementHistory[movementHistory.length - 1].direction}`)
    }
  }
})
