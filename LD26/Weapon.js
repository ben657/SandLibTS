var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>
/// <reference path="Player.ts"/>
var LD;
(function (LD) {
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(player) {
                _super.call(this, 0, 0);
            this.player = player;
            this.image = SandLib.Engine.getImage("LD26/cannon.png");
        }
        Weapon.prototype.update = function () {
            this.rotation = this.player.rotation;
            this.x = (this.player.x - this.getHitBox().width / 2) + this.player.getHitBox().width / 2;
            this.y = this.player.y - this.player.getHitBox().height / 2;
            this.originX = (this.player.x + this.player.originX) - (this.x + this.getHitBox().width / 2);
            console.log((this.player.y + this.player.originY) - (this.y + this.getHitBox().height));
            this.originY = (this.player.y + this.player.originY) - (this.y + this.getHitBox().height);
        };
        Weapon.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, 4, 16);
        };
        return Weapon;
    })(SandLib.Entity);
    LD.Weapon = Weapon;    
})(LD || (LD = {}));
//@ sourceMappingURL=Weapon.js.map
