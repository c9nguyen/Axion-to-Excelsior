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
