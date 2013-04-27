/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>

/// <reference path="GameScene.ts"/>

module LD {
    export class Main {
        constructor() {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
            canvas.width = 960;
            canvas.height = 540;
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.init(new GameScene(), canvas);
        }
    }
}

new LD.Main();