/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/EntityMoving.ts"/>

/// <reference path="Weapon.ts"/>

module LD {
    export class Player extends SandLib.EntityMoving {

        rotSpeed: number = 300;
        movSpeed: number = 200;
        weapons:Weapon[] = new Weapon[];

        constructor(x: number, y: number) {
            super(x, y);            
            this.image = SandLib.Engine.getImage("LD26/player.png");
            var hb: SandLib.HitBox = this.getHitBox();
            this.originX = 100;
            this.originY = hb.height / 2;
            var weapon: Weapon = new Weapon(this);
            //SandLib.Engine.currentScene.add(weapon);
        }

        update() {
            SandLib.Engine.debugText["Player"] = this.x + ":" + this.y;
            var interval: number = SandLib.Engine.timeInterval;
            if (SandLib.Input.isKeyDown(39)) {
                this.rotation += this.rotSpeed * interval;
            }
            if (SandLib.Input.isKeyDown(37)) {
                this.rotation -= this.rotSpeed * interval;
            }
            //W:87 S:83 A:65 D:68
            this.velocity = { x: 0, y: 0 };            
            if (SandLib.Input.isKeyDown(87)) {
                this.velocity.y = -this.movSpeed * interval;
            }
            if (SandLib.Input.isKeyDown(83)) {
                this.velocity.y = this.movSpeed * interval;
            }
            if (SandLib.Input.isKeyDown(65)) {
                this.velocity.x = -this.movSpeed * interval;
            }
            if (SandLib.Input.isKeyDown(68)) {
                this.velocity.x = this.movSpeed * interval;
            }

            super.update();
        }

        getHitBox() {
            return new SandLib.HitBox(this.x, this.y, 32, 32);
        }
    }
}