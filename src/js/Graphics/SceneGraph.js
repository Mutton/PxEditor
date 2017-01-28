const PIXI = require("pixi.js");

var SceneGraph = function ()
{
    var self = this;

    self.rootStage = new PIXI.Container();
    self.childStages = new Array();

    return self;
}

module.exports = SceneGraph;