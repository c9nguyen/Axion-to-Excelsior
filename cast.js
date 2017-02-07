function castSkill(game, x, y, unit, skillCode) {
    var skill;
    var nonAnimationSheet = {width: 0, height: 0};
    switch (skillCode) {
        case 00000:
            var collisionBox = [{x: 0, y: 0, width: 73, height: 45}];
            var action = function(unit) {
                var damage = this.percent * this.unit.att;
                unit.takeDamage(damage);
            };
            skill = new Effect(game, x, y, unit, AM.getAsset("./img/effect/00000/stab.png"),
                                1, 0.1, 1, collisionBox, action, 1);
            break;
       case 10000:
            var collisionBox = [{x: 0, y: 0, width: 260, height: 60}];
            var action = function(unit) {
                var damage = this.percent * this.unit.att;
                unit.takeDamage(damage);
            };
            skill = new Effect(game, x, y, unit, nonAnimationSheet,
                                1, 0.3, 1, collisionBox, action, 1, true);
            break;
    }

    if (skill !== undefined) game.addEntity(skill);
    else console.log("Wrong skillcode");
    return skill;
}