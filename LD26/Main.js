/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="MainMenu.ts"/>
var LD;
(function (LD) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = 1024;
            canvas.height = 540;
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.debugTextCol = "#FF0000";
            SandLib.Engine.init(new LD.MainMenu(), canvas);
        }
        Main.jumpSnd = new Audio("LD26/jump.mp3");
        Main.landSnd = new Audio("LD26/land.mp3");
        Main.coinSnd = new Audio("LD26/coin.mp3");
        Main.mainSnd = new Audio("LD26/main.mp3");
        return Main;
    })();
    LD.Main = Main;    
})(LD || (LD = {}));
new LD.Main();
//@ sourceMappingURL=Main.js.map
