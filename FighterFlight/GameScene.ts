/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>

/// <reference path="Entities/PlayerJet.ts"/>

module FF {

    export class GameScene extends SandLib.Scene {

        player: PlayerJet;
        testBtn: SandLib.Button;

        constructor() {
            super();
            this.player = new PlayerJet(10, SandLib.Engine.height / 2);
            //this.add(this.player);
            console.log(SandLib.Engine.canvas == null);
            //this.testBtn = new SandLib.Button(10, 200, 100, 30, "aldja", { r: 255, b: 0, g: 0, a: 255 }, null);
            //this.add(this.testBtn);
        }
    }
}