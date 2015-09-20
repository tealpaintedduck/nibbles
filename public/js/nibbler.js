  function Game(canvas, context) {
    this.canvas = canvas;
    this.ctx =  context;
    this.initialiseNewGame();
  }

  Game.prototype.initialiseNewGame = function() {
    this.gameSpeed = 230;
    this.cellSize = 20;
    this.gridWidth = this.canvas.width/this.cellSize;
    this.gridHeight = this.canvas.height/this.cellSize;
    this.gameInPlay = true;
    this.gameLevel = 1;
    this.pauseToggle = false;
    this.nibbler = new Snake(this.cellSize);
    this.food = new Food(this.cellSize);
    this.walls = [[]];
    this.tickIntervalId = 0;
  };

  Game.prototype.start = function() {
    this.tickIntervalId = window.setInterval(this.tickIfGameInPlay.bind(this), this.gameSpeed);
  };


  Game.prototype.tickIfGameInPlay = function() {
    if(this.gameInPlay === true){
      this.tick();
    }
  };

  Game.prototype.tick = function() {
    this.updatePositions();
    this.checkForGameOver();
    this.speedUpIfNibblerEats();
    this.nibbler.checkIfFull();
    if(this.gameInPlay === true) {
      this.drawAll();
    }
  };

  Game.prototype.updatePositions = function() {
    this.nibbler.move();
    this.nibbler.loopScreen(this.canvas);
  };

  Game.prototype.checkForGameOver = function() {
    if(this.nibbler.cannibalism() || this.nibbler.hasCrashed(this.walls)) {
      this.gameOver();
    }
  };

  Game.prototype.speedUpIfNibblerEats = function() {
    if(this.nibbler.eatIfPossible(this.food)) {
      this.speedUpGame();
      this.food.nextCourse(true, this.nibbler, this.walls);
    }
  };

  Game.prototype.drawAll = function() {
    this.drawBackground();
    this.nibbler.draw(this.ctx);
    this.food.draw(this.ctx);
  };

  Game.prototype.drawBackground = function() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fillStyle = "rgb(0,0,255)";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
  };

  function startGame() {
    level = {
      draw: function(level) {
        switch(level) {
          case 2:
          drawLevelTwo();
          break;
          case 3:
          drawLevelThree();
        }
      }
    }
  }

  function drawLevelTwo() {
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(cellSize * 8,cellSize * 16,cellSize * 45,cellSize);
    var wallOne = {
      axisDirection: "h",
      startCoord: [cellSize * 8, cellSize * 16],
      totalLength: cellSize * 45
    }
    walls = calculateWall(wallOne.axisDirection, wallOne.startCoord, wallOne.totalLength);
  };

  function drawLevelThree() {
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(cellSize * 19,cellSize * 6,cellSize,cellSize * 23);
    var wallOne = {
      axisDirection: "v",
      startCoord: [cellSize * 19, cellSize * 6],
      totalLength: cellSize * 23
    }
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(cellSize * 49,cellSize * 6,cellSize,cellSize * 23);
    var wallTwo = {
      axisDirection: "v",
      startCoord: [cellSize * 49, cellSize * 6],
      totalLength: cellSize * 23
    }
    walls = calculateWall(wallOne.axisDirection, wallOne.startCoord, wallOne.totalLength);
    walls = walls.concat(calculateWall(wallTwo.axisDirection, wallTwo.startCoord, wallTwo.totalLength))
  }

  function calculateWall(axis, start, length) {
    arr = [start]
    lastX = start[0]
    lastY = start[1]
    if(axis === "h") {
      for (var i = 0; i < (length/cellSize); i++) {
        arr.push([lastX + cellSize,start[1]]);
        lastX = lastX + cellSize;
      };
    } else if(axis === "v") {
      for (var i = 0; i < (length/cellSize); i++) {
        arr.push([start[0], lastY + cellSize]);
        lastY = lastY + cellSize;
      };
    }
    return arr
  }


  function draw() {
    if(canvas.getContext && gameInPlay === true) {
      if(gameLevel > 1) {
        level.draw(gameLevel);
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



  Game.prototype.interpretKeyboard = function(e) {
    if(this.gameInPlay){
      switch(e.keyCode) {
        case 40:
        if(this.nibbler.directionOfTravel !== "N") {
          this.nibbler.directionOfTravel = "S";
        }
        break;
        case 37:
        if(this.nibbler.directionOfTravel !== "E") {
          this.nibbler.directionOfTravel = "W";
        }
        break;
        case 38:
        if(this.nibbler.directionOfTravel !== "S") {
          this.nibbler.directionOfTravel = "N";
        }
        break;
        case 39:
        if(this.nibbler.directionOfTravel !== "W") {
          this.nibbler.directionOfTravel = "E";
        }
        break;
        case 32:
        this.pauseGame();
        break;
      }
    } else {
        this.initialiseNewGame();
        this.start();
    }
  }

  Game.prototype.speedUpGame = function() {
    if(this.gameSpeed > 65) {
      this.gameSpeed -= 35
      console.log(this.gameSpeed)
      this.tickIntervalId = window.clearInterval(this.tickIntervalId)
      this.tickIntervalId = window.setInterval(this.tickIfGameInPlay.bind(this), this.gameSpeed)
    }
  }

  Game.prototype.pauseGame = function() {
    if(!this.pauseToggle && this.gameInPlay === true) {
      this.drawNotificationBoard();
      this.ctx.font = "20px PC Senior";
      this.ctx.fillText("Game paused!", 485, 310);
      this.ctx.fillText("Press space", 490, 360);
      this.ctx.fillText("to continue", 490, 390);

      this.tickIntervalId = window.clearInterval(this.tickIntervalId)
      this.pauseToggle = true
    } else if(this.pauseToggle && this.gameInPlay === true) {
      this.tickIntervalId = window.setInterval(this.tickIfGameInPlay.bind(this), this.gameSpeed)
      this.pauseToggle = false
    }
  }

  Game.prototype.gameOver = function() {
    this.drawNotificationBoard();
    this.ctx.font = "20px PC Senior";
    this.ctx.fillText("Game over!", 500, 325);
    this.ctx.fillText("Press any key", 474, 355);
    this.ctx.fillText("to play again", 472, 385);
    this.tickIntervalId = window.clearInterval(this.tickIntervalId)
    this.gameInPlay = false
  }

  Game.prototype.levelUp = function() {
    this.gameLevel++
    this.tickIntervalId = window.clearInterval(this.tickIntervalId)
    this.drawNotificationBoard();
    this.ctx.font = "18px PC Senior";
    this.ctx.fillText("Level complete!", 470, 325);
    this.ctx.fillText("Press any key", 484, 355);
    this.ctx.fillText("to continue", 502, 385);
    this.gameInPlay = false
  }

  Game.prototype.drawNotificationBoard = function() {
    this.ctx.fillStyle = "rgb(220,220,220)";
    this.ctx.fillRect(450,250,300,200);
    this.ctx.fillStyle = "rgb(200,0,0)";
    this.ctx.fillRect(460,260,280,180);
    this.ctx.fillStyle = "rgb(220,220,220)";
  }


window.onload = function() {
  var canvas = document.getElementById('gameBoard');
  var ctx = canvas.getContext("2d");
  var game = new Game(canvas, ctx);
  window.addEventListener("keydown", game.interpretKeyboard.bind(game), false);
  game.start();
}