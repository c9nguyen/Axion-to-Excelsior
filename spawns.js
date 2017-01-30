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
            var groundPoints = [{x: 50, y: 95},
                                {x: 50, y: 95},
                                {x: 50, y: 95},
                                {x: 50, y: 95}];
            var collisionBox = [{x: 40, y: 20, width: 50, height: 75},
                                {x: 40, y: 20, width: 50, height: 75},
                                {x: 40, y: 20, width: 50, height: 75},
                                {x: 40, y: 20, width: 50, height: 75},];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/h000/walk_right.png"),
                                    2, 0.1, 4, true, groundPoints, collisionBox);
            groundPoints = [{x: 50, y: 95}];
            collisionBox = [{x: 40, y: 20, width: 50, height: 75}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/h000/jump_right.png"),
                                    1, 0.1, 1, true, groundPoints, collisionBox);
            groundPoints = [{x: 15, y: 95},
                                {x: 15, y: 95},
                                {x: 15, y: 95}];
            collisionBox = [{x: 20, y: 20, width: 60, height: 70},
                                {x: 20, y: 20, width: 60, height: 70},
                                {x: 20, y: 20, width: 60, height: 70}];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/h000/stab_right.png"),
                                    3, 0.1, 3, true, groundPoints, collisionBox);
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.setCollisionReacts(function() { this.changeAction("walk");
                                                this.velocity.x = this.movementspeed; }, 
                                    function() { this.changeAction("jump"); }, 
                                    function() { this.changeAction("attack"); });
            break;
        case "m000":
            unit = new Unit(game, x, y, unitcode, side);
            var groundPoints = [{x: 50, y: 105},
                                {x: 50, y: 105},
                                {x: 50, y: 105},
                                {x: 50, y: 105}];
            var collisionBox = [{x: 50, y: 20, width: 70, height: 85},
                                {x: 50, y: 20, width: 70, height: 85},
                                {x: 50, y: 20, width: 70, height: 85},
                                {x: 50, y: 20, width: 70, height: 85},];
            var walk = new Action(game, unit, AM.getAsset("./img/unit/m000/walk_left.png"),
                                    2, 0.1, 4, true, groundPoints, collisionBox);
            groundPoints = [{x: 50, y: 105}];
            collisionBox = [{x: 50, y: 20, width: 70, height: 85}];
            var jump = new Action(game, unit, AM.getAsset("./img/unit/m000/jump_left.png"),
                                    1, 0.1, 1, true, groundPoints, collisionBox);
            groundPoints = [{x: 300, y: 109},
                            {x: 300, y: 109},
                            {x: 300, y: 109},
                            {x: 300, y: 109},
                            {x: 300, y: 109},
                            {x: 300, y: 109},
                            {x: 300, y: 109},
                            {x: 300, y: 109}];
            collisionBox = [{x: 283, y: 25, width: 70, height: 85},
                                {x: 283, y: 25, width: 70, height: 85},
                                {x: 283, y: 25, width: 70, height: 85},
                                {x: 283, y: 25, width: 70, height: 85},
                                {x: 253, y: 25, width: 90, height: 85},
                                {x: 260, y: 25, width: 90, height: 85},
                                {x: 280, y: 25, width: 80, height: 85},
                                {x: 283, y: 25, width: 60, height: 85}];
            var attack = new Action(game, unit, AM.getAsset("./img/unit/m000/attack_left.png"),
                                    8, 0.1, 8, true, groundPoints, collisionBox);
            unit.actions["walk"] = walk;
            unit.actions["jump"] = jump;
            unit.actions["attack"] = attack;
            unit.setCollisionReacts(function() { this.changeAction("walk");
                                                this.velocity.x = this.movementspeed; }, 
                                    function() { this.changeAction("jump"); }, 
                                    function() { this.changeAction("attack"); });
        //     var spritesheet = {
        //         left:[
        //             AM.getAsset("./img/character/warrior/stand_right.png"),
        //             AM.getAsset("./img/character/warrior/jump_right.png"),
        //             AM.getAsset("./img/character/warrior/wak_right.png"),
        //             AM.getAsset("./img/character/warrior/swing_right.png"),
        //         ], 
        //         right:[
        //             AM.getAsset("./img/character/warrior/stand_right.png"),
        //             AM.getAsset("./img/character/warrior/jump_right.png"),
        //             AM.getAsset("./img/character/warrior/walk_right.png"),
        //             AM.getAsset("./img/character/warrior/swing_right.png"),          
        //         ]
        //     };

        //     unit = new Person(game, spritesheet, x, y, 1, side);
        //     unit.setStats(0,200, 0.2);
        //     //console.log(x + " " + y);
        //     unit.setRangeBox(x, y, 100,100);
        //    // unit.move(1);
            
        //     break;
        // case 0001:
        //     unit = new Person(game, -1, x, y, 0.1, 1);
        //     unit.changeStatus(WALK);
        //     unit.setSpeed(200, 1);
        //     unit.yVelocity = Math.floor(Math.random() * -1500);
            break;
    }

    if (unit !== undefined) game.addEntity(unit);
    else console.log("Wrong unitcode");
    return unit;
}