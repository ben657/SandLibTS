/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>

/// <reference path="Player.ts"/>

module LD {
    export class GameScene extends SandLib.Scene {

        player: Player;

        constructor() {
            super();
        }

        init() {
            this.player = new Player(10, 320);
            this.add(this.player);
        }

        update() {
            super.update();
            
        }
    }
}