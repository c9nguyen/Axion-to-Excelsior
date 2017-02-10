function ScreenMover(game){
    Entity.call(this, game, 0, 0); 
    this.moveVerlocity = 0;
    this.moveAmount = 0;
    this.maxVerlocity = 100;
    this.verlocityPercentage = 0.005;
    // TODO ADJUST
    this.mapSize = 2400;
    this.screenSize = 1200;
}

ScreenMover.prototype = Object.create (Entity.prototype);
ScreenMover.prototype.constructor = ScreenMover;

ScreenMover.prototype.update = function(){
    // Check range out of range of map
    // if(this.moveAmount + this.x < this.screenSize - this.mapSize){
    //     this.moveAmount = 10;
    // } else if(this.moveAmount + this.x > 0){
    //     this.moveAmount = 0 - this.x;
    // }

    // Pick Speed and Increase Speed
    if(this.moveAmount != 0){
        if(Math.abs(this.moveVerlocity) < this.maxVerlocity){
            this.moveVerlocity += this.verlocityPercentage * this.moveAmount;
        }
    } else {
        this.moveVerlocity = 0;
    }

    // Make sure verlocity not exceed over move amount
    if(this.moveAmount > 0 && this.moveVerlocity > 0
                    && this.moveAmount < this.moveVerlocity){
        this.moveVerlocity = this.moveAmount;
    } else if(this.moveAmount < 0 && this.moveVerlocity < 0
                && this.moveAmount > this.moveVerlocity) {
        this.moveVerlocity = this.moveAmount;
    }

    // Move the gameboard
    if(this.moveVerlocity != 0){
        this.game.movedAmount = this.moveVerlocity;
        this.moveAmount -= this.moveVerlocity;
        this.x += this.moveVerlocity;
    } else {
        this.game.movedAmount = 0;
    }

}
ScreenMover.prototype.draw = function(){
}

ScreenMover.prototype.rebootScreen = function(){
    this.x = 0;
    this.moveVerlocity = 0;
    this.moveAmount = 0;
}