function MainMenu(game) {
  this.game = game;
};

MainMenu.prototype.init = function () {

};
MainMenu.prototype.create = function () {
  var startbutton = new Button(this.game, AM.getAsset("./img/ui/start_button_disable.png"), 500, 500);
  startbutton.addSheet( AM.getAsset("./img/ui/start_button_pressed.png"),'press');
  startbutton.addSheet( AM.getAsset("./img/ui/start_button_mouseover.png"),'mouseover');
  startbutton.addEventListener('click', function() {
    this.game.sceneManager.startScene('battle');
  });
  var cardbutton =  new Button(this.game, AM.getAsset("./img/ui/cards_button.png"), 250, 50);
  cardbutton.addSheet( AM.getAsset("./img/ui/cards_hoverbutton.png"),'mouseover');
  cardbutton.addSheet( AM.getAsset("./img/ui/cards_pressbutton.png"),'press');

  var settingbutton =  new Button(this.game, AM.getAsset("./img/ui/settings_button.png"), 1200-250-238, 50);
  settingbutton.addSheet( AM.getAsset("./img/ui/settings_hoverbutton.png"),'mouseover');
  settingbutton.addSheet( AM.getAsset("./img/ui/settings_pressbutton.png"),'press');

  var mapbutton =  new Button(this.game, AM.getAsset("./img/ui/maps_button.png"), 1200-250-238, 50+131+50);
  mapbutton.addSheet( AM.getAsset("./img/ui/maps_hoverbutton.png"),'mouseover');
  mapbutton.addSheet( AM.getAsset("./img/ui/maps_pressbutton.png"),'press');

  var shopbutton =  new Button(this.game, AM.getAsset("./img/ui/shop_button.png"), 250, 50+131+50);
  shopbutton.addSheet( AM.getAsset("./img/ui/shop_hoverbutton.png"),'mouseover');
  shopbutton.addSheet( AM.getAsset("./img/ui/shop_pressbutton.png"),'press');

  this.game.addEntity(shopbutton);
  this.game.addEntity(mapbutton);
  this.game.addEntity(settingbutton);
  this.game.addEntity(startbutton);
  this.game.addEntity(cardbutton);
};
