function DeckBuilding(game) {
  Scene.call(this, game);

}

DeckBuilding.prototype = Object.create(Scene.prototype);
DeckBuilding.prototype.constructor = DeckBuilding;

DeckBuilding.prototype.create = function () {
    var canvasHeight = this.game.ctx.canvas.clientHeight;
	  var canvasWidth = this.game.ctx.canvas.clientWidth;

    // Background
    var backGroundColor = new NonAnimatedObject(this.game, AM.getAsset("./img/back/cardselect.jpg"),0, 0);
    backGroundColor.setSize(canvasWidth, canvasHeight);
    this.game.addEntity(backGroundColor);
    // -- background


    // Deck List
    var deckList = new DeckListUI(this.game, 0, 0);
    deckList.addCard("h000");
    deckList.addCard("h001");
    deckList.addCard("h002");
    deckList.addCard("h003");
    deckList.addCard("h004");
    deckList.addCard("h005");
    deckList.addCard("h100");
    deckList.addCard("e1001");
    deckList.addCard("e1002");
    deckList.addCard("s000");

    deckList.updateCurrentCards();
    this.game.addEntity(deckList);
    //-- deck list


    var ticketMin = PLAYERDECK["minCard"];
    var ticketMax = PLAYERDECK["maxCard"];
    var that = this;
    var startbutton = new Button(this.game, AM.getAsset("./img/ui/start_button_disable.png"), 1065, 480);
    startbutton.addSheet( AM.getAsset("./img/ui/start_button_pressed.png"),'press');
    startbutton.addSheet( AM.getAsset("./img/ui/start_button_mouseover.png"),'mouseover');
    startbutton.addEventListener('click', function() {
        
        if(deckList.totalTicket >= ticketMin && deckList.totalTicket <= ticketMax){
            PLAYERDECK["unitCards"] = deckList.getCardList("h");
            PLAYERDECK["spellCards"] = deckList.getCardList("e");
            this.game.sceneManager.startScene('mainmenu');
        }
    });
    this.game.addEntity(startbutton);

    this.addMusic();
};
DeckBuilding.prototype.addMusic = function(){
    this.game.soundPlayer.addToMusic("./sound/music/deckbuilding.mp3", true, undefined, 0.5);
};

//---------------------------------- Deck List -----------------------------------------//
function DeckListUI(game, x = 0, y = 0, scale = 1){
    Entity.call(this, game, x, y);

    this.scale = scale;
    this.deck = [];
    this.viewSize = 6;
    this.viewStart = 0;
    this.totalTicket = 0;
    this.width = 800 * this.scale;
    this.height = 600 * this.scale;
    var buttonScale = 0.65;

    // this.spaceFromTop = AM.getAsset("./img/ui/up_arrow_button.png").height * this.scale * buttonScale;
    this.spaceFromTop = this.x + 50;
    
    // var buttonX = (this.width - AM.getAsset("./img/ui/up_arrow_button.png").width * this.scale * buttonScale) / 2;
    var buttonX = 150 * this.scale;

    
    var that = this;
    this.upButton = new Button(this.game, AM.getAsset("./img/ui/up_arrow_button.png"), this.x + buttonX, this.y, this.scale * buttonScale);
    this.upButton.addSheet( AM.getAsset("./img/ui/up_arrow_pressbutton.png"),'press', this.scale * buttonScale);
    this.upButton.addSheet( AM.getAsset("./img/ui/up_arrow_hoverbutton.png"),'mouseover', this.scale * buttonScale);
    this.upButton.addEventListener('click', function() {
        if(that.viewStart > 0){
            that.viewStart--;
        }
    });

    this.downButton = new Button(this.game, AM.getAsset("./img/ui/down_arrow_button.png"), 
                              this.x + buttonX, this.height - AM.getAsset("./img/ui/down_arrow_button.png").height * this.scale * buttonScale, 
                              this.scale * buttonScale);
    this.downButton.addSheet( AM.getAsset("./img/ui/down_arrow_pressbutton.png"),'press', this.scale * buttonScale);
    this.downButton.addSheet( AM.getAsset("./img/ui/down_arrow_hoverbutton.png"),'mouseover', this.scale * buttonScale);
    this.downButton.addEventListener('click', function() {
        if(that.viewStart + that.viewSize < that.deck.length){
            that.viewStart++;
        }
    });

}
DeckListUI.prototype = Object.create(Entity.prototype);
DeckListUI.prototype.constructor = DeckListUI;

DeckListUI.prototype.update = function(){
    
    this.upButton.update();
    this.downButton.update();
    var place = 0;
    for(var i = this.viewStart; i < this.deck.length && i < this.viewStart + this.viewSize; i++){
        this.deck[i].setY(this.y + this.spaceFromTop + 85 * place);
        this.deck[i].update();
        place++;
    }
}
DeckListUI.prototype.draw = function(){
    
    this.upButton.draw();
    this.downButton.draw();
    for(var i = this.viewStart; i < this.deck.length && i < this.viewStart + this.viewSize; i++){
        this.deck[i].draw();
    }
    var tempfont = this.game.ctx.font;
    this.game.ctx.font = "20px Arial";
    this.game.ctx.fillStyle = "white";
    this.game.ctx.fillText("Min Amount of cards: " + PLAYERDECK["minCard"], 940, 400);
    this.game.ctx.fillText("Max Amount of cards: " + PLAYERDECK["maxCard"], 940, 425);
    this.game.ctx.fillText("# cards: " + this.totalTicket, 950, 450);
    this.game.ctx.font = tempfont;
}

DeckListUI.prototype.addCard = function(unitCode){
    this.deck.push(new DeckCard(this, this.game, unitCode, this.scale, 50, 50));
}
DeckListUI.prototype.updateCurrentCards = function(){
    // ASSUME BOTH ARE SORTED
    var currCards = PLAYERDECK["unitCards"];
    var currSpells = PLAYERDECK["spellCards"];
    var j = 0;
    for(var i = 0; i < currCards.length && j < this.deck.length; i++){
        if(currCards[i].code === this.deck[j].unitCode){
            this.deck[j].ticket = currCards[i].ticket;
            this.totalTicket += currCards[i].ticket;
        } else {
            i--;
            j++;
        }
    }
    for(var i = 0; i < currSpells.length && j < this.deck.length; i++){
        if(currSpells[i].code === this.deck[j].unitCode){
            this.deck[j].ticket = currSpells[i].ticket;
            this.totalTicket += currSpells[i].ticket;
        } else {
            i--;
            j++;
        }
    }
}

DeckListUI.prototype.getCardList = function(char){
    var toReturn = [];
    for(var i = 0; i < this.deck.length; i++){
        if(this.deck[i].ticket > 0 && this.deck[i].unitCode.includes(char)){
            toReturn.push({code: this.deck[i].unitCode, ticket: this.deck[i].ticket});
        }
    }
    return toReturn;
}
DeckListUI.prototype.getTotalTicket = function(){
    var toReturn = 0;
    for(var i = 0; i < this.deck.length; i++){
        toReturn += this.deck[i].ticket;
    }
    return toReturn;
}
// --------------------------- end DeckList ----------------------------------------------//


//---------------------------- Deck Card -------------------------------------------------//
function DeckCard(deckList, game, unitCode, scale = 1, x = 0, y = 0){
    Entity.call(this, game, x, y);
    this.deckList = deckList;
    this.scale = scale;
    this.unitCode = unitCode;
    this.ticket = 0;
    
    this.create();

}

DeckCard.prototype = Object.create(Entity.prototype);
DeckCard.prototype.constructor = DeckCard;

DeckCard.prototype.update = function(){

    this.icon.update();
    this.minus.update();
    this.plus.update();
    this.number[this.ticket].update();
}
DeckCard.prototype.draw = function(){
    
    this.icon.draw();
    this.minus.draw();
    this.plus.draw();
    this.number[this.ticket].draw();
}

DeckCard.prototype.create = function(x, y){

    var that = this;
    if(this.unitCode.includes("h")){
        this.icon = new NonAnimatedObject(this.game, AM.getAsset("./img/unit/" + this.unitCode + "/card_mouseover.png"), this.x, this.y, 
                      undefined, undefined, undefined, undefined, undefined, this.scale);
    } else if(this.unitCode.includes("e")){
        this.icon = new NonAnimatedObject(this.game, AM.getAsset("./img/effect/" + this.unitCode + "/card_mouseover.png"), this.x, this.y, 
                      undefined, undefined, undefined, undefined, undefined, this.scale);
    } 

    this.plusminusY = (this.icon.height * this.scale - AM.getAsset("./img/ui/numbers/plusnormal.png").height) / 2;
    this.plus = new Button(this.game, AM.getAsset("./img/ui/numbers/plusnormal.png"), this.x + 100 * this.scale, this.y + this.plusminusY, this.scale);
    this.plus.addSheet( AM.getAsset("./img/ui/numbers/pluspress.png"),'press');
    this.plus.addSheet( AM.getAsset("./img/ui/numbers/plushover.png"),'mouseover');
    this.plus.addEventListener('click', function() {
        if(that.ticket < 5){
            that.ticket++;
            that.deckList.totalTicket++;
        }
    });

    this.minus = new Button(this.game, AM.getAsset("./img/ui/numbers/minusnormal.png"), this.x + 130 * this.scale, this.y + this.plusminusY, this.scale);
    this.minus.addSheet( AM.getAsset("./img/ui/numbers/minuspress.png"),'press');
    this.minus.addSheet( AM.getAsset("./img/ui/numbers/minushover.png"),'mouseover');
    this.minus.addEventListener('click', function() {
        if(that.ticket > 0){
            that.ticket--;
            that.deckList.totalTicket--;
        }
    });

    this.numberY = (this.icon.height * this.scale - AM.getAsset("./img/ui/numbers/0.png").height) / 2;
    this.number = [];
    for(var i = 0; i < 10; i++){
        this.number.push(new NonAnimatedObject(this.game, AM.getAsset("./img/ui/numbers/" + i +".png"), 
                          this.x + 200 * this.scale, this.y + this.numberY, 
                          undefined, undefined, undefined, undefined, undefined, this.scale));
    }
}
DeckCard.prototype.setY = function(y){
    this.y = y;
    this.icon.y = this.y;
    this.plus.setY(this.y + this.plusminusY);
    this.minus.setY(this.y + this.plusminusY);
    for(var i = 0; i < 10; i++){
        this.number[i].y = this.y + this.numberY;
    }
}
DeckCard.prototype.setX = function(x){
    this.x = x;
    this.icon.x = this.x;
    this.plus.setX(this.x + 100 * this.scale);
    this.minus.setX(this.x + 130 * this.scale);
    for(var i = 0; i < 10; i++){
        this.number[i].x = this.x + 200 * this.scale;
    }
}
//--------------------------- end DeckCard -----------------------------------------------//

