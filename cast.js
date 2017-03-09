
/**
 * For customized effect
 * width and height: are dimenson of hit box
 * additionalEffect: is the effect after the effect of the skill
 * effect: overwriting the effect of the skill
 */
function castSkill(game, x, y, unit, skillCode, percentAtt = 1,//You mostly need this
                    additionalEffect = function() {}, // little addion
                    width, height, durationTime, aoe, positive = false, effect) {  //this for customized effect
    var skill;
    var nonAnimationSheet = {width: 0, height: 0};
    var action = function(that, otherUnit) {
        var damage = that.percent * that.unit.att;
        otherUnit.takeDamage(damage);
        otherUnit.takeEffect(additionalEffect);
    };
    switch (skillCode) {
        case "e0000": //non animation case, need width and height for collision box
            var collisionBox = [{x: 0, y: 0, width: width, height: height}];
            if (effect !== undefined) action = effect;

            skill = new Effect(game, x, y, unit, nonAnimationSheet,
                                1, durationTime, 1, collisionBox, action, percentAtt, aoe);
            break;
        case "e0001": //stab
            var collisionBox = [{x: 0, y: 0, width: 93, height: 45}];
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e0000/stab.png"),
                                1, 0.1, 1, collisionBox, action, percentAtt, false);
            break;
        case "e0002": //swing
            var collisionBox = [{x: 0, y: 0, width: 164, height: 143}];

            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e0000/9.swingP1.2_0.png"),
                                1, 0.1, 1, collisionBox, action, percentAtt, false);
            break;
        case "e0005": //shuriken 1
            var collisionBox = [{x: 0, y: 0, width: 29, height: 29}];
            var hitAction = function(that, otherUnit) {
                action(that, otherUnit);
                that.removeFromWorld = true;
            };

            var random = Math.floor(Math.random() * 20 - 10);
            skill = new Effect(game, x, y + random, unit, AM.getAsset("./img/effect/e0001/shuriken.png"),
                                2, 0.02, 2, collisionBox, hitAction, percentAtt, false, 100000);

            var direction = unit.data.movementspeed / unit.data.movementspeed;
            skill.velocity.x = 600 * direction;
            random = Math.floor(Math.random() * 80 - 40);
            skill.velocity.y = random;
            skill.hitEffect = function(that) {
                var effect = new AnimatedObject(that.game, AM.getAsset("./img/effect/e0000/shuriken_hit.png"),
                                            that.x + 29, that.y, 4, 0.1, 4, false);
                that.game.addEntity(effect);
            }
            break;
        case "e0010": //dummy
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];

            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e0002/dummy.png"),
                                10, 0.1, 10, collisionBox, undefined, percentAtt, false);
            break;

        case "e0011": //green arrow
            var collisionBox = [{x: 0, y: 0, width: 105, height: 35}];
            action = function(that, otherUnit) {
                //crit chance
                var damage = Math.random() > 0.75 ? that.percent * that.unit.att : that.percent * that.unit.att * 1.5;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
                that.removeFromWorld = true;
            };

            var random = Math.floor(Math.random() * 20 - 10);
            skill = new Effect(game, x, y + random, unit, AM.getAsset("./img/effect/e0003/ball.png"),
                                3, 0.05, 3, collisionBox, action, percentAtt, false, 100000);

            var direction = unit.data.movementspeed / unit.data.movementspeed;
            skill.velocity.x = 800 * direction;
            skill.hitEffect = function(that) {
                var effect = new AnimatedObject(that.game, AM.getAsset("./img/effect/e0003/hit.png"),
                                            that.x + 50, that.y - 42, 4, 0.1, 4, false);
                that.game.addEntity(effect);
            }
            break;

        case "e0012": //m006 attack effect
            var collisionBox = [{x: 32, y: 136, width: 85, height: 70}];

            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/m006/attack_effect.png"),
                                7, 0.1, 7, collisionBox, action, percentAtt, false);

            break;

        case "e0013": //Lighting
            var getSprite = function() {
                var ran = Math.floor(Math.random() * 4 + 1);
                return AM.getAsset("./img/unit/m101/attack_effect" + ran + ".png");
            };

            var collisionBox = [{x: 29, y: 39, width: 125, height: 76}];

            skill = new Effect(game, x, y, unit, getSprite(),
                                7, 0.1, 7, collisionBox, action, percentAtt, true, 5);
            skill.endEffect = function(that) {that.spritesheet = getSprite();}
            break;

        case "e0014": //s000 attack effect
            var collisionBox = [{x: 28, y: 36, width: 136, height: 176}];
            collisionBox[5] = {x: 0, y: 0, width: 0, height: 0};
            var slowEffect = function(that) {
                that.takePassiveEffect("speed", -0.3);
            };
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(slowEffect);
            };

            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/s000/attack_effect.png"),
                                8, 0.1, 8, collisionBox, action, percentAtt, true);
            break;

        case "e1001": //wind (player)
            //Play sound
            game.soundPlayer.addToEffect("./sound/effects/spell/wind.mp3", false, 0.5);

            var collisionBox = [{x: 0, y: 0, width: 659, height: 454}];
            collisionBox[14] = {x: 0, y: 0, width: 0, height: 0};
            var pullAction = function(that, otherUnit) {
                that.hitList = new Set();
                var dist = otherUnit.x + (otherUnit.width / 2) - x - (collisionBox[0].width / 2);
                otherUnit.getKnockback(dist * -2);
            };

            var pushAction = function(that, otherUnit) {
                var dist = otherUnit.x + (otherUnit.width / 2) - x - (collisionBox[0].width / 2);
                otherUnit.getKnockback(1000 - Math.abs(dist));
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
            };


            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1001/effect.png"),
                                4, 0.1, 16, collisionBox, pullAction, percentAtt, true);
            var reset = false;
            skill.subEffects[8] = function() {
                if (!reset) {
                    skill.hitList = new Set();
                    reset = true;
                }
                
                skill.collisingAction = pushAction;
            };
            break;


        case "e1002": //meteor shower (player)
            //Play sound
            
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            var center = x + 115;
            var meteors = [
                {x: 148, y: 163, percent: 1.5, num: 0},   //0
                {x: 195, y: 220, percent: 1.5, num: 1},   //1
                {x: 253, y: 290, percent: 1.5, num: 2},   //2
                {x: 227, y: 330, percent: 1.5, num: 3},   //3
                {x: 347, y: 410, percent: 1.5, num: 4},   //4
                {x: 347, y: 405, percent: 2, num: 5},   //5
                {x: 375, y: 460, percent: 1.5, num: 6},   //6
                {x: 486, y: 570, percent: 1.5, num: 7},   //7
                {x: 632, y: 770, percent: 1.5, num: 8},   //8
            ];

            var list = (function() {

            })
            
            var castMeteor = function(index, offset) {
                var meteor = meteors[index];
                castSkill(game, center - meteor.x + offset, groundLevel - meteor.y, unit, "e1002_" + meteor.num, meteor.percent);
                meteors.splice(index, 1);
            };
          
            var castRandomMeteor = function() {
                //first meteor
                var ran = Math.floor(Math.random() * meteors.length);  //random meteor
                var ran2 = Math.floor(Math.random() * (800) - 400); //random distance
                castMeteor(ran, ran2);

            }

            action = function(that, otherUnit) {};
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/effect.png"),
                                5, 0.1, 25, collisionBox, action, percentAtt, true);
            skill.subEffects[3] = function(that) {
                castMeteor(5, 0);
                castRandomMeteor();
            };
            for (var i = 4; i < 17; i += 2) {
                skill.subEffects[i] = function(that) { castRandomMeteor();};

            }

            break;

        case "e1002_0": //meteor shower tile 0til (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[14] = {x: 100, y: 84, width: 100, height: 90};
            collisionBox[19] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                11, 0.05, 22, collisionBox, action, percentAtt, true);
            skill.setFrameSize(239, 177);
            break;

        case "e1002_1": //meteor shower tile 1 (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[14] = {x: 146, y: 130, width: 106, height: 110};
            collisionBox[19] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                11, 0.05, 22, collisionBox, action, percentAtt, true);
            skill.setFrameSize(299, 236);
            skill.setSpritesheetOffset(0, 354);
            break;

        case "e1002_2": //meteor shower tile 2 (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[14] = {x: 183, y: 127, width: 151, height: 177};
            collisionBox[20] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                11, 0.05, 22, collisionBox, action, percentAtt, true);
            skill.setFrameSize(394, 306);
            skill.setSpritesheetOffset(0, 826);
            break;

        case "e1002_3": //meteor shower tile 3 (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[16] = {x: 228, y: 257, width: 97, height: 80};
            collisionBox[21] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                11, 0.05, 22, collisionBox, action, percentAtt, true);
            skill.setFrameSize(367, 340);
            skill.setSpritesheetOffset(0, 1438);
            break;

        case "e1002_4": //meteor shower tile 4 (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[16] = {x: 292, y: 315, width: 115, height: 112};
            collisionBox[21] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                11, 0.05, 22, collisionBox, action, percentAtt, true);
            skill.setFrameSize(451, 423);
            skill.setSpritesheetOffset(0, 2118);
            break;

        case "e1002_5": //meteor shower tile 5 (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[15] = {x: 284, y: 250, width: 126, height: 170};
            collisionBox[16] = {x: 250, y: 240, width: 198, height: 180};
            collisionBox[20] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                11, 0.05, 22, collisionBox, action, percentAtt, true);
            skill.setFrameSize(490, 421);
            skill.setSpritesheetOffset(0, 2964);
            break;

        case "e1002_6": //meteor shower tile 6 (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[17] = {x: 331, y: 388, width: 86, height: 82};
            collisionBox[22] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                5, 0.05, 25, collisionBox, action, percentAtt, true);
            skill.setFrameSize(465, 469);
            skill.setSpritesheetOffset(0, 3806);
            break;

        case "e1002_7": //meteor shower tile 7 (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[17] = {x: 409, y: 492, width: 142, height: 109};
            collisionBox[22] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                5, 0.05, 25, collisionBox, action, percentAtt, true);
            skill.setFrameSize(586, 599);
            skill.setSpritesheetOffset(0, 6151);
            break;

        case "e1002_8": //meteor shower tile 8 (player)
            //Play sound

            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[17] = {x: 560, y: 632, width: 157, height: 161};
            collisionBox[22] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                if (otherUnit.constructor.name === "EnemyTower") {
                    damage /= 4;
                }
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e1002/tile_all.png"),
                                5, 0.05, 25, collisionBox, action, percentAtt, true);
            skill.setFrameSize(771, 797);
            skill.setSpritesheetOffset(2930, 3806);
            break;

        case "t0000": //main tower first skill
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[7] = {x: 25, y: 140, width: 240, height: 520};
            collisionBox[10] = {x: 0, y: 0, width: 0, height: 0};
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/tower0/attack_effect.png"),
                                7, 0.1, 14, collisionBox, action, percentAtt, true);
            break;

        case "t0001": //main tower second skill
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[13] = {x: 25, y: 185, width: 485, height: 310};
            collisionBox[25] = {x: 0, y: 0, width: 0, height: 0};
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/tower0/attack2_effect.png"),
                                7, 0.1, 28, collisionBox, action, percentAtt, true);
            skill.subEffects[14] = function() {skill.hitList = new Set()};
            skill.subEffects[16] = function() {skill.hitList = new Set()};
            skill.subEffects[22] = function() {skill.hitList = new Set()};
            break;
       case "t0002":  //statue
            var collisionBox = [{x: 25, y: 0, width: 110, height: 815}];
            collisionBox[4] = {x: 0, y: 0, width: 0, height: 0};
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/tower2/attack2_effect.png"),
                                5, 0.1, 5, collisionBox, action, percentAtt, true);
            break;
       case "t0003": //statue
            var collisionBox = [{x: 47, y: 0, width: 35, height: 125}];
            collisionBox[2] = {x: 0, y: 0, width: 0, height: 0};
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/tower3/attack_effect.png"),
                                7, 0.1, 7, collisionBox, action, percentAtt, false);
            break;
    }

    if (skill !== undefined) {
        game.addEntity(skill);
        if (positive) skill.setPositive();
    } 

    else console.log("Wrong skillcode" + skillCode);
    return skill;
}