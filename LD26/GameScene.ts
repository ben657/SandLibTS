/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>

/// <reference path="Player.ts"/>
/// <reference path="Platform.ts"/>

module LD {
    export class GameScene extends SandLib.Scene {
        
        static player: Player;

        endX = 0;
        lastY = 500;
        maxY = 530;
        minY = 400;

        platformCol: SandLib.Color = { r: 200, g: 200, b: 200, a: 255 };

        constructor() {
            super();
        }

        init() {
            GameScene.player = new Player(10, 320);

            var platformWidth: number = Math.random() * 100 + 300;            
            this.add(new Platform(this.endX, this.lastY, platformWidth, 200, this.platformCol));
            this.add(GameScene.player);           
        }                

        update() {
            super.update();
            if (this.endX < SandLib.Engine.width + SandLib.Engine.currentScene.camera.x) {
                this.generatePlatform();
            }
        }

        generatePlatform() {
            var platformWidth:number = Math.random() * 100 + 300;
            var gap: number = Math.random() * 200 + 100;            
            this.add(new Platform(this.endX + gap, this.lastY, platformWidth, 200, this.platformCol));
            this.lastY = Math.random() * 100 + this.lastY - 50;
            this.endX += gap + platformWidth;
            if (this.lastY > this.maxY) { this.lastY = this.maxY; }
            if (this.lastY < this.minY) { this.lastY = this.minY; }
        }
    }
}