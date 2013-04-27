/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>

/// <reference path="GameScene.ts"/>

module LD {
    export class Platform extends SandLib.Entity {

        imageDat: ImageData;
        width: number = 0;
        height:number = 0;

        constructor(x: number, y: number, width:number,height:number, color:SandLib.Color) {
            super(x, y);
            this.width = width;
            this.height = height;
            this.imageDat = SandLib.Engine.context.createImageData(width, height);
            for (var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = color.r;
                this.imageDat.data[i + 1] = color.g;
                this.imageDat.data[i + 2] = color.b;
                this.imageDat.data[i + 3] = color.a;
            }
        }

        update() {
            
        }

        getHitBox() {
            return new SandLib.HitBox(this.x, this.y, this.width, this.height);
        }

        draw() {
            if (this.isOnScreen()) {
                if ((GameScene.player.y + GameScene.player.getHitBox().height) - this.y > 8 && this.x - (GameScene.player.x + GameScene.player.getHitBox().width) < 1 && this.x - GameScene.player.x >= 0) {
                    GameScene.player.velocity.x = -10;
                }        
                if (this.getHitBox().isHitboxIntersecting(GameScene.player.getHitBox())) {
                    GameScene.player.y = this.y - GameScene.player.getHitBox().height;
                    GameScene.player.velocity.y = 0;
                    GameScene.player.onGround = true;
                }                
            }
            if (this.isOnScreen()) {
                SandLib.Engine.context.putImageData(this.imageDat, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
            }
        }
    }
}