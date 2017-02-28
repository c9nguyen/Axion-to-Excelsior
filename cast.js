
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
        case 00000: //non animation case, need width and height for collision box
            var collisionBox = [{x: 0, y: 0, width: width, height: height}];
            if (effect !== undefined) action = effect;
            else {
                action = function(unit) {
                    var damage = this.percent * this.unit.att;
                    unit.takeDamage(damage);
                    unit.takeEffect(additionalEffect);
                };
            }
            skill = new Effect(game, x, y, unit, nonAnimationSheet,
                                1, durationTime, 1, collisionBox, action, percentAtt, aoe);
            break;
        case 00001: //stab
            var collisionBox = [{x: 0, y: 0, width: 93, height: 45}];
            action = function(unit) {
                var damage = percentAtt * this.unit.att;
                unit.takeDamage(damage);
                unit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/00000/stab.png"),
                                1, 0.1, 1, collisionBox, action, percentAtt, false);
            break;
        case 00002: //swing
            var collisionBox = [{x: 0, y: 0, width: 164, height: 143}];
            action = function(unit) {
                var damage = percentAtt * this.unit.att;
                unit.takeDamage(damage);
                unit.takeEffect(additionalEffect);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/00000/9.swingP1.2_0.png"),
                                1, 0.1, 1, collisionBox, action, percentAtt, false);
            break;
        case 00005: //shuriken 1
            var collisionBox = [{x: 0, y: 0, width: 29, height: 29}];
            action = function(unit) {
                var damage = percentAtt * this.unit.att;
                unit.takeDamage(damage);
                unit.takeEffect(additionalEffect);
                this.removeFromWorld = true;
            };

            var random = Math.floor(Math.random() * 20 - 10);
            skill = new Effect(game, x, y + random, unit, AM.getAsset("./img/effect/00001/shuriken.png"),
                                2, 0.02, 2, collisionBox, action, percentAtt, false, 100000);

            var direction = unit.data.movementspeed / unit.data.movementspeed;
            skill.velocity.x = 600 * direction;
            random = Math.floor(Math.random() * 80 - 40);
            skill.velocity.y = random;
            skill.hitEffect = function(that) {
                var effect = new AnimatedObject(that.game, AM.getAsset("./img/effect/00000/shuriken_hit.png"),
                                            that.x, that.y, 4, 0.1, 4, false);
                that.game.addEntity(effect);
            }
            break;
        case 00010: //dummy
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];

            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/00002/dummy.png"),
                                10, 0.1, 10, collisionBox, action, percentAtt, false);
            break;

       case 'h1000':
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/h100/attack1.png"),
                                7, 0.1, 14, collisionBox, action, percentAtt);
            break;
       case 'h1001':
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/h100/attack3.png"),
                                13, 0.1, 13, collisionBox, action, percentAtt);
            break;
    }

    if (skill !== undefined) {
        game.addEntity(skill);
        if (positive) skill.setPositive();
    } 

    else console.log("Wrong skillcode");
    return skill;
}