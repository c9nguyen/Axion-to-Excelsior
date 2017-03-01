
function ScreenScroller(game, screenmove, x, y, boxX, boxY = boxX / 4){
    Entity.call(this, game, x, y);
    this.movable = false;
    this.screenmove = screenmove;

    this.colliseBox = {x: x, y: y, width: boxX, height: boxY};

    // ADJUST Box size
    this.returnPoint = boxX / 7;
    this.mapSize = this.screenmove.mapSize;
    this.screenSize = this.screenmove.screenSize;
    this.scale = 0.15;

    if(this.game.sceneManager.currentScene !== undefined
            && this.game.sceneManager.currentScene.background !== undefined){
        this.back = this.game.sceneManager.currentScene.background;
        this.backObject = new NonAnimatedObject(this.game, AM.getAsset(this.back),
                                    this.x, this.y, 
                                    undefined, undefined, undefined, undefined, undefined,
                                    this.scale);
        this.backObject.movable = false;
        this.colliseBox = {x: x, y: y, 
                width: this.backObject.width * this.scale, height: this.backObject.height * this.scale};
        
        this.frontEdge = 100;
        this.backEdge = 100;
        var screenPercentage = 1.0 * (this.screenSize / 2) / this.mapSize;
        this.returnPoint = this.frontEdge * this.scale + 
                    (this.backObject.width - this.frontEdge - this.backEdge) * this.scale * screenPercentage;

        this.cameraBoxX = 0;

    }

}

ScreenScroller.prototype = Object.create (Entity.prototype);
ScreenScroller.prototype.constructor = ScreenScroller;
//--- Draw and update
ScreenScroller.prototype.draw = function(){

    if(this.back !== undefined){
        this.drawMinimap();
    } else {
        this.drawOldBox();
    }
    // this.drawMinimap();
    // this.drawOldBox();
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
    // Update stuff to draw
    this.cameraBoxX = (-1 * this.game.mapX) * this.scale; 
    
}
//--- end draw and update
//--- helper methods for draw
ScreenScroller.prototype.drawMinimap = function(){
    this.backObject.draw();

    var savedWidth = this.game.ctx.lineWidth;
    var savedFilled = this.game.ctx.fillStyle;
    var savedStyle = this.game.ctx.strokeStyle;

    this.privateDrawDots(this.game.playerList, "DarkBlue");
    this.privateDrawDots(this.game.enemyList, "DarkRed");
    
    // OUTLINE
    this.game.ctx.beginPath();
    this.game.ctx.lineWidth="4";
    this.game.ctx.strokeStyle="black";
    this.game.ctx.rect(this.x, this.y, this.backObject.width * this.scale, this.backObject.height * this.scale);
    this.game.ctx.stroke();

    this.game.ctx.beginPath();
    this.game.ctx.lineWidth="6";
    this.game.ctx.strokeStyle="#6600cc"; // Purple
    this.game.ctx.rect(this.x + this.cameraBoxX, this.y, 
                        this.scale * (this.screenSize + this.frontEdge + this.backEdge), 
                        this.colliseBox.height);
    this.game.ctx.stroke();
    this.game.ctx.beginPath();
    this.game.ctx.lineWidth="2";
    this.game.ctx.strokeStyle="#a64dff"; // Light-Purple
    this.game.ctx.rect(this.x + this.cameraBoxX + 1, this.y + 1, 
                        this.scale * (this.screenSize + this.frontEdge + this.backEdge) - 1, 
                        this.colliseBox.height) - 1;
    this.game.ctx.stroke();
    this.game.ctx.lineWidth = savedWidth;
    this.game.ctx.fillStyle = savedFilled;
    this.game.ctx.strokeStyle = savedStyle;

}
ScreenScroller.prototype.privateDrawDots = function(list, style){
    var savedWidth = this.game.ctx.lineWidth;
    var frontPadding = this.scale * this.frontEdge;
    for(var i = 0; i < list.length; i++){
        this.game.ctx.fillStyle=style;
        
        //--Box
        var tempX = frontPadding + list[i].x * this.scale;
        var tempWidth = Math.floor(list[i].data.groundWidth * this.scale / 2);
        var locX = this.x + tempX;
        if(locX < this.x){
            tempWidth = tempWidth + tempX;
            locX = this.x;
        } else if(locX + tempWidth > this.x + this.backObject.width * this.scale){
            tempWidth = this.x + this.backObject.width * this.scale - locX;
        }
        if(tempWidth > 0) {
            this.game.ctx.beginPath();
            this.game.ctx.fillRect(locX, this.y + this.colliseBox.height * (5 / 8),
                                    tempWidth, this.colliseBox.height * (2 / 8));
            this.game.ctx.stroke();
        }
    }
    this.game.ctx.lineWidth = savedWidth;
}
ScreenScroller.prototype.drawOldBox = function(){
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
//--- end helper methods for draw

//---------------------------------- Arrow Key Move ------------------------------------------//
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

//---------------------------------- Mouse Over Move ---------------------------------------//
function ScreenMouseOverMovement(game, screenmove, direction){

    if(direction !== "right" && direction !== "left"){
        return null;
    }
    this.direction = direction;
    this.game = game;
    this.screenmove = screenmove;
    // ADJUST
    this.jump = 10;
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
    button.colliseBox = {x: button.x, y: button.y, 
                        width: button.normal.width, height: button.normal.height}
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

