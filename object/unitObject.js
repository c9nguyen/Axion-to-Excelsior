/*===============================================================*/

/**
 * Action is an animated object with standing point for units.
 * Action should not be added to Entity listed. Therefore action won't be updated and drawn by game engine.
 * Instead, the unit will update and draw the current action of the unit
 * 
 * @loop: whether this acion will have loop (meaning 0 cooldown)
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
                groundPoints, collisionBoxes, interruptible = true, cooldown = 0,
                scale = 1, frameWidth = spritesheet.width / sheetWidth , 
                frameHeight = spritesheet.height / Math.ceil(frames / sheetWidth),
                width = frameWidth, height = frameHeight) { //default orignal size

    this.unit = unit;
    this.effects = [];
    this.effectCasted = new Set(); //Keep track what effect already at a frame so wont recast
    this.cooldown = cooldown;
    this.interruptible = interruptible;
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
                        sheetWidth, frameDuration, frames, cooldown === 0, 
                        frameWidth, frameHeight);
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
Action.prototype.addEffect = function(index, callback) {
    this.effects[index] = callback;
}

/**
 * What to do at the start of action. Called by unit when start the action
 * Overwrite it if you want to use. (Overwrite the instance of Action not the prototype)
 */
Action.prototype.start = function() {
    this.elapsedTime = 0;
    this.timeLastStart = this.game.timer.gameTime;
    this.effectCasted = new Set();
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
    this.endEffect(this);
}


Action.prototype.update = function() {//Updating the coordinate for the unit in the frame
    //If this action is still on cooldown, call default 
    if (this.isDone()) {
        this.effectCasted = new Set();
        if (!this.checkCooldown() || !this.loop) {
            this.endEffect(this);
            this.unit.currentAction = this.unit.defaultAction;
            if(this.unit.currentAction !== undefined){
                this.unit.currentAction.start();
                this.unit.currentAction.update();
            }
            return;
         }
    }
    this.during();
    this.cooldownClock += this.game.clockTick;
   // if (!this.loop && this.isDone()) this.end(); // perform ending action
    var frame = this.currentFrame();
    //Updating ground point
    var groundPoint = this.getFrameGroundPoint(frame); 
    this.x = this.unit.x - groundPoint.x;
    this.y = this.unit.y - groundPoint.y;
    //Updating collisionBox
    if (this.unit.health > 0) {
        var collisionBox = this.getFrameHitbox(frame);
        this.collisionBox.x = this.x + collisionBox.x;
        this.collisionBox.y = this.y + collisionBox.y;
        this.collisionBox.width = collisionBox.width;
        this.collisionBox.height = collisionBox.height;
    }


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
    if (this.collisionBoxes[frame] === undefined) {
        if (this.previousHitbox !== undefined) {
            hitbox = this.previousHitbox;
        } else {
            hitbox = {x: 0, y: 0, width: 0, height: 0};
        }
    } else
        hitbox = this.collisionBoxes[frame];

    this.previousHitbox = hitbox;
    return hitbox;
}

Action.prototype.draw = function() {
    AnimatedObject.prototype.draw.call(this);
}

Action.prototype.currentFrame = function () {

    return Math.floor(this.elapsedTime / (this.frameDuration / this.unit.speedPercent));
}

Action.prototype.isDone = function () {
    this.totalTime = this.frameDuration * this.frames / this.unit.speedPercent;
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

    //var range = this.data.range;
    this.rangeBox = this.data.range; 
    this.speedPercent = 1;
    this.flying = this.data.flying;
    
    //Stats
    this.health = this.data.health;
    this.movementspeed = this.data.movementspeed;
    this.att = this.data.att;
    this.def = this.data.def;
    this.knockable = this.data.knockable

    this.actions = {}; //contains all actions this unit can perform (walk, stand, attack)
    this.defaultAction;
    this.collisionReacts = {};  //Not used yet
    this.currentAction;
    this.lockedTarget;  //The enemy that the unit targetting.
    this.takingDamage = 0;
    this.healing = 0;
    this.push = 0;
    this.takingEffect = [];
    this.passiveEffectInit();
    this.getHit = function(that, damage) {  //default get hit action: lose hp
        that.health -= Math.max(damage - (that.def * damage), 1);
        that.takingEffect.map(function(effect) {
            effect(that);
        });
       // if (this.takingEffect) this.takingEffect(this);
    };
    this.actionHandler = function() {};
}

Unit.prototype = Object.create(Entity.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.passiveEffectInit = function() {
    this.passiveEffect = {};
    this.passiveEffectImage = {};
    this.passiveEffect["att"] = {amount: 0, duration: 0};
    this.passiveEffectImage["att"] = new NonAnimatedObject(this.game, AM.getAsset("./img/effect/passive/att.png"));
    this.passiveEffectImage["att"].setSize(20, 20);
    this.passiveEffect["def"] = {amount: 0, duration: 0};
    this.passiveEffectImage["def"] = new NonAnimatedObject(this.game, AM.getAsset("./img/effect/passive/def.png"));
    this.passiveEffectImage["def"].setSize(20, 20);
    this.passiveEffect["heal"] = {amount: 0, duration: 0};
    this.passiveEffectImage["heal"] = new NonAnimatedObject(this.game, AM.getAsset("./img/effect/passive/heal.png"));
    this.passiveEffectImage["heal"].setSize(20, 20);
    this.passiveEffect["poison"] = {amount: 0, duration: 0}; 
    this.passiveEffectImage["poison"] = new AnimatedObject(this.game, AM.getAsset("./img/effect/passive/poison.png"), 
                                                        this.x, this.y, 5, 0.15, 5, true);
    this.passiveEffectImage["poison"].setSize(20, 20); 
    this.passiveEffect["speed"] = {amount: 0, duration: 0};  
    this.passiveEffectImage["speed"] = new NonAnimatedObject(this.game, AM.getAsset("./img/effect/passive/speed.png"));
    this.passiveEffectImage["speed"].setSize(20, 20);
    // this.passiveEffect["stun"] = {amount: 0, duration: 0};
    // this.passiveEffectImage["stun"] = new NonAnimatedObject(this.game, AM.getAsset("./img/effect/passive/stun.png"));
    // this.passiveEffectImage["stun"].setSize(20, 20);
}

Unit.prototype.takePassiveEffect = function(effectType, amount) {
    this.passiveEffect[effectType] = {amount: amount, duration: 5}; 
}

Unit.prototype.getCollisionBox = function() {
    return this.currentAction !== undefined ? this.currentAction.collisionBox : this;
}

// /**
//  * There are 4 basic collision action:
//  * 1. Action when standing on the platform (Stand or walk)
//  * 2. Action when in the air (flying or jump)
//  * 3. Action when an enemy gets within attack range (attack)
//  * 4. Action when the unit get hit (mostly nothing, some special unit might explode or jump back)
//  * Pass 3 actions as callback functions. 
//  * Suggestion: use changeAction
//  */
// Unit.prototype.setCollisionReacts = function(reaction, callback = function() {}) {
    
//     this.reaction[reaction] = callback;
// }

Unit.prototype.applyPassiveEffect = function() {
    this.att = this.data.att + this.data.att * this.passiveEffect.att.amount;
    this.def = this.data.def + this.passiveEffect.def.amount;
    this.health = Math.max(this.health - this.passiveEffect.poison.amount * this.game.clockTick, 1);
    this.health = Math.min(this.health + this.passiveEffect.heal.amount * this.game.clockTick, this.data.health);
    this.speedPercent = 1 + this.passiveEffect.speed.amount;
    for (var i in this.passiveEffect) {
        var effect = this.passiveEffect[i];
        effect.duration -= this.game.clockTick;
        if (effect.duration < 0) {
            effect.amount = 0;
            effect.duration = 0;
        }
    }
}

Unit.prototype.getKnockback = function(power) {
    if (this.knockable) {
       // this.velocity.x = this.movementspeed / (-this.movementspeed) * power * 2;
        this.velocity.y = -400;
        this.changeAction("jump");
      this.push = -power;
    }
}



/**
 * Change the action of unit
 */
Unit.prototype.changeAction = function(actionName) {
    var action = this.actions[actionName];
    if (action !== undefined && this.currentAction !== action && action.checkCooldown()) {    //If action is defined and not performing
        if (this.currentAction !== undefined) this.currentAction.end();
        this.currentAction = action;
 //       this.currentAction.update();
        this.currentAction.start();
    } 
        
}

Unit.prototype.heal = function(amount) {
    this.healing += amount;
}

Unit.prototype.takeDamage = function(amount) {
    this.takingDamage += amount;
}

Unit.prototype.takeEffect = function(effect) {
    this.takingEffect.push(effect);
}

Unit.prototype.checkEnemyInRange = function() {
    var enemy = this.side === PLAYER ? this.game.enemyList : this.game.playerList;
    var rangeIndex = new Set();
                //var collisionBox = this.getCollisionBox();
    for (var i in enemy) {
        if (enemy[i].removeFromWorld){
            enemy.splice(i, 1);
            i--;
        } else {
            var otherCollisionBox = enemy[i].getCollisionBox();
            for (var j = 0; j < this.rangeBox.length; j++) {  //Check all range box and return which box hit
                var range = this.rangeBox[j];
                var tempRange = {x: this.x + range.x, y: this.y + range.y,
                                width: range.width, height: range.height};
                if (collise(tempRange, otherCollisionBox)) {
                    this.lockedTarget = enemy[i];
                    rangeIndex.add(j);
                } 
            }
        }

        if (rangeIndex.size > 0) break;
    } 

    return rangeIndex;
}

Unit.prototype.checkAllyInRange = function(condition = function() {return true;}) {
    var ally = this.side !== PLAYER ? this.game.enemyList : this.game.playerList;
    var rangeIndex = new Set();
                //var collisionBox = this.getCollisionBox();
    for (var i in ally) {
        if (ally[i].removeFromWorld){
            ally.splice(i, 1);
            i--;
        } else if (ally[i] !== this) {
            var otherCollisionBox = ally[i].getCollisionBox();
            for (var j = 0; j < this.rangeBox.length; j++) {  //Check all range box and return which box hit
                var range = this.rangeBox[j];
                var tempRange = {x: this.x + range.x, y: this.y + range.y,
                                width: range.width, height: range.height};
                if (collise(tempRange, otherCollisionBox) && condition(ally[i])) {
                    this.lockedTarget = ally[i];
                    rangeIndex.add(j);
                } 
            }
        }

        if (rangeIndex.size > 0) break;
    } 

    return rangeIndex;
}

Unit.prototype.update = function() {
    Entity.prototype.update.call(this);
    if (this.y > canvasHeight * 2){
        this.removeFromWorld = true;
        return;
    } 
    this.velocity.x = this.push;
    this.push = this.push - this.push * this.game.clockTick;
    this.push = this.push >= 0 ? this.push < 10 ? 0 : Math.floor(this.push) : this.push > -10 ? 0 : Math.ceil(this.push);
        if (!this.flying) {
            this.gravity = true;
            //Only check for ground collision when the unit falling down or standing    
            if (this.velocity.y >= 0) {
                //Improving performace by checking if still standing on the previous platform                    
                if (this.previousPlatform !== undefined && collise(this, this.previousPlatform)) { 
                    this.y = this.previousPlatform.y + this.data.groundHeight;
                    this.velocity.y = 0;
                    this.gravity = false;
                } else {
                    var groundCollisionBox = this.game.collisionBox.ground;
                    for (var box in groundCollisionBox) {
                        if (collise(this, groundCollisionBox[box])) {
                            this.y = groundCollisionBox[box].y + 10;
                            this.velocity.y = 0;
                            this.gravity = false;
                            this.previousPlatform = groundCollisionBox[box];    //Save this to check again
                            break;
                        }
                    }
                }
            }
        }


    if (this.health <= 0) {
         this.changeAction("die");
         this.health = 0;
    //     this.velocity.x = 0;
         this.currentAction.collisionBox = {x: 0, y: 0, width: 0, height: 0};
    } else {
        this.applyPassiveEffect();
        if (this.takingDamage > 0 || this.healing > 0 || this.takingEffect.length > 0) {
            this.getHit(this, this.takingDamage);
            this.health = Math.min(this.health + this.healing, this.data.health);
            this.healing = 0;
            this.takingDamage = 0;
            this.takingEffect = [];
        }

       

        //Will be added: effect on this unit (poison, movement locked,..)

        // //Updating range box
        // var range = this.data.range;
        // this.rangeBox.x = range.x + this.x;
        // this.rangeBox.y = range.y + this.y;

        //if the unit is not flying unit, check gravity (flying is different from jumping) 
        // if (!this.flying) {
        //     this.gravity = true;
        //     //Only check for ground collision when the unit falling down or standing    
        //     if (this.velocity.y >= 0) {
        //         //Improving performace by checking if still standing on the previous platform                    
        //         if (this.previousPlatform !== undefined && collise(this, this.previousPlatform)) { 
        //             this.y = this.previousPlatform.y + this.data.groundHeight;
        //             this.velocity.y = 0;
        //             this.gravity = false;
        //         } else {
        //             var groundCollisionBox = this.game.collisionBox.ground;
        //             for (var box in groundCollisionBox) {
        //                 if (collise(this, groundCollisionBox[box])) {
        //                     this.y = groundCollisionBox[box].y + 10;
        //                     this.velocity.y = 0;
        //                     this.gravity = false;
        //                     this.previousPlatform = groundCollisionBox[box];    //Save this to check again
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        // }

        this.actionHandler(this);
    }
    //update the current action
    if (this.currentAction !== undefined) this.currentAction.update();
    this.velocity.x += this.currentAction.velocity.x  * this.speedPercent;
}

Unit.prototype.draw = function() {
    if(this.currentAction !== undefined)
        this.currentAction.draw();
    var drawX = this.x + this.game.mapX;
    //Health bar
    var ctx = this.game.ctx;
    var healthPercent = this.health / this.data.health;
    healthPercent = Math.max(healthPercent, 0);
    var height = this.height / 2;
    //var healthBar = {x: this.x, y: this.y, width: this.width * healthPercent, height: height};
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = 'red';
    ctx.fillRect(drawX, this.y, this.width, height);
    ctx.fillStyle = 'green';
    ctx.fillRect(drawX, this.y, this.width * healthPercent, height);
    ctx.strokeStyle = 'black';
    ctx.rect(drawX, this.y, this.width, height);
    ctx.stroke();
    ctx.fillStyle = 'black';
    var dis = 0;
    for (var effect in this.passiveEffect) {
        
        if (this.passiveEffect[effect].amount > 0) {
            var passiveEffect = this.passiveEffectImage[effect];
            passiveEffect.x = this.x - 10 + dis;
            passiveEffect.y = this.y + this.height/2;
            passiveEffect.draw();
            dis += 15;
        }
    }


    // // collisionBox
    // if (this.side === ENEMY) {
    // var action = this.currentAction;
    // var box = {};
    // var collisionBox = action.getFrameHitbox(action.currentFrame());
    // if (collisionBox !== undefined) {
    // box.x = action.x + collisionBox.x + this.game.mapX;;
    // box.y = action.y + collisionBox.y;
    // box.width = collisionBox.width;
    // box.height = collisionBox.height;
    // this.game.ctx.fillRect(box.x, box.y, box.width, box.height);
    // }
    // }


    // var rangeBox = this.rangeBox[0];
    // var box = {};
    // box.x = this.x + rangeBox.x + this.game.mapX;;
    // box.y = this.y + rangeBox.y;
    // box.width = rangeBox.width;
    // box.height = rangeBox.height;
    // this.game.ctx.strokeStyle = "red";
    // this.game.ctx.fillRect(box.x, box.y, box.width, box.height);


    //this.game.ctx.fillRect(rangeBox.x, rangeBox.y, rangeBox.width, rangeBox.height);

    
}

