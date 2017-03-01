function SoundPlayer(game){
    Entity.call(this, game, 0, 0, UI);
    this.movable = false;

    this.playMusic = true;
    this.playEffect = true;
    this.toggleMusic = false;
    this.toggleEffect = false;

    this.toPlayMusic = [];
    this.toPlayEffect = [];
    this.whilePlayMusic = [];
    this.whilePlayEffect = [];

    // USE PLAY QUEUE OVER MUSIC FOR MULTIPLE SOUNDS
    this.playQueue = [];
    this.currentMusic = -1;
    this.randomTrackInQueue = false;

    // UI
    this.x = 1100;
    this.y = 0;
    var checkSheet = AM.getAsset("./img/ui/select_blue_check.png");
    var unCheckSheet = AM.getAsset("./img/ui/select_blue_uncheck.png");
    var musicAniSheet = AM.getAsset("./img/ui/musicAni.png");
    var effectAniSheet = AM.getAsset("./img/ui/effectAni.png");

    this.selectMusic = new NonAnimatedObject(this.game, checkSheet, this.x, this.y);
    this.selectMusic.movable = false;
    this.unSelectMusic = new NonAnimatedObject(this.game, unCheckSheet, this.x, this.y);
    this.unSelectMusic.movable = false;
    this.colliseBoxMusic = {x: this.x, y: this.y, 
                        width: checkSheet.width, height: checkSheet.height}

    var separationValue = 50;
    this.selectSound = new NonAnimatedObject(this.game, checkSheet, this.x + separationValue, this.y);
    this.selectSound.movable = false;
    this.unSelectSound = new NonAnimatedObject(this.game, unCheckSheet, this.x + separationValue, this.y);
    this.unSelectSound.movable = false;
    this.colliseBoxEffect = {x: this.x + separationValue, y: this.y, 
                        width: unCheckSheet.width, height: unCheckSheet.height}

    this.musicAni = new AnimatedObject(this.game, musicAniSheet, this.x + 10, this.y - 7,
                                        8, 0.2, 8, true);
    this.musicAni.movable = false;
    this.effectAni = new AnimatedObject(this.game, effectAniSheet, this.x + 70, this.y - 7,
                                        8, 0.2, 8, true);
    this.effectAni.movable = false;

}

SoundPlayer.prototype = Object.create (Entity.prototype);
SoundPlayer.prototype.constructor = SoundPlayer;

//--- Draw and Update
SoundPlayer.prototype.draw = function(){
    // EMPTY 
    var drawBox = this.unSelectMusic;
    if(this.playMusic){
        drawBox = this.selectMusic;
    }
    drawBox.draw();
    drawBox = this.unSelectSound;
    if(this.playEffect){
        drawBox = this.selectSound;
    }
    drawBox.draw();
    this.musicAni.draw();
    this.effectAni.draw();

}
SoundPlayer.prototype.update = function(){

    // Check boxes
    this.checkCollision();

    // Play incoming sounds
    this.privatePlay(this.toPlayMusic, this.whilePlayMusic, this.playMusic);
    this.privatePlay(this.toPlayEffect, this.whilePlayEffect, this.playEffect);
    this.privatePlayNextInQueue();

    // Check to mute sounds or unmute
    if(this.toggleMusic){
        this.privateToggleSound(this.whilePlayMusic, this.playMusic);
        this.privateToggleSound(this.playQueue, this.playMusic);
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
SoundPlayer.prototype.checkCollision = function(){
    if(collise(this.colliseBoxMusic, this.game.mouse)){
        if (this.game.mouse.click) {
            if(this.playMusic){
                this.disableMusic();
            } else {
                this.enableMusic();
            }
            this.game.mouse.click = false;
        }
    }
    if(collise(this.colliseBoxEffect, this.game.mouse)){
        if (this.game.mouse.click) {
            if(this.playEffect){
                this.disableEffect();
            } else {
                this.enableEffect();
            }
            this.game.mouse.click = false;
        }
    }
}
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
SoundPlayer.prototype.privatePlayNextInQueue = function(){
    if(this.currentMusic < 0 && this.playQueue.length > 0){
        this.currentMusic = 0;
        if(this.randomTrackInQueue) this.currentMusic = Math.floor(Math.random() * this.playQueue.length);
        this.playQueue[this.currentMusic].play();
    }
    if(this.playQueue.length > 0 && this.playQueue[this.currentMusic].ended){
        var lastPlay = this.currentMusic;
        // Random track
        if(this.randomTrackInQueue){
            while(this.playQueue.length > 1 && this.currentMusic === lastPlay){
                this.currentMusic = Math.floor(Math.random() * this.playQueue.length);
            }
            console.log("changing music: " + this.currentMusic);
            this.playQueue[this.currentMusic].play();
        // Play next in queue
        } else {
            this.currentMusic++;
            this.currentMusic = this.currentMusic % this.playQueue.length;
            this.playQueue[this.currentMusic].play();
        }
    }
}
SoundPlayer.prototype.privateToggleSound = function(list, checkSound){
    
    for(var i = 0; i < list.length; i++){
        list[i].muted = !checkSound;
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
SoundPlayer.prototype.addToQueue = function(location, loop = false, rate = 1.0, volume = 1){
    var audio = new Audio(location);
    audio.loop = loop;
    audio.playbackRate = rate;
    audio.volume = volume;
    this.playQueue.push(audio);
}

SoundPlayer.prototype.addToMusicAudio = function(audio){
    this.toPlayMusic.push(audio);
}
SoundPlayer.prototype.addToEffectAudio = function(audio){
    this.toPlayEffect.push(audio);
}
SoundPlayer.prototype.addToQueueAudio = function(audio){
    this.playQueue.push(audio);
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
    this.toggleEffect = true;
}
//--- End Enable and Disable

//--- Remove all sounds
SoundPlayer.prototype.removeAllSound = function(){

    this.privateRemoveSoundFromList(this.toPlayMusic);
    this.privateRemoveSoundFromList(this.toPlayEffect);
    this.privateRemoveSoundFromList(this.whilePlayMusic);
    this.privateRemoveSoundFromList(this.whilePlayEffect);
    this.privateRemoveSoundFromList(this.playQueue);
    this.currentMusic = -1;
    this.toggleMusic = true;
    this.toggleEffect = true;
}
SoundPlayer.prototype.privateRemoveSoundFromList = function(list){
    while(list.length > 0){
        var tempSound = list.pop();
        tempSound.loop = false;
        tempSound.muted = true;
    }
}
//-- end Remove all sounds