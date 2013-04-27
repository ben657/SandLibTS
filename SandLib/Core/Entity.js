/// <reference path="Engine.ts"/>
/// <reference path="HitBox.ts"/>
var SandLib;
(function (SandLib) {
    var Entity = (function () {
        function Entity(x, y) {
            this.originX = 0;
            this.originY = 0;
            this.rotation = 0;
            this.x = x;
            this.y = y;
        }
        Entity.prototype.update = function () {
        };
        Entity.prototype.draw = function () {
            if(this.rotation != 0) {
                console.log("ran");
                SandLib.Engine.context.save();
                SandLib.Engine.context.translate(this.x + this.originX, this.y + this.originY);
                SandLib.Engine.context.rotate(this.rotation * Math.PI / 180);
                SandLib.Engine.context.drawImage(this.image, -this.originX, -this.originY);
                SandLib.Engine.context.restore();
            } else {
                SandLib.Engine.context.drawImage(this.image, this.x, this.y);
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
