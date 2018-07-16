var rover = {
  direction: "N",
  x: 0,
  y: 0
}

function chooseDirection () {
  var command = '';

  while (command.toUpperCase() !== 'END') {
    command = prompt('Enter the direction you would like the ship to go (f, r, or l). Type end to finish the game');
    if (command.toUpperCase() === 'F') moveForward(rover);
    else if (command.toUpperCase() === 'R') turnRight(rover);
    else if (command.toUpperCase() === 'L') turnLeft(rover);
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

  console.log(rover.direction); //test
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

  console.log(rover.direction);   //test
}

function moveForward(rover){
  
  switch (rover.direction) {
    case "N": 
      // if (rover.y < 0 || rover.y > 9) console.log("You must stay in the within the board (Coordinates cannot be less than 0 or more than 9)");
      // else rover.y -= 1;
      rover.y -= 1;
      console.log(rover.y);
      break;
    case "S": 
      rover.y += 1;
      console.log(rover.y);
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

  console.log("moveForward was called") //test
}

// turnLeft(rover);
// turnRight(rover);
// moveForward(rover);
chooseDirection();