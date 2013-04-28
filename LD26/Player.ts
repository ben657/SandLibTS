/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/EntityMoving.ts"/>

/// <reference path="GameScene.ts"/>

module LD {
    export class Player extends SandLib.EntityMoving {

        cheatato: number[] = [32, 32, 16, 32, 16];

        gravity: number = 40;
        jumpPow: number = 1000;
        jumpBoost: number = 1.2;
        accel: number = 0.05;
        maxVel: number = 1500;
        decel: number = 20;

        coins: number = 0;

        cameraMoveZone: number = 100;

        onGround: bool = true;

        constructor(x: number, y: number) {
            super(x, y);
            this.image = SandLib.Engine.getImage("LD26/player.png");
            this.image.width = this.image.height = 32;
            var hb: SandLib.HitBox = this.getHitBox();
            this.originX = hb.width / 2;
            this.originY = hb.height / 2;
            this.velocity.x = 300;
            SandLib.Input.registerCheat(this.cheatato, function {
                console.log("potato");
                GameScene.player.image = SandLib.Engine.getImage("LD26/potato.png");
            });
        }

        update() {

            //W:87 S:83 A:65 D:68

            this.velocity.y += this.gravity;


            if (SandLib.Input.isKeyJustDown(16)) {
                this.gravity *= -1;
                this.jumpPow *= -1;
            }

            this.velocity.x += this.accel;

            if (this.velocity.x > this.maxVel) {
                this.velocity.x -= this.decel;
            }

            if (this.x > this.cameraMoveZone) {
                SandLib.Engine.currentScene.camera.x = this.x - this.cameraMoveZone;
            }

            var platforms: Platform[] = <Platform[]> SandLib.Engine.currentScene.getAll(Platform, true);

            for (var i in platforms) {
                var p: Platform = platforms[i];
                if (p.location == Platform.LOC_BOTTOM) {
                    if (p.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                        this.y = p.y - this.getHitBox().height;
                        if (!this.onGround) { Main.landSnd.play(); }
                        this.onGround = true;
                        this.velocity.y = 0;                        
                    }
                    else if (this.y + this.getHitBox().height > p.y && this.x < p.x + p.getHitBox().width && this.x + this.getHitBox().width + this.velocity.x * SandLib.Engine.timeInterval >= p.x) {
                        this.velocity.x = 0;
                        this.onGround = false;

                    }
                }
                else if (p.location == Platform.LOC_TOP) {
                    if (p.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                        this.y = p.y + p.getHitBox().height;
                        if (!this.onGround) { Main.landSnd.play(); }
                        this.onGround = true;
                        this.velocity.y = 0;
                    }
                    else if (this.y < p.y + p.getHitBox().height && this.x < p.x + p.getHitBox().width && this.x + this.getHitBox().width + this.velocity.x * SandLib.Engine.timeInterval >= p.x) {
                        this.velocity.x = 0;
                        this.onGround = false;

                    }
                }
            }

            if (SandLib.Input.isKeyJustDown(32) && this.onGround) {
                this.velocity.y -= this.jumpPow;
                this.velocity.x *= this.jumpBoost;
                this.onGround = false;
                Main.jumpSnd.play();
            }

            if (this.y > 800 || this.y < -800) {
                this.die();
            }

            super.update();
        }

        die() {
            if (this.coins > MainMenu.hiScore) {
                localStorage.setItem("hiScore", this.coins.toString());
            }
            SandLib.Engine.setScene(new MainMenu());
        }

        draw() {

            super.draw();
        }

        getHitBox() {
            return new SandLib.HitBox(this.x, this.y, this.image.height, this.image.width);
        }
    }
}