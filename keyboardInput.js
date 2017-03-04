function KeyBoard(ctx, key){
    this.ctx = ctx;
    this.key = key;
    this.stopIm = false;
    this.press = false;
    //console.log("key is " + key);
    var that = this;
    this.ctx.canvas.addEventListener("keydown", function(e) {
        if(e.code === that.key) that.press = true;
//        console.log(e);
        e.preventDefault();
    }, false);
    this.ctx.canvas.addEventListener("keyup", function(e) {
        if(e.code === that.key) {
            that.press = false;
            that.stopIm = true;
        }
        //console.log(e);
        e.preventDefault();
    }, false);
}