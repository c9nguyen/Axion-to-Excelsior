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

AM.queueDownload("./img/back/portal.png");
AM.queueDownload("./img/food/spritesheet.png");
AM.queueDownload("./img/tomb.png");

AM.queueDownload("./img/ui/start_button_disable.png");
AM.queueDownload("./img/ui/start_button_pressed.png");
AM.queueDownload("./img/ui/start_button_mouseover.png");

function spawn(game) {
    var person = new Person(game, -1, 400, 400, 0.1, 1);
    person.changeStatus(WALK);
    person.setSpeed(200, 1);
    person.yVelocity = Math.floor(Math.random() * -1500);
    game.addEntity(person);
    for (var i = 0; i < game.entities.length; i++) {
        game.entities[i].x += -100;
    }
}

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

 

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    loadCharacter();

    buildingBackground(gameEngine);
    buildTiles(gameEngine);

    // var person = new Person(gameEngine, -1, 400, 50, 0.1, 1);
    // person.changeStatus(WALK);
    // person.setSpeed(200, 1);
    // gameEngine.addEntity(person);

    // person = new Person(gameEngine, -1, 400, 500, 0.1, 1);
    // person.yVelocity = - 1500;
    // person.changeStatus(WALK);
    // person.setSpeed(200, 1);
    // gameEngine.addEntity(person);

    // person = new Person(gameEngine, -1, 400, 500, 0.1, 1);
    // person.yVelocity = - 1000;
    // person.changeStatus(WALK);
    // person.setSpeed(200, 1);
    // gameEngine.addEntity(person);

    // person = new Person(gameEngine, -1, 400, 500, 0.1, 1);
    // person.yVelocity = - 1000;
    // person.changeStatus(WALK);
    // person.setSpeed(200, 1);
    // gameEngine.addEntity(person);

    var food = new Food(gameEngine, 450, 80);
    gameEngine.addEntity(food);
    gameEngine.food.push(food);

    food = new Food(gameEngine, 750, 80);
    gameEngine.addEntity(food);
    gameEngine.food.push(food);
    
    food = new Food(gameEngine, 370, 200);
    gameEngine.addEntity(food);
    gameEngine.food.push(food);

    food = new Food(gameEngine, 780, 200);
    gameEngine.addEntity(food);
    gameEngine.food.push(food);

    placePortals(gameEngine);

    var button = new Button(gameEngine, {normal: AM.getAsset("./img/ui/start_button_disable.png"),
                                        press: AM.getAsset("./img/ui/start_button_pressed.png"),
                                        mouseover: AM.getAsset("./img/ui/start_button_mouseover.png")},
                                        500, 500);
    gameEngine.addEntity(button);
});

function buildingBackground(gameEngine) {
    var back = new NonAnimatedObject(gameEngine, AM.getAsset("./img/back/sky.png"),0, 0);
    back.setSize(canvasWidth, canvasHeight);
    gameEngine.addEntity(back);

    back = new NonAnimatedObject(gameEngine, AM.getAsset("./img/back/cloud.png"),0, 0);
    gameEngine.addEntity(back);

    back = new NonAnimatedObject(gameEngine, AM.getAsset("./img/back/back.png"), 0, 250);
    gameEngine.addEntity(back);

    back = new AnimatedObject(gameEngine, AM.getAsset("./img/back/1.png"), 100, 50,
                            72, 168,6, 0.1, 6,true,1);
    gameEngine.addEntity(back);

    back = new AnimatedObject(gameEngine, AM.getAsset("./img/back/2.png"), 900, 50,
                            267, 147, 2, 0.3, 6, true, 1);
    gameEngine.addEntity(back);
}

function loadCharacter() {
    for (var i = 1 ; i <= 4; i++) {
        characters[i - 1] = {
            left:[
                AM.getAsset("./img/character/person" + i + "_walk1_left.png"),  //walk
                AM.getAsset("./img/character/person" + i + "_jump_left.png"),   //jump
                AM.getAsset("./img/character/person" + i + "_stand_left.png")   //stand
            ], 
            right:[
                AM.getAsset("./img/character/person" + i + "_walk1_right.png"),
                AM.getAsset("./img/character/person" + i + "_jump_right.png"),
                AM.getAsset("./img/character/person" + i + "_stand_right.png")            
            ]
        }
    }
}

function buildTiles(gameEngine) {
    var gameEngine = gameEngine;
    var groundCollisionBox = gameEngine.collisionBox.ground;


    var numOfTile = Math.ceil(canvasWidth / 90) + 2;
    var groundX = -97;
    
    for (var i = 0; i < numOfTile; i++) {
        //Building the bottom ground
        groundCollisionBox.push({x: groundX, y: canvasHeight - 87, width: 90, height: 20});
        gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en_spritesheet.png"), 
                                                    groundX, canvasHeight - 97,
                                                    90, 37, 2, 3, -1, 1));
        gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/bsc_spritesheet.png"), 
                                                    groundX, canvasHeight - 60,
                                                    90, 60, 2, 6, -1, 1));

        //Building second floor     
        if (i !== 1 && i !== numOfTile / 2 && i !== numOfTile / 2 - 1 && i < numOfTile - 3) {
            groundCollisionBox.push({x: groundX, y: canvasHeight - 222, width: 90, height: 20});
            gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en_spritesheet.png"), 
                                                        groundX, canvasHeight - 232,
                                                        90, 37, 2, 3, -1, 1));
            gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en1_spritesheet.png"), 
                                                        groundX, canvasHeight - 200,
                                                        90, 32, 2, 3, -1, 1));
        }

        //Building third floor       
        if ((i < numOfTile / 2 - 3) || (i === numOfTile / 2) || (i === numOfTile / 2 - 1) || (i > numOfTile / 2 + 2))  {
            groundCollisionBox.push({x: groundX, y: canvasHeight - 342, width: 90, height: 20});
            gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en_spritesheet.png"), 
                                                        groundX, canvasHeight - 352,
                                                        90, 37, 2, 3, -1, 1));
            gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en1_spritesheet.png"), 
                                                        groundX, canvasHeight - 320,
                                                        90, 32, 2, 3, -1, 1));
        }

        //Building fourth floor
        if (i !== 1 && i !== numOfTile / 2 && i !== numOfTile / 2 - 1 && i < numOfTile - 2) {
            groundCollisionBox.push({x: groundX, y: canvasHeight - 462, width: 90, height: 20});
            gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en_spritesheet.png"), 
                                                        groundX, canvasHeight - 472,
                                                        90, 37, 2, 3, -1, 1));
            gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en1_spritesheet.png"), 
                                                        groundX, canvasHeight - 440,
                                                        90, 32, 2, 3, -1, 1));
        }

        //Building fifth floor
        if (i < numOfTile / 2 + 3 && i > numOfTile / 2 - 4) {
            groundCollisionBox.push({x: groundX, y: canvasHeight - 582, width: 90, height: 20});
            gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en_spritesheet.png"), 
                                                        groundX, canvasHeight - 592,
                                                        90, 37, 2, 3, -1, 1));
            gameEngine.addEntity(new NonAnimatedObject(gameEngine, AM.getAsset("./img/tiles/en1_spritesheet.png"), 
                                                        groundX, canvasHeight - 560,
                                                        90, 32, 2, 3, -1, 1));
        }

        groundX += 90;
    }
}

function placePortals(gameEngine) {
    var canvas = canvas;
    var gameEngine = gameEngine;

    var dist = 370;
    
    for (var i = 0; i < 4; i++) {
        var portal = new Portal(gameEngine, AM.getAsset("./img/back/portal.png"), dist * i, canvasHeight - 219, 4, 0.1, 8, true, 1);
        gameEngine.addEntity(portal);
        gameEngine.portals.push(portal);
    } 
}