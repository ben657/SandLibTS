/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="MainScene.ts"/>
var TG;
(function (TG) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            document.body.appendChild(canvas);
            SandLib.Engine.init(new TG.MainScene(), canvas);
        }
        return Main;
    })();
    TG.Main = Main;    
})(TG || (TG = {}));
new TG.Main();
//@ sourceMappingURL=Main.js.map
