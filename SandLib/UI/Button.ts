/// <reference path="../Core/Engine.ts"/>
/// <reference path="../Core/Input.ts"/>
/// <reference path="Component.ts"/>

module SandLib {
    export class Button extends Component {

        text: string = "";
        textHeight: number = 12;
        textCol: string = "#000000";
        textPos: Vector = { x: 0, y: 0 };
        imageDat: ImageData;
        clickFunc() { };

        constructor(x: number, y: number, width: number, height: number, text: string, btnColor: SandLib.Color, txtColor: string, clickFunc: any) {
            super(x, y, width, height);
            this.text = text;
            this.textCol = txtColor;
            var textSize: TextMetrics = Engine.context.measureText(this.text);
            this.textPos.x = (this.x + this.width / 2);
            this.textPos.y = (this.y + this.height / 2) + (this.textHeight / 2);
            this.clickFunc = clickFunc;
            this.imageDat = SandLib.Engine.context.createImageData(this.width, this.height);
            for (var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = btnColor.r;
                this.imageDat.data[i + 1] = btnColor.g;
                this.imageDat.data[i + 2] = btnColor.b;
                this.imageDat.data[i + 3] = btnColor.a;
            }
        }        

        update() {
            super.update();
            if (Input.isMouseBtnJustDown(Input.MOUSE_LEFT)) {
                if (this.getHitBox().isPointIntersecting(Input.mouseX, Input.mouseY)) {
                    this.clickFunc();
                }
            }
        }

        draw() {
            Engine.context.putImageData(this.imageDat, this.x, this.y);
            Engine.context.fillStyle = this.textCol;
            Engine.context.font = "20px Arial";
            Engine.context.textAlign = "center";
            Engine.context.fillText(this.text, this.textPos.x, this.textPos.y);
        }
    }
}