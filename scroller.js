
function ScreenScroller(game, x, y, boxX, boxY, scale = 1){
    this.NORMAL = 0;
    this.PRESS = 1;
    this.MOUSEOVER = 2;
    Entity.call(this, game, x, y);
    this.movable = false;
    this.status = this.NORMAL;
    this.screenLocation = 0;

    this.colliseBox = {x: x, y: y, width: boxX, height: boxY};

    this.returnPoint = boxX / 6;
    this.mapSize = 2400;
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
    var movedAmount = 0;
    if(collise(this.colliseBox, this.game.mouse)){
        if (this.game.mouse.click) {
            //console.log("Clicked  x: " + (this.game.mouse.x - this.x) + " y: " + (this.game.mouse.y - this.y));
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

            movedAmount = originalScreen - this.screenLocation;
            // console.log("moved: " + movedAmount);
            // for(var i = 0; i < tempEntities.length; i++){
            //     if(tempEntities[i].movable){
            //         tempEntities[i].x += movedAmount;
            //     }
            // }
            this.game.mouse.click = false;
        }
    }
    this.moveScreen(movedAmount);
}

ScreenScroller.prototype.moveScreen = function(moveNumber){
    this.game.movedAmount = moveNumber;
}