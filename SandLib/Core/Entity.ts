/// <reference path="Engine.ts"/>

module SandLib {
    export class Entity {

        x: number;
        y: number;
        layer: number;
        image: HTMLImageElement;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        update() {

        }

        draw() {
            Engine.context.drawImage(this.image, this.x, this.y);
            
        }
    }
}