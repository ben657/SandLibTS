/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="MainScene.ts"/>
//document.onload = function {
//    var g: TestGame.TestGame = new TestGame.TestGame();
//}
var TestGame;
(function (TestGame) {
    var Main = (function () {
        function Main() {
            var canvas = document.getElementById("canvas");
            var initScene = new TestGame.MainScene();
            SandLib.Engine.init(initScene, canvas);
        }
        return Main;
    })();
    TestGame.Main = Main;    
})(TestGame || (TestGame = {}));
var game = new TestGame.Main();
//@ sourceMappingURL=TestGame.js.map
