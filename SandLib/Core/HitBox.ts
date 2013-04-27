/// <reference path="Engine.ts"/>
/// <reference path="Entity.ts"/>

module SandLib {

    export class HitBox {
        
        x: number = 0;
        y: number = 0;
        width: number = 0;
        height: number = 0;

        constructor(x: number, y: number, width: number, height: number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        isPointIntersecting(x: number, y: number) {
            if ((this.x <= x) && (this.x + this.width >= x)) {

                if ((this.y <= y) && (this.y + this.height >= y)) {
                    return true;
                }
            }
            return false;
        }

        isHitboxIntersecting(hitbox: HitBox) {
            if (!(this.x + this.width < hitbox.x || this.x > hitbox.x + hitbox.width)) {
                if (!(this.y + this.height < hitbox.y || this.y > hitbox.y + hitbox.height)) {
                    return true;
                }
            }
            return false;
        }
    }
}
