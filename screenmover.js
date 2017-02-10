function ScreenMover(game){
    Entity.call(this, game, 0, 0); 
    this.moveVelocity = 0;
    this.moveAmount = 0;
    this.maxVelocity = 100;
    this.VelocityPercentage = 0.005;
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
        if(Math.abs(this.moveVelocity) < this.maxVelocity){
            this.moveVelocity += this.VelocityPercentage * this.moveAmount;
        }
    } else {
        this.moveVelocity = 0;
    }

    // Make sure Velocity not exceed over move amount
    if(this.moveAmount > 0 && this.moveVelocity > 0
                    && this.moveAmount < this.moveVelocity){
        this.moveVelocity = this.moveAmount;
    } else if(this.moveAmount < 0 && this.moveVelocity < 0
                && this.moveAmount > this.moveVelocity) {
        this.moveVelocity = this.moveAmount;
    }

    // Move the gameboard
    if(this.moveVelocity != 0){
        this.game.movedAmount = this.moveVelocity;
        this.moveAmount -= this.moveVelocity;
        this.x += this.moveVelocity;
    } else {
        this.game.movedAmount = 0;
    }

}
ScreenMover.prototype.draw = function(){
}

ScreenMover.prototype.checkBoundaries() = function(){

}

ScreenMover.prototype.rebootScreen = function(){
    this.x = 0;
    this.moveVelocity = 0;
    this.moveAmount = 0;
}