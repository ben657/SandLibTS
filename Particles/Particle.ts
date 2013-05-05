/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/EntityMoving.ts"/>

module Particles {
    export class Particle extends SandLib.EntityMoving {

        decel: number = 50;
        speed: number = 0;
        edgeBuffer: number = 5;
        imageDat: ImageData;

        constructor(x: number, y: number) {
            super(x, y);
            this.speed = Math.random() * 150 + 50;
            this.velocity.x = Math.random() * 2 - 1;
            this.velocity.y = Math.random() * 2 - 1;

            var color: SandLib.Color = { r: 255, g: 255, b: 255, a: 1 };
            this.imageDat = SandLib.Engine.context.createImageData(2, 2);
            for (var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = color.r;
                this.imageDat.data[i + 1] = color.g;
                this.imageDat.data[i + 2] = color.b;
                this.imageDat.data[i + 3] = color.a;
            }
        }

        update() {

            //this.speed -= this.decel * SandLib.Engine.timeInterval;

            var s: MainScene = <MainScene>this.scene;
            if (s.mode != s.M_PLACE) {
                var vec: SandLib.Vector = { x: 0, y: 0 };
                vec.x = this.x - s.actionPoint.x;
                vec.y = this.y - s.actionPoint.y;
                var distance = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
                var d2 = Math.pow(distance, 2);
                if (s.mode == s.M_REPEL) {
                    this.velocity.x += (vec.x / d2) * s.actionPower;
                    this.velocity.y += (vec.y / d2) * s.actionPower;
                }
                if (s.mode == s.M_ATTRACT) {
                    this.velocity.x -= (vec.x / d2) * s.actionPower;
                    this.velocity.y -= (vec.y / d2) * s.actionPower;
                }
            }

            this.velocity = SandLib.Engine.normalizeVector(this.velocity);
            this.velocity.x *= this.speed;
            this.velocity.y *= this.speed;

            if (this.x < -this.edgeBuffer || this.y < -this.edgeBuffer || this.x > SandLib.Engine.width + this.edgeBuffer || this.y > SandLib.Engine.height + this.edgeBuffer) {
                this.scene.remove(this);
                console.log("removed");
            }

            if (this.x < 0) {
                this.x = 0;
                this.velocity.x *= -1;
            }
            if (this.y < 0) {
                this.y = 0;
                this.velocity.y *= -1;
            }
            if (this.x > SandLib.Engine.width) {
                this.x = SandLib.Engine.width - 2;
                this.velocity.x *= -1;
            }
            if (this.y > SandLib.Engine.height) {
                this.y = SandLib.Engine.height - 2;
                this.velocity.y *= -1;
            }

            super.update();
        }

        draw() {
            SandLib.Engine.context.putImageData(this.imageDat, this.x, this.y);
        }
    }
}