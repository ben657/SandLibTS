/// <reference path="Engine.ts"/>
/// <reference path="HitBox.ts"/>
var SandLib;
(function (SandLib) {
    var Entity = (function () {
        function Entity(x, y) {
            this.scale = 1;
            this.originX = 0;
            this.originY = 0;
            this.rotation = 0;
            this.x = x;
            this.y = y;
        }
        Entity.prototype.update = function () {
        };
        Entity.prototype.isOnScreen = function () {
            var cam = SandLib.Engine.currentScene.camera;
            return (this.x + this.getHitBox().width > cam.x && this.x < cam.x + SandLib.Engine.width);
        };
        Entity.prototype.draw = function () {
            if(this.rotation != 0) {
                SandLib.Engine.context.save();
                SandLib.Engine.context.translate(this.x - SandLib.Engine.currentScene.camera.x + this.originX, this.y - SandLib.Engine.currentScene.camera.y + this.originY);
                SandLib.Engine.context.rotate(this.rotation * Math.PI / 180);
                SandLib.Engine.context.drawImage(this.image, -this.originX, -this.originY, this.getHitBox().width * this.scale, this.getHitBox().height * this.scale);
                SandLib.Engine.context.restore();
            } else {
                SandLib.Engine.context.drawImage(this.image, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
            }
        };
        Entity.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, 0, 0);
        };
        return Entity;
    })();
    SandLib.Entity = Entity;    
})(SandLib || (SandLib = {}));
//@ sourceMappingURL=Entity.js.map
