var State = function() {
    this.name ; // Just to identify the State
    this.entities = [];
    //updates everything in the current state
    that = this;
    this.update  = function (clockTick){
	    for (var i = 0; i < that.entities.length; i++) {
	        //If this enetity will be removed
	        if (that.entities[i].removeFromWorld)
	             that.entities.splice(i, 1);
	        else {
	            var entity = that.entities[i];

	            //applying gravity
	            if (entity.gravity) entity.yVelocity += clockTick * 1800;
	            else entity.yVelocity = 0;      //Will be changed
	            entity.y += clockTick * entity.yVelocity;

	            entity.update();
	        }
	    }
    };

    // renders everythin in the current state
    this.render  = function (ctx){
	    for (var i = 0; i < that.entities.length; i++) {
	        that.entities[i].draw(ctx);
	    }
    };

    this.onEnter = function (){};
    this.onExit  = function (){};

    //add an entity
    this.addEntity = function (entity) {
    //   console.log('added entity');
      	that.entities.push(entity);
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
    this.update = function (clockTick){
            var state = states.top();
            if (state){
                    state.update(clockTick);
            }
    };
    this.render = function (ctx){
            var state = states.top();
            if (state){
                    state.render(ctx);
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
    this.addEntity = function (entity) {
    //   console.log('added entity');
        states.top().addEntity(entity);
    };
};
