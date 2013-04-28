/// <reference path="Engine.ts"/>
/// <reference path="Entity.ts"/>

module SandLib {
    export class EntityText extends SandLib.Entity {

        text: string = "";
        textCol: Color = { r: 0, g: 0, b: 0, a: 255 };
        textSize:number = 20;

        constructor(x: number, y: number, text:string, size:number, color:Color) {
            super(x, y);
            this.text = text;
            this.textSize = size;
            this.textCol = color;
        }

        draw() {
            if (!this.hidden) {
                Engine.context.fillStyle = "rgba(" + this.textCol.r + ", " + this.textCol.g + ", " + this.textCol.b + ", " + this.textCol.a + ")";
                Engine.context.font = this.textSize + "px Arial";
                Engine.context.textAlign = "left";
                Engine.context.fillText(this.text, this.x - Engine.currentScene.camera.x, this.y - Engine.currentScene.camera.y);
            }
        }
    }
}