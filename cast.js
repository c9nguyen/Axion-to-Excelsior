
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
    var action;
    switch (skillCode) {
        case "e0000": //non animation case, need width and height for collision box
            var collisionBox = [{x: 0, y: 0, width: width, height: height}];
            if (effect !== undefined) action = effect;
            else {
                action = function(that, otherUnit) {
                    var damage = that.percent * that.unit.att;
                    otherUnit.takeDamage(damage);
                    otherUnit.takeEffect(additionalEffect);
                };
            }
            skill = new Effect(game, x, y, unit, nonAnimationSheet,
                                1, durationTime, 1, collisionBox, action, percentAtt, aoe);
            break;
        case "e0001": //stab
            var collisionBox = [{x: 0, y: 0, width: 93, height: 45}];
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e0000/stab.png"),
                                1, 0.1, 1, collisionBox, action, percentAtt, false);
            break;
        case "e0002": //swing
            var collisionBox = [{x: 0, y: 0, width: 164, height: 143}];
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e0000/9.swingP1.2_0.png"),
                                1, 0.1, 1, collisionBox, action, percentAtt, false);
            break;
        case "e0005": //shuriken 1
            var collisionBox = [{x: 0, y: 0, width: 29, height: 29}];
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
                that.removeFromWorld = true;
            };

            var random = Math.floor(Math.random() * 20 - 10);
            skill = new Effect(game, x, y + random, unit, AM.getAsset("./img/effect/e0001/shuriken.png"),
                                2, 0.02, 2, collisionBox, action, percentAtt, false, 100000);

            var direction = unit.data.movementspeed / unit.data.movementspeed;
            skill.velocity.x = 600 * direction;
            random = Math.floor(Math.random() * 80 - 40);
            skill.velocity.y = random;
            skill.hitEffect = function(that) {
                var effect = new AnimatedObject(that.game, AM.getAsset("./img/effect/e0000/shuriken_hit.png"),
                                            that.x, that.y, 4, 0.1, 4, false);
                that.game.addEntity(effect);
            }
            break;
        case "e0010": //dummy
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];

            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/e0002/dummy.png"),
                                10, 0.1, 10, collisionBox, action, percentAtt, false);
            break;

        case "e1001": //wind (player)
            //Play sound
            game.soundPlayer.addToEffect("./sound/effects/spell/wind.mp3", false, 0.5);

            var collisionBox = [{x: 0, y: 0, width: 659, height: 454}];
            collisionBox[14] = [{x: 0, y: 0, width: 0, height: 0}];
            var pullAction = function(that, otherUnit) {
                that.hitList = new Set();
                var dist = otherUnit.x + (otherUnit.width / 2) - x - (collisionBox[0].width / 2)
                otherUnit.push = dist * -2;
            };

            var pushAction = function(that, otherUnit) {
                var dist = otherUnit.x + (otherUnit.width / 2) - x - (collisionBox[0].width / 2);
                otherUnit.push = 1000 - Math.abs(dist);
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

        case "t0000": //main tower first skill
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[7] = {x: 25, y: 140, width: 240, height: 520};
            collisionBox[10] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/tower0/attack_effect.png"),
                                7, 0.1, 14, collisionBox, action, percentAtt, true);
            break;

        case "t0001": //main tower second skill
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            collisionBox[13] = {x: 25, y: 185, width: 485, height: 310};
            collisionBox[25] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/tower0/attack2_effect.png"),
                                7, 0.1, 28, collisionBox, action, percentAtt, true);
            skill.subEffects[14] = function() {skill.hitList = new Set()};
            skill.subEffects[16] = function() {skill.hitList = new Set()};
            skill.subEffects[22] = function() {skill.hitList = new Set()};
            break;
       case "t0002":  //statue
            var collisionBox = [{x: 25, y: 0, width: 110, height: 815}];
            collisionBox[4] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/tower2/attack2_effect.png"),
                                5, 0.1, 5, collisionBox, action, percentAtt, true);
            break;
       case "t0003": //statue
            var collisionBox = [{x: 47, y: 0, width: 35, height: 125}];
            collisionBox[2] = {x: 0, y: 0, width: 0, height: 0};
            action = function(that, otherUnit) {
                var damage = that.percent * that.unit.att;
                otherUnit.takeDamage(damage);
                otherUnit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/tower3/attack_effect.png"),
                                7, 0.1, 7, collisionBox, action, percentAtt, false);
            break;
    }

    if (skill !== undefined) {
        game.addEntity(skill);
        if (positive) skill.setPositive();
    } 

    else console.log("Wrong skillcode");
    return skill;
}