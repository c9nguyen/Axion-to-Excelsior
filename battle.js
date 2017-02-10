function Battle(game)
{
	this.game = game;
}

Battle.prototype.create = function() {
    console.log('battle created');
	this.loadCharacter();
    this.buildingBackground();
    this.buildTiles();

    var button = new Button(this.game, AM.getAsset("./img/ui/start_button_disable.png"), 200, 500);
    button.addSheet(AM.getAsset("./img/ui/start_button_pressed.png"), "click");
    button.addSheet(AM.getAsset("./img/ui/start_button_mouseover.png"), "mouseover");
    button.addEventListener("click", function() { spawnUnit(this.game, 100, 100, "h000", PLAYER); })
    this.game.addEntity(button);


    var button2 = new Button(this.game, AM.getAsset("./img/ui/start_button_disable.png"), 600, 500);
    button2.addSheet(AM.getAsset("./img/ui/start_button_pressed.png"), "click");
    button2.addSheet(AM.getAsset("./img/ui/start_button_mouseover.png"), "mouseover");
    button2.addEventListener("click", function() { spawnUnit(this.game, 800, 100, "m000", ENEMY); })
    this.game.addEntity(button2);

    spawnUnit(this.game, 900, 100, "m010", ENEMY);

    var screenmove = new ScreenMover(this.game);
    this.game.addEntity(screenmove);
    var map = new ScreenScroller(this.game, 800, 550, 400, 50); 
    this.game.addEntity(map);
    var rightAndLeftKey = new ScreenMoveArrow(this.game, screenmove);
    this.game.addEntity(rightAndLeftKey);

};

Battle.prototype.update = function() {
	// body...
};

Battle.prototype.buildingBackground = function() {
	canvasHeight = this.game.ctx.canvas.clientHeight;
	canvasWidth = this.game.ctx.canvas.clentWidth;

    var back = new NonAnimatedObject(this.game, AM.getAsset("./img/back/sky.png"),0, 0);
    back.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(back);

    back = new NonAnimatedObject(this.game, AM.getAsset("./img/back/cloud.png"),0, 0);
    this.game.addEntity(back);

    back = new NonAnimatedObject(this.game, AM.getAsset("./img/back/back.png"), 0, 250);
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

Battle.prototype.placePortals = function() {
    var dist = 370;

    for (var i = 0; i < 4; i++) {
        var portal = new Portal(this.game, AM.getAsset("./img/back/portal.png"), dist * i, canvasHeight - 219, 4, 0.1, 8, true, 1);
        this.game.addEntity(portal);
        this.game.portals.push(portal);
    }
};
