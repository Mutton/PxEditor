require(["bla/TestModule", "bli/AnotherModule"], function (TestModule, AnotherModule) 
{
    // Load any app-specific modules
    // with a relative require call,
    // like:
    // var TestModule = require('./bla/TestModule');


    console.log(TestModule);
    TestModule.staticFunc();
    var t = new TestModule();
    t.publicFunc();

    // TestModule.publicFunc();
    // AnotherModule.publicFunc();

    // Load library/vendor modules using
    // full IDs, like:
    // var print = require('print');

    
});