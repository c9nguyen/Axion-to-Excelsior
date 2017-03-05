/*  Unit code
 * h = human
 * m = monster
 * t = tower
 * 
 */

var unitData = {
    h000: { //samurai
        groundWidth: 50,
        groundHeight: 10,
        energy: 2,
        health: 100,
        movementspeed: 130,
        att: 25,
        def: 0.15,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -50, width: 120, height: 60}, {x: 250, y: -90, width: 50, height: 100}],
    },
    h001: { //ninja
        groundWidth: 35,
        groundHeight: 10,
        energy: 2,
        health: 60,
        movementspeed: 260,
        att: 3,
        def: 0,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -67, width: 350, height: 100}],
    },
    h002: { //spearman
        groundWidth: 40,
        groundHeight: 10,
        energy: 1,
        health: 80,
        movementspeed: 130,
        att: 15,
        def: 0.1,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -20, y: -40, width: 140, height: 50}],
    },
    h003: { //swordman
        groundWidth: 40,
        groundHeight: 10,
        energy: 1,
        health: 80,
        movementspeed: 130,
        att: 25,
        def: 0.1,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -20, y: -77, width: 65, height: 80}],
    },
    h004: { //tanky samurai
        groundWidth: 50,
        groundHeight: 10,
        energy: 1,
        health: 200,
        movementspeed: 120,
        att: 15,
        def: 0.5,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -156, width: 121, height: 170}],
    },
    h005: { //long range slow archer
        groundWidth: 40,
        groundHeight: 10,
        energy: 1,
        health: 80,
        movementspeed: 120,
        att: 10,
        def: 0,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 250, y: -67, width: 400, height: 100}, {x: 0, y: -67, width: 150, height: 100}],
    },
    h100: {
        groundWidth: 50,
        groundHeight: 10,
        energy: 5,
        health: 250,
        movementspeed: 130,
        att: 20,
        def: 0.3,
        flying: false,
        pushResist: 0.2,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: 0, y: -200, width: 200, height: 250}, {x: 0, y: -200, width: 300, height: 250}],
    },
    m000: {
        groundWidth: 55,
        groundHeight: 10,
        health: 70,
        movementspeed: -100,
        att: 25,
        def: 0.25,
        flying: false,
        pushResist: 0,
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
        pushResist: 0,
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
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -55, y: -85, width: 75, height: 85}],
    },
    m003: {
        groundWidth: 85,
        groundHeight: 10,
        health: 80,
        movementspeed: -150,
        att: 0,
        def: 0.1,
        flying: false,
        pushResist: 0.2,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -220, y: -140, width: 280, height: 160}],
    },
    m005: {
        groundWidth: 50,
        groundHeight: 10,
        health: 80,
        movementspeed: -170,
        att: 30,
        def: 0.2,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -37, y: -97, width: 65, height: 110}],
    },
    m006: {
        groundWidth: 40,
        groundHeight: 10,
        health: 80,
        movementspeed: -170,
        att: 10,
        def: 0.2,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -340, y: -100, width: 340, height: 110}],
    },
    m010: {
        groundWidth: 120,
        groundHeight: 10,
        health: 200,
        movementspeed: -80,
        att: 40,
        def: 0.2,
        flying: false,
        pushResist: 0.25,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -40, y: -120, width: 150, height: 120}],
    },
    m012: {
        groundWidth: 40,
        groundHeight: 10,
        health: 60,
        movementspeed: -100,
        att: 20,
        def: 0,
        flying: false,
        pushResist: 0,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -54, y: -80, width: 70, height: 90}],
    },
    m013: {
        groundWidth: 85,
        groundHeight: 10,
        health: 400,
        movementspeed: -90,
        att: 30,
        def: 0,
        flying: false,
        pushResist: 0.25,
        //Attacking with x and y are offset from unit's ground hit box
        range: [{x: -90, y: -120, width: 110, height: 120}],
    },
    m100: { //ice guy boss
        groundWidth: 70,
        groundHeight: 10,
        health: 700,
        movementspeed: -70,
        att: 100,
        def: 0.7,
        flying: false,
        pushResist: 0.5, 
        range: [{x: -120, y: -160, width: 200, height: 180}, {x: -285, y: -200, width: 320, height: 220}],
    },
    m101: { //skeleton mage
        groundWidth: 121,
        groundHeight: 10,
        health: 800,
        movementspeed: -100,
        att: 10,
        def: 0.1,
        flying: false,
        pushResist: 0.3, 
        range: [{x: -300, y: -200, width: 600, height: 200}, {x: -285, y: -200, width: 320, height: 220}],
    },
    m105: { //creepy one
        groundWidth: 300,
        groundHeight: 10,
        health: 1500,
        movementspeed: -180,
        att: 30,
        def: 0.4,
        flying: false,
        pushResist: 0.3,
        range: [{x: -230, y: -250, width: 365, height: 266}, {x: -375, y: -171, width: 60, height: 200}],
    }
}