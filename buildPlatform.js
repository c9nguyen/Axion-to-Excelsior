function Tile(game, x, y, numOfTile, type) {
    var tileInfo = tileType[type];
    this.tileList = [];
    var groundOffset = 0;
    for (var i = 0; i < numOfTile; i++) {
        this.tileList.push(new NonAnimatedObject(game, tileInfo.topSheet,
                                                    x + groundOffset, y, 
                                                    tileInfo.width, tileInfo.topHeight, 
                                                    tileInfo.topSheetWidth, tileInfo.topFrame, -1));
        this.tileList.push(new NonAnimatedObject(game, tileInfo.midSheet,
                                                    x + groundOffset, y + tileInfo.topHeight,
                                                    tileInfo.width, tileInfo.midHeight, 
                                                    tileInfo.midSheetWidth, tileInfo.midFrame, -1));
        this.tileList.push(new NonAnimatedObject(game,tileInfo.botSheet,
                                                    x + groundOffset, y + tileInfo.topHeight + tileInfo.midHeight,
                                                    tileInfo.width, tileInfo.botHeight, 
                                                    tileInfo.botSheetWidth, tileInfo.botFrame, -1));                                 
        groundOffset += tileInfo.width;
    }
   this.width = numOfTile * tileInfo.width;
   this.height = tileInfo.topHeight;
   game.collisionBox.ground.push(this);
   Entity.call(this, game, x, y);
   this.previous = {x: this.x, y: this.y};
}

Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.update = function() {
    Entity.prototype.update.call(this);
    this.moved = {x: this.x - this.previous.x, y: this.y - this.previous.y}
    if (this.x !== this.previous.x || this.y !== this.previous.y) {
        for (var i in this.tileList) {
            var entity = this.tileList[i];
            entity.x += this.moved.x;
            entity.y += this.moved.y;
        // entity.draw();   somehow not working
        }
        this.previous = {x: this.x, y: this.y};
    }
}

Tile.prototype.draw = function() {
    for (var i in this.tileList) {
        var entity = this.tileList[i];
        entity.draw();
    }
}

