function Button(game, spritesheet, x, y, scale = 1) {
    this.NORMAL = 0;
    this.PRESS = 1;
    this.MOUSEOVER = 2;
    this.DISABLE = -1;
    this.scale = scale;

    Entity.call(this, game, x, y, UI);
    this.movable = false;
    this.cooldown = 0;

    this.status = this.NORMAL;
    var animatedObject = new NonAnimatedObject(game, spritesheet, x, y, undefined, undefined, undefined, undefined, undefined, this.scale);
    animatedObject.movable = false;
    this.normal = animatedObject;
    this.press = animatedObject;
    this.mouseover = animatedObject;
    this.disable = animatedObject;

    this.colliseBox = {x: x, y: y, width: this.normal.width * this.scale, height: this.normal.height * this.scale};

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
            this.press = new NonAnimatedObject(this.game, spritesheet, this.x, this.y, 
                            undefined, undefined, undefined, undefined, undefined, this.scale);
            this.press.movable = false;
            break;
        case "mouseover":
            this.mouseover = new NonAnimatedObject(this.game, spritesheet, this.x, this.y, 
                            undefined, undefined, undefined, undefined, undefined, this.scale);
            this.mouseover.movable = false;
            break;
        case "normal":
            this.normal = new NonAnimatedObject(this.game, spritesheet, this.x, this.y, 
                            undefined, undefined, undefined, undefined, undefined, this.scale);
            this.normal.movable = false;
            break;
        case "disable":
            this.disable = new NonAnimatedObject(this.game, spritesheet, this.x, this.y, 
                            undefined, undefined, undefined, undefined, undefined, this.scale);
            this.disable.movable = false;
            break;
    }
}

Button.prototype.addEventListener = function(eventType, action) {
    if (eventType === "click") this.clickAction = action;
    else if (eventType === "press") this.pressAction = action;
    else if (eventType === "mouseover") this.mouseoverAction = action;
}

Button.prototype.setCooldown = function(cooldown) {
    this.cooldown = cooldown;
}

Button.prototype.draw = function() {
    var drawObj;
    if (this.status === this.NORMAL) {
        drawObj = this.normal;
    } else if (this.status === this.PRESS) {
        drawObj = this.press;
    } else if (this.status === this.MOUSEOVER) {
        drawObj = this.mouseover;
    } else if (this.status === this.DISABLE) {
        drawObj = this.disable;
    }

    if (drawObj !== undefined) {
        drawObj.x = this.x;
        drawObj.y = this.y;
    }
    drawObj.draw();

}

/**
 * Check if the action is still on cooldown
 * return true if action can be excecuted
 */
Button.prototype.checkCooldown = function() {
   // var offCooldown = true;
    return (this.timeLastClick === undefined || this.game.timer.gameTime - this.timeLastClick >= this.cooldown);
}

Button.prototype.update = function() {
    if (this.checkCooldown()) {
        if (collise(this.colliseBox, this.game.mouse)) {
            if (this.game.mouse.click) { 
                this.clickAction(this);
                    // SOUND
                this.game.soundPlayer.addToEffect("./sound/effects/smb_stomp.wav", false, 2.0);
                this.game.mouse.click = false;
                this.timeLastClick = this.game.timer.gameTime;
            } else if (this.game.mouse.pressed) {
                this.status = this.PRESS;
                this.pressAction(this);
            } else {
                this.status = this.MOUSEOVER;
                this.mouseoverAction(this);
            }
        } else this.status = this.NORMAL;
    } else {
        this.status = this.DISABLE;
    }
    Entity.prototype.update.call(this);
}


/*=========================================================================*/

function UnitCard(generator, unitcode, type, x, y, unitX, unitY, index) {
    this.NORMAL = 0;
    this.PRESS = 1;
    this.MOUSEOVER = 2;
    this.DISABLE = -1;
    this.generator = generator;

    Entity.call(this, this.generator.game, x, y, UI);

    // Number listener
    if(index + 1 < this.game.numberKeys.length)
        this.numberListener = this.game.numberKeys[index + 1];

    this.unitX = unitX;
    this.unitY = unitY;
    this.type = type;
    this.movable = false;
    this.unitcode = unitcode;
    this.active = this.generator.checkEnergy(this.energy);
    if (this.type === "unit") this.energy = unitData[this.unitcode].energy;
    else if (this.type === "effect") this.energy = spellCastData[this.unitcode].energy;
    this.status = this.NORMAL;
    var animatedObject = new NonAnimatedObject(this.game, AM.getAsset("./img/" + this.type + "/" + unitcode + "/card.png"), x, y);
    animatedObject.movable = false;
    this.normal = animatedObject;
    animatedObject = new NonAnimatedObject(this.game, AM.getAsset("./img/" + this.type + "/" + unitcode + "/card_click.png"), x, y);
    animatedObject.movable = false;
    this.press = animatedObject;
    animatedObject = new NonAnimatedObject(this.game, AM.getAsset("./img/" + this.type + "/" + unitcode + "/card_mouseover.png"), x, y);
    animatedObject.movable = false;
    this.mouseover = animatedObject;
    animatedObject = new NonAnimatedObject(this.game, AM.getAsset("./img/" + this.type + "/" + unitcode + "/card_disable.png"), x, y);
    animatedObject.movable = false;
    this.disable = animatedObject;

    this.colliseBox = {x: x, y: y, width: this.normal.width, height: this.normal.height};

    this.clickAction = function() {

    };

}

UnitCard.prototype = Object.create (Entity.prototype);
UnitCard.prototype.constructor = UnitCard;

UnitCard.prototype.play = function() {
                
    // SOUND
    this.game.soundPlayer.addToEffect("./sound/effects/smb_stomp.wav", false, 2.0);
    this.generator.useEnergy(this.energy);
    this.removeFromWorld = true;
}

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
    } else if (this.status === this.DISABLE) {
        this.disable.x = this.x;
        this.disable.y = this.y;
        drawObj = this.disable;
    }

    drawObj.draw();

}

UnitCard.prototype.update = function() {
    this.active = this.generator.checkEnergy(this.energy);
    if (this.active) {
        if (collise(this.colliseBox, this.game.mouse) || (this.numberListener && this.numberListener.stopIm)) {
            if (this.game.mouse.click || this.numberListener.stopIm) {
                if (this.generator.checkEnergy(this.energy)) {               
                    if (this.type === "unit") {
                        spawnUnit(this.game, this.unitX, this.unitY, this.unitcode, PLAYER);
                        this.play();
                    }
                    else if (this.type === "effect") {
                        if (!this.mouseSpell || this.mouseSpell.removeFromWorld) {
                            this.mouseSpell = new SpellCast(this.game, this.unitcode, this);
                            this.game.addEntity(this.mouseSpell);
                        } else {
                            this.mouseSpell.removeFromWorld = true;
                            this.mouseSpell = undefined;
                        } 
                    }
                }   
                this.game.mouse.click = false;
            } else if (this.game.mouse.pressed) {
                this.status = this.PRESS;

            } else {
                this.status = this.MOUSEOVER;
            }
            // unpress
            this.numberListener.stopIm = false;
        } else this.status = this.NORMAL;
    } else {
        this.status = this.DISABLE;
    }
        Entity.prototype.update.call(this);
}

/*=========================================================================*/

var spellCastData = {
    e1001: {
        spritesheet: AM.getAsset("./img/effect/e1001/mouse.png"),
        energy: 5,
        sheetWidth: 6,
        frames: 6,
        xOffset: -329,
        yOffset: -430    //from the ground
    },
    e1002: {
        spritesheet: AM.getAsset("./img/effect/e1002/mouse.png"),
        energy: 5,
        sheetWidth: 6,
        frames: 6,
        xOffset: -112,
        yOffset: -237    //from the ground
    },
}

function SpellCast(game, spellCode, theCard) {
    this.data = spellCastData[spellCode];
    this.spellCode = spellCode;
    this.card = theCard;
    
    AnimatedObject.call(this, game, this.data.spritesheet, game.mouse.x + this.data.spritesheet.width / 2, game.mouse.y + this.data.spritesheet.height / 2,
                        this.data.sheetWidth, 0.1, this.data.frames, true);
    this.movable = false;
    this.side = UI;

}


SpellCast.prototype = Object.create(AnimatedObject.prototype);
SpellCast.prototype.constructor = SpellCast;

SpellCast.prototype.update = function() {
    Entity.prototype.update.call(this);
    this.x = this.game.mouse.x - this.width / 2;
    this.y = this.game.mouse.y - this.height / 2
    if (this.game.mouse.click) {
        if (this.card.generator.checkEnergy(this.data.energy)) {
            castSkill(this.game, this.game.mouse.x + this.data.xOffset - this.game.mapX, groundLevel +  this.data.yOffset,
                    this.card.generator.currentBoss, this.spellCode);
            this.card.play();
        }
        this.removeFromWorld = true;
    }
}