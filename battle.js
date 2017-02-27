function Battle(game)
{
	// this.game = game;
    Scene.call(this, game);
}

Battle.prototype = Object.create(Scene.prototype);
Battle.prototype.constructor = Battle;

Battle.prototype.create = function() {
    console.log('battle created');


	this.loadCharacter();
    this.buildingBackground();
    this.buildTiles();
    
    var list = [{code: "m000", ticket: 1},
                {code: "m001", ticket: 1},
                {code: "m002", ticket: 1},
                {code: "m003", ticket: 1},
                {code: "m010", ticket: 0}];

    var gen = new EnemyGenerator(this.game, 2300, 400, list);
    gen.setFrequency(2);
    this.game.addEntity(gen);

    var cards = [{code: "h000", ticket: 3},
                 {code: "h001", ticket: 2},
                 {code: "h002", ticket: 5},
                 {code: "h003", ticket: 5}];
    var cardGen = new CardGenerator(this.game, 100, 400, cards, 5);
    cardGen.start();
    this.game.addEntity(cardGen);

    var map = new ScreenScroller(this.game, this.game.screenMover, 800, 550, 400, 50);
    this.game.addEntity(map);
    var rightAndLeftKey = new ScreenMoveArrow(this.game, this.game.screenMover, this.game.left, this.game.right);
    this.game.addEntity(rightAndLeftKey);
    var ADKey = new ScreenMoveArrow(this.game, this.game.screenMover, this.game.keyA, this.game.keyD);
    this.game.addEntity(ADKey);

    var rightArrow =  new ScreenMouseOverMovement(this.game, this.game.screenMover, "right");
    this.game.addEntity(rightArrow);
    var leftArrow = new ScreenMouseOverMovement(this.game, this.game.screenMover, "left");
    this.game.addEntity(leftArrow);

    // Sound
    this.game.soundPlayer.addToMusic("./sound/music/battle/KH-monstrous-monstro.mp3", undefined, undefined, 0.4);

    var that = this;

    var button2 = new Button(this.game, AM.getAsset("./img/unit/m000/card.png"), 600, 520);
    button2.addSheet(AM.getAsset("./img/unit/m000/card_click.png"), "click");
    button2.addSheet(AM.getAsset("./img/unit/m000/card_mouseover.png"), "mouseover");
    button2.addEventListener("click", function() { 
        gen.switch(); 
        // SAMPLE
        // endGame.gameOver(true); 
        //endGame.gameOver(false); 
    });

    this.game.addEntity(button2);
//    spawnUnit(this.game, 100, 400, "h003", PLAYER);

    var enemyBoss = spawnUnit(this.game, 2300, 400, "m100", ENEMY);

    var playerBoss = spawnUnit(this.game, 100, 400, "h100", PLAYER);

    var endGame = new EndGame(this.game);
    // endGame.isGameOver = true;
    // endGame.playerWin = true;
    endGame.winCondition = function() { return enemyBoss.removeFromWorld === true};
    endGame.lostCondition = function() { return playerBoss.removeFromWorld === true};
    gen.setEndgame(endGame);
    this.game.addEntity(endGame);

	var exit_button = new Button(this.game, AM.getAsset("./img/ui/exit_button.png"), 10, 525);
	// exit_button.addSheet( AM.getAsset("./img/ui/start_button_pressed.png"),'press');
	// exit_button.addSheet( AM.getAsset("./img/ui/start_button_mouseover.png"),'mouseover');
	exit_button.addEventListener('click', function() {
        this.game.soundPlayer.removeAllSound();
		this.game.sceneManager.startScene('mainmenu');
	});
	this.game.addEntity(exit_button);


};

Battle.prototype.update = function() {
	// body...
};

Battle.prototype.buildingBackground = function() {
	canvasHeight = this.game.ctx.canvas.clientHeight;
	canvasWidth = this.game.ctx.canvas.clientWidth;

    var back = new NonAnimatedObject(this.game, AM.getAsset("./img/map/01/back.png"),0, 0);
    //back.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(back);

};

Battle.prototype.loadCharacter = function(){
    // for (var i = 1 ; i <= 4; i++) {
    //     characters[i - 1] = {
    //         left:[
    //             AM.getAsset("./img/character/person" + i + "_walk1_left.png"),  //walk
    //             AM.getAsset("./img/character/person" + i + "_jump_left.png"),   //jump
    //             AM.getAsset("./img/character/person" + i + "_stand_left.png")   //stand
    //         ],
    //         right:[
    //             AM.getAsset("./img/character/person" + i + "_walk1_right.png"),
    //             AM.getAsset("./img/character/person" + i + "_jump_right.png"),
    //             AM.getAsset("./img/character/person" + i + "_stand_right.png")
    //         ]
    //     }
    // }
};

Battle.prototype.buildTiles = function() {

	var canvasHeight = this.game.ctx.canvas.clientHeight;
	var canvasWidth = this.game.screenMover.mapSize;
    var groundCollisionBox = this.game.collisionBox.ground;

    var numOfTile = Math.ceil(canvasWidth / 90) + 2;
    var groundX = -97;

    var tile = new Tile(this.game, groundX, canvasHeight - 100, numOfTile, "snowrock");
    this.game.addEntity(tile);
};
