
/**
 * For customized effect
 * width and height: are dimenson of hit box
 * additionalEffect: is the effect after the effect of the skill
 * effect: overwriting the effect of the skill
 */
function castSkill(game, x, y, unit, skillCode, percentAtt = 1,//You mostly need this
                    additionalEffect = function() {}, // little addion
                    width, height, durationTime, aoe, effect) {  //this for customized effect
    var skill;
    var nonAnimationSheet = {width: 0, height: 0};
    switch (skillCode) {
        case 00000: //non animation case, need width and height for collision box
            var collisionBox = [{x: 0, y: 0, width: width, height: height}];
            var action;
            if (effect !== undefined) action = effect;
            else {
                action = function(unit) {
                    var damage = this.percent * this.unit.att;
                    unit.takeDamage(damage);
                    additionalEffect(unit);
                };
            }
            skill = new Effect(game, x, y, unit, nonAnimationSheet,
                                1, durationTime, 1, collisionBox, action, percentAtt, aoe);
            break;
        case 00001: //stab
            var collisionBox = [{x: 0, y: 0, width: 93, height: 45}];
            var action = function(unit) {
                var damage = percentAtt * this.unit.att;
                unit.takeDamage(damage);
                additionalEffect(unit);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/00000/stab.png"),
                                1, 0.1, 1, collisionBox, action, percentAtt, false);
            break;
        case 00002: //swing
            var collisionBox = [{x: 0, y: 0, width: 164, height: 143}];
            var action = function(unit) {
                var damage = percentAtt * this.unit.att;
                unit.takeDamage(damage);
                additionalEffect(unit);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/00000/9.swingP1.2_0.png"),
                                1, 0.1, 1, collisionBox, action, percentAtt, false);
            break;
        case 00005: //shuriken 1
            var collisionBox = [{x: 0, y: 0, width: 29, height: 29}];
            var action = function(unit) {
                var damage = percentAtt * this.unit.att;
                unit.takeDamage(damage);
                additionalEffect(unit);
                this.removeFromWorld = true;
            };

            var random = Math.floor(Math.random() * 20 - 10);
            console.log(random);

            skill = new Effect(game, x, y + random, unit, AM.getAsset("./img/effect/00001/shuriken.png"),
                                2, 0.02, 2, collisionBox, action, percentAtt, false, 100000);

            var direction = unit.data.movementspeed / unit.data.movementspeed;
            skill.velocity.x = 600 * direction;
            random = Math.floor(Math.random() * 80 - 40);
            skill.velocity.y = random;
            break;
       case 'h1000':
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            var action = function(unit) {};
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/h100/attack1.png"),
                                7, 0.1, 14, collisionBox, action, percentAtt);
            break;
       case 'h1001':
            var collisionBox = [{x: 0, y: 0, width: 0, height: 0}];
            var action = function(unit) {};
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/unit/h100/attack3.png"),
                                13, 0.1, 13, collisionBox, action, percentAtt);
            break;
    }

    if (skill !== undefined) {
        game.addEntity(skill);
        skill.update();
    } 
    else console.log("Wrong skillcode");
    return skill;
}