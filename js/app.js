'use strict';
// Defining the Enemy class, including location and speed.
// I added enemies that move from right to left.
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  if (speed > 0) {
    this.sprite = 'images/enemy-bug-forward.png';
  } else {
    this.sprite = 'images/enemy-bug-reverse.png';
  }
};
// With each dt, the enemy is moved by an amount proportional to its speed.
// Once the enemy reaches the edge of the screen, it is reset to the other side.
Enemy.prototype.update = function(dt) {
  this.x += (dt * this.speed);
  if (this.x > 505) {
    this.x = -60;
  }
  if (this.x < -60) {
    this.x = 505;
  }
};
// Renders the enemy image.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Defining the Player class, including the default starting point.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.y = 405;
  this.x = 202;
};
// A method for resetting the player position to the starting point.
Player.prototype.reset = function() {
  this.y = 405;
  this.x = 202;
};
// Renders the player image.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Setting up default starting locations and available speeds for the enemies.
var enemyRow = [63, 146, 229];
var enemyCol = [0, 101, 202, 303, 404];
var enemySpeed = [-125, -150, -175, -200, -225, -275, 125, 150, 175, 200, 225, 275];
// This function  enables me to add an enemy to a random row later.
var addEnemy = function() {
  var extraRow = enemyRow[[Math.floor(Math.random() * 3)]];
  enemyRow.push(extraRow);
};
// I want to start with four enemies.
addEnemy();

// Populating the allEnemies array and providing a player.
var allEnemies = [];
var populate = function() {
  for (var i = 0; i < enemyRow.length; i++) {
    var newEnemy = new Enemy(enemyCol[Math.floor(Math.random() * 5)], enemyRow[i], enemySpeed[Math.floor(Math.random() * enemySpeed.length)]);
    allEnemies.push(newEnemy);
  }
};
populate();
var player = new Player();

// Every time this function is called, the enemies are randomly generated
// anew and also their number is increased by one. The player's position
// is also reset. This allows the player to 'level up' each time they
// complete the game.
var levelUp = function() {
  player.reset();
  allEnemies = [];
  addEnemy();
  populate();
};

// Allows the user to move the player one tile at a time, but not beyond the
// edges of the game.
Player.prototype.handleInput = function(press) {
  switch (press) {
    case 'up':
      if (this.y == 73) {
        levelUp();
      } else {
        this.y -= 83;
      }
      break;
    case 'down':
      if (this.y != 405) {
        this.y += 83;
      }
      break;
    case 'left':
      if (this.x !== 0) {
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x != 404) {
        this.x += 101;
      }
      break;
  }
};

// Listens for key presses and sends them to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
