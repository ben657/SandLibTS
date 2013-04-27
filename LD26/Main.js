/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="GameScene.ts"/>
var LD;
(function (LD) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = 960;
            canvas.height = 540;
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.debugTextCol = "#FFFFFF";
            SandLib.Engine.init(new LD.GameScene(), canvas);
        }
        return Main;
    })();
    LD.Main = Main;    
})(LD || (LD = {}));
new LD.Main();
//@ sourceMappingURL=Main.js.map
