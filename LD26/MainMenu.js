var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>
/// <reference path="GameScene.ts"/>
var LD;
(function (LD) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
                _super.call(this);
            this.btnCol = {
                r: 100,
                g: 100,
                b: 100,
                a: 255
            };
            this.txtCol = {
                r: 255,
                g: 255,
                b: 255,
                a: 255
            };
        }
        MainMenu.hiScore = 0;
        MainMenu.prototype.init = function () {
            this.playBtn = new SandLib.Button(SandLib.Engine.width / 2 - 50, SandLib.Engine.height / 5, 100, 30, "Play", this.btnCol, "#FFFFFF", function () {
                SandLib.Engine.setScene(new LD.GameScene());
            });
            MainMenu.hiScore = parseInt(localStorage.getItem("hiScore"));
            if(isNaN(MainMenu.hiScore)) {
                MainMenu.hiScore = 0;
            }
            this.add(this.playBtn);
            this.add(new SandLib.EntityText(this.playBtn.x - 400, SandLib.Engine.height / 5 * 4, "Note: There's a special key combination which will transform you... only space and shift, try and get it!", 20, {
                r: 255,
                g: 255,
                b: 255,
                a: 1
            }));
            this.add(new SandLib.EntityText(this.playBtn.x, SandLib.Engine.height / 5 * 2, "HiScore: " + MainMenu.hiScore, 20, {
                r: 255,
                g: 255,
                b: 255,
                a: 1
            }));
        };
        MainMenu.prototype.update = function () {
            _super.prototype.update.call(this);
            if(SandLib.Input.isKeyJustDown(32)) {
                SandLib.Engine.setScene(new LD.GameScene());
            }
        };
        return MainMenu;
    })(SandLib.Scene);
    LD.MainMenu = MainMenu;    
})(LD || (LD = {}));
//@ sourceMappingURL=MainMenu.js.map
