var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: ['0, 0']
}

var grid = [
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '']
];

console.log('Rover Direction: ' + rover.direction); //for starting position

function chooseDirection() {
  var command = '';

  while (command.toUpperCase() !== 'END') {
    command = prompt("Enter the direction you would like the ship to go (F, R, or L). Type 'End' to finish the game");
    
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
}

function moveForward(rover){ 
  switch (rover.direction) {
    case "N": 
      rover.y -= 1;
      break;
    case "S": 
      rover.y += 1;
      break;
  }

  switch (rover.direction) {
    case "E":
      rover.x += 1;
      break;
    case "W":
      rover.x -= 1;
      break;
  }

  var xToString = rover.x.toString();
  var yToString = rover.y.toString();
  var combingStrings = xToString + ', ' + yToString; 

  rover.travelLog.push(combingStrings);
  console.log("Current Position: ", rover.travelLog[rover.travelLog.length - 1]);
}

function moveBackwards(rover) {
  switch (rover.direction) {
    case "N": 
      rover.y += 1;
      break;
    case "S": 
      rover.y -= 1;
      break;
  }

  switch (rover.direction) {
    case "E":
      rover.x -= 1;
      break;
    case "W":
      rover.x += 1;
      break;
  }

  var xToString = rover.x.toString();
  var yToString = rover.y.toString();
  var combingStrings = xToString + ', ' + yToString; 

  rover.travelLog.push(combingStrings);
  console.log("Current Position: ", rover.travelLog[rover.travelLog.length - 1]);

}

chooseDirection();