var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>
/// <reference path="GameScene.ts"/>
var LD;
(function (LD) {
    var Platform = (function (_super) {
        __extends(Platform, _super);
        function Platform(x, y, width, height, color) {
                _super.call(this, x, y);
            this.width = 0;
            this.height = 0;
            this.width = width;
            this.height = height;
            this.imageDat = SandLib.Engine.context.createImageData(width, height);
            for(var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = color.r;
                this.imageDat.data[i + 1] = color.g;
                this.imageDat.data[i + 2] = color.b;
                this.imageDat.data[i + 3] = color.a;
            }
        }
        Platform.prototype.update = function () {
        };
        Platform.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, this.width, this.height);
        };
        Platform.prototype.draw = function () {
            if(this.isOnScreen()) {
                if((LD.GameScene.player.y + LD.GameScene.player.getHitBox().height) - this.y > 8 && this.x - (LD.GameScene.player.x + LD.GameScene.player.getHitBox().width) < 1 && this.x - LD.GameScene.player.x >= 0) {
                    LD.GameScene.player.velocity.x = -10;
                }
                if(this.getHitBox().isHitboxIntersecting(LD.GameScene.player.getHitBox())) {
                    LD.GameScene.player.y = this.y - LD.GameScene.player.getHitBox().height;
                    LD.GameScene.player.velocity.y = 0;
                    LD.GameScene.player.onGround = true;
                }
            }
            if(this.isOnScreen()) {
                SandLib.Engine.context.putImageData(this.imageDat, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
            }
        };
        return Platform;
    })(SandLib.Entity);
    LD.Platform = Platform;    
})(LD || (LD = {}));
//@ sourceMappingURL=Platform.js.map
