var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Engine.ts"/>
/// <reference path="Entity.ts"/>
var SandLib;
(function (SandLib) {
    var EntityText = (function (_super) {
        __extends(EntityText, _super);
        function EntityText(x, y, text, size, color) {
                _super.call(this, x, y);
            this.text = "";
            this.textCol = {
                r: 0,
                g: 0,
                b: 0,
                a: 255
            };
            this.textSize = 20;
            this.text = text;
            this.textSize = size;
            this.textCol = color;
        }
        EntityText.prototype.draw = function () {
            if(!this.hidden) {
                SandLib.Engine.context.fillStyle = "rgba(" + this.textCol.r + ", " + this.textCol.g + ", " + this.textCol.b + ", " + this.textCol.a + ")";
                SandLib.Engine.context.font = this.textSize + "px Arial";
                SandLib.Engine.context.textAlign = "left";
                SandLib.Engine.context.fillText(this.text, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
            }
        };
        return EntityText;
    })(SandLib.Entity);
    SandLib.EntityText = EntityText;    
})(SandLib || (SandLib = {}));
//@ sourceMappingURL=EntityText.js.map
