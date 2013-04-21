/// <reference path="../SandLib/Core/Engine.ts"/>

/// <reference path="MainScene.ts"/>

//document.onload = function {
//    var g: TestGame.TestGame = new TestGame.TestGame();
//}



module TestGame {
    export class Main{
        constructor() {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
            var initScene = new MainScene();
            SandLib.Engine.init(initScene, canvas);
        }
    }
}

var game = new TestGame.Main();