var canvasWidth = 0;
var canvasHeight = 0;
var characters = [];
var food = [];

const WALK = 0;
const JUMP = 1;
const STAND = 2;

const characterFrameInfo = [
    {sheetWidth: 4, frames: 4},    //walk
    {sheetWidth: 1, frames: 1},    //jump
    {sheetWidth: 1, frames: 1}    //stand
]

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

/*===============================================================*/

/**
 * The image object can be in a spritesheet or a normal image (which is a spritesheet with 1 frame)
 */
function NonAnimatedObject(game, spritesheet, x = 0, y = 0,
                frameWidth = spritesheet.width, frameHeight = spritesheet.height,
                sheetWidth = 1, frames = 1, frameIndex = 0, //If frameIndex = -1, pick a random frame
                scale = 1, width = frameWidth, height = frameHeight) { //default orignal size
    this.game = game; 
    this.ctx = game.ctx;
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.width = width;
    this.height = height;
    this.scale = scale;

    var frame = frameIndex > 0 ? frameIndex : Math.floor(Math.random() * (frames));

    this.xindex = frame % sheetWidth;
    this.yindex = Math.floor(frame / sheetWidth);

    Entity.call(this, game, this.x, this.y);
};

NonAnimatedObject.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
}

NonAnimatedObject.prototype.draw = function() {
    this.ctx.drawImage(this.spritesheet,
                 this.xindex * this.frameWidth, this.yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 this.x, this.y,
                 this.width * this.scale, this.height * this.scale);
}

NonAnimatedObject.prototype.update = function () {
};

/*===============================================================*/

/**
 * Object with animation
 */
function AnimatedObject(game, spritesheet, x = 0, y = 0,
                frameWidth, frameHeight,
                sheetWidth, frameDuration, frames, loop, 
                scale = 1, width = frameWidth, height = frameHeight) { //default orignal size

    this.game = game;
    this.animation = new Animation(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale);                
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.width = width;
    this.height = height;
    this.direction = 1;
    

    Entity.call(this, game, this.x, this.y);
};

AnimatedObject.prototype = Object.create(Entity.prototype);
AnimatedObject.prototype.constructor = AnimatedObject;

/**
 * Update the spritesheet for the animation
 */
AnimatedObject.prototype.updateFrameStat = function(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop) {
    this.animation = new Animation(spritesheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, this.animation.scale);
    this.width = frameWidth;
    this.height = frameHeight; 
}

AnimatedObject.prototype.setSpeed = function(speed, direction = 1) {
    this.direction = direction;
    this.speed = speed;
}

AnimatedObject.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
}

AnimatedObject.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

AnimatedObject.prototype.update = function () {
    this.x += this.game.clockTick * this.speed * this.direction;
    if (this.x > canvasWidth) 
        this.x = -this.width;
    else if (this.x < -this.width)
        this.x = canvasWidth;
    Entity.prototype.update.call(this);
}

/*===============================================================*/

function Person(game, spritesheet = -1, x = 0, y = 0, //spritesheet = -1 will random a character
                frameDuration, scale = 1) { //default orignal size
    this.status = STAND;
    this.life = 15;
    this.frameInfo = characterFrameInfo[this.status];
    if (spritesheet > -1) this.personSpriteSheetDirections = characters[spritesheet];
    else this.personSpriteSheetDirections = characters[Math.floor(Math.random() * characters.length)];
    
    this.personSpritesheet = this.personSpriteSheetDirections.right;
    
    //calculating frames since each character has different frame dimension
    var frameWith = this.personSpritesheet[this.status].width / this.frameInfo.sheetWidth;
    var frameHeight = this.personSpritesheet[this.status].height;

    AnimatedObject.call(this, game, this.personSpritesheet[this.status], x, y,
                        frameWith, frameHeight,
                        this.frameInfo.sheetWidth, frameDuration, this.frameInfo.frames, true, 
                        scale, frameWith, frameHeight); 
    
    //gravity default true
    this.gravity = true;
};

Person.prototype = Object.create(AnimatedObject.prototype);
Person.prototype.constructor = Person;

/**
 * Change status action of character
 */
Person.prototype.changeStatus = function (status) {
    if (characterFrameInfo[status] !== undefined && this.status !== status) {
        this.status = status;
        this.frameInfo = characterFrameInfo[this.status];
        var spritesheet = this.personSpritesheet[this.status];
        var frameWith = spritesheet.width / this.frameInfo.sheetWidth;
        var frameHeight = spritesheet.height;

        this.updateFrameStat(spritesheet, frameWith, frameHeight,
                        this.frameInfo.sheetWidth, this.animation.frameDuration, this.frameInfo.frames, true);
    }
}

/**
 * Turn arround
 */
Person.prototype.flip = function () {
    if (this.direction === 1) {
        this.personSpritesheet = this.personSpriteSheetDirections.left;
        this.direction = -1;       
    } else {
        this.personSpritesheet = this.personSpriteSheetDirections.right;
        this.direction = 1;
    }
    this.animation.spriteSheet = this.personSpritesheet[this.status];
}

Person.prototype.update = function () {
    AnimatedObject.prototype.update.call(this);
    if (this.life > 0) this.life -= this.game.clockTick;
    if (this.life < 0) {
        this.removeFromWorld = true; //die
        this.game.addEntity(new Tomb(this.game, this.x, this.y));
    } 
    //ground hit box
    this.groundHitBox = {x: this.x, y: this.y + this.height - 5, width: this.width, height: 7};
    this.colliseBox = {x: this.x, y: this.y, width: this.width, height: this.height};

    //Got food
    for (var i in this.game.food) {
        if (this.game.food[i].active && collise(this.colliseBox, this.game.food[i].colliseBox)) {
            this.game.food[i].deactivate();
            this.life = 15;

            if (this.life >= 8) {   //preproduce only health is above 8
                var person = new Person(this.game, -1, this.x, this.y, 0.1, 1);
                person.changeStatus(WALK);
                person.setSpeed(200, this.direction);
                person.flip();
                this.game.addEntity(person);
                break;
            }
        }
    }

    for (var i in this.game.portals) {
        if (collise(this.colliseBox, this.game.portals[i].colliseBox)) {
            this.yVelocity = -Math.floor(Math.random() * 1000 + 500);
            var random = Math.floor(Math.random());
            if (random == 0) this.flip();
        }
    }

    var groundCollisionBox = this.game.collisionBox.ground;
    if (this.yVelocity >= 0) {
        for (var box in groundCollisionBox) {
            if (collise(this.groundHitBox, groundCollisionBox[box])) {
                this.y = groundCollisionBox[box].y - this.height;
                this.changeStatus(WALK);
                this.gravity = false;
                return;
            }
        }
    }
    this.changeStatus(JUMP);
    this.gravity = true;
}

Person.prototype.draw = function() {
    AnimatedObject.prototype.draw.call(this);
//    this.ctx.fillRect(this.colliseBox.x, this.colliseBox.y, this.colliseBox.width, this.colliseBox.height);
}

/*===============================================================*/

function Portal(game, spritesheet, x = 0, y = 0, //spritesheet = -1 will random a character
                sheetWidth, frameDuration, frames, loop, scale = 1) { //default orignal size
    
    //calculating frames since each character has different frame dimension
    var frameWith = spritesheet.width / sheetWidth;
    var frameHeight = spritesheet.height / Math.ceil(frames/sheetWidth);

    AnimatedObject.call(this, game, spritesheet, x, y,
                        frameWith, frameHeight,
                        sheetWidth, frameDuration, frames, loop, 
                        scale, frameWith, frameHeight); 
    // console.log(y);
    // console.log(frameHeight / 2 + y);
    
    this.colliseBox = {x: frameWith / 3 + x, y: frameHeight / 1.5 + y, width: frameWith / 4, height: frameHeight / 3}; 
};

Portal.prototype = Object.create(AnimatedObject.prototype);
Portal.prototype.constructor = Portal;

Portal.prototype.draw = function() {
    AnimatedObject.prototype.draw.call(this);
//    this.ctx.fillRect(this.colliseBox.x, this.colliseBox.y, this.colliseBox.width, this.colliseBox.height);
}

/*===============================================================*/

function Food(game, x, y) {
    this.active = true;
    this.cooldown = 0;
    Entity.call(this, game, x, y);

    this.activate();
    this.colliseBox = {x: x, y: y, width: 30, height: 30};
}

Food.prototype = Object.create(Entity.prototype);
Food.prototype.constructor = Food;

Food.prototype.activate = function() {
    this.active = true;
    var ran = Math.floor(Math.random() * 4);

    this.nonAnimatedObject = new NonAnimatedObject(this.game, AM.getAsset("./img/food/spritesheet.png"), this.x, this.y,
                                                    33, 34, 4, 4, -1, 1);
}

Food.prototype.deactivate = function() {
    this.active = false;
    this.cooldown = 5;
}

Food.prototype.draw = function() {
    if (this.active) this.nonAnimatedObject.draw();
}

Food.prototype.update = function() {
    if (this.cooldown > 0) this.cooldown -= this.game.clockTick;
    if (this.cooldown < 0)  this.cooldown = 0;
    if (this.cooldown <= 0 && !this.active) this.activate();
}

/*===============================================================*/

function Tomb(game, x, y) {
    var a = AM.getAsset("./img/tomb.png");

    a.onclick = function() {
        console.log("Clicked");
    }
    NonAnimatedObject.call(this, game, a, x, y);
    this.gravity = true;
    this.yVelocity = -400;
    this.colliseBox = {x: x, y: y + 33, width: 40, height: 10}; 
}

Tomb.prototype = Object.create(NonAnimatedObject.prototype);
Tomb.prototype = Tomb;

Tomb.prototype.update = function() {
    if (this.gravity === true) {
        this.colliseBox = {x: this.x, y: this.y + 33, width: 40, height: 5};

        if (this.yVelocity >= 0) {
            for (var box in this.game.collisionBox.ground) {
                if (collise(this.colliseBox, this.game.collisionBox.ground[box])) {
                    this.y = this.game.collisionBox.ground[box].y - this.height;
                    this.gravity = false;
                    return;
                }
            }
        }
    }

}

Tomb.prototype.draw = function() {
    NonAnimatedObject.prototype.draw.call(this);
}

/*===============================================================*/

function Button(game, spritesheet, x, y, scale = 1) {
    this.NORMAL = 0;
    this.PRESS = 1;
    this.MOUSEOVER = 2;

    Entity.call(this, game, x, y);

    this.status = this.NORMAL;
    this.normal = new NonAnimatedObject(game, spritesheet.normal, x, y);
    this.press = new NonAnimatedObject(game, spritesheet.press, x, y);
    this.mouseover = new NonAnimatedObject(game, spritesheet.mouseover, x, y);

    this.colliseBox = {x: x, y: y, width: this.normal.width, height: this.normal.height};
}

Button.prototype = Object.create (Entity.prototype);
Button.prototype.constructor = Button;

Button.prototype.draw = function() {
    if (this.status === this.NORMAL) {
        this.normal.draw();
    } else if (this.status === this.PRESS) {
        this.press.draw();
    } else if (this.status === this.MOUSEOVER) {
        this.mouseover.draw();
    }
}

Button.prototype.update = function() {
    if (collise(this.colliseBox, this.game.mouse)) {
        if (this.game.mouse.click) {
            spawn(this.game);
            this.game.mouse.click = false;
        } else if (this.game.mouse.pressed) this.status = this.PRESS;
        else this.status = this.MOUSEOVER;
    } else this.status = this.NORMAL;
}