
function ScreenScroller(game, screenmove, x, y, boxX, boxY){
    Entity.call(this, game, x, y);
    this.movable = false;
    this.screenmove = screenmove;

    this.colliseBox = {x: x, y: y, width: boxX, height: boxY};

    // ADJUST Box size
    this.returnPoint = boxX / 7;
    this.mapSize = this.screenmove.mapSize;
    this.screenSize = this.screenmove.screenSize;

}

ScreenScroller.prototype = Object.create (Entity.prototype);
ScreenScroller.prototype.constructor = ScreenScroller;

ScreenScroller.prototype.draw = function(){
    this.game.ctx.beginPath();
    this.game.ctx.lineWidth="4";
    this.game.ctx.strokeStyle="green";
    this.game.ctx.rect(this.x, this.y, this.colliseBox.width, this.colliseBox.height);
    this.game.ctx.stroke();

    this.game.ctx.beginPath();
    this.game.ctx.lineWidth="2";
    this.game.ctx.strokeStyle="red";
    this.game.ctx.rect(this.x, this.y, this.returnPoint, this.colliseBox.height);
    this.game.ctx.stroke();

    this.game.ctx.beginPath();
    this.game.ctx.strokeStyle="red";
    this.game.ctx.rect(this.x + this.colliseBox.width - this.returnPoint, this.y, 
                        this.returnPoint, this.colliseBox.height);
    this.game.ctx.stroke();
}

ScreenScroller.prototype.update = function(){
    if(collise(this.colliseBox, this.game.mouse)){
        if (this.game.mouse.click) {
            // console.log("Clicked  x: " + (this.game.mouse.x - this.x) + " y: " + (this.game.mouse.y - this.y));
            var tempx = this.game.mouse.x - this.x;
            var screenPercentageMovement = -1;

            var endPoint = this.colliseBox.width - this.returnPoint;
            if(tempx < this.returnPoint){
                screenPercentageMovement = 0;

            } else if(tempx > endPoint){
                screenPercentageMovement = 100;

            } else /*if(tempx > returnPoint && tempx < endPoint)*/{
                var barTotal = this.colliseBox.width - 2 * this.returnPoint;
                var chosenPlaceInBar = tempx - this.returnPoint;
                screenPercentageMovement = chosenPlaceInBar / barTotal * 100;
            }
            if(screenPercentageMovement >= 0){
                this.screenmove.moveScreenHere(screenPercentageMovement);
                // SOUND
                this.game.soundPlayer.addToEffect("./sound/effects/smw_yoshi_runs_away.wav");
            }
            
            this.game.mouse.click = false;
        }
    }
}


//---------------------------------- Arrow Key Move ------------------------------//
function ScreenMoveArrow(game, screenmove, listenerLeft, listenerRight){
    Entity.call(this, game, 0, 0); 
    this.screenmove = screenmove;
    this.left = listenerLeft;
    this.right = listenerRight;
    // ADJUST
    this.jump = 100;
}
ScreenMoveArrow.prototype = Object.create (Entity.prototype);
ScreenMoveArrow.prototype.constructor = ScreenMoveArrow;

ScreenMoveArrow.prototype.update = function(){
    //Entity.prototype.update.call(this);
    if(this.right.press){
        //console.log("right");
        this.screenmove.myMoveAmount -= this.jump;
        //this.game.right.press = false;
    } else if(this.left.press){
        //console.log("left");
        this.screenmove.myMoveAmount += this.jump;
        //this.game.left.press = false;
    } else if(this.right.stopIm || this.left.stopIm){
        this.screenmove.myMoveAmount = 0;
        this.right.stopIm = false;
        this.left.stopIm = false;
    }

}
ScreenMoveArrow.prototype.draw = function(){
}

//---------------------------------- Mouse Over Move ------------------------------//
function ScreenMouseOverMovement(game, screenmove, direction){

    if(direction !== "right" && direction !== "left"){
        return null;
    }
    this.direction = direction;
    this.game = game;
    this.screenmove = screenmove;
    // ADJUST
    this.jump = 20;
    this.end = 0.1;
    this.locationX = 0;
    this.locationY = 275;
    if(direction === "right"){
        this.jump *= -1;
        this.locationX = 1100;
        this.end = 100;
    }
    var that = this;

    var button = new Button(this.game, AM.getAsset("./img/ui/" + this.direction + "_arrow_button.png"), 
                            this.locationX, this.locationY);
    button.addSheet(AM.getAsset("./img/ui/" + this.direction + "_arrow_hoverbutton.png"), "click");
    button.addSheet(AM.getAsset("./img/ui/" + this.direction + "_arrow_pressbutton.png"), "mouseover");
    button.addEventListener("mouseover", function(){
        that.screenmove.myMoveAmount += that.jump / 2;
    });
    button.addEventListener("click", function() { 
        that.screenmove.moveScreenHere(that.end);
    });

    return button;
}

