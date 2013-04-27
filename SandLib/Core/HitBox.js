/// <reference path="Engine.ts"/>
/// <reference path="Entity.ts"/>
var SandLib;
(function (SandLib) {
    var HitBox = (function () {
        function HitBox(x, y, width, height) {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        HitBox.prototype.isPointIntersecting = function (x, y) {
            if((this.x <= x) && (this.x + this.width >= x)) {
                if((this.y <= y) && (this.y + this.height >= y)) {
                    return true;
                }
            }
            return false;
        };
        HitBox.prototype.isHitboxIntersecting = function (hitbox) {
            if(!(this.x + this.width < hitbox.x || this.x > hitbox.x + hitbox.width)) {
                if(!(this.y + this.height < hitbox.y || this.y > hitbox.y + hitbox.height)) {
                    return true;
                }
            }
            return false;
        };
        return HitBox;
    })();
    SandLib.HitBox = HitBox;    
})(SandLib || (SandLib = {}));
//@ sourceMappingURL=HitBox.js.map
