Generator = function(game, x, y, active = true) {
    Entity.call(this, game, x, y);

    this.bucket = [];
    this.active = active;
    this.action = function() {};    //the action that will be generated
    this.condition = function() {return true};  //the condition for the action to generate
    this.conditionPair = []
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

Generator.prototype.update = function() {
    if (this.active && this.condition(this)) this.action(this);
}

Generator.prototype.draw = function() {
}

EnemyGenerator = function(game, x, y, list = []) {
    Generator.call(this, game, x, y);
    this.bucket = [];

    this.frequency = 1;
    this.counter = 0;
    this.action = function(that) {
        var ran = Math.floor(Math.random() * this.bucket.length);
        var code = this.bucket[ran];
        spawnUnit(this.game, this.x, this.y, code, ENEMY);
    }

    var that = this;
    list.map(function(unit) {
        for (var i = 0; i < unit.ticket; i++) that.bucket.push(unit.code);
    });

    this.condition = function(that) {
        if (that.counter >= that.frequency) {
            that.counter = 0;
            return true;
        } else {
            that.counter += that.game.clockTick;
            return false;
        }
    }
}

EnemyGenerator.prototype = Object.create(Generator.prototype);
EnemyGenerator.prototype.constructor = EnemyGenerator;

EnemyGenerator.prototype.setFrequency = function (frequency) {
    this.frequency = frequency;
}

EnemyGenerator.prototype.setEndgame = function (endgame) {
    this.endgame = endgame;
}

EnemyGenerator.prototype.update = function() {
    if (this.active && (this.endgame === undefined || !this.endgame.isGameOver)) {
        if (this.frequency > 1)
            this.frequency -= 0.01 * this.game.clockTick;
        Generator.prototype.update.call(this);
    }
}



CardGenerator = function(game, x, y, list = [], numOfCard) {
    this.onHand = [];
    this.onHandLocation = [];
    this.onHandCooldown = [];
    this.onDeck = [];
    this.cooldown = 3;
    this.numOfCard = numOfCard;
    this.energy = 3;

    Entity.call(this, game, x, y, UI);
    var that = this;
    list.map(function(unit) {
        for (var i = 0; i < unit.ticket; i++) that.onDeck.push(unit.code);
    });

    for (var i = 0; i < numOfCard; i++) {
        this.onHandCooldown[i] = 0;
        this.setLocation(i, {x: 100 + i * 60, y:535});
    }
}


CardGenerator.prototype = Object.create(Entity.prototype);
CardGenerator.prototype.constructor = CardGenerator;

CardGenerator.prototype.start = function() {
     for (var i = 0; i < this.onHandLocation.length; i++) {
        this.drawCard(i);
    }
}

CardGenerator.prototype.setLocation = function(index, location = {x :0, y: 0}) {
    this.onHandLocation[index] = location;
}

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

CardGenerator.prototype.drawCard = function(index) {
    var ran = Math.floor(Math.random() * this.onDeck.length);
    var card = this.onDeck[ran];
    this.onDeck.splice(ran, 1);
    var location = this.onHandLocation[index];
    var newCard = new UnitCard(this, card, location.x, location.y, this.x, this.y);
    this.onHand[index] = newCard;
    this.game.addEntity(newCard);
}

CardGenerator.prototype.update = function() {
    var that = this;
    this.energy = Math.min(this.energy + this.game.clockTick * 0.5, 10);
    for (var i = 0; i < this.numOfCard; i++) {
        var card = this.onHand[i];
        if (card.removeFromWorld) {
            if (this.onHandCooldown[i] >= this.cooldown) {
                var oldCardCode = card.unitcode;
                this.drawCard(i);
                this.onDeck.push(oldCardCode);
                this.onHandCooldown[i] = 0;
            } else {
                this.onHandCooldown[i] += this.game.clockTick;
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
    //var healthBar = {x: this.x, y: this.y, width: this.width * energyPercent, height: height};
    ctx.fillStyle = 'red';
    ctx.fillRect(x, 535, energyBarWidth, height);
    ctx.fillStyle = 'green';
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