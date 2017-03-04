Generator = function(game, x, y, active = true) {
    Entity.call(this, game, x, y);

    this.bucket = [];
    this.active = active;
    this.action = function() {};    //the action that will be generated
    this.condition = function() {return true};  //the condition for the action to generate
    this.conditionAndAction = [];
}

Generator.prototype = Object.create(Entity.prototype);
Generator.prototype.constructor = Generator;

Generator.prototype.activate = function() {
    this.active = true;
}

Generator.prototype.deactivate = function() {
    this.active = false;
}

Generator.prototype.switch = function() {
    this.active = !this.active;
}

//Add an element to the bucket
Generator.prototype.add = function(e) {
    this.bucket = e;
}

Generator.prototype.setCondition = function(callback) {
    this.condition = callback;
}

Generator.prototype.setAction = function(callback) {
    this.action = callback;
}

Generator.prototype.setFrequency = function (frequency) {
    this.frequency = frequency;
}

/**
 * Set the current boss
 */
Generator.prototype.assignCurrentBoss = function(unit) {
    this.currentBoss = unit;
}

/**
 * Assign the action happens when all boss dies
 */
Generator.prototype.setBossesDiedAction = function(callback) {
    this.allBossDied = callback;
}

/**
 * Add a condition and action pair
 */
Generator.prototype.addConditionAndAction = function(theCondition, theAction, theRepeat = false) {
    this.conditionAndAction.push({condition: theCondition, action: theAction, repeat: theRepeat});
}

Generator.prototype.update = function() {
    if (this.active && this.condition(this)) this.action(this);
}

Generator.prototype.draw = function() {
}

/* ================================================================================================= */

EnemyGenerator = function(game, x, y, list = []) {
    Generator.call(this, game, x, y);
    this.bucket = [];
    this.list = list;
    this.bossQueue = [];

    this.frequency = 1;
    this.impFrequency = 20;
    this.counter = 0;
    this.extra = this.game.clockTick;
    this.extraCounter = 0
    this.impCounter = 0;
    this.action = function(that) {
        var ran = Math.floor(Math.random() * this.bucket.length);
        var code = this.bucket[ran];
        spawnUnit(this.game, this.x, this.y, code, ENEMY);
    }

    var that = this;
    this.list.map(function(unit) {
        for (var i = 0; i < unit.ticket; i++) that.bucket.push(unit.code);
    });

    this.condition = function(that) {
        
        if (that.counter >= that.frequency) {
            that.counter = 0;
            if (that.extraCounter === 20) { 
                that.extra = that.game.clockTick;
                that.extraCounter = 0;
            }
            else {
                that.extra += 0.01 * that.game.clockTick;
                that.extraCounter++;
            } 
            return true;
        } else {
            that.counter += that.game.clockTick + that.extra;
            return false;
        }
    }
}

EnemyGenerator.prototype = Object.create(Generator.prototype);
EnemyGenerator.prototype.constructor = EnemyGenerator;


/**
 * Generate the deck base on the ticket list
 */
EnemyGenerator.prototype.generateDeck = function() {
    var that = this;
    this.list.map(function(unit) {
        for (var i = 0; i < unit.ticket; i++) that.bucket.push(unit.code);
    });
}

EnemyGenerator.prototype.setFrequency = function (frequency) {
    this.frequency = frequency;
}

EnemyGenerator.prototype.setImprovementFrequency = function(frequency) {
    this.impFrequency = frequency;
}

EnemyGenerator.prototype.setEndgame = function (endgame) {
    this.endgame = endgame;
}

EnemyGenerator.prototype.addToBossQueue = function(unitCode) {
    this.bossQueue.push(unitCode);
}

/**
 * Boost spawn rate of all unit
 */
EnemyGenerator.prototype.boostSpawnRate = function(rate = 1) {
    this.list.map(function(unit) {
        unit.ticket += rate;
    });
}



// /**
//  * Set the current boss
//  */
// EnemyGenerator.prototype.assignCurrentBoss = function(unit) {
//     this.currentBoss = unit;
// }

// /**
//  * Assign the action happens when all boss dies
//  */
// EnemyGenerator.prototype.setBossesDiedAction = function(callback) {
//     this.allBossDied = callback;
// }

EnemyGenerator.prototype.draw = function() {
    var x = 700;
    var y = 10;
    var width = 400;
    var height = 20;
    var fill = 0;
    if (this.currentBoss) {
        fill = this.currentBoss.health / this.currentBoss.data.health;
        fill = Math.max(fill * width, 0);
    }

    var ctx = this.game.ctx;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "yellow";
    ctx.fillRect(x, y, fill, height);
    ctx.strokeStyle = 'black';
    ctx.rect(x, y, width, height);
    ctx.fillStyle = 'black';
    ctx.stroke();
}



EnemyGenerator.prototype.update = function() {

        if (this.currentBoss.health <= 0) {
            if (this.bossQueue.length > 0) {
                var newBoss = spawnUnit(this.game, 2400, 500, this.bossQueue[0], ENEMY);
                this.assignCurrentBoss(newBoss);
                this.bossQueue.splice(0, 1);
                this.boostSpawnRate();
                if(this.bossQueue.length === 0){
                    this.active = false;
                    this.game.soundPlayer.removeAllSound();
                    this.game.soundPlayer.randomTrackInQueue = true;
                    this.game.soundPlayer.addToQueue("./sound/music/battle/KH-squirming-evil.mp3");
                }
            } else {
                this.allBossDied(true);
                this.removeFromWorld = true;
            }
        }
    if (this.active) {
            for (var i = 0; i < this.conditionAndAction.length; i++) {
                var pair = this.conditionAndAction[i];
                if (pair.condition()) {
                    pair.action();
                    if (!pair.repeat) this.conditionAndAction.splice(i, 1);
                } 
            }
            if (this.frequency > 1){
                if(this.frequency > 3){
                    this.frequency -= 0.02 * this.game.clockTick;
                } else if (this.frequency > 2){
                    this.frequency -= 0.01 * this.game.clockTick;
                } else {
                    this.frequency -= 0.005 * this.game.clockTick;
                }
            }

            if (this.impCounter >= this.impFrequency) {
                this.impCounter = 0;
               // this.boostSpawnRate();
                this.generateDeck();
            } else {
                this.impCounter += this.game.clockTick;
            }
            Generator.prototype.update.call(this);
    }
}



/* ================================================================================================= */

CardGenerator = function(game, x, y, numOfCard, unitList = [], spellList = []) {
    this.onHand = [];
    this.onHandLocation = [];
    this.onHandCooldown = [];
    this.onDeck = [];
    this.cooldown = 2;
    this.numOfCard = numOfCard;
    this.energy = 3;
    this.energyRate = 0.5;
    this.conditionAndAction = [];

    Entity.call(this, game, x, y, UI);
    var that = this;
    unitList.map(function(unit) {
        for (var i = 0; i < unit.ticket; i++) that.onDeck.push({code: unit.code, type: "unit"});
    });

    spellList.map(function(unit) {
        for (var i = 0; i < unit.ticket; i++) that.onDeck.push({code: unit.code, type: "effect"});
    });

    for (var i = 0; i < numOfCard; i++) {
        this.onHandCooldown[i] = 0;
        this.setLocation(i, {x: 100 + i * 60, y:535});
    }
}


CardGenerator.prototype = Object.create(Entity.prototype);
CardGenerator.prototype.constructor = CardGenerator;

/**
 * Start drawing cards
 */
CardGenerator.prototype.start = function() {
     for (var i = 0; i < this.onHandLocation.length; i++) {
        this.drawCard(i);
    }
}

/**
 * Set location of spawning unit
 */
CardGenerator.prototype.setLocation = function(index, location = {x :0, y: 0}) {
    this.onHandLocation[index] = location;
}

CardGenerator.prototype.setCooldown = function(cooldown) {
    this.cooldown = cooldown;
}

// /**
//  * Generate the deck base on the ticket list
//  */
// CardGenerator.prototype.generateDeck = function(cooldown) {
//     this.cooldown = cooldown;
// }

/**
 * Set cooldown of drawing card
 */
CardGenerator.prototype.setCooldown = function(cooldown) {
    this.cooldown = cooldown;
}

CardGenerator.prototype.checkEnergy = function(energy) {
    return this.energy >= energy;
}

CardGenerator.prototype.useEnergy = function(energy) {
    this.energy -= energy;
    this.energy = Math.max(this.energy, 0);
}

CardGenerator.prototype.useEnergy = function(energy) {
    this.energy -= energy;
    this.energy = Math.max(this.energy, 0);
}

CardGenerator.prototype.setEnergyRate = function(rate) {
    this.energyRate = rate;
}

CardGenerator.prototype.removeAll = function() {
    this.onHand.map(function(card) {
        card.removeFromWorld = true;
    });
}

CardGenerator.prototype.drawCard = function(index) {
    var ran = Math.floor(Math.random() * this.onDeck.length);
    var card = this.onDeck[ran];
    this.onDeck.splice(ran, 1);
    var location = this.onHandLocation[index];
    var newCard = new UnitCard(this, card.code, card.type,  location.x, location.y, this.x, this.y, index);
    this.onHand[index] = newCard;
    this.game.addEntity(newCard);
}

/**
 * Set the current boss
 */
CardGenerator.prototype.assignCurrentBoss = function(unit) {
    this.currentBoss = unit;
}

/**
 * Assign the action happens when all boss dies
 */
CardGenerator.prototype.setBossesDiedAction = function(callback) {
    this.allBossDied = callback;
}

/**
 * Add a condition and action pair
 */
CardGenerator.prototype.addConditionAndAction = function(theCondition, theAction, theRepeat = false) {
    this.conditionAndAction.push({condition: theCondition, action: theAction, repeat: theRepeat});
}


CardGenerator.prototype.update = function() {
    if (this.currentBoss.health <= 0) {
        this.removeAll();
        this.allBossDied(false);
        this.removeFromWorld = true;
    } else {
        for (var i = 0; i < this.conditionAndAction.length; i++) {
            var pair = this.conditionAndAction[i];
            if (pair.condition()) {
                pair.action();
                if (!pair.repeat) this.conditionAndAction.splice(i, 1);
            } 
        }
        var that = this;
        this.energy = Math.min(this.energy + this.game.clockTick * this.energyRate, 10);
        for (var i = 0; i < this.numOfCard; i++) {
            var card = this.onHand[i];
            if (card.removeFromWorld) {
                if (this.onHandCooldown[i] >= this.cooldown) {
                    var oldCardCode = {code:card.unitcode, type: card.type};
                    this.drawCard(i);
                    this.onDeck.push(oldCardCode);
                    this.onHandCooldown[i] = 0;
                } else {
                    this.onHandCooldown[i] += this.game.clockTick;
                }
            }
        }
    }
}

CardGenerator.prototype.draw = function() {
    var x = this.numOfCard * 60 + 100;
        var ctx = this.game.ctx;
    var energyPercent = this.energy / 10;
    var energyBarWidth = 200;
    energyPercent = Math.max(energyPercent, 0);
    var height = 20;

    //enerygy bar
    ctx.fillStyle = 'red';
    ctx.fillRect(x, 535, energyBarWidth, height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, 535, energyBarWidth * energyPercent, height);
    ctx.strokeStyle = 'black';
    ctx.rect(x, 535, energyBarWidth, height);
    for (var i = 0; i < 9; i++) {
        ctx.strokeStyle = 'black';
        ctx.rect(x + i * (energyBarWidth/10), 535, energyBarWidth / 10, height);
    }

    ctx.stroke();
    ctx.fillStyle = 'black';
}