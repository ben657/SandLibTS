/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="MainScene.ts"/>
var Particles;
(function (Particles) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
            canvas.innerText = "Canvas not supported.";
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.debugTextCol = "#FF0000";
            SandLib.Engine.init(new Particles.MainScene(), canvas);
        }
        Main.jumpSnd = new Audio("LD26/jump.mp3");
        Main.landSnd = new Audio("LD26/land.mp3");
        Main.coinSnd = new Audio("LD26/coin.mp3");
        Main.mainSnd = new Audio("LD26/main.mp3");
        return Main;
    })();
    Particles.Main = Main;    
})(Particles || (Particles = {}));
new Particles.Main();
//@ sourceMappingURL=Main.js.map
