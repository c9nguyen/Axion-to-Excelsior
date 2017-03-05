function DeckBuilding(game) {
  Scene.call(this, game);

}

DeckBuilding.prototype = Object.create(Scene.prototype);
DeckBuilding.prototype.constructor = DeckBuilding;

DeckBuilding.prototype.create = function () {
    var canvasHeight = this.game.ctx.canvas.clientHeight;
	  var canvasWidth = this.game.ctx.canvas.clientWidth;

    // Background
    var backGroundColor = new Entity(this.game);
    backGroundColor.update = function(){ /* Empty*/ };
    backGroundColor.draw = function(){
      this.game.ctx.beginPath();
      this.game.ctx.fillStyle="#800080"; // Dark-Pink
      this.game.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      this.game.ctx.stroke();
    };
    this.game.addEntity(backGroundColor);
    // -- background


    var startbutton = new Button(this.game, AM.getAsset("./img/ui/start_button_disable.png"), 1075, 475);
    startbutton.addSheet( AM.getAsset("./img/ui/start_button_pressed.png"),'press');
    startbutton.addSheet( AM.getAsset("./img/ui/start_button_mouseover.png"),'mouseover');
    startbutton.addEventListener('click', function() {
      this.game.sceneManager.startScene('mainmenu');
    });
    this.game.addEntity(startbutton);

    this.addMusic();
};
DeckBuilding.prototype.addMusic = function(){
    this.game.soundPlayer.addToMusic("./sound/music/deckbuilding.mp3", true, undefined, 0.5);
};

//---------------------------------- Deck List -----------------------------------------//
function DeskListUI(game, x = 0, y = 0){
    Entity.call(this, game, x, y);

    this.deck = [];

}
DeskListUI.prototype = Object.create(Entity.prototype);
DeskListUI.prototype.constructor = DeskListUI;

DeckListUI.prototype.update = function(){
  // empty
}
DeckListUI.prototype.draw = function(){
  // empty
}

DeckListUI.prototype.addCard = function(unitCode){
    this.deck[unitCode] = new DeckCard(this.game, unitCode);
}


// --------------------------- end DeckList ----------------------------------------------//

//---------------------------- Deck Card -------------------------------------------------//
function DeckCard(game, unitCode, scale = 1, x = 0, y = 0){
    Entity.call(this, game, x, y);
    this.unitCode = unitCode;
    this.ticket = 0;
    that = this;

    this.icon = new NonAnimatedObject(this.game, AM.getAsset("./img/unit/" + unitCode + "/card_mouseover.png"), 0, 0);

    this.plus = new Button(this.game, AM.getAsset("./img/ui/minusnormal.png"), 0, 0);
    this.plus.addSheet( AM.getAsset("./img/ui/minuspress.png"),'press');
    this.plus.addSheet( AM.getAsset("./img/ui/minushover.png"),'mouseover');
    this.plus.addEventListener('click', function() {
        if(that.ticket < 5){
            that.ticket++;
        }
    });

    this.minus = new Button(this.game, AM.getAsset("./img/ui/plusnormal.png"), 0, 0);
    this.minus.addSheet( AM.getAsset("./img/ui/pluspress.png"),'press');
    this.minus.addSheet( AM.getAsset("./img/ui/plushover.png"),'mouseover');
    this.minus.addEventListener('click', function() {
        if(that.ticket > 0){
            that.ticket--;
        }
    });

    this.numberX = 0;
    this.numberY = 0;
    this.number = [];
    for(var i = 0; i < 10; i++){
        this.number.push(new NonAnimatedObject(this.game, AM.getAsset("./img/ui/numbers/" + i +".png"), this.numberX, this.numberY));
    }

}

DeckCard.prototype = Object.create(Entity.prototype);
DeckCard.prototype.constructor = DeckCard;

DeckCard.prototype.update = function(){

    this.icon.update();
    this.minus.update();
    this.plus.update();

}
DeckCard.prototype.draw = function(){
    
    this.icon.draw();
    this.minus.draw();
    this.plus.draw();

}
//--------------------------- end DeckCard -----------------------------------------------//

