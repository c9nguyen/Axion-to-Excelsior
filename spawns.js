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


function spawnUnit(game, x, y, unitcode, side = NEUTRAL) {
    var unit;
    switch (unitcode) {
        case "h000":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 50, y: 95 }];
            var collisionBox = [{ x: 40, y: 20, width: 50, height: 75 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk_right.png"),
                2, 0.1, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 50, y: 95 }];
            collisionBox = [{ x: 40, y: 20, width: 50, height: 75 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump_right.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 15, y: 90 }];
            collisionBox = [{ x: 0, y: 20, width: 60, height: 70 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/stab_right.png"),
                3, 0.15, 3, groundPoints, collisionBox, false);
            attack.effects[2] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/swords/stickswing1.wav");
                castSkill(that.game, that.x + 50, that.y + 47, that.unit, "e0000", 1,
                    undefined, 93, 45, 0.1, false);
            };

            groundPoints = [{ x: 55, y: 120 }];
            groundPoints[2] = { x: 55, y: 150 };
            groundPoints[3] = { x: 55, y: 120 };
            collisionBox = [{ x: 45, y: 45, width: 70, height: 70 }];
            var attack2 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jumpattack_right.png"),
                4, 0.2, 4, groundPoints, collisionBox, false, 5);
            attack2.addEffect(2, function (that) {
                var minus = that.unit.lockedTarget.velocity.x;
                attack2.velocity.x = that.unit.movementspeed * 7 + (minus * 2);
            });
            attack2.addEffect(3, function (that) {
                attack2.velocity.x = 0;
                // SOUND
                that.game.soundPlayer.addToEffect("./sound/effects/swords/swordhitwood.wav", undefined, undefined, 0.4);
                that.game.soundPlayer.addToEffect("./sound/effects/swords/swordslice.wav", undefined, undefined, 0.125);
                castSkill(that.game, that.x + 34, that.y + 13, that.unit, "e0002", 3);

            });

            groundPoints = [{ x: 50, y: 95 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die_right.png"),
                5, 0.1, 5, groundPoints, collisionBox, false, -1);
            die.effects[0] = function (that) {
                that.unit.velocity.x = -that.unit.movementspeed;
                that.unit.velocity.y = -350;
                that.unit.gravity = true
            };
            die.endEffect = function () { this.unit.removeFromWorld = true; };

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["attack2"] = attack2;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
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
            var groundPoints = [{ x: 5, y: 67 }];
            var collisionBox = [{ x: 5, y: 0, width: 40, height: 67 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                4, 0.07, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;


            groundPoints = [{ x: 5, y: 67 }];
            collisionBox = [{ x: 5, y: 0, width: 40, height: 67 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };
            //jump.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 26, y: 80 }];
            collisionBox = [{ x: 26, y: 20, width: 46, height: 60 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                4, 0.05, 8, groundPoints, collisionBox, false);
            var effect = function (that) {
                castSkill(that.game, that.x + 60, that.y + 30, that.unit, "e0005", 0.25);
                var tempRan = Math.random() * 3;
                if (tempRan < 1)
                    that.game.soundPlayer.addToEffect("./sound/effects/swords/whoosh.wav", undefined, undefined, 0.25);
                else if (tempRan < 2)
                    that.game.soundPlayer.addToEffect("./sound/effects/swords/whoosh1.wav", undefined, undefined, 0.25);
                else
                    that.game.soundPlayer.addToEffect("./sound/effects/swords/whoosh3.wav", undefined, undefined, 0.25);
                that.game.soundPlayer.addToEffect("./sound/effects/swords/shuriken1.wav", undefined, undefined, 0.1);
            };
            attack.effects[2] = effect;
            attack.effects[3] = effect;
            attack.effects[4] = effect;
            attack.effects[5] = effect;

            groundPoints = [{ x: 5, y: 67 }];
            collisionBox = [{ x: 5, y: 0, width: 40, height: 67 }];
            var skill = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/skill.png"),
                1, 0.2, 1, groundPoints, collisionBox, false, 10);
            skill.effects[0] = function (that) {
                castSkill(that.game, that.x, that.y, that.unit, 00010, 0);
                that.unit.x = that.unit.x - 100;
                that.unit.velocity.x = -100;
            };
            skill.endEffect = function () {
                this.unit.velocity.x = 0;
            };

            groundPoints = [{ x: 60, y: 108 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                4, 0.1, 4, groundPoints, collisionBox, false, -1);
            die.effects[0] = function (that) { that.unit.velocity.x = -that.unit.movementspeed; };
            die.endEffect = function () { this.unit.removeFromWorld = true; };

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["skill"] = skill;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) that.changeAction("attack");
                        else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            var originGetHit = unit.getHit;
            unit.getHit = function (that, damage) {
                if (skill.checkCooldown()) {
                    that.changeAction("skill");
                } else {
                    originGetHit(that, damage);
                }

            }
            break;

        case "h002":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 20, y: 112 }];
            var collisionBox = [{ x: 12, y: 45, width: 75, height: 75 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                3, 0.1, 6, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 35, y: 112 }];
            collisionBox = [{ x: 12, y: 40, width: 75, height: 75 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 44, y: 114 }];
            collisionBox = [{ x: 25, y: 40, width: 75, height: 75 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                3, 0.2, 6, groundPoints, collisionBox, false);
            attack.effects[3] = function (that) {
                // SOUND
                that.game.soundPlayer.addToEffect("./sound/effects/swords/stab.wav", undefined, undefined, 0.6);
                castSkill(that.game, that.x + 70, that.y + 70, that.unit, "e0000", 1,
                    undefined, 150, 50, 0.4, false);
            };

            groundPoints = [{ x: 80, y: 115 }];
            collisionBox = [{ x: 65, y: 40, width: 75, height: 75 }];
            var attack2 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack2.png"),
                3, 0.2, 6, groundPoints, collisionBox, false);
            attack2.effects[2] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/swords/sweeps.wav");
            };
            attack2.effects[3] = function (that) {
                castSkill(that.game, that.x + 80, that.y + 25, that.unit, "e0000", 1,
                    undefined, 150, 110, 0.4, false);
            };

            groundPoints = [{ x: 85, y: 112 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                6, 0.1, 12, groundPoints, collisionBox, false, -1);
            die.endEffect = function () { this.unit.removeFromWorld = true; };

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["attack2"] = attack2;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) {
                            var ran = Math.random();
                            if (ran > 0.5) that.changeAction("attack");
                            else that.changeAction("attack2");
                        }
                        else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            break;

        case "h003":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 40, y: 113 }];
            var collisionBox = [{ x: 41, y: 42, width: 50, height: 70 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                4, 0.1, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;

            groundPoints = [{ x: 35, y: 113 }];
            collisionBox = [{ x: 30, y: 42, width: 50, height: 70 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 44, y: 118 }];
            collisionBox = [{ x: 33, y: 45, width: 50, height: 70 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                4, 0.1, 8, groundPoints, collisionBox, false);
            attack.effects[2] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/swords/swordclash03.wav");
            };
            attack.effects[3] = function (that) {
                castSkill(that.game, that.x + 70, that.y + 45, that.unit, "e0000", 1,
                    undefined, 55, 75, 0.3, false);
            };

            groundPoints = [{ x: 35, y: 114 }];
            collisionBox = [{ x: 25, y: 45, width: 50, height: 70 }];
            var attack2 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack2.png"),
                7, 0.1, 7, groundPoints, collisionBox, false);
            attack2.effects[2] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/swords/swordclash03-1.wav");
            };
            attack2.effects[3] = function (that) {
                castSkill(that.game, that.x + 65, that.y + 40, that.unit, "e0000", 1,
                    undefined, 65, 80, 0.3, false);
            };

            groundPoints = [{ x: 79, y: 112 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                6, 0.1, 6, groundPoints, collisionBox, false, -1);
            die.endEffect = function () { this.unit.removeFromWorld = true; };

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["attack2"] = attack2;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) {
                            var ran = Math.random();
                            if (ran > 0.5) that.changeAction("attack");
                            else that.changeAction("attack2");
                        }
                        else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            break;

        case "h004":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 36, y: 82 }];
            var collisionBox = [{ x: 27, y: 4, width: 65, height: 79 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                5, 0.1, 5, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;

            groundPoints = [{ x: 29, y: 92 }];
            collisionBox = [{ x: 16, y: 18, width: 65, height: 79 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 100, y: 153 }];
            collisionBox = [{ x: 101, y: 74, width: 65, height: 79 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                6, 0.15, 12, groundPoints, collisionBox, false);
            attack.effects[3] = function (that) {
                castSkill(that.game, that.x + 15, that.y, that.unit, "e0000", 1,
                    undefined, 210, 125, 0.2, true);
            };
            attack.effects[6] = function (that) {
                castSkill(that.game, that.x + 50, that.y + 105, that.unit, "e0000", 1,
                    undefined, 247, 65, 0.3, true);
            };

            groundPoints = [{ x: 22, y: 153 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                4, 0.1, 8, groundPoints, collisionBox, false, -1);
            die.endEffect = function () { this.unit.removeFromWorld = true; };

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) {
                            that.changeAction("attack");
                        }
                        else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            break;

        case "h100":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 32, y: 77 }];
            var collisionBox = [{ x: 26, y: 0, width: 55, height: 75 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                4, 0.08, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 30, y: 76 }];
            collisionBox = [{ x: 30, y: 3, width: 55, height: 75 }];
            var stand = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/stand.png"),
                4, 0.2, 4, groundPoints, collisionBox, true);

            groundPoints = [{ x: 32, y: 77 }];
            collisionBox = [{ x: 26, y: 52, width: 55, height: 75 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 110, y: 204 }];
            collisionBox = [{ x: 115, y: 140, width: 55, height: 75 }];
            collisionBox[7] = { x: 115, y: 120, width: 55, height: 75 };
            collisionBox[9] = { x: 115, y: 140, width: 55, height: 75 };
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack1.png"),
                7, 0.1, 14, groundPoints, collisionBox, false);
            var effect = function (that) {
                castSkill(that.game, that.x + 40, that.y, that.unit, "e0000", 0.25,
                    undefined, 502, 304, 0.1, true);
            };
            var effect2 = function (that) {
                var attach = new AnimatedObject(that.game, AM.getAsset("./img/unit/" + unitcode + "/attack1.png"), that.x, that.y, 7, 0.1, 14, false);
                attach.setStickTo(attack, 0, 0);
                that.game.addEntity(attach);
                // castSkill(that.game, that.x, that.y, that.unit, 'h1000', 0);
            };
            attack.effects[0] = effect2;
            attack.effects[1] = effect;
            attack.effects[2] = effect;
            attack.effects[4] = effect;
            attack.effects[5] = effect;
            attack.effects[6] = effect;
            attack.effects[8] = effect;
            attack.effects[9] = effect;
            attack.effects[10] = effect;


            groundPoints = [{ x: 284, y: 254 }];
            collisionBox = [{ x: 280, y: 190, width: 55, height: 75 }];
            var attack3 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack3.png"),
                13, 0.1, 13, groundPoints, collisionBox, false, 5);
            effect = function (that) {
                castSkill(that.game, that.x, that.y + 105, that.unit, "e0000", 1,
                    undefined, 635, 166, 0.1, true);
            };
            effect2 = function (that) {
                var attach = new AnimatedObject(that.game, AM.getAsset("./img/unit/" + unitcode + "/attack3.png"), that.x, that.y, 13, 0.1, 13, false);
                attach.setStickTo(attack3, 0, 0);
                that.game.addEntity(attach);
                //castSkill(that.game, that.x, that.y, that.unit, 'h1001', 0);
            };
            attack3.effects[0] = effect2;
            attack3.effects[4] = effect;
            attack3.effects[5] = effect;
            attack3.effects[6] = effect;
            attack3.effects[7] = effect;
            attack3.effects[8] = effect;
            attack3.effects[9] = effect;


            groundPoints = [{ x: 102, y: 102 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                7, 0.1, 14, groundPoints, collisionBox, false, -1);
            die.endEffect = function () { this.unit.removeFromWorld = true; };

            unit.actions["walk"] = walk;
            unit.actions["stand"] = stand;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["attack3"] = attack3;
            unit.actions["die"] = die;
            unit.defaultAction = stand;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0) && attack3.checkCooldown()) that.changeAction("attack3");
                        else if (collisedEnemy.has(1)) that.changeAction("attack");
                        else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            break;


        /* ================================= MONSTER =====================================================*/


        case "m000":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 50, y: 105 }];
            var collisionBox = [{ x: 50, y: 20, width: 70, height: 85 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk_left.png"),
                2, 0.13, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 50, y: 105 }];
            collisionBox = [{ x: 50, y: 20, width: 70, height: 85 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump_left.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            collisionBox = [];
            groundPoints = [{ x: 300, y: 109 }];
            collisionBox[0] = { x: 283, y: 25, width: 70, height: 85 };
            collisionBox[4] = { x: 253, y: 25, width: 90, height: 85 };
            collisionBox[5] = { x: 260, y: 25, width: 90, height: 85 };
            collisionBox[6] = { x: 280, y: 25, width: 80, height: 85 };
            collisionBox[7] = { x: 283, y: 25, width: 60, height: 85 };
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack_left.png"),
                8, 0.15, 8, groundPoints, collisionBox, false);
            attack.effects[1] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/charge/chargelasersmall.wav", undefined, undefined, 0.35);
            };
            attack.effects[4] = function (that) {
                castSkill(that.game, that.x + 0, that.y + 50, that.unit, "e0000", 1,
                    undefined, 350, 60, 0.3, true);
                that.game.soundPlayer.addToEffect("./sound/effects/charge/energyshortsword5.wav", undefined, undefined, 0.15);
            };

            groundPoints = [];
            collisionBox = [];
            groundPoints = [{ x: 66, y: 181 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die_left.png"),
                10, 0.1, 10, groundPoints, collisionBox, false, -1);
            // die.effects[0] = function() {this.unit.velocity.x = -this.unit.movementspeed;
            //                                 this.unit.velocity.y = -150};
            die.endEffect = function () { this.unit.removeFromWorld = true };

            //attack.effects[0] = function() {this.unit.velocity.y = -800; this.unit.velocity.x = 200};
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
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

        case "m001":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 35, y: 88 }];
            var collisionBox = [{ x: 7, y: 0, width: 77, height: 88 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                4, 0.13, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 35, y: 88 }];
            collisionBox = [{ x: 7, y: 0, width: 77, height: 88 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };
            // jump.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 55, y: 101 }];
            collisionBox = [{ x: 22, y: 15, width: 100, height: 100 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                5, 0.2, 5, groundPoints, collisionBox, false);
            attack.effects[1] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/swords/woodhit1.wav", undefined, undefined, 0.4);
                castSkill(that.game, that.x, that.y, that.unit, "e0000", 1,
                    undefined, 100, 100, 0.4, false)
            };

            groundPoints = [{ x: 35, y: 88 }];
            collisionBox = [];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                3, 0.1, 6, groundPoints, collisionBox, false, -1);
            die.endEffect = function () { this.unit.removeFromWorld = true };

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
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

        case "m002":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 35, y: 95 }];
            var collisionBox = [{ x: 7, y: 0, width: 77, height: 88 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                4, 0.13, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 35, y: 95 }];
            collisionBox = [{ x: 7, y: 0, width: 77, height: 88 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 55, y: 101 }];
            collisionBox = [{ x: 22, y: 15, width: 100, height: 100 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                5, 0.2, 5, groundPoints, collisionBox, false);
            attack.effects[1] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/swords/swordclash03-2.wav");
                that.game.soundPlayer.addToEffect("./sound/effects/swords/woodhit2.wav", undefined, undefined, 0.2);
                castSkill(that.game, that.x, that.y, that.unit, "e0000", 1,
                    undefined, 100, 100, 0.4, false)
            };

            groundPoints = [{ x: 35, y: 95 }];
            collisionBox = [];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                3, 0.1, 6, groundPoints, collisionBox, false, -1);
            die.endEffect = function () { this.unit.removeFromWorld = true };

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["die"] = die;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
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

        case "m003":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 35, y: 125 }];
            var collisionBox = [{ x: 0, y: 0, width: 125, height: 125 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                4, 0.1, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 20, y: 140 }];
            collisionBox = [{ x: 0, y: 15, width: 125, height: 125 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 80, y: 135 }];
            collisionBox = [{ x: 30, y: 0, width: 120, height: 130 }];
            var skill = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/skill.png"),
                6, 0.2, 12, groundPoints, collisionBox, false, 5);

            var effect = function (that) {
                castSkill(that.game, that.x - 148, that.y - 20, that.unit, "e0000", 1,
                    undefined, 270, 140, 0.6, true, true, function (that, otherUnit) { otherUnit.takePassiveEffect("speed", 0.3) });
                that.game.soundPlayer.addToEffect("./sound/effects/magic/magicsfxshort.wav", undefined, undefined, 0.2);
            };
            skill.effects[4] = effect;

            groundPoints = [{ x: 18, y: 138 }];
            collisionBox = [];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                5, 0.1, 10, groundPoints, collisionBox, false, -1);
            die.endEffect = function () { this.unit.removeFromWorld = true };

            groundPoints = [{ x: 48, y: 132 }];
            collisionBox = [{ x: 0, y: 0, width: 120, height: 130 }];
            var stand = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/stand.png"),
                4, 0.1, 4, groundPoints, collisionBox, false);

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["skill"] = skill;
            unit.actions["die"] = die;
            unit.actions["stand"] = stand;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var ally = that.checkAllyInRange(function (ally) { return ally.passiveEffect && ally.passiveEffect.speed.amount <= 0 });
                        if (ally.has(0) && skill.checkCooldown()) that.changeAction("skill");
                        else {
                            var collisedEnemy = that.checkEnemyInRange();
                            if (collisedEnemy.has(0)) that.changeAction("stand");
                            else that.changeAction("walk");
                        }

                    }
                } else
                    that.changeAction("jump");
            }
            break;

        case "m005":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 16, y: 96 }];
            var collisionBox = [{ x: 9, y: 17, width: 47, height: 80 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                4, 0.13, 4, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;

            groundPoints = [{ x: 16, y: 96 }];
            collisionBox = [{ x: 9, y: 17, width: 47, height: 80 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 46, y: 97 }];
            collisionBox = [{ x: 40, y: 17, width: 47, height: 80 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                3, 0.08, 6, groundPoints, collisionBox, false);
            attack.effects[2] = function (that) {
                castSkill(that.game, that.x + 5, that.y + 5, that.unit, "e0000", 1,
                    undefined, 95, 95, 0.2, false)
            };

            groundPoints = [{ x: 12, y: 170 }];
            collisionBox = [];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                5, 0.1, 10, groundPoints, collisionBox, false, -1);
            die.endEffect = function () { this.unit.removeFromWorld = true };

            groundPoints = [{ x: 16, y: 93 }];
            collisionBox = [{ x: 9, y: 15, width: 47, height: 80 }];
            var stand = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/stand.png"),
                4, 0.1, 4, groundPoints, collisionBox, false);

            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["die"] = die;
            unit.actions["stand"] = stand;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
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
            var groundPoints = [{ x: 0, y: 130 }];
            var collisionBox = [{ x: 10, y: 10, width: 120, height: 120 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                3, 0.18, 6, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 0, y: 130 }];
            collisionBox = [{ x: 10, y: 10, width: 120, height: 120 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.2, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 50, y: 140 }];
            collisionBox = [{ x: 50, y: 20, width: 120, height: 120 }];

            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                4, 0.15, 12, groundPoints, collisionBox, false);

            //Making knock back effect
            attack.effects[4] = function (that) {
                castSkill(that.game, that.x, that.y + 30, that.unit, "e0000", 1,
                    function (unit) { unit.getKnockback(-300); },
                    160, 100, 0.4, true);
                that.game.soundPlayer.addToEffect("./sound/effects/rock/rockfall.wav", undefined, undefined, 0.7);
                that.game.soundPlayer.addToEffect("./sound/effects/rock/thud5.wav", undefined, undefined, 0.48);
            };

            groundPoints = [{ x: 0, y: 130 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                3, 0.1, 9, groundPoints, collisionBox, false, -1);
            die.endEffect = function (that) {
                that.unit.removeFromWorld = true
            };

            groundPoints = [{ x: 0, y: 130 }];
            collisionBox = [{ x: 10, y: 10, width: 120, height: 120 }];
            var stand = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/stand.png"),
                3, 0.2, 6, groundPoints, collisionBox, true);
            stand.effects[0] = function (that) { that.unit.velocity.x = 0 };

            //attack.effects[0] = function() {this.unit.velocity.y = -800; this.unit.velocity.x = 200};
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["die"] = die;
            unit.actions["stand"] = stand;
            unit.defaultAction = walk;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
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

        case "m100":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 50, y: 175 }];
            var collisionBox = [{ x: 30, y: 20, width: 85, height: 141 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                6, 0.15, 12, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;
            // walk.effects[0] = function(that) {that.unit.velocity.x = that.unit.movementspeed;};
            // walk.endEffect = function(that) {that.unit.velocity.x = 0};

            groundPoints = [{ x: 50, y: 175 }];
            collisionBox = [{ x: 46, y: 27, width: 85, height: 140 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.2, 1, groundPoints, collisionBox, true);

            groundPoints = [{ x: 130, y: 175 }];
            collisionBox = [{ x: 115, y: 35, width: 85, height: 141 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                5, 0.15, 15, groundPoints, collisionBox, false);
            attack.effects[1] = function (that) {
                castSkill(that.game, that.x, that.y + 35, that.unit, "e0000", 1,
                    undefined,
                    150, 150, 0.3, true);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/ice1.wav", undefined, 0.8, 0.55);
            };

            groundPoints = [{ x: 130, y: 175 }];
            collisionBox = [{ x: 110, y: 35, width: 85, height: 141 }];
            var attack2 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack2.png"),
                5, 0.15, 15, groundPoints, collisionBox, false);
            attack2.effects[1] = function (that) {
                castSkill(that.game, that.x, that.y + 100, that.unit, "e0000", 1,
                    undefined,
                    150, 75, 0.3, true);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/ice1.wav", undefined, 0.8, 0.55);
            };

            groundPoints = [{ x: 222, y: 235 }];
            collisionBox = [{ x: 205, y: 104, width: 85, height: 141 }];
            var attack3 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack3.png"),
                6, 0.15, 24, groundPoints, collisionBox, false, 10);
            attack3.effects[6] = function (that) {
                castSkill(that.game, that.x + 40, that.y + 100, that.unit, "e0000", 1.5,
                    undefined,
                    215, 418, 0.45, true);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/crackandstress1.wav", undefined, undefined, 0.55);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/ice1.wav", undefined, undefined, 0.55);
            };

            groundPoints = [{ x: 348, y: 247 }];
            collisionBox = [{ x: 325, y: 120, width: 85, height: 141 }];
            var attack4 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack4.png"),
                5, 0.15, 25, groundPoints, collisionBox, false, 20);
            attack4.effects[7] = function (that) {
                castSkill(that.game, that.x + 61, that.y + 31, that.unit, "e0000", 1.5,
                    undefined,
                    363, 218, 0.75, true);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/axestab1.wav", undefined, undefined, 0.65);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/axeimpact.wav", undefined, undefined, 0.75);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/axeconcretehit.wav", undefined, undefined, 0.65);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/crackandstress1.wav", undefined, undefined, 0.55);
            };

            groundPoints = [{ x: 77, y: 164 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                5, 0.1, 5, groundPoints, collisionBox, false, -1);
            die.endEffect = function () {
                this.unit.removeFromWorld = true
            };

            groundPoints = [{ x: 50, y: 175 }];
            collisionBox = [{ x: 30, y: 20, width: 85, height: 140 }];
            var stand = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/stand.png"),
                11, 0.13, 11, groundPoints, collisionBox, true);
            stand.effects[0] = function (that) { that.unit.velocity.x = 0 };

            //attack.effects[0] = function() {this.unit.velocity.y = -800; this.unit.velocity.x = 200};
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["attack2"] = attack2;
            unit.actions["attack3"] = attack3;
            unit.actions["attack4"] = attack4;
            unit.actions["die"] = die;
            unit.actions["stand"] = stand;
            unit.defaultAction = stand;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(0)) {
                            if (attack4.checkCooldown()) {
                                that.changeAction("attack4");
                            } else if (attack3.checkCooldown()) {
                                that.changeAction("attack3");
                            } else {
                                var ran = Math.random();
                                if (ran > 0.5)
                                    that.changeAction("attack");
                                else
                                    that.changeAction("attack2");
                            }

                        } else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            break;

        case "m105":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{ x: 90, y: 210 }];
            var collisionBox = [{ x: 80, y: 0, width: 295, height: 220 }];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/walk.png"),
                3, 0.1, 6, groundPoints, collisionBox, true);
            walk.velocity.x = walk.unit.movementspeed;

            groundPoints = [{ x: 67, y: 210 }];
            collisionBox = [{ x: 60, y: 0, width: 304, height: 209 }];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/jump.png"),
                1, 0.1, 1, groundPoints, collisionBox, true);
            jump.effects[0] = function (that) {
                that.velocity.x = that.unit.velocity.x;
            };

            groundPoints = [{ x: 283, y: 282 }];
            collisionBox = [{ x: 280, y: 76, width: 295, height: 220 }];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack.png"),
                3, 0.1, 6, groundPoints, collisionBox, false);
            attack.effects[0] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/monster/boneneck-1.wav", undefined, undefined, 0.2);
            };
            attack.effects[2] = function (that) {
                castSkill(that.game, that.x + 49, that.y, that.unit, "e0000", 0.5,
                    undefined,
                    392, 292, 0.2, true);
                that.game.soundPlayer.addToEffect("./sound/effects/charge/lightsaberwave.wav", undefined, undefined, 0.2);
            };
            attack.effects[4] = function (that) {
                castSkill(that.game, that.x, that.y + 48, that.unit, "e0000", 0.5,
                    undefined,
                    440, 220, 0.2, true);
                that.game.soundPlayer.addToEffect("./sound/effects/charge/lightsaberwave-1.wav", undefined, undefined, 0.2);
            };

            groundPoints = [{ x: 280, y: 330 }];
            collisionBox = [{ x: 280, y: 120, width: 295, height: 220 }];
            var attack2 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack2.png"),
                5, 0.1, 10, groundPoints, collisionBox, false, 8);

            attack2.effects[1] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/monster/monsterbird.wav");
                that.game.soundPlayer.addToEffect("./sound/effects/monster/monsterbird-1.wav");
            };
            attack2.effects[5] = function (that) {
                castSkill(that.game, that.x, that.y, that.unit, "e0000", 3,
                    undefined,
                    225, 386, 0.3, true)
            };

            groundPoints = [{ x: 463, y: 218 }];
            collisionBox = [{ x: 460, y: 0, width: 295, height: 220 }];
            var attack3 = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/attack3.png"),
                5, 0.1, 10, groundPoints, collisionBox, false, 3);
            attack3.effects[1] = function (that) {
                that.game.soundPlayer.addToEffect("./sound/effects/monster/monster.wav", undefined, undefined, 0.55);
                that.game.soundPlayer.addToEffect("./sound/effects/monster/monster2.wav", undefined, undefined, 0.75);
            };
            attack3.effects[6] = function (that) {
                castSkill(that.game, that.x + 80, that.y + 40, that.unit, "e0000", 0.5,
                    function (enemyUnit) {
                        enemyUnit.takePassiveEffect("poison", 40);
                        enemyUnit.getKnockback(-400);
                    },
                    130, 210, 0.3, true)
            };

            groundPoints = [{ x: 93, y: 237 }];
            var die = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/die.png"),
                5, 0.1, 10, groundPoints, collisionBox, false, -1);
            die.endEffect = function () {
                this.unit.removeFromWorld = true
            };

            groundPoints = [{ x: 64, y: 210 }];
            collisionBox = [{ x: 80, y: 0, width: 295, height: 220 }];
            var stand = new Action(game, unit, AM.getAsset("./img/unit/" + unitcode + "/stand.png"),
                11, 0.13, 11, groundPoints, collisionBox, true);
            stand.effects[0] = function (that) { that.unit.velocity.x = 0 };

            //attack.effects[0] = function() {this.unit.velocity.y = -800; this.unit.velocity.x = 200};
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.actions["attack2"] = attack2;
            unit.actions["attack3"] = attack3;
            unit.actions["die"] = die;
            unit.actions["stand"] = stand;
            unit.defaultAction = stand;
            unit.currentAction = walk;
            unit.actionHandler = function (that) {
                if (!that.gravity) {
                    if (that.currentAction.interruptible || that.currentAction.isDone()) {
                        var collisedEnemy = that.checkEnemyInRange();
                        if (collisedEnemy.has(1) && attack3.checkCooldown()) {
                            this.changeAction("attack3");
                        } else if (collisedEnemy.has(0)) {
                            if (attack2.checkCooldown()) this.changeAction("attack2");
                            else this.changeAction("attack");
                        } else that.changeAction("walk");
                    }
                } else
                    that.changeAction("jump");
            }
            break;

        /* ================================= TOWER =====================================================*/


    }

    if (unit !== undefined) game.addEntity(unit);
    else console.log("Wrong unitcode");
    return unit;
}