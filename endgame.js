function EndGame(game, playerWon){
    Entity.call(this, game);
    this.playerWin = playerWon;
    this.font = "100px Arial";
}

EndGame.prototype = Object.create(Entity.prototype);
EndGame.prototype.constructor = EndGame;

//--- Draw and update
EndGame.prototype.draw = function(){

    var gradient = this.game.ctx.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "red");
    gradient.addColorStop("1.0", "blue");
    var tempGradient = this.game.ctx.fillStyle;
    var tempFont = this.game.ctx.font;
    this.game.ctx.fillStyle = gradient;
    this.game.ctx.font = this.font;

    if(this.playerWin){
        this.game.ctx.fillText("YOU WIN!", 400, 350);
    } else {
        this.game.ctx.fillText("GAME OVER!", 325, 350);
    }
    this.game.ctx.fillStyle = tempGradient;
    this.game.ctx.font = tempFont;

}
EndGame.prototype.update = function(){

    if(this.playerWin){
        this.killEntities(this.game.enemyList);
        
    } else {
        this.killEntities(this.game.playerList);
    }
}
//--- end draw and update

//--- clean entities by calling die
EndGame.prototype.killEntities = function(units){
    for(var i = units.length - 1; i >= 0; i--){
        units[i].health = 0;
    }
}
//--- end killEntities

//--- You win and You lose
EndGame.prototype.youWin = function(){
    this.playerWin = true;
    this.killEntities(this.game.enemyList);
}
EndGame.prototype.youLose = function(){
    this.playerWin = false;
    this.killEntities(this.game.playerList);
}
//--- end you win and you lose

//--- game over 
EndGame.prototype.gameOver = function(didPlayerWin){
    if(didPlayerWin){
        this.youWin();
    } else {
        this.youLose();
    }
}
//--- end game over
