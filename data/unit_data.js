/*  Unit code
 * h = human
 * m = monster
 * t = tower
 * 
 */

var unitData = {
    h000: {
        groundWidth: 50,
        groundHeight: 10,
        health: 100,
        movementspeed: 200,
        att: 20,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -90, width: 100, height: 100}, {x: 100, y: -90, width: 150, height: 100}],
    },
    h100: {
        groundWidth: 50,
        groundHeight: 10,
        health: 200,
        movementspeed: 200,
        att: 20,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -200, width: 300, height: 150}, {x: 0, y: -200, width: 370, height: 250}],
    },
    m000: {
        groundWidth: 55,
        groundHeight: 10,
        health: 100,
        movementspeed: -200,
        att: 20,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -50, y: -90, width: 100, height: 100}],
    },
    m010: {
        groundWidth: 120,
        groundHeight: 10,
        health: 300,
        movementspeed: -100,
        att: 40,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -40, y: -120, width: 140, height: 120}],
    }
}