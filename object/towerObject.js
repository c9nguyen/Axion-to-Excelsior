function Tower(game, x, y, towerCode, side) {
    Entity.call(this, game, x, y, side);

    this.data = towerData[towerCode];
    this.width =  this.data.groundWidth;
    this.height = this.data.groundHeight;
    this.health = this.data.health;
    this.att = this.data.att;
    this.rangeBox = this.data.range; 
    this.knockable = false;
    this.gravity = false;
    this.speedPercent = 1;
    
    this.actions = {}; //contains all actions this unit can perform (walk, stand, attack)
    this.defaultAction;
    this.currentAction;
    this.takingDamage = 0;
    this.getHit = function(that, damage) {  //default get hit action: lose hp
        that.health -= Math.max(damage, 1);
    };

    this.actionHandler = function() {};
}

Tower.prototype = Object.create(Entity.prototype);
Tower.prototype.constructor = Unit;


Tower.prototype.takePassiveEffect = function() {
}

Tower.prototype.getCollisionBox = function() {
    return this.currentAction !== undefined ? this.currentAction.collisionBox : this;
}

Tower.prototype.getKnockback = function() {
}

/**
 * Change the action of unit
 */
Tower.prototype.changeAction = function(actionName) {
    var action = this.actions[actionName];
    if (action !== undefined && this.currentAction !== action && action.checkCooldown()) {    //If action is defined and not performing
        if (this.currentAction !== undefined) this.currentAction.end();
        this.currentAction = action;
        this.currentAction.start();
    } 
        
}

Tower.prototype.heal = function() {
}

Tower.prototype.takeDamage = function(amount) {
    this.takingDamage += amount;
}

Tower.prototype.takeEffect = function() {
}

Tower.prototype.checkEnemyInRange = function() {
    var enemy = this.side === PLAYER ? this.game.enemyList : this.game.playerList;
    var rangeIndex = new Set();
                //var collisionBox = this.getCollisionBox();
    for (var i in enemy) {
        if (enemy[i].removeFromWorld){
            enemy.splice(i, 1);
            i--;
        } else {
            var otherCollisionBox = enemy[i].getCollisionBox();
            for (var j = 0; j < this.rangeBox.length; j++) {  //Check all range box and return which box hit
                var range = this.rangeBox[j];
                var tempRange = {x: this.x + range.x, y: this.y + range.y,
                                width: range.width, height: range.height};
                if (collise(tempRange, otherCollisionBox)) {
                    this.lockedTarget = enemy[i];
                    rangeIndex.add(j);
                } 
            }
        }

        if (rangeIndex.size > 0) break;
    } 

    return rangeIndex;
}

Tower.prototype.checkAllyInRange = function(condition = function() {return true;}) {
    var ally = this.side !== PLAYER ? this.game.enemyList : this.game.playerList;
    var rangeIndex = new Set();
                //var collisionBox = this.getCollisionBox();
    for (var i in ally) {
        if (ally[i].removeFromWorld){
            ally.splice(i, 1);
            i--;
        } else if (ally[i] !== this) {
            var otherCollisionBox = ally[i].getCollisionBox();
            for (var j = 0; j < this.rangeBox.length; j++) {  //Check all range box and return which box hit
                var range = this.rangeBox[j];
                var tempRange = {x: this.x + range.x, y: this.y + range.y,
                                width: range.width, height: range.height};
                if (collise(tempRange, otherCollisionBox) && condition(ally[i])) {
                    this.lockedTarget = ally[i];
                    rangeIndex.add(j);
                } 
            }
        }

        if (rangeIndex.size > 0) break;
    } 

    return rangeIndex;
}

Tower.prototype.update = function() {
    Entity.prototype.update.call(this);

    if (this.y > canvasHeight * 2) this.health = -1;
    if (this.health <= 0) {
         this.changeAction("die");
         this.currentAction.collisionBox = {x: 0, y: 0, width: 0, height: 0};
    } else {
        if (this.takingDamage > 0) {
            this.getHit(this, this.takingDamage);
            this.health = Math.min(this.health, this.data.health);
            this.takingDamage = 0;
        }
        this.actionHandler(this);
    }
    //update the current action
    if (this.currentAction !== undefined) this.currentAction.update();
}

Tower.prototype.draw = function() {
    if(this.currentAction !== undefined)
        this.currentAction.draw();
    var drawX = this.x + this.game.mapX;
    //Health bar
    var ctx = this.game.ctx;
    var healthPercent = this.health / this.data.health;
    healthPercent = Math.max(healthPercent, 0);
    var height = this.height / 2;
    //var healthBar = {x: this.x, y: this.y, width: this.width * healthPercent, height: height};
    ctx.fillStyle = 'red';
    ctx.fillRect(drawX, this.y, this.width, height);
    ctx.fillStyle = 'green';
    ctx.fillRect(drawX, this.y, this.width * healthPercent, height);
    ctx.strokeStyle = 'black';
    ctx.rect(drawX, this.y, this.width, height);
    ctx.stroke();
    ctx.fillStyle = 'black';

    // // collisionBox
    // if (this.side === ENEMY) {
    // var action = this.currentAction;
    // var box = {};
    // var collisionBox = action.getFrameHitbox(action.currentFrame());
    // if (collisionBox !== undefined) {
    // box.x = action.x + collisionBox.x + this.game.mapX;;
    // box.y = action.y + collisionBox.y;
    // box.width = collisionBox.width;
    // box.height = collisionBox.height;
    // this.game.ctx.fillRect(box.x, box.y, box.width, box.height);
    // }
    // }


    // var rangeBox = this.rangeBox[0];
    // var box = {};
    // box.x = this.x + rangeBox.x + this.game.mapX;;
    // box.y = this.y + rangeBox.y;
    // box.width = rangeBox.width;
    // box.height = rangeBox.height;
    // this.game.ctx.strokeStyle = "red";
    // this.game.ctx.fillRect(box.x, box.y, box.width, box.height);


    //this.game.ctx.fillRect(rangeBox.x, rangeBox.y, rangeBox.width, rangeBox.height);

    
}


function MainTower(game) {
    Tower.call(this, game, 0, 520, "tower0", PLAYER);
    var that = this;

    this.skill = new Button(this.game, AM.getAsset("./img/unit/tower0/skill_icon.png"), 20, 20);
    this.skill.addEventListener("click", function() {
        if (that.currentAction.interruptible || that.currentAction.isDone()) {
            that.changeAction("attack");
        }
        castSkill(that.game, that.getClosestEnemy() - 50, -140 , that, 10000, 1);

    });
    this.skill.setCooldown(10);
    this.skill.timeLastClick = this.game.timer.gameTime;

    this.skill2 = new Button(this.game, AM.getAsset("./img/unit/tower0/skill2_icon.png"), 130, 20);
    this.skill2.addEventListener("click", function() {
        if (that.currentAction.interruptible || that.currentAction.isDone()) {
            that.changeAction("attack2");
        }
        castSkill(that.game, that.getClosestEnemy() - 100, 50, that, 10001, 0.5);

    });
    this.skill2.setCooldown(30);
    this.skill2.timeLastClick = this.game.timer.gameTime;

    this.initActions();
    var that = this;
    this.actionHandler = function(that) {                 
        if (that.currentAction.interruptible || that.currentAction.isDone()) {
            that.changeAction("stand");
    }};
}

MainTower.prototype = Object.create(Tower.prototype);
MainTower.prototype.constructor = Unit;

MainTower.prototype.getClosestEnemy = function() {
    var enemy = this.game.enemyList ;
    var x = 1400;
    for (var i in enemy) {
        if (enemy[i].removeFromWorld){
            enemy.splice(i, 1);
            i--;
        } else {
            var otherCollisionBox = enemy[i].getCollisionBox();
            if (x === 0 || x > otherCollisionBox.x)
                x = otherCollisionBox.x;
        }
    }

    return Math.min(x, 1400);
}

MainTower.prototype.initActions = function() {
    var groundPoints = [{x: 0, y: 557}];
    var collisionBox = [{x: 0, y: 65, width: 310, height: 495}];
    var stand = new Action(this.game, this, AM.getAsset("./img/unit/tower0/stand.png"),
                                    3, 0.1, 6, groundPoints, collisionBox, true);

    groundPoints = [{x: 0, y: 596}];
    collisionBox = [{x: 0, y: 100, width: 310, height: 495}];
    var attack = new Action(this.game, this, AM.getAsset("./img/unit/tower0/attack.png"),
                            5, 0.1, 15, groundPoints, collisionBox, false);

    groundPoints = [{x: 0, y: 557}];
    collisionBox = [{x: 0, y: 65, width: 310, height: 495}];
    var attack2 = new Action(this.game, this, AM.getAsset("./img/unit/tower0/attack2.png"),
                            6, 0.1, 12, groundPoints, collisionBox, false);

    groundPoints = [{x: 0, y: 554}];
    var die = new Action(this.game, this, AM.getAsset("./img/unit/tower0/die.png"),
                        7, 0.1, 7, groundPoints, collisionBox, false, -1);
    die.endEffect = function() { this.unit.removeFromWorld = true};

    this.actions["attack"] = attack;
    this.actions["attack2"] = attack2;
    this.actions["die"] = die;
    this.actions["stand"] = stand;
    this.currentAction = stand;
}

MainTower.prototype.update = function() {
    this.skill.update();
    this.skill2.update();
    Tower.prototype.update.call(this);
}

Tower.prototype.draw = function() {

    if(this.currentAction !== undefined)
        this.currentAction.draw();
    this.skill.draw();
    this.skill2.draw();

    //Health bar
    var percent = this.health / this.data.health;
    percent = Math.max(percent, 0);
    var width = 500;
    this.drawBar(600, 10, width, 20, width * percent, "green");

    //skill 1 cd
    percent = (this.game.timer.gameTime - this.skill.timeLastClick) / this.skill.cooldown;
    //console.log(this.game.timer.gameTime - this.skill.timeLastClick + "  " + this.skill.cooldown);
    percent = Math.min(percent, 1);
    width = this.skill.normal.width
    this.drawBar(this.skill.x, this.skill.y + this.skill.normal.height, width, 10, width * percent, "blue");

    //skill 2 cd
    percent = (this.game.timer.gameTime - this.skill2.timeLastClick) / this.skill2.cooldown;
    //console.log(this.game.timer.gameTime - this.skill.timeLastClick + "  " + this.skill.cooldown);
    percent = Math.min(percent, 1);
    width = this.skill2.normal.width
    this.drawBar(this.skill2.x, this.skill2.y + this.skill2.normal.height, width, 10, width * percent, "blue");
}

Tower.prototype.drawBar = function(x, y, width, height, fill, color) {
    var ctx = this.game.ctx;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, fill, height);
    ctx.strokeStyle = 'black';
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.fillStyle = 'black';
}