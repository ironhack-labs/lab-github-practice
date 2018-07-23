var roverOne = {
  name: 'Rover One',
  direction: "N",
  x: 0,
  y: 0,
  travelLog: ['0, 0']
}

var roverTwo = {
  name: 'Rover Two',
  direction: "N",
  x: 1,
  y: 0,
  travelLog: ['0, 0']
}

var grid = [
  ['', '', '', '', '', 'o', '', '', '', ''],
  ['', '', '', 'o', '', '', '', '', '', ''],
  ['', '', 'o', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', 'o', '', '', '', '', ''],
  ['', '', 'o', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', 'o', '', ''],
  ['', '', '', '', '', '', '', '', '', '']
];


var keepPlaying = true;

function playerOne() {
  console.log('\n' + 'Rover One Direction: ' + roverOne.direction); //for starting position
  var command = prompt("Rover 1: Enter the direction you would like the rover to go (F, B, R, or L). Type 'End' to finish the game");

  if (command === 'end') keepPlaying = false;
  else chooseDirection(roverOne, command);
}

function playerTwo() {
  console.log('\n' + 'Rover Two Direction: ' + roverTwo.direction); //for starting position
  var command = prompt("Rover 2: Enter the direction you would like the rover to go (F, B, R, or L). Type 'End' to finish the game");
  
  if (command === 'end') keepPlaying = false;
  else chooseDirection(roverTwo, command);
}

function chooseDirection(rover, command) {

    
      if (command.toUpperCase() === 'F') {
        if (rover.y <= 0 && rover.direction === 'N' || rover.y >= 9 && rover.direction === 'S' || rover.x <= 0 && rover.direction === 'W' || rover.x >= 9 && rover.direction === 'E')  {
          console.log("You must stay in the within the board (Coordinates cannot be less than 0 or more than 9). Try again.");
        } 
        else moveForward(rover);
      }
      else if (command.toUpperCase() === 'B') moveBackwards(rover);
      else if (command.toUpperCase() === 'R') turnRight(rover);
      else if (command.toUpperCase() === 'L') turnLeft(rover);
      else if (command.toUpperCase() !== 'END' || command.toUpperCase() !== 'F' || command.toUpperCase() !== 'R' || command.toUpperCase() !== 'L') {
        console.log("This is not a valid instruction. Please enter 'F', 'R', 'L' or 'End'");
      }


}

function turnLeft(rover){

  switch (rover.direction) {
    case "N": 
      rover.direction = "W";
      break;
    case "E": 
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "S";
      break;
  }

  roverPosition(rover);
  console.log('Rover Direction: ' + rover.direction); 
}

function turnRight(rover){

  switch (rover.direction) {
    case "N": 
      rover.direction = "E";
      break;
    case "E": 
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }

  console.log('Rover Direction: ' + rover.direction);
  roverPosition(rover);   
}

function moveForward(rover){ 
  switch (rover.direction) {
    case "N": 
      rover.y -= 1;
      if (checkforObstacles(rover)) {   //moves rover back to previous position if it hits an obstacle or the other rover
        rover.y += 1;
      }
      break;
    case "S": 
      rover.y += 1;
      if (checkforObstacles(rover)) {
        rover.y -= 1;
      }
      break;
  }

  switch (rover.direction) {
    case "E":
      rover.x += 1;
      if (checkforObstacles(rover)) {
        rover.x -= 1;
      }
      break;
    case "W":
      rover.x -= 1;
      if (checkforObstacles(rover)) {
        rover.x += 1;
      }
      break;
    }

  roverPosition(rover);
}

function moveBackwards(rover) {
  switch (rover.direction) {
    case "N": 
      rover.y += 1;
      if (checkforObstacles(rover)) {   //moves rover back to previous position if it hits an obstacle or the other rover
        rover.y -= 1;
      }
      break;
    case "S": 
      rover.y -= 1;
      if (checkforObstacles(rover)) {
        rover.y += 1;
      }
      break;
  }

  switch (rover.direction) {
    case "E":
      rover.x -= 1;
      if (checkforObstacles(rover)) {
        rover.x += 1;
      }
      break;
    case "W":
      rover.x += 1;
      if (checkforObstacles(rover)) {
        rover.x -= 1;
      }
      break;
  }

  roverPosition(rover);
}

function checkforObstacles(rover) {   //checks for an obstacle on the grid, or the other rover
  if (grid[rover.y][rover.x] !== '') {
    console.log('You hit an obstacle.');
    return true;
  }
  else if (roverOne.x === roverTwo.x && roverOne.y === roverTwo.y) {
    console.log('You hit the other rover. Be careful!');
    return true;
  } 
  else return false;
}

function roverPosition(rover) {
  var xToString = rover.x.toString();
  var yToString = rover.y.toString();
  var combingStrings = xToString + ', ' + yToString; 

  rover.travelLog.push(combingStrings);   //adds new item to array to keep track of rover movements
  console.log(rover.name + ' Current Position: ', rover.travelLog[rover.travelLog.length - 1]);
}

  while (keepPlaying) {   //end the game when both rovers have entered 'end'
    playerOne();
    playerTwo();
  }