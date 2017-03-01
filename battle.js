function Battle(game)
{
	// this.game = game;
    Scene.call(this, game);
    this.background = "./img/map/01/back.png";
}

Battle.prototype = Object.create(Scene.prototype);
Battle.prototype.constructor = Battle;

Battle.prototype.create = function() {
    console.log('battle created');


	this.loadCharacter();
    this.buildingBackground();

    var playerBoss = new MainTower(this.game);
    this.game.addEntity(playerBoss);

    this.buildTiles();
    
    //Initializing enemy generator
    var list = [{code: "m000", ticket: 4},
                {code: "m001", ticket: 8},
                {code: "m002", ticket: 6},
                {code: "m003", ticket: 2},
                {code: "m010", ticket: 1}];

    var gen = new EnemyGenerator(this.game, 2300, 400, list);
    gen.setFrequency(2);
    this.game.addEntity(gen);

    //Initializing cards on hand
    var cards = [{code: "h000", ticket: 3},
                 {code: "h001", ticket: 2},
                 {code: "h002", ticket: 5},
                 {code: "h003", ticket: 5},
                 {code: "h100", ticket: 1}];
    var cardGen = new CardGenerator(this.game, 100, 400, cards, 6);
    cardGen.start();
    this.game.addEntity(cardGen);

    var map = new ScreenScroller(this.game, this.game.screenMover, 800, 525, 400);
    this.game.addEntity(map);
    var rightAndLeftKey = new ScreenMoveArrow(this.game, this.game.screenMover, this.game.left, this.game.right);
    this.game.addEntity(rightAndLeftKey);
    var ADKey = new ScreenMoveArrow(this.game, this.game.screenMover, this.game.keyA, this.game.keyD);
    this.game.addEntity(ADKey);

    //SCreen mover using mouse
    var rightArrow =  new ScreenMouseOverMovement(this.game, this.game.screenMover, "right");
    this.game.addEntity(rightArrow);
    var leftArrow = new ScreenMouseOverMovement(this.game, this.game.screenMover, "left");
    this.game.addEntity(leftArrow);

    // SOUND
    this.addAllMusic();

    var that = this;

    //Enemy button for debugging
    // var button2 = new Button(this.game, AM.getAsset("./img/unit/m000/card.png"), 700, 520);
    // button2.addSheet(AM.getAsset("./img/unit/m000/card_click.png"), "click");
    // button2.addSheet(AM.getAsset("./img/unit/m000/card_mouseover.png"), "mouseover");
    // button2.addEventListener("click", function() { 
    //     gen.switch(); 
    //     // SAMPLE
    //     // endGame.gameOver(true); 
    //     //endGame.gameOver(false); 
    // });
    // this.game.addEntity(button2);

//    spawnUnit(this.game, 100, 400, "h003", PLAYER);
    that = this;
    var enemyBoss = spawnUnit(this.game, 2300, 400, "m100", ENEMY);
    enemyBoss.actions["die"].endEffect = function() {
        cardGen.removeAll();
        cardGen.removeFromWorld = true;
        gen.setEndgame(true);
        that.endGame(true);
        enemyBoss.removeFromWorld = true;
    }; 
    // enemyBoss.health = -1;

    //var playerBoss = spawnUnit(this.game, 100, 400, "h100", PLAYER);

    // var endGame = new EndGame(this.game);
    // endGame.isGameOver = true;
    // endGame.playerWin = true;
    // endGame.winCondition = function() { return enemyBoss.removeFromWorld === true};
    // endGame.lostCondition = function() { return playerBoss.removeFromWorld === true};
    // gen.setEndgame(endGame);
    // this.game.addEntity(endGame);

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

    var back = new NonAnimatedObject(this.game, AM.getAsset(this.background),0, 0);
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

Battle.prototype.addAllMusic = function(){
    // Sound
    this.game.soundPlayer.randomTrackInQueue = true;
    this.game.soundPlayer.addToQueue("./sound/music/battle/KH-monstrous-monstro.mp3", undefined, undefined, 0.4);
    this.game.soundPlayer.addToQueue("./sound/music/battle/KH-squirming-evil.mp3", undefined, undefined, 0.4);
    this.game.soundPlayer.addToQueue("./sound/music/battle/KH-scherzo-di-notte.mp3", undefined, undefined, 0.4);
    this.game.soundPlayer.addToQueue("./sound/music/battle/KH-go-for-it.mp3", undefined, undefined, 0.4);
    this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-darknite.mp3", undefined, undefined, 0.4);
    this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-lancastrians.mp3", undefined, undefined, 0.4);
    this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-seto.mp3", undefined, undefined, 0.4);
    this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-yugi.mp3", undefined, undefined, 0.4);

}

//--- endGame
// ONLY CALL WHEN GAME END CONDITION IS APPLIED
// Add EXTRA ACTION when end game is called if you want
Battle.prototype.endGame = function(playerWon, extraAction = undefined){
    
    //-ADJUST: put more things here if you want extra end game stuff...
    //- or use the extraAction function
    if(playerWon){
        this.game.soundPlayer.removeAllSound();
        this.game.soundPlayer.randomTrackInQueue = false;
        this.game.soundPlayer.addToQueue("./sound/music/gameover/YGO-duel-won.mp3", undefined, undefined, 0.5);
        this.game.soundPlayer.addToQueue("./sound/music/gameover/mappedstoryUpbeat.mp3", true, undefined, 0.4);
        this.enableSound = false;
    } else {
        this.game.soundPlayer.removeAllSound();
        this.game.soundPlayer.randomTrackInQueue = false;
        this.game.soundPlayer.addToQueue("./sound/music/gameover/YGO-duel-lost.mp3", undefined, undefined, 0.5);
        this.game.soundPlayer.addToQueue("./sound/music/gameover/KH-end-of-the-world.mp3", true, undefined, 0.4);
        this.enableSound = false;
    }
    if(extraAction !== undefined){
        extraAction();
    }
    //-end ADJUST

    //-Adding logo
    var endGameEntity = new EndGame(this.game, playerWon);
    this.addEntity(endGameEntity);
}
//--- end endGame