var canvasWidth = 0;
var canvasHeight = 0;
var characters = [];
var food = [];

function spawn(game) {
    var person = new Person(game, -1, 400, 400, 0.1, 1);
    person.changeStatus(WALK);
    person.setSpeed(200, 1);
    person.yVelocity = Math.floor(Math.random() * -1500);
    game.addEntity(person);
}

const characterFrameInfo = [
    {sheetWidth: 5, frames: 5},    //stand
    {sheetWidth: 1, frames: 1},    //jump
    {sheetWidth: 2, frames: 4},    //walk
    {sheetWidth: 3, frames: 3}    //Attack
]

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
    this.ctx.drawImage(this.spritesheet,
                 this.xindex * this.frameWidth, this.yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 this.x, this.y,
                 this.width * this.scale, this.height * this.scale);
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
    this.elapsedTime += this.game.clockTick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    this.xindex = frame % this.sheetWidth;
    this.yindex = Math.floor(frame / this.sheetWidth);
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
                sheetWidth, frameDuration, frames, loop, 
                groundPoints, collisionBoxes, cooldown = 0,
                scale = 1, frameWidth = spritesheet.width / sheetWidth , 
                frameHeight = spritesheet.height / Math.ceil(frames / sheetWidth),
                width = frameWidth, height = frameHeight) { //default orignal size

    
    this.unit = unit;
    this.effects = [];
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
                        sheetWidth, frameDuration, frames, loop, 
                        scale = 1, width, height);
}

Action.prototype = Object.create(AnimatedObject);
Action.prototype.constructor = Action;

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
    this.during();
    this.cooldownClock += this.game.clockTick;
    if (this.cooldownClock >= this.cooldown) this.cooldownClock = 0;
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
    if (effect !== undefined && typeof effect === "function") this.effects[frame](this); 
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
    
    this.flying = this.data.flying;
    this.health = this.data.health;
    this.speedPercent = 1;
    this.movementspeed = this.data.movementspeed;
    this.actions = {}; //contains all actions this unit can perform (walk, stand, attack)
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
    if (action !== undefined && this.currentAction !== action) {    //If action is defined and not performing
        if (this.currentAction !== undefined) this.currentAction.end();
        this.currentAction = action;
        this.currentAction.start();
    }
}

Unit.prototype.update = function() {
   // console.log(this.gravity);
    if (this.health <= 0 || this.y > canvasHeight * 2) this.removeFromWorld = true;
    else {
        Entity.prototype.update.call(this);
        //Will be added: effect on this unit (poison, movement locked,..)

        //Updating range box
        var range = this.data.range;
        this.rangeBox.x = range.x + this.x;
        this.rangeBox.y = range.y + this.y;


        if (!this.flying) { //if the unit is not flying unit, check gravity (flying is different from jumping)
            if (this.velocity.y >= 0) { //Only check for ground collision when the unit falling down or standing
                this.gravity = true;
               
                // var groundHitBox = {x: this.x, y: this.y, 
                //                     width: this.groundCollisionWidth, height: this.groundCollisionHeight};
                //Improving performace by checking if still standing on the previous platform                    
                if (this.previousPlatform !== undefined && collise(this, this.previousPlatform)) { 
                    this.y = this.previousPlatform.y;
                    this.gravity = false;
                } else {
                    var groundCollisionBox = this.game.collisionBox.ground;
                    for (var box in groundCollisionBox) {
                        if (collise(this, groundCollisionBox[box])) {
                            this.y = groundCollisionBox[box].y;
                            this.velocity.y = 0;
                            this.gravity = false;
                            this.previousPlatform = groundCollisionBox[box];    //Save this to check again
                            break;
                        }
                    }  
                }
      
            }

            if (!this.gravity) {     //On the ground reaction
                var enemy = this.side === PLAYER ? this.game.enemyList : this.game.playerList;
                //var collisionBox = this.getCollisionBox();
                var collisedEnemy = false;
                for (var i in enemy) {
                    var otherCollisionBox = enemy[i].getCollisionBox();
                    if (collise(this.rangeBox, otherCollisionBox)) {
                        collisedEnemy = true;
                        break;
                    }
                }

                if (collisedEnemy) 
                    //reaction when an enemy gets in range
                    this.rangeReact();
                else 
                    this.groundReact();


            } else if (this.gravity)  //In the air action
                this.airReact();

        } else {    //Fyling unit
                var enemy = this.game.enemyList;
                var collisionBox = this.getCollisionBox();
                var collisedEnemy = false;
                for (var i in enemy) {
                    var otherCollisionBox = enemy[i].getCollisionBox();
                    if (collise(collisionBox, otherCollisionBox)) {
                        collisedEnemy = true;
                        break;
                    }
                }

                if (collisedEnemy) 
                    //reaction when an enemy gets in range
                    this.rangeReact();
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
Tomb.prototype = Tomb;

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
            spawnUnit(this.game, 800, 100, "m000", ENEMY);
            this.game.mouse.click = false;
            // for (var i = 0; i < this.game.entities.length; i++) {
            //     this.game.entities[i].x -= 5;
            //     //this.game.entities[i].y -= 5;
            // }   
        } else if (this.game.mouse.pressed) this.status = this.PRESS;
        else this.status = this.MOUSEOVER;
    } else this.status = this.NORMAL;
}

/*=========================================================================*/

// vinh added
function ScreenScroller(game, x, y, boxX, boxY, scale = 1){
    this.NORMAL = 0;
    this.PRESS = 1;
    this.MOUSEOVER = 2;
    Entity.call(this, game, x, y);
    this.movable = false;
    this.status = this.NORMAL;
    this.screenLocation = 0;

    this.colliseBox = {x: x, y: y, width: boxX, height: boxY};
}

ScreenScroller.prototype = Object.create (Entity.prototype);
ScreenScroller.prototype.constructor = ScreenScroller;

ScreenScroller.prototype.draw = function(){
    this.game.ctx.beginPath();
    this.game.ctx.lineWidth="4";
    this.game.ctx.strokeStyle="green";
    this.game.ctx.rect(this.x, this.y, this.colliseBox.width, this.colliseBox.height);
    this.game.ctx.stroke();
}

ScreenScroller.prototype.update = function(){
    if(collise(this.colliseBox, this.game.mouse)){
        if (this.game.mouse.click) {
            //console.log("Clicked  x: " + (this.game.mouse.x - this.x) + " y: " + (this.game.mouse.y - this.y));
            tempx = this.game.mouse.x - this.x;
            tempy = this.game.mouse.y - this.y;

            mapSize = 2400;
            untouched = 50;
            endPoint = this.colliseBox.width - untouched;
            originalScreen = this.screenLocation;
            if(tempx < 50){
                this.screenLocation = 0;
            } else if(tempx > endPoint){
                this.screenLocation = 1200;
            } else /*if(tempx > 50 && tempx < endPoint)*/{
                moveRange = mapSize / 2;
                numberFactor = moveRange / (endPoint - untouched);
                this.screenLocation = (tempx - untouched) * numberFactor; 
            }
            // Move Everything
            tempEntities = this.game.entities;
            movedAmount = originalScreen - this.screenLocation;
            console.log("moved: " + movedAmount);
            for(var i = 0; i < tempEntities.length; i++){
                if(tempEntities[i].movable){
                    tempEntities[i].x += movedAmount;
                }
            }
            this.game.mouse.click = false;
        }
    }
}
// end vinh added