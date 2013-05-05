/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>

/// <reference path="MainScene.ts"/>

module Particles {
    export class Main {

        static jumpSnd: HTMLAudioElement = new Audio("LD26/jump.mp3");
        static landSnd: HTMLAudioElement = new Audio("LD26/land.mp3");
        static coinSnd: HTMLAudioElement = new Audio("LD26/coin.mp3");
        static mainSnd: HTMLAudioElement = new Audio("LD26/main.mp3");

        constructor() {
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
            canvas.innerText = "Canvas not supported.";
            
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.debugTextCol = "#FF0000";
            SandLib.Engine.init(new MainScene(), canvas);
        }
    }
}

new Particles.Main();