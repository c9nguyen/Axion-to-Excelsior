function MapMenu(game) {
  Scene.call(this, game);

}

MapMenu.prototype = Object.create(Scene.prototype);
MapMenu.prototype.constructor = MapMenu;

MapMenu.prototype.create = function () {
    var canvasHeight = this.game.ctx.canvas.clientHeight;
	  var canvasWidth = this.game.ctx.canvas.clientWidth;

    // Background
    var backGroundColor = new Entity(this.game);
    backGroundColor.update = function(){ /* Empty*/ };
    backGroundColor.draw = function(){
      this.game.ctx.beginPath();
      this.game.ctx.fillStyle="#00cccc"; // Light-Blue
      this.game.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      this.game.ctx.stroke();
    };
    this.game.addEntity(backGroundColor);
    // -- background

    var mapAsset = AM.getAsset('./img/map/01/map.png');
    var mapXLocation = (canvasWidth - mapAsset.width) / 2;
    var mapYLocation = (canvasHeight - mapAsset.height) / 2;

    var back = new NonAnimatedObject(this.game, mapAsset, mapXLocation, mapYLocation);
    //back.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(back);

    var iceX = 330;
    var iceY = 140
    var ice = new Button(this.game, AM.getAsset("./img/effect/e1001/mob_1.png"), mapXLocation + iceX, mapYLocation + iceY);
    ice.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'press');
    ice.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'mouseover');
    ice.addEventListener('click', function() {
      mapType['curr'] = 'map1';
      this.game.clearEntities();
      this.game.sceneManager.startScene('mainmenu');
    });

    var earthX = 500;
    var earthY = 280;
    var earth = new Button(this.game, AM.getAsset("./img/effect/e1001/mob_1.png"), mapXLocation + earthX, mapYLocation + earthY);
    earth.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'press');
    earth.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'mouseover');
    earth.addEventListener('click', function() {
      mapType['curr'] = 'map2';
      this.game.clearEntities();
      this.game.sceneManager.startScene('mainmenu');
    });

    this.game.addEntity(ice);
    this.game.addEntity(earth);

    this.addMusic();
};
MapMenu.prototype.addMusic = function(){
  this.game.soundPlayer.addToMusic("./sound/music/mappedstoryMainTheme.mp3", true, undefined, 0.5);
}