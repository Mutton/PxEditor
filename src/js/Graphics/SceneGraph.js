const PIXI = require("pixi.js");

var SceneGraph = function (name)
{
    var self = this;

    // pixi container / stage on which operations are applied on
    var stage = new PIXI.Container();
    self.getStage = function () { return stage; }

    // parent nodes / graphs
    var parents = new Array();
    // add to own parents-array as well as the PIXI container / stage
    self.addParent = function (parent, duplicate = false)
    {
        if ((!duplicate) && (parents.indexOf(parent) != -1)) { return; }
        parents.push(parent);
        parent.addChild(self);
    }
    // remove from own parents-array as well as the PIXI container / stage
    self.removeParent = function (parent)
    {
        var i;
        for (i = parents.length - 1; i--;)
        {
            if (parents[i] === parent) 
            { 
                parents[i].removeChild(self);
                parents.splice(i, 1);
            }
        }
    }

    // child nodes / graphs
    var children = new Array();
    // add to own children-array as well as the PIXI container / stage
    self.addChild = function (child, duplicate = false)
    {
        if ((!duplicate) && (children.indexOf(child) != -1)) { return; }
        children.push(child);
        stage.addChild(child.getStage());
    }
    // remove from own children-array as well as the PIXI container / stage
    self.removeChild = function (child, removeAll = true)
    {
        var i;
        if (removeAll)
        {
            for (i = children.length - 1; i--;)
            {
                if (children[i] === child) 
                {
                    stage.removeChild(children[i].getStage());
                    children.splice(i, 1);
                }
            }
        }
        
    }

    return self;
}

module.exports = SceneGraph;