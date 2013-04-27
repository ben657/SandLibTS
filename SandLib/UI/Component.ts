/// <reference path="../Core/Engine.ts"/>
/// <reference path="../Core/Entity.ts"/>

module SandLib {

    export class Component extends Entity {

        width: number = 0;
        height:number = 0;

        constructor(x: number, y: number, width: number, height: number) {
            super(x, y);
            this.width = width;
            this.height = height;
        }

        getHitBox() {
            return new HitBox(this.x, this.y, this.width, this.height);
        }
    }
}