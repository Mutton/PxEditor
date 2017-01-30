define ([
    "PIXI"
], function (
    PIXI
){

    var SceneGraph = function (name)
    {
        var self = this;

        // unique identifier / name for the stage (not controlled for now)
        var name = name;
        self.getName = function () { return name; }
        self.setName = function (value) { name = value; }

        // pixi container / stage on which operations are applied on
        var stage = new PIXI.Container();
        self.getStage = function () { return stage; }

        // parent nodes / graphs
        var parents = new Array();
        self.getParents = function () { return parents; }
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
        self.getChildren = function () { return children; }
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

    // search for child-nodes with the specified name by going down 
    // the graph hierarchy by the given amount of searchLevel (0 == only local children)
    SceneGraph.childrenByName = function (sceneGraph, childName, searchLevel = 0, matches = new Array())
    {
        var subMatches;
        // abort if no search should be conducted according to searchLevel
        if (searchLevel < 0) { return matches; }

        var i;
        var children = sceneGraph.getChildren();
        for (i = 0; i < children.length; i++)
        {
            if (children[i].getName() === childName) 
            {
                // normale match on searchLevel 0
                matches.push(children[i]); 
            }
            if (searchLevel > 0)
            {
                // search deeper down if desired searchLevel is sufficient
                subMatches = SceneGraph.childrenByName(children[i], childName, searchLevel - 1, matches);
                matches.concat(subMatches);
            }
        }
        return matches;
    }

    return SceneGraph;

});