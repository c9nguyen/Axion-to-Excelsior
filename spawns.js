/*
 * Temporary unit code h000:
 * h: normal human unit
 * t: tower unit
 * m: monster unit
 */

const STAND = 0;
const JUMP = 1;
const WALK = 2;
const ATTACK = 3;

// const UNIT_0000 = 0;  

function spawnUnit(game, x, y, unitcode, side = NEUTRAL) {
    var unit;
    switch (unitcode) {
        case "h000":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{x: 50, y: 95}];
            var collisionBox = [{x: 40, y: 20, width: 50, height: 75}];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/h000/walk_right.png"),
                                    2, 0.1, 4, groundPoints, collisionBox);
            walk.startEffect = function() {this.unit.velocity.x = this.unit.movementspeed};
            walk.endEffect = function() {this.unit.velocity.x = 0};

            groundPoints = [];
            collisionBox = [];
            groundPoints = [{x: 50, y: 95}];
            collisionBox = [{x: 40, y: 20, width: 50, height: 75}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/h000/jump_right.png"),
                                    1, 0.1, 1, groundPoints, collisionBox);

            groundPoints = [];
            collisionBox = [];                   
            groundPoints = [{x: 15, y: 95}];
            collisionBox = [{x: 20, y: 20, width: 60, height: 70}];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/h000/stab_right.png"),
                                    3, 0.2, 3, groundPoints, collisionBox);
            attack.effects[2] = function(that) {
                castSkill(that.game, that.x + 70, that.y + 47, that.unit, 00000);};
            // attack.addEffect(function() {
            //     console.log(this);
            //     castSkill(this.game, this.x + 70, this.y + 47, this, 00000)}, 2);
           // attack.startEffect = function() {this.unit.velocity.y = -800; this.unit.velocity.x = -200};
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.defaultAction = walk;
            unit.setCollisionReacts(function() { this.changeAction("walk");
                                                this.velocity.x = this.movementspeed; }, 
                                    function() { this.changeAction("jump"); }, 
                                    function() { this.changeAction("attack"); });
            break;
        case "m000":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{x: 50, y: 105}];
            var collisionBox = [{x: 50, y: 20, width: 70, height: 85}];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/m000/walk_left.png"),
                                    2, 0.1, 4, groundPoints, collisionBox);
            walk.startEffect = function() {this.unit.velocity.x = this.unit.movementspeed};
            walk.endEffect = function() {this.unit.velocity.x = 0};
                    
            groundPoints = [];
            collisionBox = [];
            groundPoints = [{x: 50, y: 105}];
            collisionBox = [{x: 50, y: 20, width: 70, height: 85}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/m000/jump_left.png"),
                                    1, 0.1, 1, groundPoints, collisionBox);

            groundPoints = [];
            collisionBox = [];
            groundPoints = [{x: 300, y: 109}];
            collisionBox[0] = {x: 283, y: 25, width: 70, height: 85};
            collisionBox[4] = {x: 253, y: 25, width: 90, height: 85};
            collisionBox[5] = {x: 260, y: 25, width: 90, height: 85};
            collisionBox[6] = {x: 280, y: 25, width: 80, height: 85};
            collisionBox[7] = {x: 283, y: 25, width: 60, height: 85};
            var attack = new Action(game, unit, AM.getAsset("./img/unit/m000/attack_left.png"),
                                    8, 0.15, 8, groundPoints, collisionBox);
            attack.effects[4] = function(that) {
                castSkill(that.game, that.x + 0, that.y + 50, that.unit, 10000);};
            //attack.startEffect = function() {this.unit.velocity.y = -800; this.unit.velocity.x = 200};
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.defaultAction = walk;
            unit.setCollisionReacts(function() { this.changeAction("walk");}, 
                                    function() { this.changeAction("jump");}, 
                                    function() { this.changeAction("attack"); });
            break;
    }

    if (unit !== undefined) game.addEntity(unit);
    else console.log("Wrong unitcode");
    return unit;
}