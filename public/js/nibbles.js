window.onload = function() {
  // var xMovement = 5;
  // var yMovement = 0;
  var canvas = document.getElementById('gameBoard');
  var ctx = canvas.getContext("2d");
  var pauseToggle = false
  var nibbler = {
    x: 10,
    y: 10,
    xMovement: .5,
    yMovement: 0,
    width: 25,
    length: 25,
    directionOfTravel: "E",
    draw: function() {
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect(this.x,this.y,this.width,this.length);
    }
  };
  var food = {
    notEaten: true,
    width: 25,
    height: 25,
    x: randomX(0,475),
    y: randomY(0,475),
    draw: function() {
      ctx.fillStyle = "rgb(0,0,200)";
      ctx.fillRect(this.x,this.y,25,25);
    }
  }

  function randomX(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  function randomY(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }


  function draw() {
    console.log(food.x)
    ctx.restore();
    if(canvas.getContext) {
      ctx.clearRect(0,0,500,500);
      if(food.notEaten){
        food.draw();
      }
      nibbler.draw();
      nibbler.x += nibbler.xMovement;
      nibbler.y += nibbler.yMovement;
      if (nibbler.x < (food.x + food.width) && (nibbler.x + nibbler.width) > food.x &&
    nibbler.y < (food.y + food.height) && (nibbler.y + nibbler.height) > food.y) {
        food.notEaten = false
      }
      // ctx.translate(nibbler.xMovement, nibbler.yMovement);
      if(nibbler.y + nibbler.yMovement > canvas.height ) {
        nibbler.y -= canvas.height;
      } else if(nibbler.y + nibbler.yMovement < 0) {
        nibbler.y += canvas.height;
      }
      if(nibbler.x + nibbler.xMovement > canvas.width ) {
        nibbler.x -= canvas.width;
      } else if(nibbler.x + nibbler.xMovement < 0) {
        nibbler.x += canvas.width;
      }

      // window.requestAnimationFrame(draw);
    }
  }





  // game = window.requestAnimationFrame(draw);

  game = window.setInterval(draw, 30)
  // window.setInterval(draw, 40);

  window.addEventListener("keydown", changeDirection, false);

  function changeDirection(e) {
    switch(e.keyCode) {
      case 40:
      nibbler.xMovement = 0;
      nibbler.yMovement = 1;
      nibbler.directionOfTravel = "S";
      break;
      case 37:
      nibbler.xMovement = -1;
      nibbler.yMovement = 0;
      nibbler.directionOfTravel = "W";
      break;
      case 38:
      nibbler.xMovement = 0;
      nibbler.yMovement = -1;
      nibbler.directionOfTravel = "N";
      break;
      case 39:
      nibbler.xMovement = 1;
      nibbler.yMovement = 0;
      nibbler.directionOfTravel = "E";
      break;
      case 32:
      pauseGame();
      break;
    }
  }

  function pauseGame() {
    if(!pauseToggle) {
      game = window.clearInterval(game)
      pauseToggle = true
    } else if(pauseToggle) {
      game = window.setInterval(draw, 30)
      pauseToggle = false
    }
  }
};