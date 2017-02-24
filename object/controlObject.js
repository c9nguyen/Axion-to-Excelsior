function Button(game, spritesheet, x, y, scale = 1) {
    this.NORMAL = 0;
    this.PRESS = 1;
    this.MOUSEOVER = 2;

    Entity.call(this, game, x, y);
    this.movable = false;

    this.status = this.NORMAL;
    var animatedObject = new NonAnimatedObject(game, spritesheet, x, y);
    animatedObject.movable = false;
    this.normal = animatedObject;
    this.press = animatedObject;
    this.mouseover = animatedObject;

    this.colliseBox = {x: x, y: y, width: this.normal.width, height: this.normal.height};

    this.clickAction = function() {};
    this.pressAction = function() {};
    this.mouseoverAction = function() {};
}

Button.prototype = Object.create (Entity.prototype);
Button.prototype.constructor = Button;

Button.prototype.addSheet = function(spritesheet, sheetType) {
    switch (sheetType) {
        case "click":
        case "press":
            this.press = new NonAnimatedObject(this.game, spritesheet, this.x, this.y);
            this.press.movable = false;
            break;
        case "mouseover":
            this.mouseover = new NonAnimatedObject(this.game, spritesheet, this.x, this.y);
           this.mouseover.movable = false;
            break;
        case "normal":
            this.normal = new NonAnimatedObject(this.game, spritesheet, this.x, this.y);
            this.normal.movable = false;
            break;
    }
}

Button.prototype.addEventListener = function(eventType, action) {
    if (eventType === "click") this.clickAction = action;
    else if (eventType === "press") this.pressAction = action;
    else if (eventType === "mouseover") this.mouseoverAction = action;
}

Button.prototype.draw = function() {
    var drawObj;
    if (this.status === this.NORMAL) {
        drawObj = this.normal;
    } else if (this.status === this.PRESS) {
        drawObj = this.press;
    } else if (this.status === this.MOUSEOVER) {
        drawObj = this.mouseover;
    }

    if (drawObj !== undefined) {
        drawObj.x = this.x;
        drawObj.y = this.y;
    }
    drawObj.draw();

}

Button.prototype.update = function() {
    if (collise(this.colliseBox, this.game.mouse)) {
        if (this.game.mouse.click) {      
            this.clickAction(this);
            // SOUND
            this.game.soundPlayer.addToEffect("./sound/effects/smb_stomp.wav", false, 2.0);
            this.game.mouse.click = false;
        } else if (this.game.mouse.pressed) {
            this.status = this.PRESS;
            this.pressAction(this);
        } else {
            this.status = this.MOUSEOVER;
            this.mouseoverAction(this);
        }
    } else this.status = this.NORMAL;

    Entity.prototype.update.call(this);
}


/*=========================================================================*/

function UnitCard(game, unitcode, x, y, unitX, unitY) {
    this.NORMAL = 0;
    this.PRESS = 1;
    this.MOUSEOVER = 2;

    Entity.call(this, game, x, y);
    this.movable = false;

    this.status = this.NORMAL;
    var animatedObject = new NonAnimatedObject(game, AM.getAsset("./img/unit/" + unitcode + "/card.png"), x, y);
    animatedObject.movable = false;
    this.normal = animatedObject;
    animatedObject = new NonAnimatedObject(game, AM.getAsset("./img/unit/" + unitcode + "/card_click.png"), x, y);
    animatedObject.movable = false;
    this.press = animatedObject;
    animatedObject = new NonAnimatedObject(game, AM.getAsset("./img/unit/" + unitcode + "/card_mouseover.png"), x, y);
    animatedObject.movable = false;
    this.mouseover = animatedObject;

    this.colliseBox = {x: x, y: y, width: this.normal.width, height: this.normal.height};

    this.clickAction = function() {spawnUnit(this.game, unitX, unitY, unitcode, PLAYER);};

}

UnitCard.prototype = Object.create (Entity.prototype);
UnitCard.prototype.constructor = UnitCard;

UnitCard.prototype.draw = function() {
    var drawObj;
    if (this.status === this.NORMAL) {
        this.normal.x = this.x;
        this.normal.y = this.y;
        drawObj = this.normal;
    } else if (this.status === this.PRESS) {
        this.press.x = this.x - 10;
        this.press.y = this.y - 15;
        drawObj = this.press;
    } else if (this.status === this.MOUSEOVER) {
        this.mouseover.x = this.x - 10;
        this.mouseover.y = this.y - 15;
        drawObj = this.mouseover;
    }

    drawObj.draw();

}

UnitCard.prototype.update = function() {


    if (collise(this.colliseBox, this.game.mouse)) {
        if (this.game.mouse.click) {      
            this.clickAction(this);
            // SOUND
            this.game.soundPlayer.addToEffect("./sound/effects/smb_stomp.wav", false, 2.0);
            this.game.mouse.click = false;
        } else if (this.game.mouse.pressed) {
            this.status = this.PRESS;

        } else {
            this.status = this.MOUSEOVER;
        }
    } else this.status = this.NORMAL;

    Entity.prototype.update.call(this);
}