/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/UI/Button.ts"/>

/// <reference path="GameScene.ts"/>

module LD {
    export class MainMenu extends SandLib.Scene {

        static hiScore:number = 0;

        playBtn: SandLib.Button;
        btnCol: SandLib.Color = { r: 100, g: 100, b: 100, a: 255 };
        txtCol: SandLib.Color = { r: 255, g: 255, b: 255, a: 255 };

        constructor() {
            super();           
        }

        init() { 

            this.playBtn = new SandLib.Button(SandLib.Engine.width / 2 - 50, SandLib.Engine.height / 5, 100, 30, "Play", this.btnCol, "#FFFFFF", function () {
                SandLib.Engine.setScene(new GameScene());
            });

            MainMenu.hiScore = parseInt(localStorage.getItem("hiScore"));
            if (isNaN(MainMenu.hiScore)) {
                MainMenu.hiScore = 0;
            }
            
            this.add(this.playBtn);
            this.add(new SandLib.EntityText(this.playBtn.x, SandLib.Engine.height / 5 * 2, "HiScore: " + MainMenu.hiScore, 20, { r: 255, g: 255, b: 255, a: 1 }));
        }

        update() {
            super.update();
            if (SandLib.Input.isKeyJustDown(32)) {
                SandLib.Engine.setScene(new GameScene());
            }
        }
    }
}