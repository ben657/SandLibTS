/// <reference path="Scene.ts"/>
/// <reference path="Input.ts"/>
var SandLib;
(function (SandLib) {
    var Engine = (function () {
        function Engine() { }
        Engine.images = {
        };
        Engine.update = function update() {
            SandLib.Input.update();
            Engine.currentScene.update();
            Engine.draw();
            requestAnimationFrame(Engine.update);
        };
        Engine.init = function init(initialScene, canvas) {
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            SandLib.Input.init();
            requestAnimationFrame(Engine.update);
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
            Engine.context.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);
            Engine.context.restore();
            Engine.currentScene.draw();
        };
        return Engine;
    })();
    SandLib.Engine = Engine;    
})(SandLib || (SandLib = {}));
//@ sourceMappingURL=Engine.js.map
