/// <reference path="Scene.ts"/>
/// <reference path="Input.ts"/>
var SandLib;
(function (SandLib) {
    var Engine = (function () {
        function Engine() { }
        Engine.debugText = {
        };
        Engine.images = {
        };
        Engine.width = 0;
        Engine.height = 0;
        Engine.fillColor = "#AAAAAA";
        Engine.lastUpdate = new Date();
        Engine.timeInterval = 0;
        Engine.update = function update() {
            var now = new Date();
            Engine.timeInterval = (now.getTime() - Engine.lastUpdate.getTime()) / 1000;
            Engine.lastUpdate = now;
            SandLib.Input.update();
            Engine.currentScene.update();
            Engine.draw();
            Engine.debugText["Interval"] = Engine.timeInterval.toString();
            //requestAnimationFrame(update);
                    };
        Engine.init = function init(initialScene, canvas) {
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Engine.width = canvas.width;
            Engine.height = canvas.height;
            SandLib.Input.init();
            Engine.currentScene.init();
            setInterval(Engine.update, 16);
        };
        Engine.initTouch = function initTouch() {
            SandLib.Input.preventTouchDefault = true;
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
        Engine.draw = function draw() {
            Engine.context.save();
            Engine.context.setTransform(1, 0, 0, 1, 0, 0);
            Engine.context.fillStyle = Engine.fillColor;
            Engine.context.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height);
            Engine.context.restore();
            Engine.currentScene.draw();
            Engine.context.fillStyle = "'#000000";
            Engine.context.font = "20px Arial";
            Engine.context.textAlign = "left";
            var i = 0;
            for(var key in Engine.debugText) {
                Engine.context.fillText(key + ": " + Engine.debugText[key], 5, (i + 1) * 20);
                //console.log(key + ": " + debugText[key]);
                i++;
            }
        };
        return Engine;
    })();
    SandLib.Engine = Engine;    
})(SandLib || (SandLib = {}));
//@ sourceMappingURL=Engine.js.map
