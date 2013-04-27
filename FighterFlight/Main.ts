/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>

/// <reference path="GameScene.ts"/>

module FF {

    export class Main {

        constructor() {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            //canvas.id = "canvas";
            document.body.appendChild(canvas);

            var initialScene: SandLib.Scene = new GameScene();
            SandLib.Engine.init(initialScene, canvas);            
        }
    }
}

new FF.Main();