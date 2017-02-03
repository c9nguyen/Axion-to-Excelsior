var AM = new AssetManager();

/*===============================================================*/

AM.queueDownload("./img/back/cloud.png");
AM.queueDownload("./img/back/sky.png");
AM.queueDownload("./img/back/back.png");
AM.queueDownload("./img/back/1.png");
AM.queueDownload("./img/back/2.png");

AM.queueDownload("./img/tiles/en_spritesheet.png");
AM.queueDownload("./img/tiles/en1_spritesheet.png");
AM.queueDownload("./img/tiles/bsc_spritesheet.png");

AM.queueDownload("./img/character/person1_walk1_left.png");
AM.queueDownload("./img/character/person1_walk1_right.png");
AM.queueDownload("./img/character/person1_jump_left.png");
AM.queueDownload("./img/character/person1_jump_right.png");
AM.queueDownload("./img/character/person1_stand_left.png");
AM.queueDownload("./img/character/person1_stand_right.png");

AM.queueDownload("./img/character/person2_walk1_left.png");
AM.queueDownload("./img/character/person2_walk1_right.png");
AM.queueDownload("./img/character/person2_jump_left.png");
AM.queueDownload("./img/character/person2_jump_right.png");
AM.queueDownload("./img/character/person2_stand_left.png");
AM.queueDownload("./img/character/person2_stand_right.png");

AM.queueDownload("./img/character/person3_walk1_left.png");
AM.queueDownload("./img/character/person3_walk1_right.png");
AM.queueDownload("./img/character/person3_jump_left.png");
AM.queueDownload("./img/character/person3_jump_right.png");
AM.queueDownload("./img/character/person3_stand_left.png");
AM.queueDownload("./img/character/person3_stand_right.png");

AM.queueDownload("./img/character/person4_walk1_left.png");
AM.queueDownload("./img/character/person4_walk1_right.png");
AM.queueDownload("./img/character/person4_jump_left.png");
AM.queueDownload("./img/character/person4_jump_right.png");
AM.queueDownload("./img/character/person4_stand_left.png");
AM.queueDownload("./img/character/person4_stand_right.png");

AM.queueDownload("./img/unit/h000/stand_right.png");
AM.queueDownload("./img/unit/h000/walk_right.png");
AM.queueDownload("./img/unit/h000/jump_right.png");
AM.queueDownload("./img/unit/h000/stab_right.png");

AM.queueDownload("./img/unit/m000/stand_left.png");
AM.queueDownload("./img/unit/m000/walk_left.png");
AM.queueDownload("./img/unit/m000/jump_left.png");
AM.queueDownload("./img/unit/m000/attack_left.png");

AM.queueDownload("./img/character/warrior/stand_right.png");
AM.queueDownload("./img/character/warrior/walk_right.png");
AM.queueDownload("./img/character/warrior/jump_right.png");
AM.queueDownload("./img/character/warrior/swing_right.png");

AM.queueDownload("./img/back/portal.png");
AM.queueDownload("./img/food/spritesheet.png");
AM.queueDownload("./img/tomb.png");

AM.queueDownload("./img/ui/start_button_disable.png");
AM.queueDownload("./img/ui/start_button_pressed.png");
AM.queueDownload("./img/ui/start_button_mouseover.png");



AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
});





