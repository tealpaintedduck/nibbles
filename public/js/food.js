function Food(cellSize) {
  this.cellSize = cellSize;
  this.width = this.cellSize;
  this.height = this.cellSize;
  this.x = (randomX(0,60) * this.cellSize);
  this.y = (randomY(0,35) * this.cellSize);
  this.xOffset = 5;
  this.yOffset = 16;
  this.number = 1;
}


Food.prototype.draw = function(ctx) {
  ctx.fillStyle = "rgb(255,255,0)";
  ctx.font = "15px PC Senior";
  ctx.fillText(this.number.toString(), this.x + this.xOffset, this.y + this.yOffset);
};

Food.prototype.nextCourse = function(increaseFoodNumber, snake, walls) {
  if(increaseFoodNumber) {
    this.number++
  }
  this.x = (randomX(0,60) * this.cellSize);
  this.y = (randomX(0,35) * this.cellSize);
  for (var i = snake.bodyParts.length - 1; i >= 0; i--) {
    if(snake.bodyParts[i][0] === this.x && snake.bodyParts[i][1] === this.y) {
      this.nextCourse(false, snake, walls);
    }
  };
  for (var i = walls.length - 1; i >= 0; i--) {
    if(walls[i][0] === this.x && walls[i][1] === this.y) {
      this.nextCourse(false, snake, walls);
    }
  };
}

function randomX(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
function randomY(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}