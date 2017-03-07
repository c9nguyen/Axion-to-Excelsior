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
    // backGroundColor.update = function(){ /* Empty*/ };
    // backGroundColor.draw = function(){
    //   this.game.ctx.beginPath();
    //   this.game.ctx.fillStyle="#00cccc"; // Light-Blue
    //   this.game.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    //   this.game.ctx.stroke();
    // };
    this.game.addEntity(backGroundColor);
    // -- background
    

    var mapAsset = AM.getAsset('./img/map/01/map.png');
    var mapXLocation = (canvasWidth - mapAsset.width) / 2;
    var mapYLocation = (canvasHeight - mapAsset.height) / 2;

    var back = new NonAnimatedObject(this.game, mapAsset, mapXLocation, mapYLocation);
    //back.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(back);

    var portal = new AnimatedObject(this.game, AM.getAsset("./img/effect/portal/portal.png"), mapXLocation + 338, mapYLocation + 175, 7, 0.1, 7, true);
    var portal_mouseover = new AnimatedObject(this.game, AM.getAsset("./img/effect/portal/portal_mouseover.png"), mapXLocation + 338, mapYLocation + 175, 7, 0.1, 7, true);
    var ice = new Button(this.game, AM.getAsset("./img/effect/portal/portal.png"), mapXLocation + 338, mapYLocation + 175);
    ice.addEventListener('click', function(that) {
      mapType['curr'] = 'map1';
      that.game.clearEntities();
      that.game.sceneManager.startScene('mainmenu');
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
        that.game.sceneManager.startScene('mainmenu');
    });
    this.game.addEntity(ice1);

    var ice2 = new Button(this.game, AM.getAsset("./img/ui/numbers/2.png"), mapXLocation + 370, mapYLocation + 250);
    ice2.addSheet( AM.getAsset("./img/ui/numbers/2_1.png"),'press');
    ice2.addSheet( AM.getAsset("./img/ui/numbers/2_2.png"),'mouseover');
    ice2.addEventListener('click', function(that){
        mapType['curr'] = 'map1_2';
        that.game.clearEntities();
        that.game.sceneManager.startScene('mainmenu');
    });
    this.game.addEntity(ice2);

    

    var earth = new Button(this.game, AM.getAsset("./img/effect/e1001/mob_1.png"), mapXLocation + 503, mapYLocation + 253);
    earth.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'press');
    earth.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'mouseover');
    earth.addEventListener('click', function(that) {
      mapType['curr'] = 'map2';
      that.game.clearEntities();
      that.game.sceneManager.startScene('mainmenu');
    });
    this.game.addEntity(earth);
    
    


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
