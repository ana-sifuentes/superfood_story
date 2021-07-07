var GAME_WIDTH = 960;
var GAME_HEIGHT = 540;

var stage = 0;
var score = 0;

var STAGE_NAMES = [
  'MESOAMERICA',
  'COLONIZATION',
  'LOST',
  'REDISCOVERY',
  'MODERN TIMES',
  'YOU WIN'
];

var STAGE_BLURBS = [
  'COLLECT FOODS!',
  'ESCAPE THE FIRE!',
  '',
  'COLLECT RESEARCH + AVOID THE PETS',
  'COLLECT MONEY',
  'THANKS FOR PLAYING'
];

var STAGE_COINS = [
  { add: true, x: 600, y: 320 },
  { add: false, x: 0, y: 0 },
  { add: true, x: 600, y: 320 },
  { add: true, x: 550, y: 320 },
  { add: true, x: 600, y: 320 },
  { add: false, x: 0, y: 0 }
]

var STAGE_BOMBS = [
  { add: false, x: 0, y: 0 },
  { add: true, x: 600, y: 320 },
  { add: false, x: 0, y: 0 },
  { add: true, x: 650, y: 320 },
  { add: false, x: 0, y: 0 },
  { add: false, x: 0, y: 0 }
]

var JUMP_SPEEDS = [
  -250, -250, -250, -250, -250,
  -260, -270, -280, -290, -300, 
  -320, -340, -360, -380, -400,
  -420, -440, -460, -470, -480
  -490, -500
];

var PLAYER_INIT_X = 50;
var PLAYER_INIT_Y = 450;

var PLATS = {};
var COINS = {};
var BOMBS = {};

// 
// LEVEL 1
// 

PLATS['lv1_plats'] = [
      0,   520,  1040,  1560,  2080,
   2900,  3640,  4160,  4680,  5200,
   6240,  6760,  7280,  7800,  8840,  
   9880, 10400, 10920, 11440, 11960, 
  12480
];

COINS['lv1_coins'] = [
  600, 1000, 1400, 2900, 4600, 
 4800, 5000, 6500, 6800, 7500,
 7800, 8700
];

BOMBS['lv1_bombs'] = [];

// 
// LEVEL 2
// 

PLATS['lv2_plats'] = [
      0,   520,  1040,  1560,  2080,
   2900,  3420,  4160,  4680,  5200,  
   6240,  6760,  7280,  7700,  8640, 
   9160,  9880, 10400, 10920, 11440, 
  11960, 12480
];

COINS['lv2_coins'] = [];

BOMBS['lv2_bombs'] = [
  900, 1400, 2000, 3400, 4600,
 4700, 4800, 6400, 7000, 7200,
 8800, 9400
];

// 
// LEVEL 3
// 

PLATS['lv3_plats'] = [
      0,   520,  1040,  1560,  2080,
   2600,  3640,  4680,  5720,  6760,
   7800,  8320,  9360, 10400, 10920, 
  11440, 11960, 12480
];

COINS['lv3_coins'] = [];

BOMBS['lv3_bombs'] = [];

// 
// LEVEL 4
// 

PLATS['lv4_plats'] = [
      0,   520,  1040,  2080,  2600, 
   3640,  4680,  5200,  6000,  6520,
   7280,  7800,  8500,  9020,  9880, 
  10400, 10920, 11440, 11960, 12480
];

COINS['lv4_coins'] = [
   600, 1000, 3600, 6100, 6500,
  8400, 8600, 8800
];

BOMBS['lv4_bombs'] = [
  2200, 4600, 4800, 6300, 7500,
  7900, 9000
];

// 
// LEVEL 5
// 

PLATS['lv5_plats'] = [
      0,   520,  1040,  2080,  2600, 
   3640,  4360,  5100,  5720,  6760, 
   7800,  8840, 10000, 10400, 10920, 
  11440, 11960, 12480
];

COINS['lv5_coins'] = [
    600,  1000,  1400,  2100,  2400, 
   4000,  4750,  5400,  6600,  7800, 
   9200,  9900, 10000, 10100, 10200, 
  10300
];

BOMBS['lv5_bombs'] = [];

function _titlePreload(scene) {
  scene.load.image('title_bg', 'vga/welcome_screen.png');
  scene.load.audio('title_bgm', 'vga/superfood_story_theme.wav')
}

function _titleCreate(scene) {
  // audio
  scene.bgm = scene.sound.add('title_bgm');
  scene.bgm.loop = true;

  // camera
  scene.cameras.main.setBackgroundColor('#fff');
  
  // input
  scene.keyboard = scene.input.keyboard.createCursorKeys();
  scene.pointer = window.mobileAndTabletCheck() ? scene.input.activePointer : { isDown: false, isUp: false };
  scene.spacePressed = false;

  // bg
  scene.scrollingBackground = scene.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 'title_bg');

  // text
  var smallTextStyles = {
    color: '#000',
    fontSize: 40, 
    fontFamily: 'VCR_OSD_MONO',
    boundsAlignH: 'center'
  };

  var bigTextStyles = {
    color: '#000',
    fontSize: 100, 
    fontFamily: 'VCR_OSD_MONO',
    boundsAlignH: 'center'
  };

  var continueText = window.mobileAndTabletCheck() ? 'TOUCH SCREEN TO START' : 'PRESS SPACE TO START';

  scene.title = scene.add.text(GAME_WIDTH / 2, 100, 'SUPERFOOD STORY', bigTextStyles);
  scene.continue = scene.add.text(GAME_WIDTH / 2, 500, continueText, smallTextStyles);

  scene.title.setOrigin(0.5, 0.5);
  scene.continue.setOrigin(0.5, 0.5);

  // blink text
  scene.blinkTicks = 0;
}

function _titleUpdate(scene) {
  if (!scene.bgm.isPlaying) {
    scene.bgm.play();
  }

  scene.scrollingBackground.tilePositionY += 0.25;

  scene.blinkTicks++;

  if (scene.blinkTicks > 150) {
    scene.blinkTicks = 0;
    scene.continue.visible = !scene.continue.visible;
  }

  if (scene.keyboard.space.isDown || scene.pointer.isDown) {
    scene.spacePressed = true;
  }

  if (scene.spacePressed && (scene.keyboard.space.isUp || scene.pointer.isUp)) {
    scene.bgm.stop();
    scene.spacePressed = false;
    scene.scene.switch('menuScene1');
  }
}

function _menuPreload(scene) {
  if (stage === 0) {
    scene.load.spritesheet('lv1_coin', 'vga/lvl1/food.png', { frameWidth: 60, frameHeight: 80 });
  } else if (stage === 1) {
    scene.load.spritesheet('lv2_bomb', 'vga/lvl2/fire.png', { frameWidth: 70, frameHeight: 60 });
  } else if (stage === 2) {
    scene.load.image('lv3_coin', 'vga/lvl3/uknown.png');
  } else if (stage === 3) {
    scene.load.spritesheet('lv4_coin', 'vga/lvl4/research.png', { frameWidth: 80, frameHeight: 90 });
    scene.load.spritesheet('lv4_bomb', 'vga/lvl4/chia-pet.png', { frameWidth: 85, frameHeight: 55 });
  } else if (stage === 4) {
    scene.load.spritesheet('lv5_coin', 'vga/lvl5/coin.png', { frameWidth: 55, frameHeight: 45 });
  }
  
  scene.load.spritesheet('player', 'vga/chia.png', { frameWidth: 105, frameHeight: 120 });
}

function _menuCreate(scene) {
  // camera
  scene.cameras.main.setBackgroundColor('#fff');
  
  // input
  scene.keyboard = scene.input.keyboard.createCursorKeys();
  scene.pointer = window.mobileAndTabletCheck() ? scene.input.activePointer : { isDown: false, isUp: false };
  scene.spacePressed = false;

  // text
  var smallTextStyles = {
    color: '#000',
    fontSize: 40, 
    fontFamily: 'VCR_OSD_MONO',
    boundsAlignH: 'center'
  };

  var bigTextStyles = {
    color: '#000',
    fontSize: 60, 
    fontFamily: 'VCR_OSD_MONO',
    boundsAlignH: 'center'
  };

  var level_id = stage === 2 ? '?' : (stage + 1);
  var continueText = window.mobileAndTabletCheck() ? 'TOUCH SCREEN TO START' : 'PRESS SPACE TO START';

  scene.level = scene.add.text(GAME_WIDTH / 2, 30, 'Level ' + level_id, smallTextStyles);
  scene.stageName = scene.add.text(GAME_WIDTH / 2, 90, STAGE_NAMES[stage], bigTextStyles);
  scene.stageBlurb = scene.add.text(GAME_WIDTH / 2, 430, STAGE_BLURBS[stage], stage === 3 ? smallTextStyles : bigTextStyles);
  scene.continue = scene.add.text(GAME_WIDTH / 2, 490, continueText, smallTextStyles);

  scene.level.setOrigin(0.5, 0.5);
  scene.stageName.setOrigin(0.5, 0.5);
  scene.stageBlurb.setOrigin(0.5, 0.5);
  scene.continue.setOrigin(0.5, 0.5);

  // sprites
  scene.sprites = scene.physics.add.staticGroup();
  scene.player = scene.sprites.create(stage === 5 ? GAME_WIDTH / 2 - 52 : 300, 300, 'player');

  if (STAGE_COINS[stage].add) {
    scene.coins = scene.sprites.create(STAGE_COINS[stage].x, STAGE_COINS[stage].y, 'lv' + (stage + 1) + '_coin');
  }

  if (STAGE_BOMBS[stage].add) {
    scene.bombs = scene.sprites.create(STAGE_BOMBS[stage].x, STAGE_BOMBS[stage].y, 'lv' + (stage + 1) + '_bomb');
  }

  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  if (stage === 0) {
    scene.anims.create({
      key: 'coin1',
      frames: scene.anims.generateFrameNumbers('lv1_coin', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  } else if (stage === 1) {
    scene.anims.create({
      key: 'bomb2',
      frames: scene.anims.generateFrameNumbers('lv2_bomb', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
  } else if (stage === 3) {
    scene.anims.create({
      key: 'coin4',
      frames: scene.anims.generateFrameNumbers('lv4_coin', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'bomb4',
      frames: scene.anims.generateFrameNumbers('lv4_bomb', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
  } else if (stage === 4) {
    scene.anims.create({
      key: 'coin5',
      frames: scene.anims.generateFrameNumbers('lv5_coin', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
  }

  // blink text
  scene.blinkTicks = 0;
}

function _menuUpdate(scene) {
  // animations
  scene.player.anims.play('idle', true);
  
  if (STAGE_COINS[stage].add && stage !== 2) {
    scene.coins.anims.play('coin' + (stage + 1), true);
  }

  if (STAGE_BOMBS[stage].add) {
    scene.bombs.anims.play('bomb' + (stage + 1), true);
  }

  // blink
  scene.blinkTicks++;

  if (scene.blinkTicks > 150) {
    scene.blinkTicks = 0;
    scene.continue.visible = !scene.continue.visible;
  }

  // inputs
  if (scene.keyboard.space.isDown || scene.pointer.isDown) {
    scene.spacePressed = true;
  }

  if (scene.spacePressed && (scene.keyboard.space.isUp || scene.pointer.isUp)) {
    stage++;
    scene.spacePressed = false;

    if (stage < 6) {
      scene.scene.switch('playScene' + stage);
    } else {
      stage = 0;
      score = 0;
      scene.scene.switch('titleScene');
    }
  }
}

function _playPreload(scene) {
  if (stage === 1) {
    scene.load.image('lv1_sky', 'vga/lvl1/background_sky.png');
    scene.load.image('lv1_bg1', 'vga/lvl1/background_clouds.png');
    scene.load.image('lv1_bg2', 'vga/lvl1/background_mountains.png');
    scene.load.image('lv1_bg3', 'vga/lvl1/background_lake.png');
    scene.load.image('lv1_bg4', 'vga/lvl1/background_chinampas.png');
    scene.load.image('lv1_ground', 'vga/lvl1/background_platform.png');

    scene.load.spritesheet('lv1_coin', 'vga/lvl1/food.png', { frameWidth: 60, frameHeight: 80 });

    scene.load.audio('lv1_bgm', 'vga/lvl1/music.wav');
  } else if (stage === 2) {
    scene.load.image('lv2_sky', 'vga/lvl2/background_sky.png');
    scene.load.image('lv2_bg1', 'vga/lvl2/background_mountains_back.png');
    scene.load.image('lv2_bg2', 'vga/lvl2/background_clouds.png');
    scene.load.image('lv2_bg3', 'vga/lvl2/background_volcano.png');
    scene.load.image('lv2_bg4', 'vga/lvl2/background_mountains_front.png');
    scene.load.image('lv2_ground', 'vga/lvl2/background_platform.png');

    scene.load.spritesheet('lv2_bomb', 'vga/lvl2/fire.png', { frameWidth: 70, frameHeight: 60 });

    scene.load.audio('lv2_bgm', 'vga/lvl2/music.wav');
    scene.load.audio('lv2_sfx_bomb', 'vga/fireball.wav');
  } else if (stage === 3) {
    scene.load.image('lv3_sky', 'vga/lvl3/background_sky.png');
    scene.load.image('lv3_bg2', 'vga/lvl3/background_message.png');
    scene.load.image('lv3_ground', 'vga/lvl3/background_platform.png');
  } else if (stage === 4) {
    scene.load.image('lv4_sky', 'vga/lvl4/background_sky.png');
    scene.load.image('lv4_bg1', 'vga/lvl4/background_clouds.png');
    scene.load.image('lv4_bg2', 'vga/lvl4/background_hills.png');
    scene.load.image('lv4_bg3', 'vga/lvl4/background_grass2.png');
    scene.load.image('lv4_bg4', 'vga/lvl4/background_grass1.png');
    scene.load.image('lv4_ground', 'vga/lvl4/background_platform.png');

    scene.load.spritesheet('lv4_coin', 'vga/lvl4/research.png', { frameWidth: 80, frameHeight: 90 });
    scene.load.spritesheet('lv4_bomb', 'vga/lvl4/chia-pet.png', { frameWidth: 85, frameHeight: 55 });

    scene.load.audio('lv4_bgm', 'vga/lvl4/music.wav');
    scene.load.audio('lv4_sfx_bomb', 'vga/chia-pet.wav');
  } else {
    scene.load.image('lv5_sky', 'vga/lvl5/background_sky.png');
    scene.load.image('lv5_bg1', 'vga/lvl5/background_buildings3.png');
    scene.load.image('lv5_bg2', 'vga/lvl5/background_buildings_2.png');
    scene.load.image('lv5_bg3', 'vga/lvl5/background_buildings1.png');
    scene.load.image('lv5_bg4', 'vga/lvl5/background_details.png');
    scene.load.image('lv5_ground', 'vga/lvl5/background_platform.png');

    scene.load.spritesheet('lv5_coin', 'vga/lvl5/coin.png', { frameWidth: 55, frameHeight: 55 });

    scene.load.audio('lv5_bgm', 'vga/lvl5/music.wav');
  }

  scene.load.spritesheet('player', 'vga/chia.png', { frameWidth: 105, frameHeight: 120 });
  scene.load.audio('sfx_player_jump', 'vga/chia_jump.wav');
  // scene.load.audio('sfx_player_dead', 'vga/chia_dying.wav');
  scene.load.audio('sfx_coin', 'vga/coin.wav');
}

function _playCreate(scene) {
  // audio
  if (stage !== 3) {
    scene.bgm = scene.sound.add('lv' + stage + '_bgm');
    scene.bgm.loop = true;
  }
  scene.sfx_coin = scene.sound.add('sfx_coin');

  if (STAGE_BOMBS[stage - 1].add) {
    scene.sfx_bomb = scene.sound.add('lv' + stage + '_sfx_bomb');
  }
  scene.sfx_jump = scene.sound.add('sfx_player_jump');
  // scene.sfx_jump = scene.sound.add('sfx_player_dead');

  // bg parallax
  scene.layers_0 = scene.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 'lv' + stage + '_sky');
  scene.layers_0.setScrollFactor(0);

  if (stage !== 3) {
    scene.layers_1 = scene.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 'lv' + stage + '_bg1');
    scene.layers_1.setScrollFactor(0);
  }

  scene.layers_2 = scene.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 'lv' + stage + '_bg2');
  scene.layers_2.setScrollFactor(0);
  
  if (stage !== 3) {
    scene.layers_3 = scene.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 'lv' + stage + '_bg3');
    scene.layers_3.setScrollFactor(0);
    scene.layers_4 = scene.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 'lv' + stage + '_bg4');
    scene.layers_4.setScrollFactor(0);
  }

  // plats
  scene.platforms = scene.physics.add.staticGroup();
  PLATS['lv' + stage + '_plats'].forEach(platX => scene.platforms.create(platX, GAME_HEIGHT + 28, 'lv' + stage + '_ground'));

  // items
  scene.coins = scene.physics.add.staticGroup();
  COINS['lv' + stage + '_coins'].forEach(coinX => scene.coins.create(coinX, 450, 'lv' + stage + '_coin'));

  scene.bombs = scene.physics.add.staticGroup();
  BOMBS['lv' + stage + '_bombs'].forEach(bombX => scene.bombs.create(bombX, 520, 'lv' + stage + '_bomb'));

  // player
  scene.player = scene.physics.add.sprite(PLAYER_INIT_X, PLAYER_INIT_Y, 'player'); 
  scene.physics.add.collider(scene.player, scene.platforms);
  scene.physics.add.overlap(scene.player, scene.coins, _collectCoin, null, scene);
  scene.physics.add.overlap(scene.player, scene.bombs, _bombCollide, null, scene);

  scene.anims.create({
    key: 'run',
    frames: scene.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'jump',
    frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: 'dead',
    frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: 0
  });

  if (stage === 1) {
    scene.anims.create({
      key: 'coin1',
      frames: scene.anims.generateFrameNumbers('lv1_coin', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  } else if (stage === 2) {
    scene.anims.create({
      key: 'bomb2',
      frames: scene.anims.generateFrameNumbers('lv2_bomb', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
  } else if (stage === 4) {
    scene.anims.create({
      key: 'coin4',
      frames: scene.anims.generateFrameNumbers('lv4_coin', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'bomb4',
      frames: scene.anims.generateFrameNumbers('lv4_bomb', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
  } else if (stage === 5) {
    scene.anims.create({
      key: 'coin5',
      frames: scene.anims.generateFrameNumbers('lv5_coin', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
  }
  
  // ui
  var continueText = window.mobileAndTabletCheck() ? 'TOUCH SCREEN TO RESTART' : 'PRESS SPACE TO RESTART';

  scene.gameOverText = scene.add.text(GAME_WIDTH / 2, 150, 'Game Over', {color: '#fff', fontSize: 60, fontFamily: 'VCR_OSD_MONO'});
  scene.continueText = scene.add.text(GAME_WIDTH / 2, 250, continueText, {color: '#fff', fontSize: 60, fontFamily: 'VCR_OSD_MONO'});
  scene.gameOverText.setOrigin(0.5, 0.5);
  scene.continueText.setOrigin(0.5, 0.5);
  scene.gameOverText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
  scene.continueText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
  scene.gameOverText.setScrollFactor(0);
  scene.continueText.setScrollFactor(0);
  scene.gameOverText.visible = false;
  scene.continueText.visible = false;

  // inputs
  scene.keyboard = scene.input.keyboard.createCursorKeys();
  scene.pointer = window.mobileAndTabletCheck() ? scene.input.activePointer : { isDown: false, isUp: false };

  // camera
  scene.cameras.main.setBackgroundColor('#ffffff');
  scene.cameras.main.startFollow(scene.player, true, 1, 0, -200, 130);

  // game states
  scene.gameWin = false;
  scene.gameOver = false;
  scene.animSetup = false;
  scene.awaitTransition = 0;
}

function _playUpdate(scene) {
  if (!scene.animSetup) {
    if (STAGE_COINS[stage - 1].add) {
      scene.coins.children.iterate((coin) => coin.anims.play('coin' + stage));
    }
    
    if (STAGE_BOMBS[stage - 1].add) {
      scene.bombs.children.iterate((bomb) => bomb.anims.play('bomb' + stage));
    }

    scene.animSetup = true;
  }

  if (scene.bgm && !scene.bgm.isPlaying) {
    scene.bgm.play();
  }

  if (scene.gameWin) {
    scene.awaitTransition++;
    scene.cameras.main.stopFollow();

    if (scene.awaitTransition >= 500) {
      if (stage !== 3) {
        scene.bgm.stop();
      }
      
      score += 5000;
      _updateScore();

      scene.scene.switch('menuScene' + (stage + 1));
      _restart(scene);
    }

    return;
  };

  if (scene.gameOver) {
    scene.gameOverText.visible = true;
    scene.continueText.visible = true;

    scene.player.setVelocity(0, 0);
    
    if (scene.keyboard.space.isDown || scene.pointer.isDown) {
      _restart(scene);
    }
    
    return;
  }

  // parallax
  scene.layers_2.tilePositionX += 0.3;
  
  if (stage !== 3) {
    scene.layers_1.tilePositionX += 0.05;
    scene.layers_3.tilePositionX += 0.75;
    scene.layers_4.tilePositionX += 0.90;
  }

  // auto move
  scene.player.setVelocityX(400);
  
  // jump
  if (scene.player.body.touching.down) {
    scene.player.anims.play('run', true);
    scene.jumpHeld = 0;
  } else {
    scene.player.anims.play('jump', true);
  }

  if ((scene.keyboard.space.isDown || scene.pointer.isDown) && scene.jumpHeld < 20) {
    if (scene.jumpHeld === 0) {
      scene.sfx_jump.play();
    }

    scene.jumpHeld++;
    scene.player.setVelocityY(JUMP_SPEEDS[scene.jumpHeld]);
  }

  if (scene.player.y > 650) {
    scene.gameOver = true;
      
    score -= 1000;
    score = Math.max(0, score);
    _updateScore();
  }
  
  if (scene.player.x > 10000) {
    scene.gameWin = true;
  }
}

function _restart(scene) {
  scene.player.x = PLAYER_INIT_X;
  scene.player.y = PLAYER_INIT_Y;

  scene.coins.children.iterate(function (coin) {
    coin.enableBody(false, 0, 0, true, true);
  });

  scene.bombs.children.iterate(function (bomb) {
    bomb.enableBody(false, 0, 0, true, true);
  });
  
  scene.layers_2.tilePositionX = 0;
  
  if (stage !== 3) {
    scene.layers_1.tilePositionX = 0;
    scene.layers_3.tilePositionX = 0;
    scene.layers_4.tilePositionX = 0;
  }

  scene.gameOverText.visible = false;
  scene.continueText.visible = false;

  scene.jumpHeld = 0;

  scene.gameOver = false;
  scene.gameWin = false;
  scene.animSetup = false;
  scene.awaitTransition = 0;
  
  scene.cameras.main.startFollow(scene.player, true, 1, 0, -200, 130);
}

function _collectCoin(_player, coin) {
  this.sfx_coin.play();
  
  score += 100;
  _updateScore();

  coin.disableBody(true, true);
}

function _bombCollide(player, bomb) {
  this.sfx_bomb.play();
  
  bomb.disableBody(true, true);
  player.anims.play('dead', true);

  score -= 1000;
  score = Math.max(0, score);
  _updateScore();
  
  this.gameOver = true;
}

function _updateScore() {
  var eScore = document.getElementById('score');
  eScore.innerText = score;
}
