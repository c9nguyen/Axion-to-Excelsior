var mapType = {
  curr:"map1",
  map1: {
    background: "./img/map/01/back.png",
    tileType: 'snowrock',
    enemyList: [
                {code: "m000", ticket: 3},  //spear skeleton
    //            {code: "m001", ticket: 0},  // cub skeleton
                {code: "m002", ticket: 4},  //sword
                {code: "m003", ticket: 1},  //horse
                {code: "m004", ticket: 0},  // horn spear
                {code: "m005", ticket: 2},  //fast
                {code: "m006", ticket: 22},  //mage
                {code: "m007", ticket: 1},  //fish bone
                {code: "m009", ticket: -2}  //yeti

                ],
    enemyGenFrequency: 5,
    energyRate: 0.4,
    numOfCard: 6,

    bossQueue: [
        "m105"
    ],
    mapEffect1: [
        function(gen) {
            return gen.currentBoss.health / gen.currentBoss.data.health < 0.25;
        },
        function(gen) {
            gen.currentBoss.leftG.changeAction("attack3");
            gen.currentBoss.rightG.changeAction("attack3");
            gen.boostSpawnRate(3);
            gen.generateDeck();
            spawnUnit(gen.game, 2400, 500, "m101", ENEMY);
        },
        false
    ],
    mapEffect2: [
        function(gen) {
            return gen.currentBoss.health / gen.currentBoss.data.health < 0.5;
        },
        function(gen) {
            gen.currentBoss.leftG.changeAction("attack3");
            gen.currentBoss.rightG.changeAction("attack3");
            gen.boostSpawnRate(2);
            gen.generateDeck();
            spawnUnit(gen.game, 2400, 500, "m100", ENEMY);
        },
        false
      ],
      mapEffect3: [
          function(gen) {
            return gen.currentBoss.health / gen.currentBoss.data.health < 0.75;
        },
        function(gen) {
            gen.currentBoss.leftG.changeAction("attack3");
            gen.currentBoss.rightG.changeAction("attack3");
            gen.boostSpawnRate(1);
            gen.generateDeck();
        },
        false
      ]
  },
  map1_1: {
      background: "./img/map/01/back.png",
    tileType: 'snowrock',
    enemyList: [
                {code: "m000", ticket: 3},
                {code: "m001", ticket: 4},
                {code: "m002", ticket: 4},
                {code: "m005", ticket: 1},
                {code: "m013", ticket: 0}
                ],
     enemyGenFrequency: 6,
    energyRate: 0.4,
    numOfCard: 6,

    bossQueue: [
        "m100"
    ],
    mapEffect1: [
        function(gen) {
            return gen.currentBoss.health / gen.currentBoss.data.health < 0.50;
        },
        function(gen) {
            gen.currentBoss.leftG.changeAction("attack3");
            gen.currentBoss.rightG.changeAction("attack3");
            gen.boostSpawnRate(1);
            gen.generateDeck();
        },
        false
    ]
  },
  map1_2: {
      background: "./img/map/01/back.png",
    tileType: 'snowrock',
    enemyList: [
                {code: "m000", ticket: 3},
                {code: "m001", ticket: 4},
                {code: "m002", ticket: 4},
                {code: "m003", ticket: 3},
                {code: "m005", ticket: 1},
                {code: "m006", ticket: 0},
                {code: "m013", ticket: -1}
                ],
     enemyGenFrequency: 5,
    energyRate: 0.4,
    numOfCard: 6,

    bossQueue: [
        "m101"
    ],
    mapEffect1: [
        function(gen) {
            return gen.currentBoss.health / gen.currentBoss.data.health < 0.33;
        },
        function(gen) {
            gen.currentBoss.leftG.changeAction("attack3");
            gen.currentBoss.rightG.changeAction("attack3");
            gen.boostSpawnRate(2);
            gen.generateDeck();
            spawnUnit(gen.game, 2400, 500, "m100", ENEMY);
        },
        false
    ],
    mapEffect2: [
        function(gen) {
            return gen.currentBoss.health / gen.currentBoss.data.health < 0.66;
        },
        function(gen) {
            gen.currentBoss.leftG.changeAction("attack3");
            gen.currentBoss.rightG.changeAction("attack3");
            gen.boostSpawnRate(1);
            gen.generateDeck();
            spawnUnit(gen.game, 2400, 500, "m100", ENEMY);
        },
        false
    ]
  },

  //-- DRAGON MAP --//
  map2: {
    background: "./img/map/01/back.png",
    tileType: 'greenGrass',
    enemyList: [
                {code: "m000", ticket: 4},
                {code: "m001", ticket: 8},
                {code: "m002", ticket: 6},
                {code: "m003", ticket: 2},
                {code: "m010", ticket: 1}
                ],
     enemyGenFrequency: 4,
    energyRate: 0.4,
    numOfCard: 6,

    bossQueue: [
        "m105"
    ]
  }
};
//var global = this;
console.log("hello world");;
