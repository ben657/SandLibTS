/// <reference path="Scene.ts"/>
/// <reference path="Engine.ts"/>

module SandLib {
    export class EntityMoving extends Entity {        

        velocity: Vector = { x: 0, y: 0 };

        constructor(x:number,y:number) {
            super(x, y);
        }

        update() {            
            this.x += this.velocity.x * SandLib.Engine.timeInterval;
            this.y += this.velocity.y * SandLib.Engine.timeInterval;
        }
    }
}