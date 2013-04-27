/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="GameScene.ts"/>
var FF;
(function (FF) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            //canvas.id = "canvas";
            document.body.appendChild(canvas);
            var initialScene = new FF.GameScene();
            SandLib.Engine.init(initialScene, canvas);
        }
        return Main;
    })();
    FF.Main = Main;    
})(FF || (FF = {}));
new FF.Main();
//@ sourceMappingURL=Main.js.map
