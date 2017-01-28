const $ = require("jquery");
const PIXI = require("pixi.js");
const SceneGraph = require("./SceneGraph");

var GraphicsWindow = function (jContainer, width, height, param)
{
    var self = this;
    var jSelf = $( self );

    var jContainer = jContainer;
    self.getJContainer = function () { return jContainer; };

    var renderer = PIXI.autoDetectRenderer(width, height, param);
    self.getRenderer = function () { return renderer; }

    var sceneGraph = new SceneGraph("root");
    self.getSceneGraph = function () { return sceneGraph; };

    var lastTimeoutDiff = 0;
    var lastRenderTimeBefore = (new Date()).getTime();
    var lastRenderTimeAfter = lastRenderTimeBefore;
    var renderTimeout = 100;
    var actualRenderTimeout = renderTimeout;
    var renderFPS = 1 / renderTimeout;
    var actualRenderFPS = 1 / actualRenderTimeout;
    self.setRenderTimeout = function (value) 
    {
        renderTimeout = value; 
        self.setRenderFPS(1 / value);
    };
    self.setRenderFPS = function (value)
    {
        renderFPS = value;
        self.setRenderTimeout(1 / value);
    }

    
    var isRunning = false;

    var counter = 0;

    jContainer.append(renderer.view);



    self.resize = function (pxWidth, pxHeight)
    {
        jSelf.trigger("onResize", { pxWidth: pxWidth, pxHeight: pxHeight });
    }



    self.render = function ()
    {
        jSelf.trigger("onRender");
        renderer.render(sceneGraph.getStage());
    }

    self.renderLoop = function ()
    {
        if (!isRunning){ return; }

        var before = (new Date()).getTime();
        self.render();
        var after = (new Date()).getTime();
        var diff = after - before;
        actualRenderTimeout = Math.round(renderTimeout - diff);
        if (actualRenderTimeout < 0) { actualRenderTimeout = 0; }
        actualRenderFPS = Math.round(1000 / actualRenderTimeout);

        console.log("actualRenderFPS: " + actualRenderFPS + " " + typeof(actualRenderFPS));

        lastRenderTimeBefore = before;
        lastRenderTimeAfter = after;
        setTimeout(self.renderLoop, actualRenderTimeout);
    }

    self.start = function ()
    {
        jSelf.trigger("onStart");
        isRunning = true;
        self.renderLoop();
    }

    self.stop = function ()
    {
        jSelf.trigger("onStop");
        isRunning = false;
    }

    self.render();

    return self;
};

GraphicsWindow.prototype.type = GraphicsWindow;

// example of a prototyped function, defined once, shared by every new instance
// myClass.prototype.prototypeFunc = function ()
// { } 

// example of a static function, related to the type instead of the instances
// myClass.staticFunc = funtion ()
// { }

module.exports = GraphicsWindow;