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
        function Platform(x, y, width, height, location, color) {
                _super.call(this, x, y);
            this.width = 0;
            this.height = 0;
            this.location = 0;
            this.location = location;
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
        Platform.LOC_BOTTOM = 0;
        Platform.LOC_TOP = 1;
        Platform.prototype.addCoins = function () {
            var numCoins = Math.round(this.getHitBox().width / 30);
            for(var i = 0; i < numCoins; i++) {
                if(this.location == 0) {
                    SandLib.Engine.currentScene.add(new LD.Coin(this.x + i * 30 + 6, this.y - 20));
                } else if(this.location == 1) {
                    SandLib.Engine.currentScene.add(new LD.Coin(this.x + i * 30 + 6, this.y + this.getHitBox().height + 4));
                }
            }
        };
        Platform.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, this.width, this.height);
        };
        Platform.prototype.draw = function () {
            if(this.isOnScreen()) {
                SandLib.Engine.context.putImageData(this.imageDat, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
            }
        };
        return Platform;
    })(SandLib.Entity);
    LD.Platform = Platform;    
})(LD || (LD = {}));
//@ sourceMappingURL=Platform.js.map
