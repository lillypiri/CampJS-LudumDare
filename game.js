var SCALE_FACTOR = 5;

var game = new Phaser.Game(200, 150, Phaser.CANVAS, 'game', { 
  preload: preload, 
  create: create, 
  update: update 
});

var cat;
var food;
var isPlaying = true;

// Cache any assets needed in the game
function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  game.scale.setUserScale(SCALE_FACTOR, SCALE_FACTOR);
  game.renderer.renderSession.roundPixels = false;
  Phaser.Canvas.setImageRenderingCrisp(game.canvas);

  this.load.spritesheet("cat", "cat.png", 16, 16, 10);
  this.load.spritesheet("food", "food.png", 16, 16, 3);
}

// Add stuff to your scene
function create() {
  game.stage.backgroundColor = '#6ad';

  cat = this.add.sprite(20, 90, "cat");
  cat.animations.add('idle', [0]);
  cat.animations.add('walk', [1,2,3,4], 6, true);
  cat.animations.add('eat', [5,6,7,8, 9], 6, false);
  cat.animations.play('idle');

  food = this.add.sprite(160, 92, 'food');
  food.animations.add('idle', [0]);
  food.animations.add('eat', [1,2, 3], 3, false);
  food.animations.play('idle');
}

// Called once per frame to move stuff around 
function update() {
  if (isPlaying) {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      cat.x += 1;
      cat.animations.play('walk');
    } else {
      cat.animations.play('idle');
    }

    if (cat.x >= 152) {
      isPlaying = false;
      food.animations.play('eat');
      cat.animations.play('eat');
    }
  }
}