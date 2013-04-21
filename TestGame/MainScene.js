var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>
/// <reference path="../SandLib/Core/Input.ts"/>
var TestGame;
(function (TestGame) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
                _super.call(this);
            this.e = new SandLib.Entity(10, 10);
            this.e.image = SandLib.Engine.getImage("random.png");
            this.add(this.e);
        }
        MainScene.prototype.update = function () {
            _super.prototype.update.call(this);
            if(SandLib.Input.isKeyDown(65)) {
                this.e.x -= 0.5;
            }
            if(SandLib.Input.isKeyDown(68)) {
                this.e.x += 0.5;
            }
            if(SandLib.Input.isKeyDown(87)) {
                this.e.y -= 0.5;
            }
            if(SandLib.Input.isKeyDown(83)) {
                this.e.y += 0.5;
            }
        };
        return MainScene;
    })(SandLib.Scene);
    TestGame.MainScene = MainScene;    
})(TestGame || (TestGame = {}));
//@ sourceMappingURL=MainScene.js.map
