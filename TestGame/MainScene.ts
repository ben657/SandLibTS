/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>
/// <reference path="../SandLib/Core/Input.ts"/>

module TestGame {
    export class MainScene extends SandLib.Scene {


        e:SandLib.Entity = new SandLib.Entity(10,10);

        constructor() {
            super();
            this.e.image = SandLib.Engine.getImage("random.png");
            this.add(this.e);
        }

        update() {
            super.update();
            if (SandLib.Input.isKeyDown(65)) {
                this.e.x -= 0.5;
            }
            if (SandLib.Input.isKeyDown(68)) {
                this.e.x += 0.5;
            }
            if (SandLib.Input.isKeyDown(87)) {
                this.e.y -= 0.5;
            }
            if (SandLib.Input.isKeyDown(83)) {
                this.e.y += 0.5;
            }
        }
    }
}