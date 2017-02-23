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
        range: [{x: 0, y: -50, width: 130, height: 60}, {x: 250, y: -90, width: 50, height: 100}],
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
    h002: {
        groundWidth: 40,
        groundHeight: 10,
        health: 80,
        movementspeed: 130,
        att: 20,
        def: 0.1,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -20, y: -40, width: 140, height: 50}],
    },
    h100: {
        groundWidth: 50,
        groundHeight: 10,
        health: 1000,
        movementspeed: 130,
        att: 20,
        def: 0.15,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -200, width: 300, height: 250}, {x: 0, y: -200, width: 370, height: 250}],
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
    m001: {
        groundWidth: 50,
        groundHeight: 10,
        health: 70,
        movementspeed: -100,
        att: 20,
        def: 0,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -55, y: -85, width: 75, height: 85}],
    },
    m002: {
        groundWidth: 50,
        groundHeight: 10,
        health: 70,
        movementspeed: -100,
        att: 30,
        def: 0.1,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -55, y: -85, width: 75, height: 85}],
    },
    m003: {
        groundWidth: 75,
        groundHeight: 10,
        health: 80,
        movementspeed: -150,
        att: 30,
        def: 0.1,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -155, y: -300, width: 200, height: 320}],
    },
    m010: {
        groundWidth: 120,
        groundHeight: 10,
        health: 300,
        movementspeed: -80,
        att: 40,
        def: 0,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -40, y: -120, width: 150, height: 120}],
    },
    m100: {
        groundWidth: 70,
        groundHeight: 10,
        health: 2000,
        movementspeed: -70,
        att: 150,
        def: 0.2,
        flying: false,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -100, y: -160, width: 200, height: 180}],
    }
}