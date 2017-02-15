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
        movementspeed: 130,
        att: 20,
        def: 0.1,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -90, width: 100, height: 100}, {x: 100, y: -90, width: 150, height: 100}],
    },
    h001: {
        groundWidth: 35,
        groundHeight: 10,
        health: 60,
        movementspeed: 200,
        att: 5,
        def: 0,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -67, width: 450, height: 100}],
    },
    h100: {
        groundWidth: 50,
        groundHeight: 10,
        health: 2000,
        movementspeed: 130,
        att: 20,
        def: 0.15,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -200, width: 300, height: 150}, {x: 0, y: -200, width: 370, height: 250}],
    },
    m000: {
        groundWidth: 55,
        groundHeight: 10,
        health: 100,
        movementspeed: -100,
        att: 25,
        def: 0,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -50, y: -90, width: 100, height: 100}],
    },
    m010: {
        groundWidth: 120,
        groundHeight: 10,
        health: 3000,
        movementspeed: -80,
        att: 40,
        def: 0,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -40, y: -120, width: 150, height: 120}],
    }
}