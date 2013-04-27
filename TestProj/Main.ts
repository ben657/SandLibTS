/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>

/// <reference path="MainScene.ts"/>

module TG {
    export class Main {
        constructor() {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            document.body.appendChild(canvas);

            SandLib.Engine.init(new MainScene(), canvas);
        }
    }
}

new TG.Main();