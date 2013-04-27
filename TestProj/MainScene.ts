/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>

module TG {
    export class MainScene extends SandLib.Scene {

        constructor() {
            super();
        }

        init() {
            var button: SandLib.Button = new SandLib.Button(10, 100, 50, 100, "Text", { r: 255, g: 0, b: 0, a: 255 }, null, function {
                console.log("ran");
            });
            this.add(button);
        }
    }
}