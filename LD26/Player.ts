/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/EntityMoving.ts"/>

/// <reference path="GameScene.ts"/>

module LD {
    export class Player extends SandLib.EntityMoving {

        chetato: number[] = [32, 32, 16, 32, 16];

        gravity: number = 50;
        jumpPow:number = 1000;
        accel: number = 3;
        maxVel:number = 800;
        decel: number = 20;

        cameraMoveZone:number = 100;

        onGround:bool = false;

        constructor(x: number, y: number) {
            super(x, y);
            this.image = SandLib.Engine.getImage("LD26/player.png");
            this.image.width = this.image.height = 32;
            var hb: SandLib.HitBox = this.getHitBox();
            this.originX = hb.width / 2;
            this.originY = hb.height / 2;
            SandLib.Input.registerCheat(this.chetato, function {
                console.log("potato");
                GameScene.player.image = SandLib.Engine.getImage("LD26/potato.png");
            });
        }

        update() {



            //W:87 S:83 A:65 D:68
            this.velocity.y += this.gravity;

            if (SandLib.Input.isKeyJustDown(32) && this.onGround) {
                this.velocity.y -= this.jumpPow;
                this.onGround = false;
            }

            this.velocity.x += this.accel;
            if (this.velocity.x > this.maxVel) {
                this.velocity.x = this.maxVel;
            }

            if (this.x > this.cameraMoveZone) {
                SandLib.Engine.currentScene.camera.x = this.x - this.cameraMoveZone;
            }

            super.update();
        }

        draw() {
            
            super.draw();
        }

        getHitBox() {
            return new SandLib.HitBox(this.x, this.y, this.image.height, this.image.width);
        }
    }
}