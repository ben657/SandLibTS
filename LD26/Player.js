var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/EntityMoving.ts"/>
/// <reference path="Weapon.ts"/>
var LD;
(function (LD) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(x, y) {
                _super.call(this, x, y);
            this.rotSpeed = 300;
            this.movSpeed = 200;
            this.weapons = new Array();
            this.image = SandLib.Engine.getImage("LD26/player.png");
            var hb = this.getHitBox();
            this.originX = 100;
            this.originY = hb.height / 2;
            var weapon = new LD.Weapon(this);
            //SandLib.Engine.currentScene.add(weapon);
                    }
        Player.prototype.update = function () {
            SandLib.Engine.debugText["Player"] = this.x + ":" + this.y;
            var interval = SandLib.Engine.timeInterval;
            if(SandLib.Input.isKeyDown(39)) {
                this.rotation += this.rotSpeed * interval;
            }
            if(SandLib.Input.isKeyDown(37)) {
                this.rotation -= this.rotSpeed * interval;
            }
            //W:87 S:83 A:65 D:68
            this.velocity = {
                x: 0,
                y: 0
            };
            if(SandLib.Input.isKeyDown(87)) {
                this.velocity.y = -this.movSpeed * interval;
            }
            if(SandLib.Input.isKeyDown(83)) {
                this.velocity.y = this.movSpeed * interval;
            }
            if(SandLib.Input.isKeyDown(65)) {
                this.velocity.x = -this.movSpeed * interval;
            }
            if(SandLib.Input.isKeyDown(68)) {
                this.velocity.x = this.movSpeed * interval;
            }
            _super.prototype.update.call(this);
        };
        Player.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, 32, 32);
        };
        return Player;
    })(SandLib.EntityMoving);
    LD.Player = Player;    
})(LD || (LD = {}));
//@ sourceMappingURL=Player.js.map
