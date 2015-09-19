function Snake(cellSize) {
  this.cellSize = cellSize;
  this.xMovement = cellSize;
  this.yMovement = 0;
  this.width = cellSize;
  this.length = 2 * cellSize;
  this.grow = 0;
  this.foodEaten = 0;
  this.directionOfTravel = "E";
  this.bodyParts = [[cellSize*3,cellSize*3],[cellSize*2,cellSize*3]];
};

Snake.prototype.draw = function(ctx) {
  for (var i = this.bodyParts.length - 1; i >= 0; i--) {
    this.bodyParts[i]
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.fillRect(this.bodyParts[i][0],this.bodyParts[i][1],this.cellSize,this.cellSize);
  }
}

Snake.prototype.move = function() {
  if(this.directionOfTravel === "S"){
    this.bodyParts.unshift([(this.bodyParts[0][0]),(this.bodyParts[0][1] + this.cellSize)]);
  } else if(this.directionOfTravel === "N"){
    this.bodyParts.unshift([(this.bodyParts[0][0]),(this.bodyParts[0][1] - this.cellSize)]);
  } else if(this.directionOfTravel === "E"){
    this.bodyParts.unshift([(this.bodyParts[0][0] + this.cellSize),(this.bodyParts[0][1])]);
  } else if(this.directionOfTravel === "W"){
    this.bodyParts.unshift([(this.bodyParts[0][0] - this.cellSize),(this.bodyParts[0][1])]);
  }
  if(this.grow === 0) {
    this.bodyParts.pop();
  } else {
    this.grow -= 1
  }
}

Snake.prototype.loopScreen = function(canvas) {
  if(this.bodyParts[0][0] >= canvas.width ) {
    this.bodyParts[0][0] = 0;
  } else if(this.bodyParts[0][1] < 0) {
    this.bodyParts[0][1] += canvas.height;
  } else if(this.bodyParts[0][0] < 0 ) {
    this.bodyParts[0][0] += canvas.width;
  } else if(this.bodyParts[0][1] >= canvas.height) {
    this.bodyParts[0][1] = 0;
  }
}

Snake.prototype.eatIfPossible = function(food) {
  if(this.bodyParts[0][0] === food.x && this.bodyParts[0][1] === food.y){
    this.foodEaten += 1
    this.grow += Math.floor(this.bodyParts.length / 3) + 3;
    return true;
  } else {
    return false;
  }
};

Snake.prototype.cannibalism = function() {
  console.log("here are bodyParts")
  console.log(this.bodyParts)
  for (var i = this.bodyParts.length - 1; i > 0; i--) {
    if(this.bodyParts[0][0] === this.bodyParts[i][0] && this.bodyParts[0][1] === this.bodyParts[i][1]) {
      return true;
    }
  };
      return false;
};

Snake.prototype.hasCrashed = function(walls) {
  for (var i = walls.length - 1; i >= 0; i--) {
    if(walls[i][0] === this.bodyParts[0][0] && walls[i][1] === this.bodyParts[0][1]) {
      return true;
    }
  }
      return false;
};

Snake.prototype.checkIfFull = function() {
  if(this.foodEaten === 9) {
    return true;
  } else {
    return false;
  }
};