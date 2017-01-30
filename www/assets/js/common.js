requirejs.config({
    // root directory for requirejs
    baseUrl: "assets/js",
    // reference all external libraries (multiple sources possible as failsafe)
    paths: {
        jquery: [
            "https://code.jquery.com/jquery-3.1.1.min",
            "lib/jquery-3.1.1.min"
        ],
        PIXI: [
            "lib/pixi.min"
        ],
    },
    shim: {
        "page/main": { deps: ["jquery", "PIXI"] }
    }
});

require([
    "jquery",
    "PIXI"
]);