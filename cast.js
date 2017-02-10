
/**
 * For customized effect
 * width and height: are dimenson of hit box
 * additionalEffect: is the effect after the effect of the skill
 * effect: overwriting the effect of the skill
 */
function castSkill(game, x, y, unit, skillCode,//You mostly need this
                    additionalEffect = function() {}, // little addion
                    width, height, durationTime, percentAtt = 1, effect) {  //this for customized effect
    var skill;
    var nonAnimationSheet = {width: 0, height: 0};
    switch (skillCode) {
        case 00000: //non animation case, need width and height for collision box
            var collisionBox = [{x: 0, y: 0, width: width, height: height}];
            var action;
            if (effect !== undefined) action = effect;
            else {
                action = function(unit) {
                    var damage = percentAtt * this.unit.att;
                    unit.takeDamage(damage);
                    additionalEffect(unit);
                };
            }
            skill = new Effect(game, x, y, unit, nonAnimationSheet,
                                1, durationTime, 1, collisionBox, action, 1, true);
            break;
        case 00001:
            var collisionBox = [{x: 0, y: 0, width: 93, height: 45}];
            var action = function(unit) {
                var damage = this.percent * this.unit.att;
                unit.takeDamage(damage);
                additionalEffect(unit);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/00000/stab.png"),
                                1, 0.05, 1, collisionBox, action, 1);
            break;
       case 10000:
            var collisionBox = [{x: 0, y: 0, width: 280, height: 60}];
            var action = function(unit) {
                var damage = this.percent * this.unit.att;
                unit.takeDamage(damage);
                additionalEffect(unit);
            };
            skill = new Effect(game, x, y, unit, nonAnimationSheet,
                                1, 0.3, 1, collisionBox, action, 1, true);
            break;
    }

    if (skill !== undefined) game.addEntity(skill);
    else console.log("Wrong skillcode");
    return skill;
}