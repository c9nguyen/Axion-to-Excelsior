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

AM.queueDownload("./img/unit/h000/stand_right.png");
AM.queueDownload("./img/unit/h000/walk_right.png");
AM.queueDownload("./img/unit/h000/jump_right.png");
AM.queueDownload("./img/unit/h000/stab_right.png");
AM.queueDownload("./img/unit/h000/die_right.png");

AM.queueDownload("./img/unit/m000/stand_left.png");
AM.queueDownload("./img/unit/m000/walk_left.png");
AM.queueDownload("./img/unit/m000/jump_left.png");
AM.queueDownload("./img/unit/m000/attack_left.png");
AM.queueDownload("./img/unit/m000/die_left.png");

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

AM.queueDownload("./img/effect/00000/stab.png");



AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.sceneManager.addScene('battle',Battle);
    gameEngine.start();

    
    gameEngine.sceneManager.startScene('battle');
    

});






