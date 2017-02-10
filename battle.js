function Battle(game)
{
	this.game = game;
}

Battle.prototype.create = function() {
    console.log('battle created');
	this.loadCharacter();
    this.buildingBackground();
    this.buildTiles();
    var button = new Button(this.game, {normal: AM.getAsset("./img/ui/start_button_disable.png"),
                                    press: AM.getAsset("./img/ui/start_button_pressed.png"),
                                    mouseover: AM.getAsset("./img/ui/start_button_mouseover.png")},
                                    500, 500);
    this.game.addEntity(button);

    var screenmove = new ScreenMover(this.game);
    this.game.addEntity(screenmove);
    var map = new ScreenScroller(this.game, screenmove, 800, 550, 400, 50); 
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


    for (var i = 0; i < numOfTile; i++) {
        //Building the bottom ground
        groundCollisionBox.push({x: groundX, y: canvasHeight - 87, width: 90, height: 40});
        this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en_spritesheet.png"),
                                                    groundX, canvasHeight - 97,
                                                    90, 37, 2, 3, -1, 1));
        this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/bsc_spritesheet.png"),
                                                    groundX, canvasHeight - 60,
                                                     90, 60, 2, 6, -1, 1));

        // //Building second floor
        // if (i !== 1 && i !== numOfTile / 2 && i !== numOfTile / 2 - 1 && i < numOfTile - 3) {
        //     groundCollisionBox.push({x: groundX, y: canvasHeight - 222, width: 90, height: 20});
        //     this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en_spritesheet.png"),
        //                                                 groundX, canvasHeight - 232,
        //                                                 90, 37, 2, 3, -1, 1));
        //     this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en1_spritesheet.png"),
        //                                                 groundX, canvasHeight - 200,
        //                                                 90, 32, 2, 3, -1, 1));
        // }

        // //Building third floor
        // if ((i < numOfTile / 2 - 3) || (i === numOfTile / 2) || (i === numOfTile / 2 - 1) || (i > numOfTile / 2 + 2))  {
        //     groundCollisionBox.push({x: groundX, y: canvasHeight - 342, width: 90, height: 20});
        //     this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en_spritesheet.png"),
        //                                                 groundX, canvasHeight - 352,
        //                                                 90, 37, 2, 3, -1, 1));
        //     this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en1_spritesheet.png"),
        //                                                 groundX, canvasHeight - 320,
        //                                                 90, 32, 2, 3, -1, 1));
        // }

        // //Building fourth floor
        // if (i !== 1 && i !== numOfTile / 2 && i !== numOfTile / 2 - 1 && i < numOfTile - 2) {
        //     groundCollisionBox.push({x: groundX, y: canvasHeight - 462, width: 90, height: 20});
        //     this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en_spritesheet.png"),
        //                                                 groundX, canvasHeight - 472,
        //                                                 90, 37, 2, 3, -1, 1));
        //     this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en1_spritesheet.png"),
        //                                                 groundX, canvasHeight - 440,
        //                                                 90, 32, 2, 3, -1, 1));
        // }

        // //Building fifth floor
        // if (i < numOfTile / 2 + 3 && i > numOfTile / 2 - 4) {
        //     groundCollisionBox.push({x: groundX, y: canvasHeight - 582, width: 90, height: 20});
        //     this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en_spritesheet.png"),
        //                                                 groundX, canvasHeight - 592,
        //                                                 90, 37, 2, 3, -1, 1));
        //     this.game.addEntity(new NonAnimatedObject(this.game, AM.getAsset("./img/tiles/en1_spritesheet.png"),
        //                                                 groundX, canvasHeight - 560,
        //                                                 90, 32, 2, 3, -1, 1));
        //}

        groundX += 90;
    }
};

Battle.prototype.placePortals = function() {
    var dist = 370;

    for (var i = 0; i < 4; i++) {
        var portal = new Portal(this.game, AM.getAsset("./img/back/portal.png"), dist * i, canvasHeight - 219, 4, 0.1, 8, true, 1);
        this.game.addEntity(portal);
        this.game.portals.push(portal);
    }
};
