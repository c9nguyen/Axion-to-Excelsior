
function ScreenScroller(game, screenmove, x, y, boxX, boxY){
    Entity.call(this, game, x, y);
    this.movable = false;
    this.screenmove = screenmove;

    this.colliseBox = {x: x, y: y, width: boxX, height: boxY};

    // TODO Box size
    this.returnPoint = boxX / 7;
    this.mapSize = this.screenmove.mapSize;
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
    var moved = 0;
    if(collise(this.colliseBox, this.game.mouse)){
        if (this.game.mouse.click) {
            console.log("Clicked  x: " + (this.game.mouse.x - this.x) + " y: " + (this.game.mouse.y - this.y));
            var tempx = this.game.mouse.x - this.x;
            var tempy = this.game.mouse.y - this.y;

            var endPoint = this.colliseBox.width - this.returnPoint;
            var originalScreen = this.screenLocation;
            if(tempx < this.returnPoint){
                this.screenLocation = 0;
            } else if(tempx > endPoint){
                this.screenLocation = this.mapSize / 2;
            } else /*if(tempx > returnPoint && tempx < endPoint)*/{
                var moveRange = this.mapSize / 2;
                var numberFactor = moveRange / (endPoint - this.returnPoint);
                this.screenLocation = (tempx - this.returnPoint) * numberFactor; 
            }
            // tempEntities = this.game.sceneManager.getCurrentEntities();

            moved = originalScreen - this.screenLocation;
            // console.log("moved: " + movedAmount);
            // for(var i = 0; i < tempEntities.length; i++){
            //     if(tempEntities[i].movable){
            //         tempEntities[i].x += movedAmount;
            //     }
            // }
            this.game.mouse.click = false;
        }
    }
    // TODO update movement
}


//---------------------------------- Arrow Key Move ------------------------------//
function ScreenMoveArrow(game, screenmove){
    Entity.call(this, game, 0, 0); 
    this.screenmove = screenmove;
    // ADJUST
    this.jump = 100;
}
ScreenMoveArrow.prototype = Object.create (Entity.prototype);
ScreenMoveArrow.prototype.constructor = ScreenMoveArrow;

ScreenMoveArrow.prototype.update = function(){
    //Entity.prototype.update.call(this);
    if(this.game.right.press){
        console.log("right");
        this.screenmove.moveAmount -= this.jump;
        //this.game.right.press = false;
    } else if(this.game.left.press){
        console.log("left");
        this.screenmove.moveAmount += this.jump;
        //this.game.left.press = false;
    } else if(this.game.right.stopIm || this.game.left.stopIm){
        this.screenmove.moveAmount = 0;
        this.game.right.stopIm = false;
        this.game.left.stopIm = false;
    }

}
ScreenMoveArrow.prototype.draw = function(){
}