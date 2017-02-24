function Battle(game)
{
	this.game = game;
}

Battle.prototype.create = function() {
    console.log('battle created');


	this.loadCharacter();
    this.buildingBackground();
    this.buildTiles();
    
    var list = ["m000", "m000", "m000", "m000",
                "m001", "m001", "m001", "m001", "m001", "m001", "m001", "m001", "m001",
                "m002", "m002", "m002", "m002", "m002", "m002",
                "m010"];

    var gen = new EnemyGenerator(this.game, 1800, 400, list);
    this.game.addEntity(gen);

    var map = new ScreenScroller(this.game, this.game.screenMover, 800, 550, 400, 50);
    this.game.addEntity(map);
    var rightAndLeftKey = new ScreenMoveArrow(this.game, this.game.screenMover);
    this.game.addEntity(rightAndLeftKey);
    // Sound
    this.game.soundPlayer.addToMusic("./sound/music/KH-dearly-beloved.mp3");

    var card = new UnitCard(this.game, "h000", 100, 535, 100, 400);
    this.game.addEntity(card);

    var card = new UnitCard(this.game, "h001", 180, 535, 100, 400);
    this.game.addEntity(card);

    var card = new UnitCard(this.game, "h002", 260, 535, 100, 400);
    this.game.addEntity(card);

    var that = this;

    // var button3 = new Button(this.game, AM.getAsset("./img/unit/h000/card.png"), 180, 535);
    // button3.addSheet(AM.getAsset("./img/unit/h000/card_click.png"), "click");
    // button3.addSheet(AM.getAsset("./img/unit/h000/card_mouseover.png"), "mouseover");
    // button3.addEventListener("click", function() { spawnUnit(this.game, 100, 400, "h001", PLAYER); });
    // this.game.addEntity(button3);

    // var button4 = new Button(this.game, AM.getAsset("./img/unit/h000/card.png"), 260, 535);
    // button4.addSheet(AM.getAsset("./img/unit/h000/card_click.png"), "click");
    // button4.addSheet(AM.getAsset("./img/unit/h000/card_mouseover.png"), "mouseover");
    // button4.addEventListener("click", function() { spawnUnit(this.game, 100, 400, "h002", PLAYER); });
    // this.game.addEntity(button4);

    var button2 = new Button(this.game, AM.getAsset("./img/unit/m000/card.png"), 600, 520);
    button2.addSheet(AM.getAsset("./img/unit/m000/card_click.png"), "click");
    button2.addSheet(AM.getAsset("./img/unit/m000/card_mouseover.png"), "mouseover");
    button2.addEventListener("click", function() { 
        gen.switch(); });

    this.game.addEntity(button2);


    spawnUnit(this.game, 1800, 400, "m100", ENEMY);

    spawnUnit(this.game, 100, 400, "h100", PLAYER);

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
Battle.prototype.shutdown = function () {
	this.game.clearEntities();
};
Battle.prototype.buildingBackground = function() {
	canvasHeight = this.game.ctx.canvas.clientHeight;
	canvasWidth = this.game.ctx.canvas.clientWidth;

    var back = new NonAnimatedObject(this.game, AM.getAsset("./img/back/sky.png"),0, 0);
    back.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(back);

    back = new NonAnimatedObject(this.game, AM.getAsset("./img/back/cloud.png"),0, 0);
    this.game.addEntity(back);

    back = new NonAnimatedObject(this.game, AM.getAsset("./img/back/back.png"), 0, 150);
    this.game.addEntity(back);

    // back = new AnimatedObject(this.game, AM.getAsset("./img/back/1.png"), 100, 50,
    //                         72, 168,6, 0.1, 6,true,1);
    // this.game.addEntity(back);

    // back = new AnimatedObject(this.game, AM.getAsset("./img/back/2.png"), 900, 50,
    //                         267, 147, 2, 0.3, 6, true, 1);
    // this.game.addEntity(back);
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

    var tile = new Tile(this.game, groundX, canvasHeight - 100, numOfTile, "greenGrass");
    this.game.addEntity(tile);
};
