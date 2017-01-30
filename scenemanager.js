var State = function() {
    this.name ; // Just to identify the State
    this.entities = [];
    this.update  = function (){
	    for (var i = 0; i < this.entities.length; i++) {
	        //If this enetity will be removed
	        if (this.entities[i].removeFromWorld)
	             this.entities.splice(i, 1);
	        else {        
	            var entity = this.entities[i];

	            //applying gravity
	            if (entity.gravity) entity.yVelocity += this.clockTick * 1800;
	            else entity.yVelocity = 0;      //Will be changed
	            entity.y += this.clockTick * entity.yVelocity;

	            entity.update();
	        }
	    }
    };
    this.render  = function (ctx){
	    for (var i = 0; i < this.entities.length; i++) {
	        this.entities[i].draw(ctx);
	    }
    };
    this.onEnter = function (){};
    this.onExit  = function (){};
	this.addEntity = function (entity) {
	//   console.log('added entity');
    	this.entities.push(entity);
	};

    // Optional but useful
    this.onPause = function (){};
    this.onResume= function (){};
};

var StateList = function (){
        var states = [];
        this.pop = function () {
                return states.pop();
        };
        this.push = function (state) {
                states.push(state);
        };
        this.top = function (){
                return states[states.length-1];
        }
};

var StateStack = function () {
    var states = new StateList();
    states.push(new State());
    this.update = function (){
            var state = states.top();
            if (state){
                    state.update();
            }
    };
    this.render = function (){
            var state = states.top();
            if (state){
                    state.render();
            }
    };
    this.push = function (state) {
            states.push(state);
            state.onEnter();
    };
    this.pop = function () {
            var state = states.top();
            state.onExit();
            return states.pop();
    };

    this.pause = function (){
            var state = states.top();
            if (state.onPause){
                    state.onPause();
            }
    };

    this.resume = function (){
            var state = states.top();
            if (state.onResume){
                    state.onResume();
            }
    };
};