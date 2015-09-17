window.onload = function() {
  var canvas = document.getElementById('gameBoard');
  var ctx = canvas.getContext("2d");
  var gameSpeed = 500
  var cellSize = 20;
  var gridWidth = canvas.width/cellSize;
  var gridHeight = canvas.height/cellSize;
  var pauseToggle = false;
  var nibbler = {
    xMovement: cellSize,
    yMovement: 0,
    width: cellSize,
    length: 2 * cellSize,
    grow: 0,
    directionOfTravel: "E",
    bodyParts: [[cellSize*3,cellSize*3],[cellSize*2,cellSize*3]],
    draw: function() {
      for (var i = this.bodyParts.length - 1; i >= 0; i--) {
        this.bodyParts[i]
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(this.bodyParts[i][0],this.bodyParts[i][1],cellSize,cellSize);
      }
    },
    move: function() {
      console.log(this.grow)
      if(this.directionOfTravel === "S"){
        this.bodyParts.unshift([(this.bodyParts[0][0]),(this.bodyParts[0][1] + cellSize)]);
      } else if(this.directionOfTravel === "N"){
        this.bodyParts.unshift([(this.bodyParts[0][0]),(this.bodyParts[0][1] - cellSize)]);
      } else if(this.directionOfTravel === "E"){
        this.bodyParts.unshift([(this.bodyParts[0][0] + cellSize),(this.bodyParts[0][1])]);
      } else if(this.directionOfTravel === "W"){
        this.bodyParts.unshift([(this.bodyParts[0][0] - cellSize),(this.bodyParts[0][1])]);
      }
      if(this.grow === 0) {
        this.bodyParts.pop();
      } else {
        this.grow -= 1
      }
    },
    loopScreen: function() {
      if(nibbler.bodyParts[0][0] >= canvas.width ) {
        nibbler.bodyParts[0][0] = 0;
      } else if(nibbler.bodyParts[0][1] < 0) {
        nibbler.bodyParts[0][1] += canvas.height;
      } else if(nibbler.bodyParts[0][0] < 0 ) {
        nibbler.bodyParts[0][0] += canvas.width;
      } else if(nibbler.bodyParts[0][1] >= canvas.height) {
        nibbler.bodyParts[0][1] = 0;
      }
    },
    eatIfPossible: function() {
      if(this.bodyParts[0][0] === food.x && this.bodyParts[0][1] === food.y){
        food.nextCourse();
        this.grow += Math.floor(this.bodyParts.length / 3) + 3;
        speedUpGame();
      }
    }
  };
  var food = {
    width: cellSize,
    height: cellSize,
    x: (randomX(0,20) * cellSize),
    y: (randomY(0,20) * cellSize),
    draw: function() {
      ctx.fillStyle = "rgb(0,0,200)";
      ctx.fillRect(this.x,this.y,20,20);
    },
    nextCourse: function() {
      this.x = (randomX(0,20) * cellSize);
      this.y = (randomX(0,20) * cellSize);
    }
  }

  function randomX(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  function randomY(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }


  game = window.setInterval(draw, gameSpeed)


  function draw() {
    if(canvas.getContext) {
      ctx.clearRect(0,0,500,500);
      createGameGrid();
      nibbler.move();
      nibbler.loopScreen();
      nibbler.eatIfPossible();
      food.draw();
      nibbler.draw();
      console.log(nibbler.bodyParts[0][0])
    }
  }

  function createGameGrid() {
    for (var i = 0; i < gridWidth; i++) {
      ctx.fillRect(i*cellSize,0,1,gridHeight*cellSize);
    };
    for (var i = 0; i < gridHeight; i++) {
      ctx.fillRect(0,i*cellSize,gridWidth*cellSize,1);
    };
  }

  window.addEventListener("keydown", changeDirection, false);

  function changeDirection(e) {
    switch(e.keyCode) {
      case 40:
      if(nibbler.directionOfTravel !== "N") {
        nibbler.directionOfTravel = "S";
      }
      break;
      case 37:
      if(nibbler.directionOfTravel !== "E") {
        nibbler.directionOfTravel = "W";
      }
      break;
      case 38:
      if(nibbler.directionOfTravel !== "S") {
        nibbler.directionOfTravel = "N";
      }
      break;
      case 39:
      if(nibbler.directionOfTravel !== "W") {
        nibbler.directionOfTravel = "E";
      }
      break;
      case 32:
      pauseGame();
      break;
    }
  }

  function speedUpGame() {
    gameSpeed -= 40
    game = window.clearInterval(game)
    game = window.setInterval(draw, gameSpeed)
  }

  function pauseGame() {
    if(!pauseToggle) {
      game = window.clearInterval(game)
      pauseToggle = true
    } else if(pauseToggle) {
      game = window.setInterval(draw, 500)
      pauseToggle = false
    }
  }
}