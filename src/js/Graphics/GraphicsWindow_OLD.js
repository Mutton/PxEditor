const $ = require("jquery");
const PIXI = require("pixi.js");
const SceneGraph = require("./SceneGraph");

class GraphicsWindow
{
    get jContainer () { return this._jContainer; }
    set jContainer (value) { this._jContainer = value; }

    get renderer () { return this._renderer; }
    set renderer (value) { this._renderer = value; }

    get sceneGraph () { return this._sceneGraph; }
    set sceneGraph (value) { this._sceneGraph = value; }

    get isRunning () { return this._isRunning; }
    set isRunning (value) { this._isRunning = value; }

    get loopTimeout () { return this._loopTimeout; }
    set loopTimeout (value) { this._loopTimeout = value; }

    static Create (jContainer)
    {
        var gw = new GraphicsWindow();

        gw.jContainer = jContainer;
        gw.renderer = PIXI.autoDetectRenderer(jContainer.innerWidth, jContainer.innerHeight, 
            { backgroundColor : 0xff0000 });
        jContainer.append(gw.renderer.view);
        gw.sceneGraph = SceneGraph.Create();
        gw.render();

        gw.isRunning = false;
        gw.loopTimeout = 5000;

        return gw;
    }

    render ()
    {
        this.renderer.render(this.sceneGraph.rootStage);
    }

    renderLoop ()
    {
        console.log(this);
        if (!this.isRunning){ return; }
        this.render();
        
        // setTimeout(this.renderLoop, this.loopTimeout);

        // setTimeout((function (self) 
        // {
        //     self.renderLoop(self);
        // }
        // (self)), self.loopTimeout);
        
        // setTimeout((function (self) {
        //     self.renderLoop();
        // }(self)), this.loopTimeout);
    }.bind(this);

    start ()
    {
        this.isRunning = true;
        this.renderLoop(this);
    }

    stop ()
    {
        this.isRunning = false;
    }

}

module.exports = GraphicsWindow;