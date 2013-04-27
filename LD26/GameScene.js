var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
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
                r: 200,
                g: 200,
                b: 200,
                a: 255
            };
        }
        GameScene.prototype.init = function () {
            GameScene.player = new LD.Player(10, 320);
            var platformWidth = Math.random() * 100 + 300;
            this.add(new LD.Platform(this.endX, this.lastY, platformWidth, 200, this.platformCol));
            this.add(GameScene.player);
        };
        GameScene.prototype.update = function () {
            _super.prototype.update.call(this);
            if(this.endX < SandLib.Engine.width + SandLib.Engine.currentScene.camera.x) {
                this.generatePlatform();
            }
        };
        GameScene.prototype.generatePlatform = function () {
            var hasCoins = Math.random() <= 0.5;
            var platformWidth = Math.random() * 100 + 300;
            var gap = Math.random() * 200 + 100;
            this.add(new LD.Platform(this.endX + gap, this.lastY, platformWidth, 200, this.platformCol));
            if(hasCoins) {
                console.log("ran");
                var numCoins = Math.round(platformWidth / 30);
                for(var i = 0; i < numCoins; i++) {
                    this.add(new LD.Coin(this.endX + gap + i * 30 + 6, this.lastY - 17));
                }
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
