define([ ], function () 
{
    var module = function () {
    
        var self = this;

        var privateFunc = function () { console.log("privateFunc") };
        self.publicFunc = function () { console.log("publicFunc"); };

        return self;

    };

    module.staticFunc = function () { console.log("staticFunc"); }


    // var module = (function () {
    
    //     var self = this;

    //     self.gotcha = function () { alert("GOTCHA"); };

    //     return self;

    // })();

    return module;
});