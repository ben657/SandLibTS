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
            this.gravity = 2350;
            this.jumpPow = 1000;
            this.jumpBoost = 1.2;
            this.accel = 50;
            this.maxVel = 1500;
            this.decel = 20;
            this.coins = 0;
            this.cameraMoveZone = 100;
            this.onGround = true;
            this.image = SandLib.Engine.getImage("LD26/player.png");
            //this.image.width = this.image.height = 32;
            var hb = this.getHitBox();
            this.originX = hb.width / 2;
            this.originY = hb.height / 2;
            this.velocity.x = 300;
            SandLib.Input.registerCheat(this.cheatato, function () {
                LD.GameScene.player.image = SandLib.Engine.getImage("LD26/potato.png");
            });
        }
        Player.prototype.update = function () {
            //W:87 S:83 A:65 D:68
            if(SandLib.Input.isKeyJustDown(16)) {
                this.gravity *= -1;
                this.jumpPow *= -1;
            }
            this.velocity.y += this.gravity * SandLib.Engine.timeInterval;
            this.velocity.x += this.accel * SandLib.Engine.timeInterval;
            if(this.velocity.x > this.maxVel) {
                this.velocity.x -= this.decel;
            }
            if(this.x > this.cameraMoveZone) {
                SandLib.Engine.currentScene.camera.x = this.x - this.cameraMoveZone;
            }
            var platforms = SandLib.Engine.currentScene.getAll(LD.Platform, true);
            for(var i in platforms) {
                var p = platforms[i];
                if(p.location == LD.Platform.LOC_BOTTOM) {
                    if(p.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                        this.y = p.y - this.getHitBox().height;
                        if(!this.onGround) {
                            LD.Main.landSnd.play();
                        }
                        this.onGround = true;
                        this.velocity.y = 0;
                    } else if(this.y + this.getHitBox().height > p.y && this.x < p.x + p.getHitBox().width && this.x + this.getHitBox().width + this.velocity.x * SandLib.Engine.timeInterval >= p.x) {
                        this.velocity.x = 0;
                        this.onGround = false;
                    }
                } else if(p.location == LD.Platform.LOC_TOP) {
                    if(p.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                        this.y = p.y + p.getHitBox().height;
                        if(!this.onGround) {
                            LD.Main.landSnd.play();
                        }
                        this.onGround = true;
                        this.velocity.y = 0;
                    } else if(this.y < p.y + p.getHitBox().height && this.x < p.x + p.getHitBox().width && this.x + this.getHitBox().width + this.velocity.x * SandLib.Engine.timeInterval >= p.x) {
                        this.velocity.x = 0;
                        this.onGround = false;
                    }
                }
            }
            if(SandLib.Input.isKeyJustDown(32) && this.onGround) {
                this.velocity.y -= this.jumpPow;
                this.velocity.x *= this.jumpBoost;
                this.onGround = false;
                LD.Main.jumpSnd.play();
            }
            if(this.y > 800 || this.y < -800) {
                this.die();
            }
            _super.prototype.update.call(this);
        };
        Player.prototype.die = function () {
            if(this.coins > LD.MainMenu.hiScore) {
                localStorage.setItem("hiScore", this.coins.toString());
            }
            SandLib.Engine.setScene(new LD.MainMenu());
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
