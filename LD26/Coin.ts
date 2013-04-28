/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>
/// <reference path="../SandLib/Core/HitBox.ts"/>

/// <reference path="GameScene.ts"/>

module LD {
    export class Coin extends SandLib.Entity {
        constructor(x: number, y: number) {
            super(x, y);            
            this.image = SandLib.Engine.getImage("LD26/coin.png");
        }

        update() {
            if (this.isOnScreen()) {
                if (GameScene.player.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                    SandLib.Engine.currentScene.remove(this);
                    GameScene.player.coins++;
                    GameScene.flashMoneyLbl();
                    Main.coinSnd.play();
                }
            }
        }

        getHitBox() {
            return new SandLib.HitBox(this.x, this.y, 12, 16);
        }
    }
}