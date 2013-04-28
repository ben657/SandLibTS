/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>

/// <reference path="MainMenu.ts"/>

module LD {
    export class Main {

        static jumpSnd: HTMLAudioElement = new Audio("LD26/jump.mp3");
        static landSnd: HTMLAudioElement = new Audio("LD26/land.mp3");
        static coinSnd: HTMLAudioElement = new Audio("LD26/coin.mp3");
        static mainSnd: HTMLAudioElement = new Audio("LD26/main.mp3");

        constructor() {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
            canvas.width = 1024;
            canvas.height = 540;
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.debugTextCol = "#FFFFFF";
            SandLib.Engine.init(new MainMenu(), canvas);
        }
    }
}

new LD.Main();