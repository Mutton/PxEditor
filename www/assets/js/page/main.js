require([
    // external modules
    "jquery",
    "PIXI",

    // internal modules
    "page/TESTS/Test",
    "page/Events/EventBus",
    "page/Events/EventProtocol",
    "page/Graphics/GraphicsWindow",
    "page/Graphics/SceneGraph",
    "page/Utilities/Utilities"
], function (
    // external modules
    $,
    PIXI,

    // internal modules
    Test,
    EventBus,
    EventProtocol,
    GraphicsWindow,
    SceneGraph,
    Utilities
){

    var jWindow = $( window );
    var jBody = $( "body" ); 

    var jDiv = $( '<div></div>' );
    jBody.append( jDiv );
    var gw = new GraphicsWindow( jDiv[0], 200, 200, { backgroundColor : 0x999999 } );
    gw.loopTimeout = 500;
    gw.startRender();

    var basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = 30;
    basicText.y = 90;
    gw.getSceneGraph().getStage().addChild(basicText);




    // var eb = new EventBus();
    // var a1 = "ring.ding.dong";
    // var a2 = "George Bush";
    // var f1 = new function(eventProtocol) 
    // {
    //     console.log("WOOO " + eventProtocol);
    // };
    // var f2 = new function(eventProtocol) 
    // {
    //     console.log("HOOO " + eventProtocol);
    // };
    // var r = new function(eventProtocol)
    // {
    //     console.log("Message received! " + eventProtocol);
    // };

    // eb.subscribe(a1, f1);
    // eb.subscribe(a2, f1);
    // eb.subscribe(a1, f2);
    // eb.publish(new EventProtocol(document, a1, (new Date()).getTime(), { }), r);
    // eb.publish(new EventProtocol(document, a2, (new Date()).getTime(), { }), r);

    // eb.unsubscribe(a1, f1);
    // eb.publish(new EventProtocol(document, a1, (new Date()).getTime(), { }), r);

});








// var someArr = new Array(); someArr.push(2); someArr.push("good"); 
//     someArr.push(2); someArr.push("be"); someArr.push(true);
//     someArr._marker = "bla";

// console.log(someArr._marker);
// console.log(someArr.indexOf(true));
// console.log(someArr.indexOf(false));

// for (var i = 0; i < someArr.length; i++) { console.log(someArr[i]); }


// const TM = require("./testModule")
// const AM = require("./anotherModule")
// const PIXI = require("pixi.js");

// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
// document.body.appendChild(renderer.view);

// // create the root of the scene graph
// var stage = new PIXI.Container();

// var basicText = new PIXI.Text('Basic text in pixi');
// basicText.x = 30;
// basicText.y = 90;

// stage.addChild(basicText);

// var style = {
//     fontFamily : 'Arial',
//     fontSize : '36px',
//     fontStyle : 'italic',
//     fontWeight : 'bold',
//     fill : '#F7EDCA',
//     stroke : '#000000', // 4a1850
//     strokeThickness : 5,
//     dropShadow : true,
//     dropShadowColor : '#000000',
//     dropShadowAngle : Math.PI / 6,
//     dropShadowDistance : 6,
//     wordWrap : true,
//     wordWrapWidth : 440
// };

// var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines',style);
// richText.x = 30;
// richText.y = 180;

// stage.addChild(richText);

// // start animating
// animate();

// function animate() {

//     requestAnimationFrame(animate);

//     // render the root container
//     renderer.render(stage);
// }