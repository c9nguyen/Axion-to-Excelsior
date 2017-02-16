/*
 * Temporary unit code h000:
 * h: normal human unit
 * t: tower unit
 * m: monster unit
 */

// const STAND = 0;
// const JUMP = 1;
// const WALK = 2;
// const ATTACK = 3;

// const UNIT_0000 = 0;  

// function Action(game, unit, spritesheet,
//                 sheetWidth, frameDuration, frames, 
//                 groundPoints, collisionBoxes, cooldown = 0,
//                 scale = 1, frameWidth = spritesheet.width / sheetWidth , 
//                 frameHeight = spritesheet.height / Math.ceil(frames / sheetWidth),
//                 width = frameWidth, height = frameHeight) { 

function spawnUnit(game, x, y, unitcode, side = NEUTRAL) {
    var unit;
    switch (unitcode) {
        case "h000":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{x: 50, y: 95}];
            var collisionBox = [{x: 40, y: 20, width: 50, height: 75}];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/h000/walk_right.png"),
                                    2, 0.1, 4, groundPoints, collisionBox, true);
            walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed};
            walk.endEffect = function() {this.unit.velocity.x = 0};

            groundPoints = [{x: 50, y: 95}];
            collisionBox = [{x: 40, y: 20, width: 50, height: 75}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/h000/jump_right.png"),
                                    1, 0.1, 1, groundPoints, collisionBox, true);

            groundPoints = [{x: 15, y: 90}];
            collisionBox = [{x: 52, y: 52, width: 60, height: 70}];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/h000/stab_right.png"),
                                    3, 0.2, 3, groundPoints, collisionBox, false);
            attack.effects[2] = function(that) {
                castSkill(that.game, that.x + 50, that.y + 47, that.unit, 00000, 1,
                        undefined, 93, 45, 0.1, false);};

            groundPoints = [{x: 55, y: 120}];
            groundPoints[2] = {x: 55, y: 150};
            groundPoints[3] = {x: 55, y: 120};
            collisionBox = [{x: 20, y: 20, width: 60, height: 70}];
            var attack2 = new Action(game, unit, AM.getAsset("./img/unit/h000/jumpattack_right.png"),
                                    4, 0.2, 4, groundPoints, collisionBox, false, 5);
            attack2.addEffect (2, function (that) {
                var minus = that.unit.lockedTarget.velocity.x;
                that.unit.velocity.x = 900 + (minus * 2);
            });
            attack2.addEffect (3, function (that) {
                that.unit.velocity.x = 0;
                castSkill(that.game, that.x + 34, that.y + 13, that.unit, 00002, 1.5);
            });

            groundPoints = [{x: 50, y: 95}];
            var die = new Action(game, unit, AM.getAsset("./img/unit/h000/die_right.png"),
                                    5, 0.1, 5, groundPoints, collisionBox, false, -1);
            die.effects[0] = function(that) {that.unit.velocity.x = -that.unit.movementspeed;
                                            that.unit.velocity.y = -350;
                                            that.unit.gravity = true};
            die.endEffect = function() {this.unit.removeFromWorld = true;};

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["attack2"] = attack2;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.actionHandler = function(that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) that.changeAction("attack");
                        else if (collisedEnemy.has(1) && attack2.checkCooldown()) that.changeAction("attack2");
                        else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            break;

        case "h001":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{x: 5, y: 67}];
            var collisionBox = [{x: 5, y: 0, width: 40, height: 67}];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/h001/walk.png"),
                                    4, 0.07, 4, groundPoints, collisionBox, true);
            walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed};
            walk.endEffect = function() {this.unit.velocity.x = 0};

            groundPoints = [{x: 5, y: 67}];
            collisionBox = [{x: 5, y: 0, width: 40, height: 67}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/h001/jump.png"),
                                    1, 0.1, 1, groundPoints, collisionBox, true);

            groundPoints = [{x: 26, y: 80}];
            collisionBox = [{x: 26, y: 20, width: 46, height: 60}];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/h001/attack.png"),
                                    4, 0.05, 8, groundPoints, collisionBox, false);
            var effect = function(that) {
                castSkill(that.game, that.x + 60, that.y + 30, that.unit, 00005, 0.25);};
            attack.effects[2] = effect;
            attack.effects[3] = effect;
            attack.effects[4] = effect;
            attack.effects[5] = effect;

            groundPoints = [{x: 5, y: 67}];
            collisionBox = [{x: 5, y: 0, width: 40, height: 67}];
            var skill = new Action(game, unit, AM.getAsset("./img/unit/h001/skill.png"),
                                    1, 0.2, 1, groundPoints, collisionBox, false, 10);
            skill.effects[0] = function (that) {
                castSkill(that.game, that.x, that.y, that.unit, 00010, 0);
                that.unit.x = that.unit.x - 100;
                that.unit.velocity.x = -100;
            };
            skill.endEffect = function () {
                this.unit.velocity.x = 0;
            };

            groundPoints = [{x: 60, y: 108}];
            var die = new Action(game, unit, AM.getAsset("./img/unit/h001/die.png"),
                                    4, 0.1, 4, groundPoints, collisionBox, false, -1);
            die.effects[0] = function(that) {that.unit.velocity.x = -that.unit.movementspeed;};
            die.endEffect = function() {this.unit.removeFromWorld = true;};

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["skill"] = skill;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.actionHandler = function(that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) that.changeAction("attack");
                        else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            unit.getHit = function (that, damage) {
                if (unit.actions.skill.checkCooldown()) {
                    that.changeAction("skill");
                } else
                    that.health -= Math.max(damage - (that.def * damage), 1);
            }
            break;

        case "h100":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{x: 32, y: 77}];
            var collisionBox = [{x: 26, y: 0, width: 55, height: 75}];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/h100/walk.png"),
                                    4, 0.08, 4, groundPoints, collisionBox, true);
            walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed};
            walk.endEffect = function() {this.unit.velocity.x = 0};

            groundPoints = [{x: 30, y: 76}];
            collisionBox = [{x: 30, y: 3, width: 55, height: 75}];
            var stand = new Action(game, unit, AM.getAsset("./img/unit/h100/stand.png"),
                                    4, 0.2, 4, groundPoints, collisionBox, true);

            groundPoints = [{x: 32, y: 77}];
            collisionBox = [{x: 26, y: 52, width: 55, height: 75}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/h100/jump.png"),
                                    1, 0.1, 1, groundPoints, collisionBox, true);

            groundPoints = [{x: 110, y: 204}];
            collisionBox = [{x: 115, y: 140, width: 55, height: 75}];
            collisionBox[7] = {x: 115, y: 120, width: 55, height: 75};
            collisionBox[9] = {x: 115, y: 140, width: 55, height: 75};
            var attack = new Action(game, unit, AM.getAsset("./img/unit/h100/attack1.png"),
                                    7, 0.1, 14, groundPoints, collisionBox, false);
            var effect = function(that) {
                castSkill(that.game, that.x + 40, that.y, that.unit, 00000, 0.25,
                        undefined, 502, 304, 0.1, true);};
            var effect2 = function (that) {
                if (that.game.moveAmount > 0)
                    console.log(that.game.moveAmount);
                castSkill(that.game, that.x, that.y, that.unit, 'h1000', 0);};
            attack.effects[0] = effect2;
            attack.effects[1] = effect;
            attack.effects[2] = effect;
            attack.effects[4] = effect;
            attack.effects[5] = effect;
            attack.effects[6] = effect;
            attack.effects[8] = effect;
            attack.effects[9] = effect;
            attack.effects[10] = effect;


            groundPoints = [{x: 284, y: 254}];
            collisionBox = [{x: 280, y: 190, width: 55, height: 75}];
            var attack3 = new Action(game, unit, AM.getAsset("./img/unit/h100/attack3.png"),
                                    13, 0.1, 13, groundPoints, collisionBox, false, 5);
            effect = function(that) {
                castSkill(that.game, that.x, that.y + 105, that.unit, 00000, 1,
                        undefined, 635, 166, 0.1, true);};
            effect2 = function (that) {
                castSkill(that.game, that.x, that.y, that.unit, 'h1001', 0);};
            attack3.effects[0] = effect2;   
            attack3.effects[4] = effect;
            attack3.effects[5] = effect;
            attack3.effects[6] = effect;
            attack3.effects[7] = effect;
            attack3.effects[8] = effect;
            attack3.effects[9] = effect;


            groundPoints = [{x: 102, y: 102}];
            var die = new Action(game, unit, AM.getAsset("./img/unit/h100/die.png"),
                                    7, 0.1, 14, groundPoints, collisionBox, false, -1);
            die.endEffect = function() {this.unit.removeFromWorld = true;};

            unit.actions["walk"] = walk;
            unit.actions["stand"] = stand;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["attack3"] = attack3;
            unit.actions["die"] = die;
            unit.defaultAction = stand;
            unit.actionHandler = function(that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0) && attack3.checkCooldown()) that.changeAction("attack3");
                        else if (collisedEnemy.has(1)) that.changeAction("attack");
                        else that.changeAction("stand");
                    }
                } else
                    that.changeAction("jump");
            }
            break;

        case "m000":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{x: 50, y: 105}];
            var collisionBox = [{x: 50, y: 20, width: 70, height: 85}];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/m000/walk_left.png"),
                                    2, 0.13, 4, groundPoints, collisionBox, true);
            walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed};
            walk.endEffect = function() {this.unit.velocity.x = 0};
                    
            groundPoints = [{x: 50, y: 105}];
            collisionBox = [{x: 50, y: 20, width: 70, height: 85}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/m000/jump_left.png"),
                                    1, 0.1, 1, groundPoints, collisionBox, true);

            collisionBox = [];
            groundPoints = [{x: 300, y: 109}];
            collisionBox[0] = {x: 283, y: 25, width: 70, height: 85};
            collisionBox[4] = {x: 253, y: 25, width: 90, height: 85};
            collisionBox[5] = {x: 260, y: 25, width: 90, height: 85};
            collisionBox[6] = {x: 280, y: 25, width: 80, height: 85};
            collisionBox[7] = {x: 283, y: 25, width: 60, height: 85};
            var attack = new Action(game, unit, AM.getAsset("./img/unit/m000/attack_left.png"),
                                    8, 0.15, 8, groundPoints, collisionBox, false);
            attack.effects[4] = function(that) {
                                    castSkill(that.game, that.x + 0, that.y + 50, that.unit, 00000, 1,
                                    undefined,350, 60, 0.3, true)};

            groundPoints = [];
            collisionBox = [];
            groundPoints = [{x: 66, y: 181}];
            var die = new Action(game, unit, AM.getAsset("./img/unit/m000/die_left.png"),
                                    10, 0.1, 10, groundPoints, collisionBox, false, -1);
            // die.effects[0] = function() {this.unit.velocity.x = -this.unit.movementspeed;
            //                                 this.unit.velocity.y = -150};
            die.endEffect = function() {this.unit.removeFromWorld = true};

            //attack.effects[0] = function() {this.unit.velocity.y = -800; this.unit.velocity.x = 200};
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.actionHandler = function(that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) that.changeAction("attack");
                        else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            break;
        
        case "m010":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{x: 0, y: 130}];
            var collisionBox = [{x: 10, y: 10, width: 120, height: 120}];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/m010/walk.png"),
                                    3, 0.2, 6, groundPoints, collisionBox, true);
            walk.effects[0] = function() {this.unit.velocity.x = this.unit.movementspeed};
            walk.endEffect = function() {this.unit.velocity.x = 0};

            groundPoints = [{x: 0, y: 130}];
            collisionBox = [{x:10, y: 10, width: 120, height: 120}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/m010/jump.png"),
                                    1, 0.2, 1, groundPoints, collisionBox, true);
            
            groundPoints = [{x: 50, y: 140}];
            collisionBox[0] = {x: 50, y: 20, width: 120, height: 120};

            var attack = new Action(game, unit, AM.getAsset("./img/unit/m010/attack.png"),
                                    4, 0.15, 12, groundPoints, collisionBox, false);

            //Making knock back effect
            attack.effects[4] = function(that) {
                castSkill(that.game, that.x, that.y + 30, that.unit, 00000, 1,
                            function(unit) { unit.velocity.x = unit.movementspeed / (-unit.movementspeed) * 200;
                                            unit.velocity.y = -300;
                                            unit.changeAction("jump");},
                            160, 100, 0.4, true)};

            groundPoints = [{x: 0, y: 130}];
            var die = new Action(game, unit, AM.getAsset("./img/unit/m010/die.png"),
                                    3, 0.1, 9, groundPoints, collisionBox, false, -1);
            die.endEffect = function() {
                this.unit.removeFromWorld = true};

            var groundPoints = [{x: 0, y: 130}];
            var collisionBox = [{x: 10, y: 10, width: 120, height: 120}];
            var stand = new Action(game, unit, AM.getAsset("./img/unit/m010/stand.png"),
                                    3, 0.2, 6, groundPoints, collisionBox, true);
            stand.effects[0] = function(that) {that.unit.velocity.x = 0};

            //attack.effects[0] = function() {this.unit.velocity.y = -800; this.unit.velocity.x = 200};
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["die"] = die;
            unit.actions["stand"] = stand;
            unit.defaultAction = walk;
            unit.actionHandler = function(that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) that.changeAction("attack");
                        else that.changeAction("stand");
                    }
                } else
                    that.changeAction("jump");
            }
            break;
    }

    if (unit !== undefined) game.addEntity(unit);
    else console.log("Wrong unitcode");
    return unit;
}