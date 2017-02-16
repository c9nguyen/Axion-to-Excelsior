function ScreenMover(game){
    Entity.call(this, game, 0, 0); 
    this.moveVelocity = 0;
    this.myMoveAmount = 0;
    this.maxVelocity = 100;
    this.VelocityPercentage = 0.005;
    //this.game.mapX = 0;
    // TODO ADJUST
    this.mapSize = 2400;
    this.screenSize = 1200;

}

ScreenMover.prototype = Object.create (Entity.prototype);
ScreenMover.prototype.constructor = ScreenMover;

ScreenMover.prototype.update = function(){
    // Check range out of range of map
    this.checkBoundaries();

    // Pick Speed and Increase Speed
    this.pickSpeed();

    // Make sure Velocity not exceed over move amount
    this.doNotExceedMovement();

    // Move the gameboard
    this.moveGameBoard();
}
ScreenMover.prototype.draw = function(){
    // BODY. Intensionally Empty
}
// ---------------------------------- FOUR BIG METHODS ------------------------------------//
// Check the move amount to not pass the boundaries of the screen
ScreenMover.prototype.checkBoundaries = function(){
    if(this.myMoveAmount + this.x < this.screenSize - this.mapSize){
        this.myMoveAmount = this.screenSize - this.mapSize - this.x;
    } else if (this.myMoveAmount + this.x > 0){
        this.myMoveAmount = 0 - this.x;
    }
    // Make sure momentum does not glitch outside of map
    if((this.myMoveAmount > 0 && this.moveVelocity < 0) 
        || (this.myMoveAmount < 0 && this.moveVelocity > 0)){
        this.moveVelocity = 0;
    }
}
// Adjust screen speed to screen move amount
ScreenMover.prototype.pickSpeed = function(){
    if(this.myMoveAmount !== 0){
        if(Math.abs(this.moveVelocity) < this.maxVelocity){
            this.moveVelocity += this.VelocityPercentage * this.myMoveAmount;
        }
    } else {
        this.moveVelocity = 0;
    }
}
// Cap speed so you don't move pass the move requested
ScreenMover.prototype.doNotExceedMovement = function(){
    if(this.myMoveAmount > 0 && this.moveVelocity > 0
                    && this.myMoveAmount < this.moveVelocity){
        this.moveVelocity = this.myMoveAmount;
    } else if(this.myMoveAmount < 0 && this.moveVelocity < 0
                && this.myMoveAmount > this.moveVelocity) {
        this.moveVelocity = this.myMoveAmount;
    }
}
// Move the gameboard
ScreenMover.prototype.moveGameBoard = function(){
    if(this.moveVelocity !== 0){
        this.game.movedAmount = this.moveVelocity;
        this.myMoveAmount -= this.moveVelocity;
        this.x += this.moveVelocity;

        this.game.mapX = this.x;
    } else {
        this.game.movedAmount = 0;
    }
}
// ------------------------------------ End four big --------------------------------------- //
ScreenMover.prototype.moveScreenHere = function(percentage){
    var targetLocation = 0;
    if(percentage > 0){
        targetLocation = percentage / 100.0 * (this.mapSize - this.screenSize);
        targetLocation = targetLocation * -1;
    }
    this.myMoveAmount = targetLocation - this.x;
}

// ScreenMover.prototype.rebootScreen = function(){
//     this.x = 0;
//     this.game.mapX = 0;
//     this.moveVelocity = 0;
//     this.myMoveAmount = 0;
// }