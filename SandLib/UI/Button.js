var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Core/Engine.ts"/>
/// <reference path="../Core/Input.ts"/>
/// <reference path="Component.ts"/>
var SandLib;
(function (SandLib) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(x, y, width, height, text, btnColor, txtColor, clickFunc) {
                _super.call(this, x, y, width, height);
            this.text = "";
            this.textHeight = 12;
            this.textCol = "#000000";
            this.textPos = {
                x: 0,
                y: 0
            };
            this.text = text;
            this.textCol = txtColor;
            var textSize = SandLib.Engine.context.measureText(this.text);
            this.textPos.x = (this.x + this.width / 2);
            this.textPos.y = (this.y + this.height / 2) + (this.textHeight / 2);
            this.clickFunc = clickFunc;
            this.imageDat = SandLib.Engine.context.createImageData(this.width, this.height);
            for(var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = btnColor.r;
                this.imageDat.data[i + 1] = btnColor.g;
                this.imageDat.data[i + 2] = btnColor.b;
                this.imageDat.data[i + 3] = btnColor.a;
            }
        }
        Button.prototype.clickFunc = function () {
        };
        Button.prototype.update = function () {
            _super.prototype.update.call(this);
            if(SandLib.Input.isMouseBtnJustDown(SandLib.Input.MOUSE_LEFT)) {
                if(this.getHitBox().isPointIntersecting(SandLib.Input.mouseX, SandLib.Input.mouseY)) {
                    this.clickFunc();
                }
            }
        };
        Button.prototype.draw = function () {
            SandLib.Engine.context.putImageData(this.imageDat, this.x, this.y);
            SandLib.Engine.context.fillStyle = this.textCol;
            SandLib.Engine.context.font = "20px Arial";
            SandLib.Engine.context.textAlign = "center";
            SandLib.Engine.context.fillText(this.text, this.textPos.x, this.textPos.y);
        };
        return Button;
    })(SandLib.Component);
    SandLib.Button = Button;    
})(SandLib || (SandLib = {}));
//@ sourceMappingURL=Button.js.map
