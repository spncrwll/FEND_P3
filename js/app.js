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
  };
};
// Wth each dt, the enemy is moved by an amount proportional to its speed.
// Once the enemy reaches the edge of the screen, it is reset to the other side.
Enemy.prototype.update = function(dt) {
  this.x += (dt * this.speed);
  if (this.x > 505) {
    this.x = -60;
  };
  if (this.x < -60) {
    this.x = 505;
  };
};
// Renders the enemy image.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Defining the Player class. Includes a reset method for when the player
// reaches the water – is there a better way to handle this?
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.y = 405;
  this.x = 202;
  this.reset = function() {
    this.y = 405;
    this.x = 202;
  };
};

// My collision method will go here once I've written it.
Player.prototype.update = function(dt) {

};

// Would it be possible/more efficient to create a superclass that has .render
// and encompasses enemies and the player?
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Allows the user to move the player one tile at a time, but not beyond the
// edges of the game. Is there a more elegant way to handle this?
Player.prototype.handleInput = function(press) {
  switch (press) {
    case 'up':
      if (this.y == 73) {
        this.reset()
      } else {
        this.y -= 83
      };
      break;
    case 'down':
      if (this.y != 405) {
        this.y += 83;
      };
      break;
    case 'left':
      if (this.x != 0) {
        this.x -= 101
      };
      break;
    case 'right':
      if (this.x != 404) {
        this.x += 101
      };
      break;
  }
};

// Setting up default starting locations and available speeds for the enemies.
var enemyRow = [63, 146, 229];
var enemyCol = [0, 101, 202, 303, 404];
var enemySpeed = [-125, -150, -175, -200, -225, -275, 125, 150, 175, 200, 225, 275];
// I want the three rows to be populated by four enemies, such that one random
// row has two enemies instead of one.
var extraRow = enemyRow[[Math.floor(Math.random() * 3)]];
enemyRow.push(extraRow);

// Populating the allEnemies array and providing a player.
var allEnemies = new Array();
for (var i = 0; i < 4; i++) {
  var newEnemy = new Enemy(enemyCol[Math.floor(Math.random() * 5)], enemyRow[i], enemySpeed[Math.floor(Math.random() * enemySpeed.length)]);
  allEnemies.push(newEnemy);
};
var player = new Player();

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
