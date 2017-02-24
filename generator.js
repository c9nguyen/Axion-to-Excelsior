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
    this.bucket = list;

    this.frequency = 1;
    this.counter = 0;
    this.action = function(that) {
        var ran = Math.floor(Math.random() * this.bucket.length);
        var code = this.bucket[ran];
        spawnUnit(this.game, this.x, this.y, code, ENEMY);
    }
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

EnemyGenerator.prototype.update = function() {
    if (this.frequency > 1)
        this.frequency -= 0.01 * this.game.clockTick;
    Generator.prototype.update.call(this);
}



CardGenerator = function(game, x, y, list = []) {
    this.onHand = [];
    this.onHandLocation = [];
    this.onHandCooldown = [0, 0, 0];
    this.onDeck = list;

    Entity.call(this, game, x, y);
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

CardGenerator.prototype.drawCard = function(index) {
    var ran = Math.floor(Math.random() * this.onDeck.length);
    var card = this.onDeck[ran];
    this.onDeck.slice(ran, 1);
    var location = this.onHandLocation[index];
    var newCard = new UnitCard(this.game, card, location.x, location.y, this.x, this.y);
    this.onHand[index] = newCard;
    this.game.addEntity(newCard);
}

CardGenerator.prototype.update = function() {
    var that = this;
    for (var i = 0; i < this.onHand.length; i++) {
        var card = this.onHand[i];
        if (card.removeFromWorld) {
            if (this.onHandCooldown[i] >= 2) {
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

}