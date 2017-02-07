var canvasWidth = 0;
var canvasHeight = 0;
var characters = [];
var food = [];

// function spawn(game) {
//     var person = new Person(game, -1, 400, 400, 0.1, 1);
//     person.changeStatus(WALK);
//     person.setSpeed(200, 1);
//     person.yVelocity = Math.floor(Math.random() * -1500);
//     game.addEntity(person);
// }

// const characterFrameInfo = [
//     {sheetWidth: 5, frames: 5},    //stand
//     {sheetWidth: 1, frames: 1},    //jump
//     {sheetWidth: 2, frames: 4},    //walk
//     {sheetWidth: 3, frames: 3}    //Attack
// ]

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

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

NonAnimatedObject.prototype.draw = function() {
    try {
        this.ctx.drawImage(this.spritesheet,
                    this.xindex * this.frameWidth, this.yindex * this.frameHeight,  // source from sheet
                    this.frameWidth, this.frameHeight,
                    this.x, this.y,
                    this.width * this.scale, this.height * this.scale);
    } catch (e) {

    }
}

NonAnimatedObject.prototype.update = function () {
    Entity.prototype.update.call(this);
};

/*===============================================================*/

/**
 * Object with animation
 */
function AnimatedObject(game, spritesheet, x = 0, y = 0,
                frameWidth, frameHeight,
                sheetWidth, frameDuration, frames, loop, 
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

AnimatedObject.prototype = Object.create(Entity.prototype);
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
    if (this.y > canvasHeight * 2) this.removeFromWorld = true;
    if (this.x > canvasWidth) 
        this.x = -this.width;
    else if (this.x < -this.width)
        this.x = canvasWidth;
    Entity.prototype.update.call(this);
}

AnimatedObject.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

AnimatedObject.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

/*===============================================================*/

/**
 * Action is an animated object with standing point for units.
 * Action should not be added to Entity listed. Therefore action won't be updated and drawn by game engine.
 * Instead, the unit will update and draw the current action of the unit
 * 
 * @loop: this acion will have loop (meaning 0 cooldown)
 * @groundPoints: list of standing points which is where the unit stand. This point will be matched with unit groundCollisionBox
 *  groundPoint.x: the offset from the image x coordinate to standing point x
 *  groundPoint.y: the offset from the image y coordinate to standing point y
 * @collisionBoxes: list of hit box of the unit
 *  collisionBox.x: the offset from the image x coordinate to hit box x
 *  collisionBox.y: the offset from the image y coordinate to hit box y
 *  collisionBox.width: the width of hit box
 *  collisionBox.Heigh: the height of hit box
 * @cooldown: time needed for action to excecute again
 */

function Action(game, unit, spritesheet,
                sheetWidth, frameDuration, frames, 
                groundPoints, collisionBoxes, cooldown = 0,
                scale = 1, frameWidth = spritesheet.width / sheetWidth , 
                frameHeight = spritesheet.height / Math.ceil(frames / sheetWidth),
                width = frameWidth, height = frameHeight) { //default orignal size

    
    this.unit = unit;
    this.effects = [];
    this.effectCasted = new Set(); //Keep track what effect already at a frame so wont recast
    this.cooldown = cooldown;
    this.cooldownClock = 0;
    this.groundPoints = groundPoints; //List of standing point for each frame.
    this.collisionBoxes = collisionBoxes; //List of collision boxes
    this.collisionBox = {};  //The current collisionBox
    var x = this.unit.x - this.groundPoints[0].x;
    var y = this.unit.y - this.groundPoints[0].y;

    //What you want to happen at:
    this.startEffect = function() {}; //Beginning of the action
 //   this.duringEffect = function() {};    //During the action, between each frame           //Need to work on
    this.endEffect = function() {};   //The end of the action

    AnimatedObject.call(this, game, spritesheet, x, y,
                        frameWidth, frameHeight,
                        sheetWidth, frameDuration, frames, cooldown === 0, 
                        scale = 1, width, height);
}

Action.prototype = Object.create(AnimatedObject);
Action.prototype.constructor = Action;

/**
 * Check if the action is still on cooldown
 * return true if action can be excecuted
 */
Action.prototype.checkCooldown = function() {
   // var offCooldown = true;
    return (this.timeLastStart === undefined || this.game.timer.gameTime - this.timeLastStart >= this.cooldown);
}

/**
 * Add the effect that will hapen at index of the frame
 */
Action.prototype.addEffect = function(callback, index) {
    this.effects[index] = callback;
}

/**
 * What to do at the start of action. Called by unit when start the action
 * Overwrite it if you want to use. (Overwrite the instance of Action not the prototype)
 */
Action.prototype.start = function() {
    this.elapsedTime = 0;
    this.timeLastStart = this.game.timer.gameTime;
    this.startEffect();
}

/**
 */
Action.prototype.during = function() {

}

/**
 * What to do at the end of action.
 * Overwrite it if you want to use. (Overwrite the instance of Action not the prototype)
 */
Action.prototype.end = function() {
    this.endEffect();
}


Action.prototype.update = function() {//Updating the coordinate for the unit in the frame
    //If this action is still on cooldown, call default 
    if (this.isDone()) {
        if (!this.checkCooldown()) {
            this.end(); 
            this.unit.currentAction = this.unit.defaultAction;
            this.unit.currentAction.start();
            this.unit.currentAction.update();
            return;
        }
        this.effectCasted = new Set();
    }
    this.during();
    this.cooldownClock += this.game.clockTick;
    if (!this.loop && this.isDone()) this.end(); // perform ending action
    var frame = this.currentFrame();
    //Updating ground point
    var groundPoint = this.getFrameGroundPoint(frame); 
    this.x = this.unit.x - groundPoint.x;
    this.y = this.unit.y - groundPoint.y;
    //Updating collisionBox
    var collisionBox = this.getFrameHitbox(frame);
    this.collisionBox.x = this.x + collisionBox.x;
    this.collisionBox.y = this.y + collisionBox.y;
    this.collisionBox.width = collisionBox.width;
    this.collisionBox.height = collisionBox.height;

    var effect = this.effects[frame]; //Callback the effect
    if (effect !== undefined && typeof effect === "function" && !this.effectCasted.has(frame)) {
        effect(this);
        this.effectCasted.add(frame);
    }
        
 

    AnimatedObject.prototype.update.call(this);
}

/**
 * Get ground point of a frame, if no ground point for that frame, use the previous one
 */
Action.prototype.getFrameGroundPoint = function(frame) {
    var groundPoint;
    if (this.groundPoints[frame] === undefined && this.previousGroundPoint !== undefined)
        groundPoint = this.previousGroundPoint;
    else
        groundPoint = this.groundPoints[frame];

    this.previousGroundPoint = groundPoint;
    return groundPoint;
}

/**
 * Get ground point of a frame, if no ground point for that frame, use the previous one
 */
Action.prototype.getFrameHitbox = function(frame) {
    var hitbox;
    if (this.collisionBoxes[frame] === undefined && this.previousHitbox !== undefined)
        hitbox = this.previousHitbox;
    else
        hitbox = this.collisionBoxes[frame];

    this.previousHitbox = hitbox;
    return hitbox;
}

Action.prototype.draw = function() {
    AnimatedObject.prototype.draw.call(this);
}

Action.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration * this.unit.speedPercent);
}

Action.prototype.isDone = function () {
    this.totalTime = this.frameDuration * this.frames * this.unit.speedPercent;
    return (this.elapsedTime >= this.totalTime);
}

/*===============================================================*/

/**
 * Generic object for a unit
 * @side: which side this unit belong to (NEUTRAL, PLAYER, ENEMY)
 * @unicode: the code to access the unit information
 * groundCollisionBox: this is the base. All unit starts without frame but only groundCollisionBox
 *  when actions added, the action's groundCollisionBox will be mathced
 */
function Unit(game, x = 0, y = 0, unitcode, side) {
    Entity.call(this, game, x, y, side);
    this.data = unitData[unitcode];
    this.width =  this.data.groundWidth;
    this.height = this.data.groundHeight;

    var range = this.data.range;
    this.rangeBox = {x: x + range.x, y: y + range.y, width: range.width, height: range.height}; 
    this.speedPercent = 1;  
    this.flying = this.data.flying;
    
    //Stats
    this.health = this.data.health;
    this.movementspeed = this.data.movementspeed;
    this.att = this.data.att;

    this.actions = {}; //contains all actions this unit can perform (walk, stand, attack)
    this.defaultAction;
    this.collisionReacts = {};  //Not used yet
    this.currentAction;
}

Unit.prototype = Object.create(Entity.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.getCollisionBox = function() {
    return this.currentAction !== undefined ? this.currentAction.collisionBox : this;
}

/**
 * There are 4 basic collision action:
 * 1. Action when standing on the platform (Stand or walk)
 * 2. Action when in the air (flying or jump)
 * 3. Action when an enemy gets within attack range (attack)
 * 4. Action when the unit get hit (mostly nothing, some special unit might explode or jump back)
 * Pass 3 actions as callback functions. 
 * Suggestion: use changeAction
 */
Unit.prototype.setCollisionReacts = function(ground = function() {}, 
                                                air = function() {}, 
                                                range = function() {}, 
                                                hit = function() {}) {
    this.groundReact = ground;
    this.airReact = air;
    this.rangeReact = range;
    this.hitReact = hit;
}

Unit.prototype.changeAction = function(actionName) {
    var action = this.actions[actionName];
    if (action !== undefined && this.currentAction !== action && action.checkCooldown()) {    //If action is defined and not performing
        if (this.currentAction !== undefined) this.currentAction.end();
        this.currentAction = action;
        this.currentAction.start();
    } 
        
}

Unit.prototype.takeDamage = function(damage) {
    this.health -= damage;
}

Unit.prototype.checkEnemyInRange = function() {
    var enemy = this.side === PLAYER ? this.game.enemyList : this.game.playerList;
                //var collisionBox = this.getCollisionBox();
    for (var i in enemy) {
        if (enemy[i].removeFromWorld){
            enemy.splice(i, 1);
            i--;
        } else {
            var otherCollisionBox = enemy[i].getCollisionBox();
            if (collise(this.rangeBox, otherCollisionBox)) {
                return enemy[i];
            }
        }
    } 
}

Unit.prototype.update = function() {
   // console.log(this.gravity);
    if (this.health <= 0 || this.y > canvasHeight * 2) 
        this.removeFromWorld = true;
    else {
        Entity.prototype.update.call(this);
        //Will be added: effect on this unit (poison, movement locked,..)

        //Updating range box
        var range = this.data.range;
        this.rangeBox.x = range.x + this.x;
        this.rangeBox.y = range.y + this.y;


        if (!this.flying) { //if the unit is not flying unit, check gravity (flying is different from jumping)
            var groundCollised = false;
            if (this.velocity.y >= 0) { //Only check for ground collision when the unit falling down or standing           
                //Improving performace by checking if still standing on the previous platform                    
                if (this.previousPlatform !== undefined && collise(this, this.previousPlatform)) { 
                    this.y = this.previousPlatform.y;
                    groundCollised = true;
                } else {
                    var groundCollisionBox = this.game.collisionBox.ground;
                    for (var box in groundCollisionBox) {
                        if (collise(this, groundCollisionBox[box])) {
                            this.y = groundCollisionBox[box].y;
                            this.velocity.y = 0;
                            groundCollised = true;
                            this.previousPlatform = groundCollisionBox[box];    //Save this to check again
                            break;
                        }
                    }  
                }
      
            }

            this.gravity = !groundCollised;

            if (!this.gravity) {     //On the ground reaction
                //var collisionBox = this.getCollisionBox();
                var collisedEnemy = this.checkEnemyInRange();

                if (collisedEnemy !== undefined) 
                    //reaction when an enemy gets in range
                    this.rangeReact(collisedEnemy);
                else 
                    this.groundReact();


            } else if (this.gravity)  //In the air action
                this.airReact();

        } else {    //Fyling unit
                var collisedEnemy = this.checkEnemyInRange();

                if (collisedEnemy !== undefined) 
                    //reaction when an enemy gets in range
                    this.rangeReact(collisedEnemy);
                else 
                    this.airReact();
        }

        //update the current action
        if (this.currentAction !== undefined) this.currentAction.update();
    }
}

Unit.prototype.draw = function() {
    this.currentAction.draw();

    //For testing
    var box = this.getCollisionBox();
    //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
   // this.game.ctx.fillRect(this.rangeBox.x, this.rangeBox.y, this.rangeBox.width, this.rangeBox.height);
    //this.game.ctx.fillRect(box.x, box.y, box.width, box.height);
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
    this.collisionBoxes = collisionBoxes; //List of collision boxes
    this.collisionBox = {};  //The current collisionBox
    this.loopCounter = 0;
    this.numOfLoop = numOfLoop;
    this.collisingAction = collisingAction;   //What happen the effect collises with a unit
    var frameWidth = spritesheet.width / sheetWidth;
    var frameHeight = spritesheet.height / Math.ceil(frames / sheetWidth);
    AnimatedObject.call(this, game, spritesheet, x, y,
                        frameWidth, frameHeight,
                        sheetWidth, frameDuration, frames, false, 
                        scale = 1);
    //Effect percent based on unit's stat. Exp: If unit has 100 att and this effect has 0.5%. This effect will deal 50 damage
    this.percent = percent;
    this.aoe = aoe;
    this.positive = false;
    this.hit = false;
    this.hitList = new Set();   //A set of unit that already hit. So the effect won't hit again
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
    this.effects[index] = callback;
}


Effect.prototype.update = function() {//Updating the coordinate for the unit in the frame

    if (this.isDone()) {
        this.numOfLoop--;
        if (this.numOfLoop <= 0) {
            this.removeFromWorld = true;
        } else {
            console.log("I did");
            this.elapsedTime = 0;
            this.hitList = new Set();
        }
  
    } 
    if (!this.hit) {  //If this effect already hit the opponent, skip below statements
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
                    this.collisingAction(opponent[i]);  //What happen to the opponent when collised this effect
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
    if (effect !== undefined && typeof effect === "function") effect(this); 
    AnimatedObject.prototype.update.call(this);
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
    if (this.spritesheet != undefined)
        AnimatedObject.prototype.draw.call(this);
}

Effect.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration * this.unit.speedPercent);
}

Effect.prototype.isDone = function () {
    this.totalTime = this.frameDuration * this.frames * this.unit.speedPercent;
    return (this.elapsedTime >= this.totalTime);
}



/*===============================================================*/

function Tomb(game, x, y) {
    var a = AM.getAsset("./img/tomb.png");

    a.onclick = function() {
        console.log("Clicked");
    }
    NonAnimatedObject.call(this, game, a, x, y);
    this.gravity = true;
    this.yVelocity = -400;
    this.colliseBox = {x: x, y: y + 33, width: 40, height: 10}; 
}

Tomb.prototype = Object.create(NonAnimatedObject.prototype);
Tomb.prototype.constructor = Tomb;

Tomb.prototype.update = function() {
    if (this.gravity === true) {
        this.colliseBox = {x: this.x, y: this.y + 33, width: 40, height: 5};

        if (this.yVelocity >= 0) {
            for (var box in this.game.collisionBox.ground) {
                if (collise(this.colliseBox, this.game.collisionBox.ground[box])) {
                    this.y = this.game.collisionBox.ground[box].y - this.height;
                    this.gravity = false;
                    return;
                }
            }
        }
    }

}

Tomb.prototype.draw = function() {
    NonAnimatedObject.prototype.draw.call(this);
}

/*===============================================================*/

function Button(game, spritesheet, x, y, scale = 1) {
    this.NORMAL = 0;
    this.PRESS = 1;
    this.MOUSEOVER = 2;

    Entity.call(this, game, x, y);

    this.status = this.NORMAL;
    this.normal = new NonAnimatedObject(game, spritesheet.normal, x, y);
    this.press = new NonAnimatedObject(game, spritesheet.press, x, y);
    this.mouseover = new NonAnimatedObject(game, spritesheet.mouseover, x, y);

    this.colliseBox = {x: x, y: y, width: this.normal.width, height: this.normal.height};
}

Button.prototype = Object.create (Entity.prototype);
Button.prototype.constructor = Button;

Button.prototype.draw = function() {
    if (this.status === this.NORMAL) {
        this.normal.draw();
    } else if (this.status === this.PRESS) {
        this.press.draw();
    } else if (this.status === this.MOUSEOVER) {
        this.mouseover.draw();
    }
}

Button.prototype.update = function() {
    if (collise(this.colliseBox, this.game.mouse)) {
        if (this.game.mouse.click) {
         //   spawn(this.game);
            spawnUnit(this.game, 100, 100, "h000", PLAYER);
            spawnUnit(this.game, 900, 100, "m000", ENEMY);
            this.game.mouse.click = false;
        } else if (this.game.mouse.pressed) this.status = this.PRESS;
        else this.status = this.MOUSEOVER;
    } else this.status = this.NORMAL;
}