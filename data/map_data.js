var mapType = {
  curr:"map1",
  
  map1: {
    background: "./img/map/01/back.png",
    tileType: 'snowrock',
    enemyList: [
                {code: "m000", ticket: 2},
                {code: "m001", ticket: 4},
                {code: "m002", ticket: 3},
                {code: "m003", ticket: 1},
                {code: "m005", ticket: 1},
                {code: "m006", ticket: 0},
                {code: "m013", ticket: -1}
                ],
     enemyGenFrequency: 5,
     //enemyBoss: EnemyTower,
     unitCards: [{code: "h000", ticket: 4},
                  {code: "h001", ticket: 3},
                  {code: "h002", ticket: 5},
                  {code: "h003", ticket: 5},
                  {code: "h004", ticket: 3},
                  {code: "h005", ticket: 3},
                  {code: "h100", ticket: 1}
                ],

     spellCards:[
                  {code: "e1001", ticket: 2},
                  {code: "e1002", ticket: 2},
                ],
  //  playerBoss: MainTower,
    energyRate: 0.4,
    numOfCard: 6
  },

  map2: {
    background: "./img/map/01/back.png",
    tileType: 'greenGrass',
    enemyList: [{code: "m000", ticket: 4},
                {code: "m001", ticket: 8},
                {code: "m002", ticket: 6},
                {code: "m003", ticket: 2},
                {code: "m010", ticket: 1}],
     enemyGenFrequency: 4,
     //enemyBoss: EnemyTower,
     unitCards: [{code: "h000", ticket: 3},
             {code: "h001", ticket: 2},
             {code: "h002", ticket: 5},
             {code: "h003", ticket: 5},
             {code: "h100", ticket: 1}],
     spellCards:[
                  {code: "e1001", ticket: 1},
                ],
  //  playerBoss: MainTower,
    energyRate: 0.4,
    numOfCard: 6
  }
};
//var global = this;
console.log("hello world");;