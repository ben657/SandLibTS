/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/Core/EntityText.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>

/// <reference path="Player.ts"/>
/// <reference path="Platform.ts"/>
/// <reference path="Coin.ts"/>

module LD {
    export class GameScene extends SandLib.Scene {
        
        static player: Player;
        static moneyLbl: SandLib.EntityText;

        endX = 0;
        lastY = 500;
        maxY = 530;
        minY = 400;

        platformCol: SandLib.Color = { r: 255, g: 255, b: 255, a: 255 };

        constructor() {
            super();            
        }

        init() {
            GameScene.player = new Player(10, this.lastY - 32);
            GameScene.moneyLbl = new SandLib.EntityText(0, 0, "Coins: 0", 20, { r: 255, g: 255, b: 255, a: 0 });
            GameScene.moneyLbl.hidden = true;

            var platformWidth: number = Math.random() * 100 + 300;            
            this.add(new Platform(this.endX, this.lastY, platformWidth, 40, Platform.LOC_BOTTOM, this.platformCol));
            this.add(new Platform(this.endX, 0, platformWidth, 40, Platform.LOC_TOP ,this.platformCol));
            this.add(GameScene.player);
            this.add(GameScene.moneyLbl);
        }

        static flashMoneyLbl() {
            GameScene.moneyLbl.textCol.a = 1;
            GameScene.moneyLbl.hidden = false;
            GameScene.moneyLbl.text = "Coins: "+GameScene.player.coins;
        }

        update() {
            super.update();
            if (this.endX < SandLib.Engine.width + SandLib.Engine.currentScene.camera.x) {
                this.generatePlatform();
            }

            if (GameScene.moneyLbl.textCol.a > 0) {
                GameScene.moneyLbl.textCol.a -= 0.02;
                console.log(GameScene.moneyLbl.textCol.a);                
                GameScene.moneyLbl.x = GameScene.player.x - 10;
                if (GameScene.player.gravity < 0) {
                    GameScene.moneyLbl.y = GameScene.player.y + 50;
                }
                else {
                    GameScene.moneyLbl.y = GameScene.player.y - 8;
                }
            }
            if (GameScene.moneyLbl.textCol.a <= 0) {
                GameScene.moneyLbl.hidden = true;
            }
        }

        generatePlatform() {
            var topHasCoins: bool = Math.random() <= 0.3;
            var bottomHasCoins: bool = Math.random() <= 0.3;
            var platformWidth: number = Math.random() * 200 + 300 + GameScene.player.velocity.x * 0.15;
            var minGap: number = 0;
            var speedMult: number = 0.7;
            if (GameScene.player.velocity.x * speedMult < 100) { minGap = 100; }
            else { minGap = GameScene.player.velocity.x * speedMult; }
            var gap: number = Math.random() * 150 + minGap;
            var height: number = SandLib.Engine.height - this.lastY;
            var pTop: Platform = new Platform(this.endX + gap, this.lastY, platformWidth, height, Platform.LOC_BOTTOM, this.platformCol);
            var pBottom: Platform = new Platform(this.endX + gap, 0, platformWidth, height, Platform.LOC_TOP, this.platformCol);
            this.add(pTop);
            this.add(pBottom);
            if (topHasCoins) { pTop.addCoins(); }
            if (bottomHasCoins) { pBottom.addCoins(); }
            this.lastY = Math.random() * 100 + this.lastY - 50;
            this.endX += gap + platformWidth;
            if (this.lastY > this.maxY) { this.lastY = this.maxY; }
            if (this.lastY < this.minY) { this.lastY = this.minY; }            
        }
    }
}