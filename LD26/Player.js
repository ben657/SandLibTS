var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/EntityMoving.ts"/>
/// <reference path="GameScene.ts"/>
var LD;
(function (LD) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(x, y) {
                _super.call(this, x, y);
            this.cheatato = [
                32, 
                32, 
                16, 
                32, 
                16
            ];
            this.gravity = 50;
            this.jumpPow = 1000;
            this.accel = 3;
            this.maxVel = 800;
            this.decel = 20;
            this.coins = 0;
            this.cameraMoveZone = 100;
            this.onGround = false;
            this.image = SandLib.Engine.getImage("LD26/player.png");
            this.image.width = this.image.height = 32;
            var hb = this.getHitBox();
            this.originX = hb.width / 2;
            this.originY = hb.height / 2;
            SandLib.Input.registerCheat(this.cheatato, function () {
                console.log("potato");
                LD.GameScene.player.image = SandLib.Engine.getImage("LD26/potato.png");
            });
        }
        Player.prototype.update = function () {
            SandLib.Engine.debugText["Coins"] = this.coins;
            //W:87 S:83 A:65 D:68
            this.velocity.y += this.gravity;
            if(SandLib.Input.isKeyJustDown(16)) {
                this.gravity *= -1;
                this.jumpPow *= -1;
            }
            if(SandLib.Input.isKeyJustDown(32) && this.onGround) {
                this.velocity.y -= this.jumpPow;
                this.onGround = false;
            }
            this.velocity.x += this.accel;
            if(this.velocity.x > this.maxVel) {
                this.velocity.x = this.maxVel;
            }
            if(this.x > this.cameraMoveZone) {
                SandLib.Engine.currentScene.camera.x = this.x - this.cameraMoveZone;
            }
            _super.prototype.update.call(this);
        };
        Player.prototype.draw = function () {
            _super.prototype.draw.call(this);
        };
        Player.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, this.image.height, this.image.width);
        };
        return Player;
    })(SandLib.EntityMoving);
    LD.Player = Player;    
})(LD || (LD = {}));
//@ sourceMappingURL=Player.js.map
