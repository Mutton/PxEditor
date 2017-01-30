define([ ], function () 
{

    var module = function () {
    
        var self = this;

        var privateFunc = function () { console.log("???") };
        self.publicFunc = function () { console.log("!!!"); };

        return self;

    };

    module.staticFunc = function () { console.log(":)"); }


    // var module = (function () {
    
    //     var self = this;

    //     self.gotcha = function () { alert("GOTCHA"); };

    //     return self;

    // })();

    return module;
});