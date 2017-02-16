function SoundPlayer(location){
    this.audio = new Audio(location);
}

SoundPlayer.prototype.play = function(){
    if(this.audio){
        this.audio.play();
    }
}

SoundPlayer.prototype.loopEnable = function(){
    this.audio.loop = true;
}
SoundPlayer.prototype.loopDisable = function(){
    this.audio.loop = false;
}