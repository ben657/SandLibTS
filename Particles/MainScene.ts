/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>

/// <reference path="Particle.ts"/>

module Particles {
    export class MainScene extends SandLib.Scene {

        M_PLACE: number = 0;
        M_ATTRACT: number = 1;
        M_REPEL: number = 2;

        mode: number = 0;
        actionPoint: SandLib.Vector = null;
        actionPower: number = 10000;
        particles: number = 0;

        constructor() {
            super();
        }

        addParticles(amount: number, x: number, y: number) {
            for (var i = 0; i < amount; i++) {
                this.add(new Particle(x, y));
                this.particles++;
            }
        }

        touchMove(event: SandLib.TouchEvent) {
            event.preventDefault();
            var s = < MainScene > SandLib.Engine.currentScene;
            for (var i = 0; i < event.touches.length; i++) {
                var touch: SandLib.Touch = event.touches.item(i);
                var pos: SandLib.Vector = SandLib.Input.clientToCanvasXY(touch.clientX, touch.clientY);
                s.addParticles(5, pos.x, pos.y);
            }
        }

        init() {
            addEventListener("touchmove", this.touchMove);
            this.addParticles(1, 10, 10);
        }

        downLast: bool = false;

        update() {
            super.update();
            SandLib.Engine.debugText["Particles"] = this.particles;
            SandLib.Engine.debugText["Mode"] = this.mode;

            if (SandLib.Input.isMouseBtnDown(SandLib.Input.MOUSE_LEFT)) {
                switch (this.mode) {
                    case this.M_PLACE:
                        this.addParticles(5, SandLib.Input.mouseX, SandLib.Input.mouseY);
                        break;
                }
            }
            else {
                this.actionPoint = null;
            }

            if (SandLib.Input.isKeyJustDown(49)) {
                this.mode = this.M_PLACE;
            }
            if (SandLib.Input.isKeyJustDown(50)) {
                this.mode = this.M_REPEL;
            }
            if (SandLib.Input.isKeyJustDown(51)) {
                this.mode = this.M_ATTRACT;
            }

            this.actionPoint = { x: SandLib.Input.mouseX, y: SandLib.Input.mouseY };

        }
    }
}