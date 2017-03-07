function Battle(game)
{
	// this.game = game;
    Scene.call(this, game);
    this.background = mapType[mapType['curr']].background;// "./img/map/01/back.png";
    this.gameover = false;
}

Battle.prototype = Object.create(Scene.prototype);
Battle.prototype.constructor = Battle;

Battle.prototype.create = function() {
    console.log('battle created');
    this.gameover = false;
    this.preloadHeavyImage();
	this.loadCharacter();
    this.buildingBackground();

    //Two main towers:
    var playerBoss = new MainTower(this.game);
    this.game.addEntity(playerBoss);
    var enemyBoss = new EnemyTower(this.game);
    this.game.addEntity(enemyBoss);

    this.buildTiles();

    //Initializing enemy generator
    var list = mapType[mapType['curr']].enemyList;
    var gen = new EnemyGenerator(this.game, 2400, 500, list);
    gen.setFrequency(mapType[mapType['curr']].enemyGenFrequency);
    gen.assignCurrentBoss(enemyBoss);
    gen.setBossesDiedAction(this.endGame);
    for(var i = 0; i < mapType[mapType['curr']].bossQueue.length; i++){
        gen.addToBossQueue(mapType[mapType['curr']].bossQueue[i]);
    }
    // gen.addToBossQueue("m105");
    if(mapType[mapType['curr']].mapEffect1 !== undefined){
        gen.addConditionAndAction(mapType[mapType['curr']].mapEffect1[0], mapType[mapType['curr']].mapEffect1[1], mapType[mapType['curr']].mapEffect1[2]);
    }
    if(mapType[mapType['curr']].mapEffect2 !== undefined){
        gen.addConditionAndAction(mapType[mapType['curr']].mapEffect2[0], mapType[mapType['curr']].mapEffect2[1], mapType[mapType['curr']].mapEffect2[2]);
    }
    if(mapType[mapType['curr']].mapEffect3 !== undefined){
        gen.addConditionAndAction(mapType[mapType['curr']].mapEffect3[0], mapType[mapType['curr']].mapEffect3[1], mapType[mapType['curr']].mapEffect3[2]);
    }
    
    
    // gen.addConditionAndAction(
    //     function(gen) {
    //         return gen.currentBoss.health / gen.currentBoss.data.health < 0.25;
    //     },
    //     function(gen) {
    //         gen.currentBoss.leftG.changeAction("attack3");
    //         gen.currentBoss.rightG.changeAction("attack3");
    //         gen.boostSpawnRate(3);
    //         gen.generateDeck();
    //         spawnUnit(gen.game, 2400, 500, "m101", ENEMY);
    //     },
    //     false
    // );
    // gen.addConditionAndAction(
    //     function(gen) {
    //         return gen.currentBoss.health / gen.currentBoss.data.health < 0.5;
    //     },
    //     function(gen) {
    //         gen.currentBoss.leftG.changeAction("attack3");
    //         gen.currentBoss.rightG.changeAction("attack3");
    //         gen.boostSpawnRate(2);
    //         gen.generateDeck();
    //         spawnUnit(gen.game, 2400, 500, "m100", ENEMY);
    //     },
    //     false
    // );
    // gen.addConditionAndAction(
    //     function(gen) {
    //         return gen.currentBoss.health / gen.currentBoss.data.health < 0.75;
    //     },
    //     function(gen) {
    //         gen.currentBoss.leftG.changeAction("attack3");
    //         gen.currentBoss.rightG.changeAction("attack3");
    //         gen.boostSpawnRate(1);
    //         gen.generateDeck();
    //     },
    //     false
    // );

    this.game.addEntity(gen);

 //spawnUnit(gen.game, 1400, 500, "m101", ENEMY);

    //Initializing cards on hand

    var unitCards = PLAYERDECK["unitCards"];
    var spellCards = PLAYERDECK["spellCards"];
    var summonCards = PLAYERDECK["summonCards"];
    var cardGen = new CardGenerator(this.game, -50, 500, mapType[mapType['curr']].numOfCard, unitCards, spellCards, summonCards);
    cardGen.assignCurrentBoss(playerBoss);
    cardGen.setBossesDiedAction(this.endGame);
    var enemyTowerHealthMark = 0.75;
    var energyRate = mapType[mapType['curr']].energyRate;
    //Setting a condition that lower the enemy tower health, higher energy rate
    cardGen.addConditionAndAction(
        function() {
            return enemyBoss.health / enemyBoss.data.health < enemyTowerHealthMark;
        },
        function() {
            energyRate += 0.025;
            enemyTowerHealthMark -= 0.25;
            cardGen.setEnergyRate(energyRate);
        },
        true
    );
    cardGen.setEnergyRate(energyRate);

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

    // HARD CODE BATTLES
    castSkill(this.game, 0, 0,
                    playerBoss, "e1002");
    // gen.active = true;
    //spawnUnit(this.game, 550, 400, "h100", PLAYER);
    //var preload = new AnimatedObject(this.game, AM.getAsset("./img/unit/s000/attack_effect.png"), 0, 300, 8, 0.1, 8, true);
    //this.game.addEntity(preload);
    // spawnUnit(this.game, 250, 400, "h000", PLAYER);
    // spawnUnit(this.game, 0, 400, "h001", PLAYER);
    // spawnUnit(this.game, 150, 400, "h002", PLAYER);
    // spawnUnit(this.game, 200, 400, "h003", PLAYER);
    // spawnUnit(this.game, 600, 400, "h004", PLAYER);
    // spawnUnit(this.game, 500, 400, "h004", PLAYER);
    // for(var i = 0; i < 3; i++){
    //     spawnUnit(this.game, i * 50, 400, "h005", PLAYER);
    // }
    // for(var i = 0; i < 5; i++){
    //     spawnUnit(this.game, 300 + i * 50, 400, "h004", PLAYER);
    // }
    // spawnUnit(this.game, 100, 400, "h005", PLAYER);
    // spawnUnit(this.game, 160, 400, "h100", PLAYER);
    // spawnUnit(this.game, 210, 400, "h100", PLAYER);

    // spawnUnit(this.game, 2200, 400, "m007", ENEMY);
    // spawnUnit(this.game, 2300, 400, "m007", ENEMY);
    // spawnUnit(this.game, 2200, 400, "m007", ENEMY);
    // spawnUnit(this.game, 2300, 400, "m004", ENEMY);
    // spawnUnit(this.game, 2200, 400, "m004", ENEMY);
    // spawnUnit(this.game, 2300, 400, "m004", ENEMY);
    // spawnUnit(this.game, 2200, 400, "m001", ENEMY);
    // spawnUnit(this.game, 2100, 400, "m001", ENEMY);
    // spawnUnit(this.game, 2000, 400, "m001", ENEMY);
    // spawnUnit(this.game, 1900, 400, "m001", ENEMY);
    // spawnUnit(this.game, 1800, 400, "m001", ENEMY);
    // spawnUnit(this.game, 2220, 400, "m002", ENEMY);
    // spawnUnit(this.game, 2230, 400, "m003", ENEMY);
    // spawnUnit(this.game, 2240, 400, "m004", ENEMY);
    // spawnUnit(this.game, 2250, 400, "m005", ENEMY);
    // spawnUnit(this.game, 2260, 400, "m006", ENEMY);
    // spawnUnit(this.game, 2270, 400, "m013", ENEMY);

    // spawnUnit(this.game, 2270, 400, "m105", ENEMY);
    // spawnUnit(this.game, 2270, 400, "m100", ENEMY);
    // spawnUnit(this.game, 2270, 400, "m101", ENEMY);


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



	var exit_button = new Button(this.game, AM.getAsset("./img/ui/exit_button.png"), 1175, 0, 0.3);
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

/**
 * Draw heavy image 1 time to load into memory
 */
Battle.prototype.preloadHeavyImage = function() {
    var preload = new NonAnimatedObject(this.game, AM.getAsset("./img/effect/e1002/tile_all.png"), 0, 0);
    preload.draw();
    preload.removeFromWorld = true;

    preload = new NonAnimatedObject(this.game, AM.getAsset("./img/unit/tower0/attack2_effect.png"), 0, 0);
    preload.draw();
    preload.removeFromWorld = true;

    preload = new NonAnimatedObject(this.game, AM.getAsset("./img/unit/tower0/attack_effect.png"), 0, 0);
    preload.draw();
    preload.removeFromWorld = true;
}

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
    var extraTile = 19;
    var numOfTile = Math.ceil(canvasWidth / 90) + extraTile;
    var groundX = -90 * extraTile / 2;
    groundLevel = canvasHeight - 100;

    var tile = new Tile(this.game, groundX, groundLevel, numOfTile, mapType[mapType['curr']].tileType);
    this.game.addEntity(tile);
};

Battle.prototype.addAllMusic = function(){
    // Sound

    var musicVolume = 0.2;
    this.game.soundPlayer.randomTrackInQueue = true;
    this.game.soundPlayer.addToQueue("./sound/music/battle/KH-monstrous-monstro.mp3", undefined, undefined, musicVolume);
    this.game.soundPlayer.addToQueue("./sound/music/battle/KH-scherzo-di-notte.mp3", undefined, undefined, musicVolume);
    this.game.soundPlayer.addToQueue("./sound/music/battle/KH-go-for-it.mp3", undefined, undefined, musicVolume);
    this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-lancastrians.mp3", undefined, undefined, musicVolume);
    this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-seto.mp3", undefined, undefined, musicVolume);
    this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-yugi.mp3", undefined, undefined, musicVolume);
    this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-darknite.mp3", undefined, undefined, musicVolume);


    // FOR BOSS
    // this.game.soundPlayer.addToQueue("./sound/music/battle/KH-squirming-evil.mp3", undefined, undefined, 0.4);
    // this.game.soundPlayer.addToQueue("./sound/music/battle/YGO-vs-darknite.mp3", undefined, undefined, 0.4);

}

//--- endGame
// ONLY CALL WHEN GAME END CONDITION IS APPLIED
// Add EXTRA ACTION when end game is called if you want
Battle.prototype.endGame = function(playerWon, extraAction = undefined){

    //-ADJUST: put more things here if you want extra end game stuff...
    //- or use the extraAction function
    if(!this.gameover){
        this.gameover = true;
        if(playerWon){
            this.game.soundPlayer.removeAllSound();
            this.game.soundPlayer.randomTrackInQueue = false;
            this.game.soundPlayer.addToQueue("./sound/music/gameover/YGO-duel-won.mp3", undefined, undefined, 0.4);
            this.game.soundPlayer.addToQueue("./sound/music/gameover/mappedstoryUpbeat.mp3", true, undefined, 0.3);
            this.enableSound = false;
        } else {
            this.game.soundPlayer.removeAllSound();
            this.game.soundPlayer.randomTrackInQueue = false;
            this.game.soundPlayer.addToQueue("./sound/music/gameover/YGO-duel-lost.mp3", undefined, undefined, 0.4);
            this.game.soundPlayer.addToQueue("./sound/music/gameover/KH-end-of-the-world.mp3", true, undefined, 0.3);
            this.enableSound = false;
        }
        if(extraAction !== undefined){
            extraAction();
        }
        //-end ADJUST

        //-Adding logo
        var endGameEntity = new EndGame(this.game, playerWon);
        this.game.addEntity(endGameEntity);
    }
}
//--- end endGame
