function MapMenu(game) {
  this.game = game;

}
MapMenu.prototype.create = function () {
  canvasHeight = this.game.ctx.canvas.clientHeight;
	canvasWidth = this.game.ctx.canvas.clientWidth;

    var back = new NonAnimatedObject(this.game, AM.getAsset('./img/map/01/map.png'),0, 0);
    //back.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(back);

    var b1 = new Button(this.game, AM.getAsset("./img/effect/e1001/mob_1.png"), 330, 140);
    b1.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'press');
    b1.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'mouseover');
    b1.addEventListener('click', function() {
      mapType['curr'] = 'map1';
      this.game.clearEntities();
      this.game.sceneManager.startScene('mainmenu');
    });

    var b2 = new Button(this.game, AM.getAsset("./img/effect/e1001/mob_1.png"), 500, 280);
    b2.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'press');
    b2.addSheet( AM.getAsset("./img/effect/e1001/mob_6.png"),'mouseover');
    b2.addEventListener('click', function() {
      mapType['curr'] = 'map2';
      this.game.clearEntities();
      this.game.sceneManager.startScene('mainmenu');
    });

    this.game.addEntity(b1);
    this.game.addEntity(b2);
};
