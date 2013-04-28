var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>
/// <reference path="../SandLib/Core/HitBox.ts"/>
/// <reference path="GameScene.ts"/>
var LD;
(function (LD) {
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin(x, y) {
                _super.call(this, x, y);
            this.image = SandLib.Engine.getImage("LD26/coin.png");
        }
        Coin.prototype.update = function () {
            if(this.isOnScreen()) {
                if(LD.GameScene.player.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                    SandLib.Engine.currentScene.remove(this);
                    LD.GameScene.player.coins++;
                    LD.GameScene.flashMoneyLbl();
                    LD.Main.coinSnd.play();
                }
            }
        };
        Coin.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, 12, 16);
        };
        return Coin;
    })(SandLib.Entity);
    LD.Coin = Coin;    
})(LD || (LD = {}));
//@ sourceMappingURL=Coin.js.map
