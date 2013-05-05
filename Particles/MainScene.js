var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="Particle.ts"/>
var Particles;
(function (Particles) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
                _super.call(this);
            this.M_PLACE = 0;
            this.M_ATTRACT = 1;
            this.M_REPEL = 2;
            this.mode = 0;
            this.actionPoint = null;
            this.actionPower = 10000;
            this.particles = 0;
            this.downLast = false;
        }
        MainScene.prototype.addParticles = function (amount, x, y) {
            for(var i = 0; i < amount; i++) {
                this.add(new Particles.Particle(x, y));
                this.particles++;
            }
        };
        MainScene.prototype.touchMove = function (event) {
            event.preventDefault();
            var s = SandLib.Engine.currentScene;
            for(var i = 0; i < event.touches.length; i++) {
                var touch = event.touches.item(i);
                var pos = SandLib.Input.clientToCanvasXY(touch.clientX, touch.clientY);
                s.addParticles(5, pos.x, pos.y);
            }
        };
        MainScene.prototype.init = function () {
            addEventListener("touchmove", this.touchMove);
            this.addParticles(1, 10, 10);
        };
        MainScene.prototype.update = function () {
            _super.prototype.update.call(this);
            SandLib.Engine.debugText["Particles"] = this.particles;
            SandLib.Engine.debugText["Mode"] = this.mode;
            if(SandLib.Input.isMouseBtnDown(SandLib.Input.MOUSE_LEFT)) {
                switch(this.mode) {
                    case this.M_PLACE:
                        this.addParticles(5, SandLib.Input.mouseX, SandLib.Input.mouseY);
                        break;
                }
            } else {
                this.actionPoint = null;
            }
            if(SandLib.Input.isKeyJustDown(49)) {
                this.mode = this.M_PLACE;
            }
            if(SandLib.Input.isKeyJustDown(50)) {
                this.mode = this.M_REPEL;
            }
            if(SandLib.Input.isKeyJustDown(51)) {
                this.mode = this.M_ATTRACT;
            }
            this.actionPoint = {
                x: SandLib.Input.mouseX,
                y: SandLib.Input.mouseY
            };
        };
        return MainScene;
    })(SandLib.Scene);
    Particles.MainScene = MainScene;    
})(Particles || (Particles = {}));
//@ sourceMappingURL=MainScene.js.map
