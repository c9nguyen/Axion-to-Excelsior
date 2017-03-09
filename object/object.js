var canvasWidth = 0;
var canvasHeight = 0;
var groundLevel = 0;


/*===============================================================*/

/**
 * The image object can be in a spritesheet or a normal image (which is a spritesheet with 1 frame)
 * Pass in game
 */
function NonAnimatedObject(game, spritesheet, x = 0, y = 0,
                frameWidth = spritesheet.width, frameHeight = spritesheet.height,   // Use these parameter if more than 1 frame
                sheetWidth = 1, frames = 1, frameIndex = 0, //If frameIndex = -1, pick a random frame
                scale = 1, width = frameWidth, height = frameHeight) { 
    this.game = game; 
    this.ctx = game.ctx;
    this.spritesheet = spritesheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.spritesheetOffset = {x: 0, y:0};

    var frame = frameIndex >= 0 ? frameIndex : Math.floor(Math.random() * (frames));

    this.xindex = frame % sheetWidth;
    this.yindex = Math.floor(frame / sheetWidth);

    Entity.call(this, game, x, y);
};

NonAnimatedObject.prototype = Object.create(Entity.prototype);
NonAnimatedObject.prototype.constructor = NonAnimatedObject;

NonAnimatedObject.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
}

NonAnimatedObject.prototype.setFrameSize = function(width, height) {
    this.frameWidth = width;
    this.frameHeight = height;
    this.width = width;
    this.height = height;
}

// /**
//  * Set up an entity that this entity will stick to it
//  */
// NonAnimatedObject.prototype.setStickTo = function(entity, offsetX, offsetY) {
//     this.stickTo = {entity: entity, offsetX: offsetX, offsetY: offsetY};
// }

NonAnimatedObject.prototype.setSpritesheetOffset = function(xOffset, yOffset) {
    this.spritesheetOffset = {x: xOffset, y:yOffset};
}

NonAnimatedObject.prototype.draw = function() {
    var drawX = this.x;
    if(this.movable){
        drawX = this.x + this.game.mapX;
    }
    try {
        this.ctx.drawImage(this.spritesheet,
                    this.xindex * this.frameWidth + this.spritesheetOffset.x, 
                    this.yindex * this.frameHeight + this.spritesheetOffset.y,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    drawX, this.y,
                    this.width * this.scale, this.height * this.scale);
    } catch (e) {

    }

    Entity.prototype.draw.call(this);
}

NonAnimatedObject.prototype.update = function () {
    // if (this.stickTo) {
    //     var host = this.stickTo;
    //     this.x = host.entity.x + host.offsetX;
    //     this.y = host.entity.y + host.offsetY;
    //     this.removeFromWorld = host.entity.removeFromWorld;
    //     if (host.health) this.removeFromWorld = host.health <= 0;
    // }
    Entity.prototype.update.call(this);
};


/*===============================================================*/

/**
 * Object with animation
 */
function AnimatedObject(game, spritesheet, x = 0, y = 0,
                sheetWidth, frameDuration, frames, loop, 
                frameWidth = spritesheet.width / sheetWidth , 
                frameHeight = spritesheet.height / Math.ceil(frames / sheetWidth),
                scale = 1, width = frameWidth, height = frameHeight) { //default orignal size
                    
    NonAnimatedObject.call(this, game, spritesheet, x, y, frameWidth, frameHeight, 
                            sheetWidth, frames, 0, scale, width, height);

 
 //   this.animation = new Animation(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale);
    this.speed = 0;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.sheetWidth = sheetWidth;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
};

AnimatedObject.prototype = Object.create(NonAnimatedObject.prototype);
AnimatedObject.prototype.constructor = AnimatedObject;

// /**
//  * Update the spritesheet for the animation
//  */
// AnimatedObject.prototype.updateFrameStat = function(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop) {
//     this.animation = new Animation(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, this.animation.scale);
//     this.width = frameWidth;
//     this.height = frameHeight; 
// }

// AnimatedObject.prototype.setSpeed = function(speed, direction = 1) {
//     this.direction = direction;
//     this.speed = speed;
// }

AnimatedObject.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
}

// AnimatedObject.prototype.draw = function() {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

AnimatedObject.prototype.draw = function () {
    
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    this.xindex = frame % this.sheetWidth;
    this.yindex = Math.floor(frame / this.sheetWidth);
    this.elapsedTime += this.game.clockTick;
    NonAnimatedObject.prototype.draw.call(this);
    // this.game.ctx.drawImage(this.spriteSheet,
    //              xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
    //              this.frameWidth, this.frameHeight,
    //              x, y,
    //              this.frameWidth * this.scale,
    //              this.frameHeight * this.scale);

                //  this.ctx.drawImage(this.spritesheet,
                //  this.xindex * this.frameWidth, this.yindex * this.frameHeight,  // source from sheet
                //  this.frameWidth, this.frameHeight,
                //  this.x, this.y,
                //  this.width * this.scale, this.height * this.scale);
}

AnimatedObject.prototype.update = function () {
    NonAnimatedObject.prototype.update.call(this);
}

AnimatedObject.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

AnimatedObject.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

/*===============================================================*/

/**
 * Skill effect
 * 
 */
function Effect(game, x, y, unit, spritesheet,
                sheetWidth, frameDuration, frames, 
                collisionBoxes, collisingAction, percent, aoe = false, numOfLoop = 1) {

    this.unit = unit;
    this.subEffects = [];   //What happen at certain frame
    this.doneEffect = new Set();
    this.collisionBoxes = collisionBoxes; //List of collision boxes
    this.collisionBox = {};  //The current collisionBox
    this.loopCounter = 0;
    this.numOfLoop = numOfLoop;
    this.collisingAction = collisingAction;   //What happen the effect collises with a unit
    var frameWidth = spritesheet.width / sheetWidth;
    var frameHeight = spritesheet.height / Math.ceil(frames / sheetWidth);
    AnimatedObject.call(this, game, spritesheet, x, y,
                        sheetWidth, frameDuration, frames, false);
    //Effect percent based on unit's stat. Exp: If unit has 100 att and this effect has 0.5%. This effect will deal 50 damage
    this.percent = percent;
    this.aoe = aoe;
    this.positive = false;
    this.hit = false;
    this.hitList = new Set();   //A set of unit that already hit. So the effect won't hit again
    this.hitEffect = function() {};

    this.endEffect = function() {};
}

Effect.prototype = Object.create(AnimatedObject.prototype);
Effect.prototype.constructor = Effect;

/**
 * Change this effect to positive effect. 
 * The collision box will detect allies instead
 */
Effect.prototype.setPositive = function() {
    this.positive = true;
}

/**
 * Add the sub effect that will hapen at index of the frame
 */
Effect.prototype.addEffect = function(callback, index) {
    this.subEffects[index] = callback;
}


Effect.prototype.update = function() {//Updating the coordinate for the unit in the frame
    AnimatedObject.prototype.update.call(this);
    if (this.isDone()) {
        this.endEffect(this);
        this.numOfLoop--;
        if (this.numOfLoop <= 0) {
            this.removeFromWorld = true;
        } else {
            this.elapsedTime = 0;
            this.hitList = new Set();
            this.doneEffect = new Set();
        }
  
    } 
    //If this effect already hit the opponent, skip below statements
    //Or no action
    if (!this.hit && this.collisingAction !== undefined ) {  
        var frame = this.currentFrame();
        //Updating collisionBox
        var collisionBox = this.getFrameHitbox(frame);
        this.collisionBox.x = this.x + collisionBox.x;
        this.collisionBox.y = this.y + collisionBox.y;
        this.collisionBox.width = collisionBox.width;
        this.collisionBox.height = collisionBox.height;

        var side = this.unit.side === PLAYER;
        side = this.positive ? !side : side;    //switch to positive
        var opponent = side ? this.game.enemyList : this.game.playerList;
        for (var i in opponent) {
            if (!this.hitList.has(opponent[i])) {
                var otherCollisionBox = opponent[i].getCollisionBox();
                if (collise(this.collisionBox, otherCollisionBox)) {
                    this.collisingAction(this, opponent[i]);  //What happen to the opponent when collised this effect
                    this.hitEffect(this);
                    if (!this.aoe) {
                        this.hit = true;
                        break;   //stop searching if this effect is not aoe
                    } else {
                        this.hitList.add(opponent[i]);
                    }
                }
            }
        }
    }
    var effect = this.subEffects[frame]; //Callback the effect
    if (effect !== undefined && typeof effect === "function" && !this.doneEffect.has(frame)) {
        effect(this);
        this.doneEffect.add(frame);
    } 
    

}

/**
 * Get ground point of a frame, if no ground point for that frame, use the previous one
 */
Effect.prototype.getFrameHitbox = function(frame) {
    var hitbox;
    if (this.collisionBoxes[frame] === undefined && this.previousHitbox !== undefined)
        hitbox = this.previousHitbox;
    else
        hitbox = this.collisionBoxes[frame];

    this.previousHitbox = hitbox;
    return hitbox;
}

Effect.prototype.draw = function() {
    if (this.spritesheet !== undefined)
        AnimatedObject.prototype.draw.call(this);

//For testing skill hit box
//     if (this.unit.side === PLAYER) {
//     var box = this.getFrameHitbox(this.currentFrame());
//     this.game.ctx.fillStyle = 'red';
//     this.game.ctx.fillRect(box.x + this.x + this.game.mapX, box.y + this.y, box.width, box.height);
// }
}

Effect.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration * this.unit.speedPercent);
}

Effect.prototype.isDone = function () {
    this.totalTime = this.frameDuration * this.frames * this.unit.speedPercent;
    return (this.elapsedTime >= this.totalTime);
}

/*===============================================================*/

//function PassiveEffect(game, unit, )

/*===============================================================*/

/*=========================================================================*/


function Number(game, x, y, value, side) {

    Entity.call(this, game, x, y, UI);
    this.numberList = [];
    value = Math.floor(value);
    var counter = 0;
    while (value > 0) {
        var mod = value % 10;
        value = Math.floor(value / 10);

        if (side === ENEMY)
        this.numberList.push(new NonAnimatedObject(game, AM.getAsset("./img/ui/numbers/" + mod + "_0.png"), x - 17 * counter, y));
        else
        this.numberList.push(new NonAnimatedObject(game, AM.getAsset("./img/effect/number/" + mod + ".png"), x - 17 * counter, y));
        counter++;
    }
    if (value === -1) this.numberList.push(new NonAnimatedObject(game, AM.getAsset("./img/effect/number/miss.png"), x - 17 * counter, y));

    this.time = 5;
    this.velocity.y = -20;
}

Number.prototype = Object.create(Entity.prototype);
Number.prototype.create = Number;

Number.prototype.draw = function() {
    var that = this;
    this.numberList.map(function(number) {
        number.y = that.y;
        number.draw();
    });
}

Number.prototype.update = function() {
    Entity.prototype.update.call(this);
    this.time -= this.game.clockTick;
    if (this.time < 0) this.removeFromWorld = true;
}