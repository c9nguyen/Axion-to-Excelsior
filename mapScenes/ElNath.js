function ElNath(game) {
  Scene.call(this, game);

}

ElNath.prototype = Object.create(Scene.prototype);
ElNath.prototype.constructor = ElNath;

ElNath.prototype.create = function () {
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


    var ice = new Button(this.game, AM.getAsset("./img/effect/e1001/mob_1.png"), mapXLocation + 338, mapYLocation + 175);
    ice.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'press');
    ice.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'mouseover');
    ice.addEventListener('click', function(that) {
      mapType['curr'] = 'map1';
      that.game.clearEntities();
      that.game.sceneManager.startScene('mainmenu');
    });
    this.game.addEntity(ice);

    var ice1 = new Button(this.game, AM.getAsset("./img/ui/1.png"), mapXLocation + 240, mapYLocation + 150);
    ice1.addSheet( AM.getAsset("./img/ui/1_1.png"),'press');
    ice1.addSheet( AM.getAsset("./img/ui/1_2.png"),'mouseover');
    ice1.addEventListener('click', function(that){
        mapType['curr'] = 'map1_1';
        that.game.clearEntities();
        that.game.sceneManager.startScene('mainmenu');
    });
    this.game.addEntity(ice1);
    


    // adding music
    this.addMusic();

    var exit_button = new Button(this.game, AM.getAsset("./img/ui/exit_button.png"), 1175, 0, 0.3);
    exit_button.addEventListener('click', function() {
          this.game.soundPlayer.removeAllSound();
      this.game.sceneManager.startScene('mainmenu');
    });

    this.game.addEntity(exit_button);
};
ElNath.prototype.addMusic = function(){
  this.game.soundPlayer.addToMusic("./sound/music/mappedstoryMainTheme.mp3", true, undefined, 0.5);
}