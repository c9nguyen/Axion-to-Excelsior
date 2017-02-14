function Battle(game)
{
	this.game = game;
}

Battle.prototype.create = function() {
    console.log('battle created');

    var screenmove = new ScreenMover(this.game);
    this.game.addEntity(screenmove);
    var map = new ScreenScroller(this.game, screenmove, 800, 550, 400, 50); 
    this.game.addEntity(map);
    var rightAndLeftKey = new ScreenMoveArrow(this.game, screenmove);
    this.game.addEntity(rightAndLeftKey);

	this.loadCharacter();
    this.buildingBackground();
    this.buildTiles();

    var button = new Button(this.game, AM.getAsset("./img/unit/h000/card.png"), 200, 520);
    button.addSheet(AM.getAsset("./img/unit/h000/card_click.png"), "click");
    button.addSheet(AM.getAsset("./img/unit/h000/card_mouseover.png"), "mouseover");
    button.addEventListener("click", function() { 
        var xSpawnLocation = globalGiveMapX(this.game, 100);
        spawnUnit(this.game, xSpawnLocation, 400, "h000", PLAYER); })
    this.game.addEntity(button);

    var button2 = new Button(this.game, AM.getAsset("./img/unit/m000/card.png"), 600, 520);
    button2.addSheet(AM.getAsset("./img/unit/m000/card_click.png"), "click");
    button2.addSheet(AM.getAsset("./img/unit/m000/card_mouseover.png"), "mouseover");
    button2.addEventListener("click", function() { 
        var xSpawnLocation = globalGiveMapX(this.game, 800);
        spawnUnit(this.game, xSpawnLocation, 400, "m000", ENEMY); 
    })

    this.game.addEntity(button2);

    spawnUnit(this.game, 900, 400, "m010", ENEMY);

    spawnUnit(this.game, 100, 400, "h100", PLAYER);



};

Battle.prototype.update = function() {
	// body...
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
	var canvasWidth = this.game.ctx.canvas.clientWidth;
    var groundCollisionBox = this.game.collisionBox.ground;

    var numOfTile = Math.ceil(canvasWidth / 90) + 2;
    var groundX = -97;

    var tile = new Tile(this.game, groundX, canvasHeight - 100, numOfTile, "greenGrass");
    this.game.addEntity(tile);
};
