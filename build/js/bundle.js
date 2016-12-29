(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const BLA = require("./testModule");

BLA();
},{"./testModule":3}],2:[function(require,module,exports){
// const $ = require("jquery");
const TM = require("./testModule")
const AM = require("./anotherModule")

console.log(TM);
TM();
},{"./anotherModule":1,"./testModule":3}],3:[function(require,module,exports){
const txt = "Bla!";

function bla () { console.log(txt); }

module.exports = bla;
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL3RvcnBlL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInJlc291cmNlcy9qcy9hbm90aGVyTW9kdWxlLmpzIiwicmVzb3VyY2VzL2pzL21haW4uanMiLCJyZXNvdXJjZXMvanMvdGVzdE1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBCTEEgPSByZXF1aXJlKFwiLi90ZXN0TW9kdWxlXCIpO1xyXG5cclxuQkxBKCk7IiwiLy8gY29uc3QgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XHJcbmNvbnN0IFRNID0gcmVxdWlyZShcIi4vdGVzdE1vZHVsZVwiKVxyXG5jb25zdCBBTSA9IHJlcXVpcmUoXCIuL2Fub3RoZXJNb2R1bGVcIilcclxuXHJcbmNvbnNvbGUubG9nKFRNKTtcclxuVE0oKTsiLCJjb25zdCB0eHQgPSBcIkJsYSFcIjtcclxuXHJcbmZ1bmN0aW9uIGJsYSAoKSB7IGNvbnNvbGUubG9nKHR4dCk7IH1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYmxhOyJdfQ==
