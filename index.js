const roverM = {
    direction: 'N',
    x:0,
    y:0,
    travelLog:[{x:0,y:0}]
  };
  // ======================
  
  
  
  
  // ======================
   
  
  function turnLeft(rover){
    console.log("turnLeft was called!");
    let direction = rover.direction;
    switch(direction) {
         case "N":
           rover.direction = 'W',
           console.log(`The rover is facing ${rover.direction}.  Proceed in the -X direction`)
           break;
         case "S":
           rover.direction = 'E'
           console.log(`The rover is facing ${rover.direction}.  Proceed in the +X direction`)
           break;
         case "E":
           rover.direction = 'N'
           console.log(`The rover is facing ${rover.direction}.  Proceed in the -Y direction`)
           break;
         case "W":
           rover.direction = 'S'
           console.log(`The rover is facing ${rover.direction}.  Proceed in the +Y direction`)
           break;
           
       }
  }
  
  function turnRight(rover){
    console.log("turnRight was called!");
    let direction = rover.direction;
    switch(direction) {
         case "N":
           rover.direction = 'E'
           console.log(`The rover is facing ${rover.direction}.  Proceed in the +X direction`)
           break;
         case "S":
           rover.direction = 'W'
           console.log(`The rover is facing ${rover.direction}.  Proceed in the -X direction`)
           break;
         case "E":
           rover.direction = 'S'
           console.log(`The rover is facing ${rover.direction}.  Proceed in the +Y direction`)
           break;
         case "W":
           rover.direction = 'N'
           console.log(`The rover is facing ${rover.direction}.  Proceed in the -Y direction`)
           break;        
       }
  }
  
  function moveForward(rover){
    console.log("moveForward was called")
    if (rover.y >= 0 && rover.y < 10 && rover.x >= 0 && rover.x < 10) {
      let direction = rover.direction;
    switch(direction) {
         case "N":
           rover.y--
          // console.log(`Rover has position: x=${rover.x}, y=${rover.y}`);
           break;
         case "S":
           rover.y++
           //console.log(`Rover has position: x=${rover.x}, y=${rover.y}`);
           break;
         case "E":
           rover.x++
           //console.log(`Rover has position: x=${rover.x}, y=${rover.y}`);
           break;
         case "W":
           rover.x--
          // console.log(`Rover has position: x=${rover.x}, y=${rover.y}`);
           break;  
       }
  //    if (rover.y >= 0 && rover.y < 10) {// || rover.y >= 0 || rover.y <= 10) {
    let newPosition = {x: rover.x, y: rover.y};
         rover.travelLog.push(newPosition) 
    } else {
      console.log(`Error! Error!  The rover is venturing off the grid!`)
    }
  }
   
  function moveBackward(rover){
    console.log("moveBackward was called")
    //object.travellof.push([object.x, object.y])
    if (rover.y >= 0 && rover.y < 10 && rover.x >= 0 && rover.x < 10) {
      let direction = rover.direction;
    switch(direction) {
         case "N":
           rover.y++
           //console.log(`Rover has position: x=${rover.x}, y=${rover.y}`);
           break;
         case "S":
           rover.y--
           //console.log(`Rover has position: x=${rover.x}, y=${rover.y}`);
           break;
         case "E":
           rover.x--
           //console.log(`Rover has position: x=${rover.x}, y=${rover.y}`);
           break;
         case "W":
           rover.x++
           //console.log(`Rover has position: x=${rover.x}, y=${rover.y}`);
           break;  
       }
  //    if (rover.y >= 0 && rover.y < 10) {// || rover.y >= 0 || rover.y <= 10) {    
    let newPosition = {x: rover.x, y: rover.y};
         rover.travelLog.push(newPosition) 
    } else {
      console.log(`Error! Error!  The rover is venturing off the grid!`)
    }
  }
  
  function recordTravel(rover) {
  for (let i=0; i < rover.travelLog.length; i++) {
    console.log(`Path ${i} ==> x=${rover.travelLog[i].x}, y=${rover.travelLog[i].y}`);
  }
  }
  
  function command(rover, orders) {
    //function steps(list) {
        //aca convertimos la lista de un string a array
     //   let listArr = list.split('')

     for (let i = 0; i < orders.length; i++) {
       let order = orders[i];
       if(order === "b" || order === "f" || order === "l" || order === "r") {
             switch(order) {
         case "l":
           turnLeft(rover);
           break;
         case "r":
           turnRight(rover);
           break;
         case "f":
           moveForward(rover);
           break;
         case "b":
           moveBackward(rover);
           break;
         }  
       } else {
         console.log(`${order} is not a recognizable command, please use b - backward, f - forward, l - turn Left, and r - turn right.`)
         return;
       }
   
     }
     recordTravel(roverM)
    }
  
 //command(roverM, list);
  
  //rffrfflfrffr
  
  /*
  turnRight(roverM);
  moveForward(roverM);
  moveForward(roverM);
  moveForward(roverM);
  moveForward(roverM);
  turnRight(roverM);
  moveForward(roverM);
  moveForward(roverM);
  moveForward(roverM);
  turnLeft(roverM);
  turnLeft(roverM);
  console.log(roverM);
  //turnRight('S');
  //moveForward(rover)
  */
  
  //Bonus 1:  crear una matriz (arreglo o arreglos) donde va a(o van) estar ubicado.
  let board = [ 
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '] ];
  
  console.log(board);

//joss.correa@ironhack.com
@jossdz]
