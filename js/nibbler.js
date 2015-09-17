window.onload = function() {
  var canvas = document.getElementById('gameBoard');
  var ctx = canvas.getContext("2d");
  var gameSpeed;
  var cellSize;
  var gridWidth;
  var gridHeight;
  var gameInPlay;
  var gameLevel;
  var pauseToggle;
  var nibbler;
  var food;


  function randomX(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  function randomY(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function startGame() {
    gameSpeed = 200
    cellSize = 20;
    gridWidth = canvas.width/cellSize;
    gridHeight = canvas.height/cellSize;
    gameInPlay = true
    gameLevel = 1
    pauseToggle = false;
    nibbler = {
      xMovement: cellSize,
      yMovement: 0,
      width: cellSize,
      length: 2 * cellSize,
      grow: 0,
      foodEaten: 0,
      directionOfTravel: "E",
      bodyParts: [[cellSize*3,cellSize*3],[cellSize*2,cellSize*3]],
      draw: function() {
        for (var i = this.bodyParts.length - 1; i >= 0; i--) {
          this.bodyParts[i]
          ctx.fillStyle = "rgb(255,255,0)";
          ctx.fillRect(this.bodyParts[i][0],this.bodyParts[i][1],cellSize,cellSize);
        }
      },
      move: function() {
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
          food.nextCourse(true);
          this.foodEaten += 1
          this.grow += Math.floor(this.bodyParts.length / 3) + 3;
          speedUpGame();
        }
      },
      checkForCannibalism: function() {
        for (var i = this.bodyParts.length - 1; i > 0; i--) {
          if(this.bodyParts[0][0] === this.bodyParts[i][0] && this.bodyParts[0][1] === this.bodyParts[i][1]) {
            gameOver();
          }
        };
      },
      checkIfFull: function() {
        if(nibbler.foodEaten === 9) {
          levelUp();
        }
      }
    };
    food = {
      width: cellSize,
      height: cellSize,
      x: (randomX(0,20) * cellSize),
      y: (randomY(0,20) * cellSize),
      xOffset: 5,
      yOffset: 16,
      number: 1,
      draw: function() {
        ctx.fillStyle = "rgb(255,255,0)";
        ctx.font = "15px PC Senior";
        ctx.fillText(this.number.toString(), this.x + this.xOffset, this.y + this.yOffset);
      },
      nextCourse: function(increaseFoodNumber) {
        console.log(nibbler.foodEaten)
        if(increaseFoodNumber) {
          food.number++
        }
        this.x = (randomX(0,20) * cellSize);
        this.y = (randomX(0,20) * cellSize);
        for (var i = nibbler.bodyParts.length - 1; i >= 0; i--) {
          if(nibbler.bodyParts[i][0] === this.x && nibbler.bodyParts[i][1] === this.y) {
            this.nextCourse(false);
          }
        };
      }
    }
    game = window.setInterval(draw, gameSpeed)
  }

  startGame()


  function draw() {
    if(canvas.getContext && gameInPlay === true) {
      ctx.clearRect(0,0,500,500);
      ctx.fillStyle = "rgb(0,0,255)";
      ctx.fillRect(0,0,canvas.width,canvas.height)
      ctx.fillStyle = "rgb(0,0,0)";
      // createGameGrid();
      nibbler.move();
      nibbler.loopScreen();
      nibbler.checkForCannibalism();
      nibbler.eatIfPossible();
      // nibbler.checkIfFull();
      if(gameInPlay){
        food.draw();
        nibbler.draw();
      }
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

  window.addEventListener("keydown", interpretKeyboard, false);

  function interpretKeyboard(e) {
    if(gameInPlay){
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
    } else {
        switch(gameLevel) {
          case 1:
          startGame();
          break;
          case 2:
          startLevel(2)
          break;
        }
    }
  }

  function speedUpGame() {
    if(gameSpeed > 75) {
      gameSpeed -= 25
      game = window.clearInterval(game)
      game = window.setInterval(draw, gameSpeed)
    }
  }

  function pauseGame() {
    if(!pauseToggle && gameInPlay === true) {
      ctx.fillStyle = "rgb(220,220,220)";
      ctx.fillRect(100,150,300,200);
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect(110,160,280,180);
      ctx.fillStyle = "rgb(220,220,220)";      ctx.font = "20px PC Senior";
      ctx.fillText("Game paused!", 135, 210);
      ctx.fillText("Press space", 140, 260);
      ctx.fillText("to continue", 140, 290);

      game = window.clearInterval(game)
      pauseToggle = true
    } else if(pauseToggle && gameInPlay === true) {
      game = window.setInterval(draw, gameSpeed)
      pauseToggle = false
    }
  }

  function gameOver() {
    ctx.fillStyle = "rgb(220,220,220)";
    ctx.fillRect(100,150,300,200);
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(110,160,280,180);
    ctx.fillStyle = "rgb(220,220,220)";
    ctx.font = "20px PC Senior";
    ctx.fillText("Game over!", 150, 225);
    ctx.fillText("Press any key", 124, 255);
    ctx.fillText("to play again", 123, 285);
    game = window.clearInterval(game)
    gameInPlay = false
  }

  function levelUp() {
    game = window.clearInterval(game)
    ctx.fillStyle = "rgb(220,220,220)";
    ctx.fillRect(100,150,300,200);
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(110,160,280,180);
    ctx.fillStyle = "rgb(220,220,220)";
    ctx.font = "18px PC Senior";
    ctx.fillText("Level complete!", 120, 225);
    ctx.fillText("Press any key", 134, 255);
    ctx.fillText("to continue", 152, 285);
    gameInPlay = false
  }
}