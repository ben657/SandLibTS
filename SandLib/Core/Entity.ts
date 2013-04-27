/// <reference path="Engine.ts"/>
/// <reference path="HitBox.ts"/>

module SandLib {
    export class Entity {

        x: number;
        y: number;
        originX: number = 0;
        originY: number = 0;
        rotation:number = 0;
        layer: number;
        image: HTMLImageElement;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        update() {

        }

        draw() {
            if (this.rotation != 0) {
                console.log("ran");
                Engine.context.save();
                Engine.context.translate(this.x + this.originX, this.y + this.originY);
                Engine.context.rotate(this.rotation * Math.PI / 180);
                Engine.context.drawImage(this.image, -this.originX, -this.originY);
                Engine.context.restore();
            }
            else {
                Engine.context.drawImage(this.image, this.x, this.y);
            }
        }

        getHitBox() {
            return new HitBox(this.x, this.y, 0, 0);
        }
    }
}