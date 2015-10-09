function Food(cellSize) {
  this.cellSize = cellSize;
  this.width = this.cellSize;
  this.height = this.cellSize;
  this.xOffset = 5;
  this.yOffset = 16;
  this.number = 0;
}


Food.prototype.draw = function(ctx) {
  ctx.fillStyle = "rgb(255,255,0)";
  ctx.font = "15px PC Senior";
  ctx.fillText(this.number.toString(), this.x + this.xOffset, this.y + this.yOffset);
};

Food.prototype.nextCourse = function(snake, walls) {
  this.number++;
  do {
    this.generatePlacement();
  } while(this.intersectsWithSnake(snake) || this.intersectsWithWalls(walls))
};

Food.prototype.generatePlacement = function() {
  this.x = (randomX(0,59) * this.cellSize);
  this.y = (randomX(0,34) * this.cellSize);
};

Food.prototype.intersectsWithWalls = function(walls) {
  for (var i = walls.length - 1; i >= 0; i--) {
    if(walls[i][0] === this.x && walls[i][1] === this.y) {
      return true
    }
  }
};
Food.prototype.intersectsWithSnake = function(snake) {
  for (var i = snake.bodyParts.length - 1; i >= 0; i--) {
    if(snake.bodyParts[i][0] === this.x && snake.bodyParts[i][1] === this.y) {
      return true
    }
  }
};

function randomX(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
function randomY(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}