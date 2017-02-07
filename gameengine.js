window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

const NEUTRAL = 0;
const PLAYER = 1;
const ENEMY = -1;

const GRAVITY = 900; //can change this to make gravity better

function GameEngine() {
    this.entities = [];
    this.collisionBox = {
        ground: [],
    };
    this.playerList = [];
    this.enemyList = [];
    
    this.portals = [];  // will be removed
    this.food = []; // will be removed
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;

    //events
    this.mouse = {click: false,
                    x: undefined,
                    y: undefined,
                    width: 1,
                    height: 1,
                    pressed: false,
                    reset: function() {
                        this.click = false;
                        this.pressed = false;
                    }};
    this.events = {

    }
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    this.startInput();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');

    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;
        return { x: x, y: y };
    }

    var that = this;

    // event listeners are added here

    this.ctx.canvas.addEventListener("mousedown", function (e) {
        if (e.which === 1)
            that.mouse.pressed = true; 
    }, false);

    this.ctx.canvas.addEventListener("click", function (e) {
        var coor = getXandY(e);
        that.mouse.x = coor.x;
        that.mouse.y = coor.y;
        that.mouse.click = true;
        that.mouse.pressed = false;
    }, false);

    // this.ctx.canvas.addEventListener("contextmenu", function (e) {
    //     that.click = getXandY(e);
    //     console.log(e);
    //     console.log("Right Click Event - X,Y " + e.clientX + ", " + e.clientY);
    //     e.preventDefault();
    // }, false);

    this.ctx.canvas.addEventListener("mousemove", function (e) {
        var coor = getXandY(e);
        that.mouse.x = coor.x;
        that.mouse.y = coor.y;
       // console.log(coor);
    }, false);

    // this.ctx.canvas.addEventListener("mousewheel", function (e) {
    //     console.log(e);
    //     that.wheel = e;
    //     console.log("Click Event - X,Y " + e.clientX + ", " + e.clientY + " Delta " + e.deltaY);
    // }, false);

    // this.ctx.canvas.addEventListener("keydown", function (e) {
    //     console.log(e);
    //     console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
    // }, false);

    // this.ctx.canvas.addEventListener("keypress", function (e) {
    //     if (e.code === "KeyD") that.d = true;
    //     that.chars[e.code] = true;
    //     console.log(e);
    //     console.log("Key Pressed Event - Char " + e.charCode + " Code " + e.keyCode);
    // }, false);

    // this.ctx.canvas.addEventListener("keyup", function (e) {
    //     console.log(e);
    //     console.log("Key Up Event - Char " + e.code + " Code " + e.keyCode);
    // }, false);

    console.log('Input started');
}


GameEngine.prototype.addEntity = function (entity) {
 //   console.log('added entity');
    if (entity.side === PLAYER) this.playerList.push(entity);
    else if (entity.side === ENEMY) this.enemyList.push(entity);
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    for (var i = 0; i < this.entities.length; i++) {
        //If this enetity will be removed
        if (this.entities[i].removeFromWorld)
             this.entities.splice(i, 1);
        else {        
            var entity = this.entities[i];

            //applying gravity
            // if (entity.gravity) entity.yVelocity += this.clockTick * 1800;
            // else entity.yVelocity = 0;      //Will be changed
            // entity.y += this.clockTick * entity.yVelocity;

            entity.update();
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function Entity(game, x, y, side = NEUTRAL) {
    this.game = game;
    this.x = x;
    this.y = y;
    // vinh added

    this.movable = true;
    //end vinh added
    this.gravity = false;
    this.velocity = {x: 0, y:0};
    this.yVelocity = 0; //will be removed
    this.side = side;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
    if (this.gravity) this.velocity.y += this.game.clockTick * GRAVITY;      //Applying grativy
    this.y += this.game.clockTick * this.velocity.y;
    this.x += this.game.clockTick * this.velocity.x;
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

/**
 * Collision detection
 */
function collise(box1, box2) {
    return (box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.height + box1.y > box2.y) 
}