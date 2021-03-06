function MainMenu(game) {
  // this.game = game;
  Scene.call(this, game);
};

MainMenu.prototype = Object.create(Scene.prototype);
MainMenu.prototype.constructor = MainMenu;

MainMenu.prototype.init = function () {

};
MainMenu.prototype.create = function () {
  var back = new NonAnimatedObject(this.game, AM.getAsset("./img/back/intro.png"),0, 0);
    //back.setSize(canvasWidth, canvasHeight);


  var startbutton = new Button(this.game, AM.getAsset("./img/back/introClick.png"), 0, 0);
  startbutton.addEventListener('click', function() {
    this.game.sceneManager.startScene('mapmenu');
  });
  // var cardbutton =  new Button(this.game, AM.getAsset("./img/ui/cards_button.png"), 250, 50);
  // cardbutton.addSheet( AM.getAsset("./img/ui/cards_hoverbutton.png"),'mouseover');
  // cardbutton.addSheet( AM.getAsset("./img/ui/cards_pressbutton.png"),'press');

  // var settingbutton =  new Button(this.game, AM.getAsset("./img/ui/settings_button.png"), 1200-250-238, 50);
  // settingbutton.addSheet( AM.getAsset("./img/ui/settings_hoverbutton.png"),'mouseover');
  // settingbutton.addSheet( AM.getAsset("./img/ui/settings_pressbutton.png"),'press');

  // var buttonScale = 0.4;
  // var mapbutton =  new Button(this.game, AM.getAsset("./img/ui/maps_button.png"), 675, 425, buttonScale);
  // mapbutton.addSheet( AM.getAsset("./img/ui/maps_hoverbutton.png"),'mouseover');
  // mapbutton.addSheet( AM.getAsset("./img/ui/maps_pressbutton.png"),'press');
  // mapbutton.addEventListener('click', function() {
  //   this.game.sceneManager.startScene('mapmenu');
  // });

  // var cardbutton =  new Button(this.game, AM.getAsset("./img/ui/cards_button.png"), 675, 480, buttonScale);
  // cardbutton.addSheet( AM.getAsset("./img/ui/cards_hoverbutton.png"),'mouseover');
  // cardbutton.addSheet( AM.getAsset("./img/ui/cards_pressbutton.png"),'press');
  // cardbutton.addEventListener('click', function() {
  //   this.game.sceneManager.startScene('deckbuilding');
  // });
  // var shopbutton =  new Button(this.game, AM.getAsset("./img/ui/shop_button.png"), 250, 50+131+50);
  // shopbutton.addSheet( AM.getAsset("./img/ui/shop_hoverbutton.png"),'mouseover');
  // shopbutton.addSheet( AM.getAsset("./img/ui/shop_pressbutton.png"),'press');

  this.game.soundPlayer.addToMusic("./sound/music/KH-dearly-beloved.mp3", undefined, undefined, 0.5);

  this.game.addEntity(back);
  // this.game.addEntity(shopbutton);
  //this.game.addEntity(mapbutton);
  // this.game.addEntity(settingbutton);
  this.game.addEntity(startbutton);
  // this.game.addEntity(cardbutton);
};
