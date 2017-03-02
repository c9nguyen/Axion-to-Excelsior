function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.downloadQueue = [];

    this.musicCache = [];
    this.downloadMusicQueue = [];
}

AssetManager.prototype.queueDownload = function (path, music = false) {
    console.log("Queueing " + path);
    if(music){
        this.downloadMusicQueue.push(path);
    } else {
        this.downloadQueue.push(path);
    }
}

AssetManager.prototype.isDone = function () {
    return this.downloadQueue.length + this.downloadMusicQueue.length === this.successCount + this.errorCount;
}

AssetManager.prototype.downloadAll = function (callback) {

    //Music
    for(var i = 0; i < this.downloadMusicQueue.length; i++){
        var aud = new Audio();
        var that = this;

        var path = this.downloadMusicQueue[i];
        console.log(path);

        aud.addEventListener("loadeddata", function () {
            console.log("Loaded " + this.src);
            that.successCount++;
            if(that.isDone()) callback();
        });

        aud.addEventListener("error", function () {
            console.log("Error loading " + this.src);
            that.errorCount++;
            if (that.isDone()) callback();
        });

        aud.src = path;
        this.musicCache[path] = aud;

    }

    // Regular downloads
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var img = new Image();
        var that = this;

        var path = this.downloadQueue[i];
        console.log(path);

        img.addEventListener("load", function () {
            console.log("Loaded " + this.src);
            that.successCount++;
            if(that.isDone()) callback();
        });

        img.addEventListener("error", function () {
            console.log("Error loading " + this.src);
            that.errorCount++;
            if (that.isDone()) callback();
        });

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
}
AssetManager.prototype.getAssetMusic = function(path){
    return this.musicCache[path];
}