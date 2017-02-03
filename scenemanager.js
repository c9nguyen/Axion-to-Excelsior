function SceneManager(game)
{
  this.game = game
  this.currentScene = null;
  this.scenes = {};
}

SceneManager.prototype.addEntityToScene = function (entity) {
  this.currentScene.addEntity(entity);
};

SceneManager.prototype.addScene = function (key, scene) {
  if (typeof scene === 'object'){
    scene.game = this.game;
    scene.entities = [];

    scene.addEntity = function (entity) {
      scene.entities.push(entity);
    };

    scene.getEntities = function(){
      return scene.entities;
    };

  } else if(typeof scene === 'function') {
    scene = new scene(this.game);
  }
  this.scenes[key] = scene;
};


SceneManager.prototype.startScene = function (key) {
  this.currentScene = scenes[key];
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


function Scene(game)
{
  this.game = game;
  this.entities = [];
}
Scene.prototype.init = function () {

};
Scene.prototype.preload = function () {

};
Scene.prototype.preloadUpdate = function () {

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

};
