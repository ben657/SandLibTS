var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>
var TG;
(function (TG) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
                _super.call(this);
        }
        MainScene.prototype.init = function () {
            var button = new SandLib.Button(10, 100, 50, 100, "Text", {
                r: 255,
                g: 0,
                b: 0,
                a: 255
            }, null, function () {
                console.log("ran");
            });
            this.add(button);
        };
        return MainScene;
    })(SandLib.Scene);
    TG.MainScene = MainScene;    
})(TG || (TG = {}));
//@ sourceMappingURL=MainScene.js.map
