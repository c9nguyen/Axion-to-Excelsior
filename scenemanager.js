function SceneManager(game)
{
  this.game = game
  this.currentScene = null;
  this.currentSceneKey = null;
  this.scenes = {};
}

SceneManager.prototype.addEntityToScene = function (entity) {
  this.currentScene.addEntity(entity);
};

SceneManager.prototype.addScene = function (key, scene) {
  if (typeof scene === 'object'){
    scene.game = this.game;


  } else if(typeof scene === 'function') {
    scene = new scene(this.game);
  }

  // scene.entities = [];
  this.game.entitiesList = [];
  scene.addEntity = function (entity) {
    // scene.entities.push(entity);
    this.game.entitiesList.push(entity);
  };
  scene.getEntities = function(){
    // return scene.entities;
    return this.game.entitiesList;
  };
  scene.clearEntities =function () {
    // scene.entities=[];
    this.game.entitiesList = [];
    this.game.enemyList = [];
    this.game.playerList = [];
    this.game.uiList = [];
    this.game.screenMover.resetScreen();
    this.game.soundPlayer.removeAllSound();
  };
  this.scenes[key] = scene;
};


SceneManager.prototype.startScene = function (key) {
  this._pendingSceneKey = key;
};


SceneManager.prototype.getCurrentEntities = function () {
  if(this.currentScene) return this.currentScene.getEntities();
  return [];
};
SceneManager.prototype.getScene = function (key) {
  if(this.scenes[key]){
    return this.scenes[key];
  } else return this.currentScene;
};

SceneManager.prototype.preUpdate = function(time) {
  if(this._pendingSceneKey){


    this.clearCurrentScene();
    this.setCurrentScene(this._pendingSceneKey);

    this._pendingSceneKey = null;
    if(this.currentScene.create){
      this.currentScene.create();
    }
    // this.currentScene = this.scenes[this._pendingSceneKey];
    // this._pendingSceneKey = null;
    // this.currentScene.create();
  }
};
SceneManager.prototype.clearCurrentScene = function() {
  if(this.currentScene){
    console.log("shutdown");
    if(this.currentScene.shutdown){
      console.log("inside shutdown");
      this.currentScene.shutdown();
    }
  }
};
SceneManager.prototype.setCurrentScene = function(key) {
  this.currentSceneKey = key;
  this.currentScene = this.scenes[key];
  if(this.currentScene.init){
    this.currentScene.init();
  }
};
SceneManager.prototype.clearEntities = function () {
  this.currentScene.clearEntities();
};

function Scene(game)
{
  this.game = game;
  // this.entities = [];
}
// Scene.prototype.init = function () {

// };
Scene.prototype.preload = function () {

};
Scene.prototype.loadUpdate = function () {

};
Scene.prototype.create = function () {
  
};
Scene.prototype.update = function () {

};
Scene.prototype.resize = function () {

};
Scene.prototype.paused = function () {

};
Scene.prototype.resumed = function () {

};
Scene.prototype.pauseUpdate = function () {

};
Scene.prototype.shutdown = function () {
  this.game.clearEntities();
};
Scene.prototype.clearEntities = function () {
  // this.entities =[];
  this.game.entitiesList = [];
};
