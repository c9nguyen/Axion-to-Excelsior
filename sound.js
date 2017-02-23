function SoundPlayer(game){
    Entity.call(this, game, 0, 0);
    this.movable = false;

    this.playMusic = true;
    this.playEffect = true;
    this.toggleMusic = false;
    this.toggleEffect = false;

    this.toPlayMusic = [];
    this.toPlayEffect = [];
    this.whilePlayMusic = [];
    this.whilePlayEffect = [];
}

SoundPlayer.prototype = Object.create (Entity.prototype);
SoundPlayer.prototype.constructor = SoundPlayer;

//--- Draw and Update
SoundPlayer.prototype.draw = function(){
    // EMPTY 
}
SoundPlayer.prototype.update = function(){

    // Play incoming sounds
    this.privatePlay(this.toPlayMusic, this.whilePlayMusic, this.playMusic);
    this.privatePlay(this.toPlayEffect, this.whilePlayEffect, this.playEffect);

    // Check to mute sounds or unmute
    if(this.toggleMusic){
        this.privateToggleSound(this.whilePlayMusic, this.playMusic);
        this.toggleMusic = false;    
    }
    if(this.toggleEffect){
        this.privateToggleSound(this.whilePlayEffect, this.playEffect);
        this.toggleEffect = false;
    }
    
    // Remove any finished sounds
    this.cleanSound(this.whilePlayMusic);
    this.cleanSound(this.whilePlayEffect);
    
}
//--- End Draw and Update

//--- Extra helper method for update
SoundPlayer.prototype.privatePlay = function(list, toAdd, checkSound){

    while(list.length > 0){
        var tempAudio = list.pop();
        if(!checkSound){
            tempAudio.muted = true;
        }
        tempAudio.play();
        toAdd.push(tempAudio);
    }

}
SoundPlayer.prototype.privateToggleSound = function(list, checkSound){
    
    for(var tempAudio in list){
        tempAudio.muted = checkSound;
    }
}
SoundPlayer.prototype.cleanSound = function(list){
    for(var i = list.length - 1; i >= 0; i--){
        if(list[i].ended){
            list.splice(i, 1);
        }
    }
}
//--- End hellper method for update

SoundPlayer.prototype.addToMusic = function(location, loop = true, rate = 1.0, volume = 1){
    var audio = new Audio(location);
    audio.loop = loop;
    audio.playbackRate = rate;
    audio.volume = volume;
    this.toPlayMusic.push(audio);
}
SoundPlayer.prototype.addToEffect = function(location, loop = false, rate = 1.0, volume = 1){
    var audio = new Audio(location);
    audio.loop = loop;
    audio.playbackRate = rate;
    audio.volume = volume;
    this.toPlayEffect.push(audio);
}

SoundPlayer.prototype.addToMusicAudio = function(audio){
    this.toPlayMusic.push(audio);
}
SoundPlayer.prototype.addToEffectAudio = function(audio){
    this.toPlayEffect.push(audio);
}

//--- Enable and disable Music or Sound
SoundPlayer.prototype.enableMusic = function(){ 
    this.playMusic = true; 
    this.toggleMusic = true;
}
SoundPlayer.prototype.disableMusic = function(){ 
    this.playMusic = false; 
    this.toggleMusic = true;
}
    // Effects //
SoundPlayer.prototype.enableEffect = function(){ 
    this.playEffect = true; 
    this.toggleEffect = true;
}
SoundPlayer.prototype.disableEffect = function(){ 
    this.playEffect = false; 
    this.toPlayEffect = true;
}
//--- End Enable and Disable

//--- Remove all sounds
SoundPlayer.prototype.removeAllSound = function(){
    
    privateRemoveSoundFromList(this.toPlayMusic);
    privateRemoveSoundFromList(this.toPlayEffect);
    privateRemoveSoundFromList(this.whilePlayMusic);
    privateRemoveSoundFromList(this.whilePlayEffect);
}
SoundPlayer.prototype.privateRemoveSoundFromList = function(list){
    while(list.length > 0){
        var tempSound = list.pop();
        tempSound.loop = false;
        tempSound.muted = true;
    }
}
//-- end Remove all sounds