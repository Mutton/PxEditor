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
    $( renderer ).on("render", function (event)
    {
        console.log("BAAAAM");
    })

    var sceneGraph = new SceneGraph();
    self.getSceneGraph = function () { return sceneGraph; };

    var lastTimeoutDiff = 0;
    var lastRenderTime = new Date().getTime();
    var renderTimeout;
    var tweakedRenderTimeout;
    var renderFPS;
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
        // renderer.resize(renderer.width + 5, renderer.height + 5);
        renderer.render(sceneGraph.rootStage);
    }

    self.renderLoop = function ()
    {
        console.log(counter); counter += 1; if (counter > 10) { self.stop(); return; }

        if (!isRunning){ return; }

        var now = new Date().getTime();
        self.render();

        var timeoutDiff = now - lastRenderTime;
        var deltaDiff = timeoutDiff - lastTimeoutDiff;
        var actualFPS = 1 / (timeoutDiff / 1000);
        tweakedRenderTimeout = renderTimeout + (renderTimeout - timeoutDiff) + (0 * deltaDiff);

        console.log("lastRenderTime: " + lastRenderTime);
        console.log("timeoutDiff: " + timeoutDiff);
        console.log("deltaDiff: " + deltaDiff);
        console.log("actualFPS: " + actualFPS);
        console.log("tweakedRenderTimeout: " + tweakedRenderTimeout);
        // console.log(tweakedRenderTimeout + " | " + actualFPS + " | " + timeoutDiff);

        lastRenderTime = now;
        lastTimeoutDiff = timeoutDiff;

        setTimeout(self.renderLoop, tweakedRenderTimeout);
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