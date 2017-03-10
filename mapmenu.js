function MapMenu(game) {
    Scene.call(this, game);
    
}

MapMenu.prototype = Object.create(Scene.prototype);
MapMenu.prototype.constructor = MapMenu;

MapMenu.prototype.create = function () {
    var canvasHeight = this.game.ctx.canvas.clientHeight;
	var canvasWidth = this.game.ctx.canvas.clientWidth;

    // Background
    var backGroundColor = new NonAnimatedObject(this.game, AM.getAsset("./img/back/mapselect.jpg"),0, 0);
    backGroundColor.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(backGroundColor);
    // -- background
    

    var mapAsset = AM.getAsset('./img/map/01/map.png');
    var mapXLocation = (canvasWidth - mapAsset.width) / 2;
    var mapYLocation = (canvasHeight - mapAsset.height) / 2;

    var level = new NonAnimatedObject(this.game, AM.getAsset("./img/ui/levels.png"), 35, mapYLocation);
    this.game.addEntity(level);

    var back = new NonAnimatedObject(this.game, mapAsset, mapXLocation, mapYLocation);
    //back.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(back);

    var cardbutton =  new Button(this.game, AM.getAsset("./img/ui/buttons/cards.png"), 1000, 250);
    cardbutton.addSheet( AM.getAsset("./img/ui/buttons/cards_mouseover.png"),'mouseover');
    cardbutton.addSheet( AM.getAsset("./img/ui/buttons/cards_click.png"),'press');
    cardbutton.addEventListener('click', function() {
        this.game.sceneManager.startScene('deckbuilding');
    });
    this.game.addEntity(cardbutton);

    var tutOn = false;
    var tutButton =  new Button(this.game, AM.getAsset("./img/ui/buttons/tutorial.png"), 1000, 350);
    tutButton.addSheet( AM.getAsset("./img/ui/buttons/tutorial_mouseover.png"),'mouseover');
    tutButton.addSheet( AM.getAsset("./img/ui/buttons/tutorial_click.png"),'press');
    tutButton.addEventListener('click', function() {
        this.game.clearEntities();
        var tut = new Button(this.game, AM.getAsset("./img/back/tutorial.png"), 0, 0);
        tut.addEventListener('click', function() {

            tut.removeFromWorld = true;
            tut.game.sceneManager.startScene('mapmenu');
        });
        this.game.addHeadEntity(tut);
    });
    this.game.addEntity(tutButton);


    var portal = new AnimatedObject(this.game, AM.getAsset("./img/effect/portal/portal.png"), mapXLocation + 338, mapYLocation + 175, 7, 0.1, 7, true);
    var portal_mouseover = new AnimatedObject(this.game, AM.getAsset("./img/effect/portal/portal_mouseover.png"), mapXLocation + 338, mapYLocation + 175, 7, 0.1, 7, true);
    var ice = new Button(this.game, AM.getAsset("./img/effect/portal/portal.png"), mapXLocation + 338, mapYLocation + 175);
    ice.addEventListener('click', function(that) {
      mapType['curr'] = 'map1';
      that.game.clearEntities();
      that.game.sceneManager.startScene('battle');
    });
    ice.mouseover = portal_mouseover;
    ice.press = ice.mouseover;
    ice.disable = ice.press;
    ice.normal = portal;
    ice.colliseBox = {x: ice.x, y: ice.y, width: 41, height: 49};
    this.game.addEntity(ice);

    var ice1 = new Button(this.game, AM.getAsset("./img/ui/numbers/1.png"), mapXLocation + 255, mapYLocation + 155);
    ice1.addSheet( AM.getAsset("./img/ui/numbers/1_1.png"),'press');
    ice1.addSheet( AM.getAsset("./img/ui/numbers/1_2.png"),'mouseover');
    ice1.addEventListener('click', function(that){
        mapType['curr'] = 'map1_1';
        that.game.clearEntities();
        that.game.sceneManager.startScene('battle');
    });
    this.game.addEntity(ice1);

    var ice2 = new Button(this.game, AM.getAsset("./img/ui/numbers/2.png"), mapXLocation + 370, mapYLocation + 250);
    ice2.addSheet( AM.getAsset("./img/ui/numbers/2_1.png"),'press');
    ice2.addSheet( AM.getAsset("./img/ui/numbers/2_2.png"),'mouseover');
    ice2.addEventListener('click', function(that){
        mapType['curr'] = 'map1_2';
        that.game.clearEntities();
        that.game.sceneManager.startScene('battle');
    });
    this.game.addEntity(ice2);


    // var ice3 = new Button(this.game, AM.getAsset("./img/ui/numbers/3.png"), mapXLocation + 430, mapYLocation + 180);
    // ice3.addSheet( AM.getAsset("./img/ui/numbers/3_1.png"),'press');
    // ice3.addSheet( AM.getAsset("./img/ui/numbers/3_2.png"),'mouseover');
    // ice3.addEventListener('click', function(that){
    //     mapType['curr'] = 'map1_3';
    //     that.game.clearEntities();
    //     that.game.sceneManager.startScene('battle');
    // });
    // this.game.addEntity(ice3);


    
    //No new map for now
    // var earth = new Button(this.game, AM.getAsset("./img/effect/e1001/mob_1.png"), mapXLocation + 503, mapYLocation + 253);
    // earth.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'press');
    // earth.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'mouseover');
    // earth.addEventListener('click', function(that) {
    //   mapType['curr'] = 'map2';
    //   that.game.clearEntities();
    //   that.game.sceneManager.startScene('mainmenu');
    // });
    // this.game.addEntity(earth);
    
    


    // adding music
    this.addMusic();

    var exit_button = new Button(this.game, AM.getAsset("./img/ui/exit_button.png"), 1175, 0, 0.3);
    exit_button.addEventListener('click', function() {
          this.game.soundPlayer.removeAllSound();
      this.game.sceneManager.startScene('mainmenu');
    });

    this.game.addEntity(exit_button);
};
MapMenu.prototype.addMusic = function(){
  this.game.soundPlayer.addToMusic("./sound/music/mappedstoryMainTheme.mp3", true, undefined, 0.5);
}
