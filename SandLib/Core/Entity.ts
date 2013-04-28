/// <reference path="Engine.ts"/>
/// <reference path="HitBox.ts"/>

module SandLib {
    export class Entity {

        x: number;
        y: number;
        hidden: bool = false;
        scale: number = 1;
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

        isOnScreen() {
            var cam: Vector = Engine.currentScene.camera;
            return (this.x + this.getHitBox().width > cam.x && this.x < cam.x + Engine.width);
        }

        draw() {
            if (!this.hidden) {
                if (this.rotation != 0) {
                    Engine.context.save();
                    Engine.context.translate(this.x - Engine.currentScene.camera.x + this.originX, this.y - Engine.currentScene.camera.y + this.originY);
                    Engine.context.rotate(this.rotation * Math.PI / 180);
                    Engine.context.drawImage(this.image, -this.originX, -this.originY, this.getHitBox().width * this.scale, this.getHitBox().height * this.scale);
                    Engine.context.restore();
                }
                else {
                    Engine.context.drawImage(this.image, this.x - Engine.currentScene.camera.x, this.y - Engine.currentScene.camera.y);
                }
            }
        }

        getHitBox() {
            return new HitBox(this.x, this.y, 0, 0);
        }
    }
}