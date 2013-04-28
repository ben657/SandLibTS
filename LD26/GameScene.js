var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/Core/EntityText.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Platform.ts"/>
/// <reference path="Coin.ts"/>
var LD;
(function (LD) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
                _super.call(this);
            this.endX = 0;
            this.lastY = 500;
            this.maxY = 530;
            this.minY = 400;
            this.platformCol = {
                r: 255,
                g: 255,
                b: 255,
                a: 255
            };
        }
        GameScene.prototype.init = function () {
            GameScene.player = new LD.Player(10, this.lastY - 32);
            GameScene.moneyLbl = new SandLib.EntityText(0, 0, "Coins: 0", 20, {
                r: 255,
                g: 255,
                b: 255,
                a: 0
            });
            GameScene.moneyLbl.hidden = true;
            var platformWidth = Math.random() * 100 + 300;
            this.add(new LD.Platform(this.endX, this.lastY, platformWidth, 40, LD.Platform.LOC_BOTTOM, this.platformCol));
            this.add(new LD.Platform(this.endX, 0, platformWidth, 40, LD.Platform.LOC_TOP, this.platformCol));
            this.add(GameScene.player);
            this.add(GameScene.moneyLbl);
        };
        GameScene.flashMoneyLbl = function flashMoneyLbl() {
            GameScene.moneyLbl.textCol.a = 1;
            GameScene.moneyLbl.hidden = false;
            GameScene.moneyLbl.text = "Coins: " + GameScene.player.coins;
        };
        GameScene.prototype.update = function () {
            _super.prototype.update.call(this);
            if(this.endX < SandLib.Engine.width + SandLib.Engine.currentScene.camera.x) {
                this.generatePlatform();
            }
            if(GameScene.moneyLbl.textCol.a > 0) {
                GameScene.moneyLbl.textCol.a -= 0.02;
                console.log(GameScene.moneyLbl.textCol.a);
                GameScene.moneyLbl.x = GameScene.player.x - 10;
                if(GameScene.player.gravity < 0) {
                    GameScene.moneyLbl.y = GameScene.player.y + 50;
                } else {
                    GameScene.moneyLbl.y = GameScene.player.y - 8;
                }
            }
            if(GameScene.moneyLbl.textCol.a <= 0) {
                GameScene.moneyLbl.hidden = true;
            }
        };
        GameScene.prototype.generatePlatform = function () {
            var topHasCoins = Math.random() <= 0.3;
            var bottomHasCoins = Math.random() <= 0.3;
            var platformWidth = Math.random() * 200 + 300 + GameScene.player.velocity.x * 0.15;
            var minGap = 0;
            var speedMult = 0.7;
            if(GameScene.player.velocity.x * speedMult < 100) {
                minGap = 100;
            } else {
                minGap = GameScene.player.velocity.x * speedMult;
            }
            var gap = Math.random() * 150 + minGap;
            var height = SandLib.Engine.height - this.lastY;
            var pTop = new LD.Platform(this.endX + gap, this.lastY, platformWidth, height, LD.Platform.LOC_BOTTOM, this.platformCol);
            var pBottom = new LD.Platform(this.endX + gap, 0, platformWidth, height, LD.Platform.LOC_TOP, this.platformCol);
            this.add(pTop);
            this.add(pBottom);
            if(topHasCoins) {
                pTop.addCoins();
            }
            if(bottomHasCoins) {
                pBottom.addCoins();
            }
            this.lastY = Math.random() * 100 + this.lastY - 50;
            this.endX += gap + platformWidth;
            if(this.lastY > this.maxY) {
                this.lastY = this.maxY;
            }
            if(this.lastY < this.minY) {
                this.lastY = this.minY;
            }
        };
        return GameScene;
    })(SandLib.Scene);
    LD.GameScene = GameScene;    
})(LD || (LD = {}));
//@ sourceMappingURL=GameScene.js.map
