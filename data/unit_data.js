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
        range: {x: 0, y: -90, width: 100, height: 100},
    },
    m000: {
        groundWidth: 55,
        groundHeight: 10,
        health: 100,
        movementspeed: -200,
        att: 20,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: {x: -50, y: -90, width: 100, height: 100},
    }
}