function Game(canvas, context) {
  this.canvas = canvas;
  this.ctx =  context;
  this.initialiseNewGame();
  this.levelLayouts = []
  this.levelLayouts[3] = [
    {
      axisDirection: "v",
      startCoord: [(this.cellSize * 19), this.cellSize * 6],
      totalLength: this.cellSize * 23
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 49, this.cellSize * 6],
      totalLength: this.cellSize * 23
    }
  ]
  this.levelLayouts[2] = [{
    axisDirection: "h",
    startCoord: [(this.cellSize * 8), (this.cellSize * 16)],
    totalLength: (this.cellSize * 45)
  }]
  this.levelLayouts[4] = [
    {
      axisDirection: "v",
      startCoord: [(this.cellSize * 15), 0],
      totalLength: this.cellSize * 18
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 45, this.cellSize * 16],
      totalLength: this.cellSize * 18
    },
    {
      axisDirection: "h",
      startCoord: [0, this.cellSize * 26],
      totalLength: this.cellSize * 27
    },
    {
      axisDirection: "h",
      startCoord: [this.cellSize * 32, this.cellSize * 8],
      totalLength: this.cellSize * 27
    }
  ]
  this.levelLayouts[5] = [
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 15, this.cellSize * 9],
      totalLength: this.cellSize * 18
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 45, this.cellSize * 9],
      totalLength: this.cellSize * 18
    },
    {
      axisDirection: "h",
      startCoord: [this.cellSize * 17, this.cellSize * 7],
      totalLength: this.cellSize * 27
    },
    {
      axisDirection: "h",
      startCoord: [this.cellSize * 17, this.cellSize * 29],
      totalLength: this.cellSize * 27
    }
  ]
  this.levelLayouts[6] = [
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 10, 0],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 10, this.cellSize * 21],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 20, 0],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 20, this.cellSize * 21],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, 0],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 21],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 40, 0],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 40, this.cellSize * 21],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 50, 0],
      totalLength: this.cellSize * 13
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 50, this.cellSize * 21],
      totalLength: this.cellSize * 13
    }
  ]
  this.levelLayouts[7] = [
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, 0],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 2],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 4],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 6],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 8],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 10],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 12],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 14],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 16],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 18],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 20],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 22],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 24],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 26],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 28],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 30],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 32],
      totalLength: this.cellSize
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 34],
      totalLength: this.cellSize
    }
  ]
  this.levelLayouts[8] = [
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 7, this.cellSize * 0],
      totalLength: this.cellSize * 24
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 15, this.cellSize * 11],
      totalLength: this.cellSize * 24
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 22, this.cellSize * 0],
      totalLength: this.cellSize * 24
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 30, this.cellSize * 11],
      totalLength: this.cellSize * 24
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 37, this.cellSize * 0],
      totalLength: this.cellSize * 24
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 45, this.cellSize * 11],
      totalLength: this.cellSize * 24
    },
    {
      axisDirection: "v",
      startCoord: [this.cellSize * 52, this.cellSize * 0],
      totalLength: this.cellSize * 24
    }
  ]
}


Game.prototype.initialiseNewGame = function() {
  this.gameLevel = 1;
  this.tickIntervalId = 0;
  this.lives = 5
  this.initialiseLevel();
};

Game.prototype.initialiseLevel = function() {
  console.log(this.lives)
  this.gameSpeed = 230;
  this.cellSize = 20;
  this.gridWidth = this.canvas.width/this.cellSize;
  this.gridHeight = this.canvas.height/this.cellSize;
  this.gameInPlay = true;
  this.pauseToggle = false;
  this.nibbler = new Snake(this.cellSize);
  this.food = new Food(this.cellSize);
  this.walls = [[]];
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
  this.levelUpIfNibblerEats();
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
  this.drawLevel();
  this.nibbler.draw(this.ctx);
  this.food.draw(this.ctx);
};

Game.prototype.drawBackground = function() {
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  this.ctx.fillStyle = "rgb(0,0,255)";
  this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
};

Game.prototype.levelUpIfNibblerEats = function() {
  if(this.nibbler.checkIfFull()) {
    this.levelUp();
  }
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

Game.prototype.calculateWall = function(axis, start, length) {
  arr = [start]
  lastX = start[0]
  lastY = start[1]
  if(axis === "h") {
    for (var i = 0; i < (length/this.cellSize); i++) {
      arr.push([lastX + this.cellSize,start[1]]);
      lastX = lastX + this.cellSize;
    };
  } else if(axis === "v") {
    for (var i = 1; i < (length/this.cellSize); i++) {
      arr.push([start[0], lastY + this.cellSize]);
      lastY = lastY + this.cellSize;
    };
  }
  return arr
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
  } else if(!this.pauseToggle) {
      this.initialiseNewGame();
      this.start();
  } else if(this.pauseToggle) {
      this.initialiseLevel();
      this.start();
  }
}

Game.prototype.speedUpGame = function() {
  if(this.gameSpeed > 65) {
    this.gameSpeed -= 35
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
  this.lives--
  this.drawNotificationBoard();
  this.ctx.font = "20px PC Senior";
  if(this.lives > 0) {
    this.ctx.fillText("You died!", 515, 320);
    this.ctx.fillText("Press any key", 474, 350);
    this.ctx.fillText("to restart", 500, 380);
    this.ctx.fillText("level", 550, 410);
    this.pauseToggle = true
  } else {
    this.ctx.fillText("Game over!", 500, 325);
    this.ctx.fillText("Press any key", 474, 355);
    this.ctx.fillText("to play again", 472, 385);
  }
  this.tickIntervalId = window.clearInterval(this.tickIntervalId)
  this.gameInPlay = false
}

Game.prototype.levelUp = function() {
  this.gameLevel++
  this.tickIntervalId = window.clearInterval(this.tickIntervalId)
  this.drawNotificationBoard();
  if(this.gameLevel === 9) {
    this.ctx.font = "18px PC Senior";
    this.ctx.fillText("Game complete!", 470, 325);
    this.ctx.fillText("Press any key", 484, 355);
    this.ctx.fillText("to play again", 502, 385);
    this.gameInPlay = false
  } else {
    this.ctx.font = "18px PC Senior";
    this.ctx.fillText("Level complete!", 470, 325);
    this.ctx.fillText("Press any key", 484, 355);
    this.ctx.fillText("to continue", 502, 385);
    this.pauseToggle = true
    this.gameInPlay = false
  }
}

Game.prototype.drawNotificationBoard = function() {
  this.ctx.fillStyle = "rgb(220,220,220)";
  this.ctx.fillRect(450,250,300,200);
  this.ctx.fillStyle = "rgb(200,0,0)";
  this.ctx.fillRect(460,260,280,180);
  this.ctx.fillStyle = "rgb(220,220,220)";
}

Game.prototype.drawLevel = function() {
  if(this.gameLevel > 1) {
    var walls = this.getWalls();
    this.ctx.fillStyle = "rgb(200,0,0)";
    for (var i = walls.length - 1; i >= 0; i--) {
    this.ctx.fillRect(walls[i][0], walls[i][1], this.cellSize, this.cellSize)
    };
  }
};

Game.prototype.getWalls = function() {
  var levelWalls = this.levelLayouts[this.gameLevel]
  this.walls = []
  for (var i = levelWalls.length - 1; i >= 0; i--) {
    wall = this.calculateWall(levelWalls[i].axisDirection, levelWalls[i].startCoord, levelWalls[i].totalLength);
    this.walls = this.walls.concat(wall)
  };
  return this.walls
};


window.onload = function() {
  var canvas = document.getElementById('gameBoard');
  var ctx = canvas.getContext("2d");
  var game = new Game(canvas, ctx);
  window.addEventListener("keydown", game.interpretKeyboard.bind(game), false);
  game.start();
}

