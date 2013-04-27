/// <reference path="../../SandLib/Core/Engine.ts"/>

/// <reference path="Jet.ts"/>

module FF {

    export class PlayerJet extends Jet {

        constructor(x:number,y:number) {
            super(x, y);
            this.image = SandLib.Engine.getImage("FighterFlight/PlayerJet.png");
        }

        update() {
            SandLib.Engine.debugText["Jet"] = "test";
            super.update();
            if (this.y < SandLib.Input.mouseY) {
                this.y += 100 * SandLib.Engine.timeInterval;
            }
            else if (this.y > SandLib.Input.mouseY) {
                this.y -= 100 * SandLib.Engine.timeInterval;
            }
        }
    }
}