var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>
/// <reference path="Player.ts"/>
var LD;
(function (LD) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
                _super.call(this);
        }
        GameScene.prototype.init = function () {
            this.player = new LD.Player(10, 320);
            this.add(this.player);
        };
        GameScene.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return GameScene;
    })(SandLib.Scene);
    LD.GameScene = GameScene;    
})(LD || (LD = {}));
//@ sourceMappingURL=GameScene.js.map
