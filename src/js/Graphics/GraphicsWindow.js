const $ = require("jquery");
const PIXI = require("pixi.js");
const SceneGraph = require("./SceneGraph");

var GraphicsWindow = function (jContainer, width, height, param)
{
    var self = this;
    var jSelf = $( self );

    // jQuery-representative of the surrounding DOM-element
    var jContainer = jContainer;
    self.getJContainer = function () { return jContainer; };

    // PIXI-object for handling WebGL- or more basic Canvas-rendering 
    // (client-support decides which to use, primarly WebGL)
    var renderer = PIXI.autoDetectRenderer(width, height, param);
    self.getRenderer = function () { return renderer; }

    // root-sceneGraph which contains every single thing that has to be rendered
    // in a intervined, graph-like fashion
    var sceneGraph = new SceneGraph("root");
    self.getSceneGraph = function () { return sceneGraph; };

    // 
    var rendererIsRunning = false;

    // times [ms after 1. Jan. 1970?] before and after last rendering process
    var lastRenderTimeBefore = (new Date()).getTime();
    var lastRenderTimeAfter = lastRenderTimeBefore;

    // aimed and actual / corrected timeouts of the rendering process
    var renderTimeout = 100;
    var actualRenderTimeout = renderTimeout;
    self.setRenderTimeout = function (value) 
    {
        renderTimeout = value; 
        self.setRenderFPS(1 / value);
    };

    // aimed and actual / corrected fps of the rendering process
    var renderFPS = 1 / renderTimeout;
    var actualRenderFPS = 1 / actualRenderTimeout;
    self.setRenderFPS = function (value)
    {
        renderFPS = value;
        self.setRenderTimeout(1 / value);
    }

    // append renderer to DOM after finished initialization
    jContainer.append(renderer.view);

    // used to resize the GraphicsWindow and trigger a respective event
    self.resize = function (pxWidth, pxHeight)
    {
        jSelf.trigger("onResize", { pxWidth: pxWidth, pxHeight: pxHeight });
    }

    // used to render everything in the root-sceneGraph and its children-hierarchy
    self.render = function ()
    {
        jSelf.trigger("onRender");
        renderer.render(sceneGraph.getStage());
    }

    // used to loop the rendering-process until rendererIsRunning is false
    self.renderLoop = function ()
    {
        if (!rendererIsRunning){ return; }

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

    // start / resume rendering loop 
    // (does not force an immediate rendering process if already running / active
    // but can be specified by setting forceStart to true)
    self.startRender = function (forceStart = false)
    {
        jSelf.trigger("onStartRender");
        if (forceStart || (!rendererIsRunning))
        {
            rendererIsRunning = true;
            self.renderLoop();
        }
    }

    // stop rendering loop (does not stop the current rendering process)
    self.stopRender = function ()
    {
        jSelf.trigger("onStopRender");
        rendererIsRunning = false;
    }

    // render at least once after finishing initialization to let PIXI 
    // build up the canvas with correct sizes
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