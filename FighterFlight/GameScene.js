var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>
/// <reference path="Entities/PlayerJet.ts"/>
var FF;
(function (FF) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
                _super.call(this);
            this.player = new FF.PlayerJet(10, SandLib.Engine.height / 2);
            //this.add(this.player);
            console.log(SandLib.Engine.canvas == null);
            //this.testBtn = new SandLib.Button(10, 200, 100, 30, "aldja", { r: 255, b: 0, g: 0, a: 255 }, null);
            //this.add(this.testBtn);
                    }
        return GameScene;
    })(SandLib.Scene);
    FF.GameScene = GameScene;    
})(FF || (FF = {}));
//@ sourceMappingURL=GameScene.js.map
