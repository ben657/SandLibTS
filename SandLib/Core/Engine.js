/// <reference path="Scene.ts"/>
/// <reference path="Input.ts"/>
var SandLib;
(function (SandLib) {
    var Engine = (function () {
        function Engine() { }
        Engine.debugText = {
        };
        Engine.debugTextCol = "#FF0000";
        Engine.images = {
        };
        Engine.width = 0;
        Engine.height = 0;
        Engine.fillColor = "#AAAAAA";
        Engine.hasTouchScreen = false;
        Engine.lastUpdate = Date.now();
        Engine.timeInterval = 0;
        Engine.update = function update() {
            Engine.timeInterval = (Date.now() - Engine.lastUpdate) / 1000;
            Engine.lastUpdate = Date.now();
            SandLib.Input.update();
            Engine.currentScene.update();
            Engine.draw();
            if(window.requestAnimationFrame != null) {
                requestAnimationFrame(Engine.update);
            }
            Engine.debugText["Interval"] = Engine.timeInterval.toString();
        };
        Engine.init = function init(initialScene, canvas, fps) {
            if (typeof fps === "undefined") { fps = 60; }
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Engine.width = canvas.width;
            Engine.height = canvas.height;
            if(!!("ontouchstart" in window) || !!("onmsgesturechange" in window)) {
                Engine.hasTouchScreen = true;
            }
            SandLib.Input.init();
            Engine.currentScene.init();
            if(window.requestAnimationFrame != null) {
                requestAnimationFrame(Engine.update);
            } else {
                setInterval(Engine.update, (1 / fps) * 1000);
            }
        };
        Engine.getImage = function getImage(path) {
            var img = this.images[path];
            if(img == null) {
                img = new Image();
                img.src = path;
                img.addEventListener("load", function () {
                    Engine.images[path] = img;
                });
            }
            return img;
        };
        Engine.setScene = function setScene(scene) {
            Engine.currentScene.end();
            Engine.currentScene = scene;
            Engine.currentScene.init();
        };
        Engine.normalizeVector = function normalizeVector(vector) {
            var length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
            if(length == 0) {
                return {
                    x: 0,
                    y: 0
                };
            }
            var newVector = {
                x: vector.x / length,
                y: vector.y / length
            };
            return newVector;
        };
        Engine.draw = function draw() {
            Engine.context.save();
            Engine.context.setTransform(1, 0, 0, 1, 0, 0);
            Engine.context.fillStyle = Engine.fillColor;
            Engine.context.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height);
            Engine.context.restore();
            Engine.currentScene.draw();
            Engine.context.fillStyle = Engine.debugTextCol;
            Engine.context.font = "20px Arial";
            Engine.context.textAlign = "left";
            var i = 0;
            for(var key in Engine.debugText) {
                Engine.context.fillText(key + ": " + Engine.debugText[key], 5, (i + 1) * 20);
                i++;
            }
        };
        return Engine;
    })();
    SandLib.Engine = Engine;    
})(SandLib || (SandLib = {}));
//@ sourceMappingURL=Engine.js.map
