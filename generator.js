Generator = function(game, x, y, side, random = false) {
    Entity.call(this, game, x, y, side);

    this.random = random;
}

Generator.prototype = Object.create(Entity.prototype);
Generator.prototype.constructor = Generator;

Generator.prototype.set

Generator.prototype.update = function() {

}

Generator.prototype.draw = function() {
}