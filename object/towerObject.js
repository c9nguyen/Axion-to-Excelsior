function Tower(game, x, y, towerCode, side) {
    Entity.call(this, game, x, y, side);

    this.data = towerData[towerCode];
    this.width =  this.data.groundWidth;
    this.height = this.data.groundHeight;
    this.health = this.data.health;
    this.att = this.data.att;
    this.rangeBox = this.data.range; 
    this.knockable = false;
    this.gravity = false;
    this.speedPercent = 1;
    
    this.actions = {}; //contains all actions this unit can perform (walk, stand, attack)
    this.defaultAction;
    this.currentAction;
    this.takingDamage = 0;
    this.getHit = function(that, damage) {  //default get hit action: lose hp
        that.health -= Math.max(damage, 1);
    };

    this.actionHandler = function() {};
}

Tower.prototype = Object.create(Entity.prototype);
Tower.prototype.constructor = Unit;


Tower.prototype.takePassiveEffect = function() {
}

Tower.prototype.getCollisionBox = function() {
    return this.currentAction !== undefined ? this.currentAction.collisionBox : this;
}

Tower.prototype.getKnockback = function() {
}

/**
 * Change the action of unit
 */
Tower.prototype.changeAction = function(actionName) {
    var action = this.actions[actionName];
    if (action !== undefined && this.currentAction !== action && action.checkCooldown()) {    //If action is defined and not performing
        if (this.currentAction !== undefined) this.currentAction.end();
        this.currentAction = action;
        this.currentAction.start();
    } 
        
}

Tower.prototype.heal = function() {
}

Tower.prototype.takeDamage = function(amount) {
    this.takingDamage += amount;
}

Tower.prototype.takeEffect = function() {
}

Tower.prototype.checkEnemyInRange = function() {
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

Tower.prototype.checkAllyInRange = function(condition = function() {return true;}) {
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

Tower.prototype.update = function() {
    Entity.prototype.update.call(this);

    if (this.y > canvasHeight * 2) this.health = -1;
    if (this.health <= 0) {
         this.changeAction("die");
         this.currentAction.collisionBox = {x: 0, y: 0, width: 0, height: 0};
    } else {
        if (this.takingDamage > 0) {
            this.getHit(this, this.takingDamage);
            this.health = Math.min(this.health, this.data.health);
            this.takingDamage = 0;
        }
        this.actionHandler(this);
    }
    //update the current action
    if (this.currentAction !== undefined) this.currentAction.update();
}

Tower.prototype.draw = function() {
    if(this.currentAction !== undefined)
        this.currentAction.draw();
    var drawX = this.x + this.game.mapX;
    //Health bar
    var ctx = this.game.ctx;
    var healthPercent = this.health / this.data.health;
    healthPercent = Math.max(healthPercent, 0);
    var height = this.height / 2;
    //var healthBar = {x: this.x, y: this.y, width: this.width * healthPercent, height: height};
    ctx.fillStyle = 'red';
    ctx.fillRect(drawX, this.y, this.width, height);
    ctx.fillStyle = 'green';
    ctx.fillRect(drawX, this.y, this.width * healthPercent, height);
    ctx.strokeStyle = 'black';
    ctx.rect(drawX, this.y, this.width, height);
    ctx.stroke();
    ctx.fillStyle = 'black';

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

    // if (this.rangeBox[0]) {
    //     var rangeBox = this.rangeBox[0];
    //     var box = {};
    //     box.x = this.x + rangeBox.x + this.game.mapX;;
    //     box.y = this.y + rangeBox.y;
    //     box.width = rangeBox.width;
    //     box.height = rangeBox.height;
    //     this.game.ctx.strokeStyle = "red";
    //     this.game.ctx.fillRect(box.x, box.y, box.width, box.height);
    // }
   


    //this.game.ctx.fillRect(rangeBox.x, rangeBox.y, rangeBox.width, rangeBox.height);

    
}

/* ================================================================================================= */

function MainTower(game) {
    Tower.call(this, game, -50, 520, "tower0", PLAYER);
    var that = this;

    this.skill = new Button(this.game, AM.getAsset("./img/unit/tower0/skill_icon.png"), 20, 20);
    this.skill.addEventListener("click", function() {
        if (that.currentAction.interruptible || that.currentAction.isDone()) {
            that.changeAction("attack");
        }
        castSkill(that.game, that.getClosestEnemy() - 50, -140 , that, 10000, 1);

    });
    this.skill.setCooldown(10);
    this.skill.addSheet(AM.getAsset("./img/unit/tower0/skill_icon_disable.png"), "disable");
    this.skill.timeLastClick = this.game.timer.gameTime;

    this.skill2 = new Button(this.game, AM.getAsset("./img/unit/tower0/skill2_icon.png"), 130, 20);
    this.skill2.addEventListener("click", function() {
        if (that.currentAction.interruptible || that.currentAction.isDone()) {
            that.changeAction("attack2");
        }
        castSkill(that.game, that.getClosestEnemy() - 100, 50, that, 10001, 0.2);
    });
    this.skill2.setCooldown(30);
    this.skill2.addSheet(AM.getAsset("./img/unit/tower0/skill2_icon_disable.png"), "disable");
    this.skill2.timeLastClick = this.game.timer.gameTime;

    this.initActions();
    var that = this;
    this.actionHandler = function(that) {                 
        if (that.currentAction.interruptible || that.currentAction.isDone()) {
            that.changeAction("stand");
    }};
}

MainTower.prototype = Object.create(Tower.prototype);
MainTower.prototype.constructor = Unit;

/**
 * Get the closest enemy
 */
MainTower.prototype.getClosestEnemy = function() {
    var enemy = this.game.enemyList ;
    var x = 1400;
    for (var i in enemy) {
        if (enemy[i].removeFromWorld){
            enemy.splice(i, 1);
            i--;
        } else {
            var otherCollisionBox = enemy[i].getCollisionBox();
            if (x === 0 || x > otherCollisionBox.x)
                x = otherCollisionBox.x;
        }
    }

    return Math.min(x, 1400);
}

MainTower.prototype.initActions = function() {
    var groundPoints = [{x: 0, y: 557}];
    var collisionBox = [{x: 0, y: 65, width: 310, height: 495}];
    var stand = new Action(this.game, this, AM.getAsset("./img/unit/tower0/stand.png"),
                                    3, 0.1, 6, groundPoints, collisionBox, true);

    groundPoints = [{x: 0, y: 596}];
    collisionBox = [{x: 0, y: 100, width: 310, height: 495}];
    var attack = new Action(this.game, this, AM.getAsset("./img/unit/tower0/attack.png"),
                            5, 0.1, 15, groundPoints, collisionBox, false);

    groundPoints = [{x: 0, y: 557}];
    collisionBox = [{x: 0, y: 65, width: 310, height: 495}];
    var attack2 = new Action(this.game, this, AM.getAsset("./img/unit/tower0/attack2.png"),
                            6, 0.1, 12, groundPoints, collisionBox, false);

    groundPoints = [{x: 0, y: 554}];
    var die = new Action(this.game, this, AM.getAsset("./img/unit/tower0/die.png"),
                        7, 0.1, 7, groundPoints, collisionBox, false, -1);
    die.endEffect = function(that) { that.unit.removeFromWorld = true};

    this.actions["attack"] = attack;
    this.actions["attack2"] = attack2;
    this.actions["die"] = die;
    this.actions["stand"] = stand;
    this.currentAction = stand;
}

MainTower.prototype.update = function() {
    this.skill.update();
    this.skill2.update();
    Tower.prototype.update.call(this);
}

MainTower.prototype.draw = function() {

    if(this.currentAction !== undefined)
        this.currentAction.draw();
    this.skill.draw();
    this.skill2.draw();

    //Health bar
    var percent = this.health / this.data.health;
    percent = Math.max(percent, 0);
    var width = 400;
    this.drawBar(250, 10, width, 20, width * percent, "green");

    //skill 1 cd
    percent = (this.game.timer.gameTime - this.skill.timeLastClick) / this.skill.cooldown;
    //console.log(this.game.timer.gameTime - this.skill.timeLastClick + "  " + this.skill.cooldown);
    percent = Math.min(percent, 1);
    width = this.skill.normal.width
    this.drawBar(this.skill.x, this.skill.y + this.skill.normal.height, width, 10, width * percent, "blue");

    //skill 2 cd
    percent = (this.game.timer.gameTime - this.skill2.timeLastClick) / this.skill2.cooldown;
    //console.log(this.game.timer.gameTime - this.skill.timeLastClick + "  " + this.skill.cooldown);
    percent = Math.min(percent, 1);
    width = this.skill2.normal.width
    this.drawBar(this.skill2.x, this.skill2.y + this.skill2.normal.height, width, 10, width * percent, "blue");
}

MainTower.prototype.drawBar = function(x, y, width, height, fill, color) {
    var ctx = this.game.ctx;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, fill, height);
    ctx.strokeStyle = 'black';
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.fillStyle = 'black';
}

/* ================================================================================================= */

function EnemyTower(game) {
    Tower.call(this, game, 2080, 510, "tower1", ENEMY);
    var that = this;

    this.initActions();
    this.leftGuardian();
    this.rightGuardian();
    var that = this;
    this.actionHandler = function(that) {                 
        if (that.currentAction.interruptible || that.currentAction.isDone()) {
            that.changeAction("stand");
    }};
}

EnemyTower.prototype = Object.create(Tower.prototype);
EnemyTower.prototype.constructor = Unit;

EnemyTower.prototype.leftGuardian = function() {

    this.leftG = new Tower(this.game, this.x - 100, this.y, "tower2", ENEMY);
    var collisionBox = [];
    var groundPoints = [{x: 157, y: 854}];
    var attack = new Action(this.game, this.leftG, AM.getAsset("./img/unit/tower2/attack2.png"),
                            5, 0.1, 20, groundPoints, collisionBox, false, 2);
    attack.effects[9] = function(that) {
        if (that.unit.lockedTarget) {
            castSkill(that.game, that.unit.lockedTarget.x - 50, -272, that.unit, 10002, 1);
        }
    };
 
    groundPoints = [{x: 151, y: 465}];
    var attack3 = new Action(this.game, this.leftG, AM.getAsset("./img/unit/tower2/attack3.png"),
                            6, 0.1, 18, groundPoints, collisionBox, false);
    var pushEffect = function(that) {
            castSkill(that.game, that.x - 1000, 0, that.unit, 00000, 0,
                    function(enemyUnit) { enemyUnit.push -= 200;},
                    1500, 600, 0.1, true);
    };  
    attack3.effects[8] = pushEffect;
    attack3.effects[10] = pushEffect;
    attack3.effects[12] = pushEffect;

    groundPoints = [{x: 43, y: 448}];
    var stand = new Action(this.game, this.leftG, AM.getAsset("./img/unit/tower2/stand.png"),
                            1, 0.1, 1, groundPoints, collisionBox, true);


    groundPoints = [{x: 53, y: 460}];
    collisionBox = [];
    var dieafter = new Action(this.game, this.leftG, AM.getAsset("./img/unit/tower2/die_after.png"),
                        1, 0.1, 1, groundPoints, collisionBox, false);

    groundPoints = [{x: 53, y: 460}];
    var die = new Action(this.game, this.leftG, AM.getAsset("./img/unit/tower2/die.png"),
                        5, 0.1, 10, groundPoints, collisionBox, false, -1);
    die.endEffect = function(that) {that.unit.update = function() {};
                                    that.unit.defaultAction = dieafter;
    };

    this.leftG.actions["stand"] = stand;
    this.leftG.actions["attack"] = attack;
    this.leftG.actions["attack3"] = attack3;
    this.leftG.actions["die"] = die;
    this.leftG.currentAction = stand;
    this.leftG.defaultAction = stand;
    this.leftG.actionHandler = function(that) {
            if (that.currentAction.interruptible || that.currentAction.isDone()) {
                var collisedEnemy = that.checkEnemyInRange();
                if (collisedEnemy.has(0) && attack.checkCooldown()) 
                that.changeAction("attack");
                else that.changeAction("stand");
            }

    }
}

EnemyTower.prototype.rightGuardian = function() {

    this.rightG = new Tower(this.game, this.x + 150, this.y, "tower3", ENEMY);
    var collisionBox = [];
    var groundPoints = [{x: 43, y: 603}];
    var attack = new Action(this.game, this.rightG, AM.getAsset("./img/unit/tower3/attack.png"),
                            6, 0.1, 18, groundPoints, collisionBox, false);
    attack.effects[11] = function(that) {
        if (that.unit.lockedTarget) {
            castSkill(that.game, that.unit.lockedTarget.x - 50, 385, that.unit, 10003, 1);
        }
    };                

    groundPoints = [{x: 151, y: 465}];
    var attack3 = new Action(this.game, this.rightG, AM.getAsset("./img/unit/tower3/attack3.png"),
                            6, 0.1, 18, groundPoints, collisionBox, false);
    var pushEffect = function(that) {
            castSkill(that.game, that.x - 1000, 0, that.unit, 00000, 0,
                    function(enemyUnit) { enemyUnit.push -= 200;},
                    1500, 600, 0.1, true);
    };  
    attack3.effects[8] = pushEffect;
    attack3.effects[10] = pushEffect;
    attack3.effects[12] = pushEffect;

    groundPoints = [{x: 43, y: 448}];
    var stand = new Action(this.game, this.rightG, AM.getAsset("./img/unit/tower3/stand.png"),
                            1, 0.1, 1, groundPoints, collisionBox, true);

    groundPoints = [{x: 53, y: 460}];
    collisionBox = [];
    var dieafter = new Action(this.game, this.rightG, AM.getAsset("./img/unit/tower3/die_after.png"),
                        1, 0.1, 1, groundPoints, collisionBox, false);

    groundPoints = [{x: 53, y: 460}];
    var die = new Action(this.game, this.rightG, AM.getAsset("./img/unit/tower3/die.png"),
                        5, 0.1, 10, groundPoints, collisionBox, false, -1);
    die.endEffect = function(that) {that.unit.update = function() {};
                                    that.unit.defaultAction = dieafter;
    };

    this.rightG.actions["stand"] = stand;
    this.rightG.actions["attack"] = attack;
    this.rightG.actions["attack3"] = attack3;
    this.rightG.actions["die"] = die;
    this.rightG.currentAction = stand;
    this.rightG.defaultAction = stand;
    this.rightG.actionHandler = function(that) {
            if (that.currentAction.interruptible || that.currentAction.isDone()) {
                var collisedEnemy = that.checkEnemyInRange();
                if (collisedEnemy.has(0)) that.changeAction("attack");
                else that.changeAction("stand");
            }

    }
}

EnemyTower.prototype.initActions = function() {
    var groundPoints = [{x: 50, y: 418}];
    var collisionBox = [{x: 75, y: 205, width: 155, height: 215}];
    var stand = new Action(this.game, this, AM.getAsset("./img/unit/tower1/stand.png"),
                                    6, 0.1, 12, groundPoints, collisionBox, true);


    groundPoints = [{x: 85, y: 418}];
    collisionBox = [];
    var dieafter = new Action(this.game, this, AM.getAsset("./img/unit/tower1/die_after.png"),
                        1, 0.1, 1, groundPoints, collisionBox, true);

    groundPoints = [{x: 85, y: 418}];
    var die = new Action(this.game, this, AM.getAsset("./img/unit/tower1/die.png"),
                        6, 0.1, 18, groundPoints, collisionBox, false, -1);
    die.addEffect(0, function(that) {
        that.unit.leftG.health = -1;
        that.unit.rightG.health = -1;
    });   
    die.endEffect = function(that) {that.unit.update = function() {};
                                    that.unit.defaultAction = dieafter;
    };



    // var dieafter = new NonAnimatedObject(this.game, AM.getAsset("./img/unit/tower1/die_after.png"), die.x, die.y);
    // this.game.addEntity(dieafter);

    this.actions["die"] = die;
    this.actions["stand"] = stand;
    this.actions["dieafter"] = dieafter;
    this.currentAction = stand;
    this.defaultAction = stand;
}


EnemyTower.prototype.update = function() {
    this.rightG.update();
    this.leftG.update();
    Tower.prototype.update.call(this);
}

EnemyTower.prototype.draw = function() {
    this.leftG.draw();
    //if(this.currentAction !== undefined)
    this.currentAction.draw();
    this.rightG.draw();

    //Health bar
    var percent = this.health / this.data.health;
    percent = Math.max(percent, 0);
    var width = 400;
    this.drawBar(700, 10, width, 20, width * percent, "yellow");
}

EnemyTower.prototype.drawBar = function(x, y, width, height, fill, color) {
    var ctx = this.game.ctx;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, fill, height);
    ctx.strokeStyle = 'black';
    ctx.rect(x, y, width, height);
    ctx.fillStyle = 'black';
    ctx.stroke();
}



/* ================================================================================================= */

function spawnTower(game, x, y, towerCode, side = NEUTRAL) {
    var tower;
    switch (towerCode) {
        // case "h000":
        //     unit = new Unit(game, x, y, unitcode, side);
        //     var groundPoints = [{x: 50, y: 95}];
        //     var collisionBox = [{x: 40, y: 20, width: 50, height: 75}];
        //     var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk_right.png"),
        //                             2, 0.1, 4, groundPoints, collisionBox, true);
        //     walk.velocity.x = walk.unit.movementspeed;       
        //     // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
        //     // walk.endEffect = function(that) {that.unit.velocity.x = 0};

        //     groundPoints = [{x: 50, y: 95}];
        //     collisionBox = [{x: 40, y: 20, width: 50, height: 75}];
        //     var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump_right.png"),
        //                             1, 0.1, 1, groundPoints, collisionBox, true);
        //     jump.effects[0] = function(that) {
        //         that.velocity.x = that.unit.velocity.x;};

        //     groundPoints = [{x: 15, y: 90}];
        //     collisionBox = [{x: 0, y: 20, width: 60, height: 70}];
        //     var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/stab_right.png"),
        //                             3, 0.2, 3, groundPoints, collisionBox, false);
        //     attack.effects[2] = function(that) {
        //         castSkill(that.game, that.x + 50, that.y + 47, that.unit, 00000, 1,
        //                 undefined, 93, 45, 0.1, false);};

        //     groundPoints = [{x: 55, y: 120}];
        //     groundPoints[2] = {x: 55, y: 150};
        //     groundPoints[3] = {x: 55, y: 120};
        //     collisionBox = [{x: 45, y: 45, width: 70, height: 70}];
        //     var attack2 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jumpattack_right.png"),
        //                             4, 0.2, 4, groundPoints, collisionBox, false, 5);
        //     attack2.addEffect (2, function (that) {
        //         var minus = that.unit.lockedTarget.velocity.x;
        //         attack2.velocity.x = that.unit.movementspeed * 7 + (minus * 2);
        //     });
        //     attack2.addEffect (3, function (that) {
        //         attack2.velocity.x = 0;
        //         castSkill(that.game, that.x + 34, that.y + 13, that.unit, 00002, 1.5);
        //     });

        //     groundPoints = [{x: 50, y: 95}];
        //     var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die_right.png"),
        //                             5, 0.1, 5, groundPoints, collisionBox, false, -1);
        //     die.effects[0] = function(that) {that.unit.velocity.x = -that.unit.movementspeed;
        //                                     that.unit.velocity.y = -350;
        //                                     that.unit.gravity = true};
        //     die.endEffect = function() {this.unit.removeFromWorld = true;};

        //     unit.actions["walk"] = walk;
        //     unit.actions["jump"] = jump;
        //     unit.actions["attack"] = attack;
        //     unit.actions["attack2"] = attack2;
        //     unit.actions["die"] = die;
        //     unit.defaultAction = walk;
        //     unit.actionHandler = function(that) {
        //         if (!that.gravity) {
        //             if (that.currentAction.interruptible || that.currentAction.isDone()) {
        //                 var collisedEnemy = that.checkEnemyInRange();
        //                 if (collisedEnemy.has(0)) that.changeAction("attack");
        //                 else if (collisedEnemy.has(1) && attack2.checkCooldown()) that.changeAction("attack2");
        //                 else that.changeAction("walk");
        //             }
        //         } else
        //             that.changeAction("jump");
        //     }
        //     break;

       
    }

    if (tower !== undefined) game.addEntity(tower);
    else console.log("Wrong tower code");
    return tower;
}