// Rover Object Goes Here
// ======================
const rovers = [
    {
      name : 'USA',
      direction : 'E',
      x : 0,
      y : 0,
      travelLog : [{x : 0, y : 0}]
    },
    {
      name : 'China',
      direction : 'W',
      x : 9,
      y : 0,
      travelLog : [{x : 9, y : 0}]
    },
    {
      name : 'Russia',
      direction : 'W',
      x : 9,
      y : 9,
      travelLog : [{x : 9, y : 9}]
    }
   ];
    
  const testSite = [
    ['USA', 'free', 'free', 'free', 'free', 'crater', 'free', 'free', 'free', 'China'],
    ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
    ['free', 'free', 'crater', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
    ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
    ['free', 'free', 'free', 'crater', 'free', 'free', 'free', 'free', 'free', 'free'],
    ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
    ['free', 'crater', 'free', 'free', 'free', 'free', 'free', 'crater', 'free', 'free'],
    ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
    ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
    ['free', 'free', 'free', 'free', 'free', 'crater', 'free', 'free', 'free', 'Russia'],
  ];
  // frfflfrbrbb
  // fflflbbrrff
  // ffffrfffrff
  // ======================
  const turnLeft = rover => {
      switch (rover.direction) {
      case 'N':
        rover.direction = 'W';
        break;
      case 'S':
        rover.direction = 'E';
        break;
      case 'E':
        rover.direction = 'N';
        break;
      case 'W':
        rover.direction = 'S';
        break;
    }
    console.log(`${rover.name} is now facing ${rover.direction}.`);
  }
  
  const turnRight = rover => {
    switch (rover.direction) {
      case 'N':
        rover.direction = 'E';
        break;
      case 'S':
        rover.direction = 'W';
        break;
      case 'E':
        rover.direction = 'S';
        break;
      case 'W':
        rover.direction = 'N';
        break;
    }
    console.log(`${rover.name} is now facing ${rover.direction}.`);
  }
  
  const moveForward = (rover, site) => {
    switch (rover.direction) {
      case 'N':
        if (rover.y > 0) {
          switch (site[rover.y-1][rover.x]) {
            case 'free':
              site[rover.y-1][rover.x] = rover.name;
              site[rover.y][rover.x] = 'free';
              rover.y--;
              rover.travelLog.push({x : rover.x, y : rover.y});
              console.log(`${rover.name} moved forward.`);
              break;
            case 'crater':
              console.log('Crater ahead, we can\'t advance!');
              break;
            default:
              console.log('Enemy ahead, we can\'t advance!');
              break;
          } 
        } else {
          console.log('Can\'t leave test site!');
          break;
        }
        break;
      case 'S':
        if (rover.y < 9) {
          switch (site[rover.y+1][rover.x]) {
            case 'free':
              site[rover.y+1][rover.x] = rover.name;
              site[rover.y][rover.x] = 'free';
              rover.y++;
              rover.travelLog.push({x : rover.x, y : rover.y});
              console.log(`${rover.name} moved forward.`);
              break;
            case 'crater':
              console.log('Crater ahead, we can\'t advance!');
              break;
            default:
              console.log('Enemy ahead, we can\'t advance!');
              break;
          } 
        } else {
          console.log('Can\'t leave test site!');
          break;
        }
        break;
      case 'E':
        if (rover.x < 9) {
          switch (site[rover.y][rover.x+1]) {
            case 'free':
              site[rover.y][rover.x+1] = rover.name;
              site[rover.y][rover.x] = 'free';
              rover.x++;
              rover.travelLog.push({x : rover.x, y : rover.y});
              console.log(`${rover.name} moved forward.`);
              break;
            case 'crater':
              console.log('Crater ahead, we can\'t advance!');
              break;
            default:
              console.log('Enemy ahead, we can\'t advance!');
              break;
          } 
        } else {
          console.log('Can\'t leave test site!');
          break;
        }
        break;
      case 'W':
        if (rover.x > 0) {
          switch (site[rover.y][rover.x-1]) {
            case 'free':
              site[rover.y][rover.x-1] = rover.name;
              site[rover.y][rover.x] = 'free';
              rover.x--;
              rover.travelLog.push({x : rover.x, y : rover.y});
              console.log(`${rover.name} moved forward.`);
              break;
            case 'crater':
              console.log('Crater ahead, we can\'t advance!');
              break;
            default:
              console.log('Enemy ahead, we can\'t advance!');
              break;
          } 
        } else {
          console.log('Can\'t leave test site!');
          break;
        }
        break;
    }
  }
  
  const moveBackward = (rover, site) => {
    switch (rover.direction) {
      case 'N':
        if (rover.y < 9) {
          switch (site[rover.y+1][rover.x]) {
            case 'free':
              site[rover.y+1][rover.x] = rover.name;
              site[rover.y][rover.x] = 'free';
              rover.y++;
              rover.travelLog.push({x : rover.x, y : rover.y});
              console.log(`${rover.name} moved backward.`);
              break;
            case 'crater':
              console.log('Crater behind, we can\'t advance!');
              break;
            default:
              console.log('Enemy behind, we can\'t advance!');
              break;
          } 
        } else {
          console.log('Can\'t leave test site!');
          break;
        }
        break;
      case 'S':
        if (rover.y > 0) {
          switch (site[rover.y-1][rover.x]) {
            case 'free':
              site[rover.y-1][rover.x] = rover.name;
              site[rover.y][rover.x] = 'free';
              rover.y--;
              rover.travelLog.push({x : rover.x, y : rover.y});
              console.log(`${rover.name} moved backward.`);
              break;
            case 'crater':
              console.log('Crater behind, we can\'t advance!');
              break;
            default:
              console.log('Enemy behind, we can\'t advance!');
              break;
          } 
        } else {
          console.log('Can\'t leave test site!');
          break;
        }
        break;
      case 'E':
        if (rover.x > 0) {
          switch (site[rover.y][rover.x-1]) {
            case 'free':
              site[rover.y][rover.x-1] = rover.name;
              site[rover.y][rover.x] = 'free';
              rover.x--;
              rover.travelLog.push({x : rover.x, y : rover.y});
              console.log(`${rover.name} moved backward.`);
              break;
            case 'crater':
              console.log('Crater behind, we can\'t advance!');
              break;
            default:
              console.log('Enemy behind, we can\'t advance!');
              break;
          } 
        } else {
          console.log('Can\'t leave test site!');
          break;
        }
        break;
      case 'W':
        if (rover.x < 9) {
          switch (site[rover.y][rover.x+1]) {
            case 'free':
              site[rover.y][rover.x+1] = rover.name;
              site[rover.y][rover.x] = 'free';
              rover.x++;
              rover.travelLog.push({x : rover.x, y : rover.y});
              console.log(`${rover.name} moved backward.`);
              break;
            case 'crater':
              console.log('Crater behind, we can\'t advance!');
              break;
            default:
              console.log('Enemy behind, we can\'t advance!');
              break;
          } 
        } else {
          console.log('Can\'t leave test site!');
          break;
        }
        break;
    }
  }
  
  /*const commandRover = (commandString, rovers, site) => {
    for (let i = 0; i < commandString.length; i++) {
      switch (commandString.charAt(i)) {
        case 'f':
          moveForward(rovers, site);
          break;
        case 'b':
          moveBackward(rovers, site);
          break;
        case 'l':
          turnLeft(rovers);
          break;
        case 'r':
          turnRight(rovers);
          break;
        default:
          break;
      }
    }
  }
  */
  
  const moveRovers = (commands, rovers, site) => {
    for (let i = 0; i < commands[0].length; i++) {
      for (let j = 0; j < rovers.length; j++) {
        switch (commands[j].charAt(i)) {
          case 'f':
            console.log(`${i+1}. moveForward was called on ${rovers[j].name}!`);
            moveForward(rovers[j], site);
            break;
          case 'b':
            console.log(`${i+1}. moveBackward was called on ${rovers[j].name}!`);
            moveBackward(rovers[j], site);
            break;
          case 'l':
            console.log(`${i+1}. turnLeft was called on ${rovers[j].name}!`);
            turnLeft(rovers[j]);
            break;
          case 'r':
            console.log(`${i+1}. turnRight was called on ${rovers[j].name}!`);
            turnRight(rovers[j]);
            break;
          default:
            console.log(`${i+1}. Invalid command ${commands[j].charAt(i)} was entered. `);
            console.log(`${rovers[j].name} did not move.`)
            break;
        }
      }
    }
  }
  
  const printLog = log => {
    for (let i = 0; i < log.length; i++) {
      console.log(`${i+1}. x:${log[i].x}, y:${log[i].y}`);
    }
  }
  
  const commands = ['wfrfflfrbrbb', 'fflfqlbbrrff', 'ffffrffwfrgf' ];
  
  moveRovers(commands, rovers, testSite);
  for (let i = 0; i < rovers.length; i++) {
    console.log(`${rovers[i].name}'s travel log:`);
    printLog(rovers[i].travelLog);
  }