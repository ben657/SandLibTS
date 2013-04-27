/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>

/// <reference path="Player.ts"/>

module LD {
    export class Weapon extends SandLib.Entity {

        player: Player;

        constructor(player:Player) {
            super(0, 0);
            this.player = player;            
            this.image = SandLib.Engine.getImage("LD26/cannon.png");
        }

        update() {
            this.rotation = this.player.rotation;
            this.x = (this.player.x - this.getHitBox().width/2) + this.player.getHitBox().width / 2;
            this.y = this.player.y - this.player.getHitBox().height/2;
            this.originX = (this.player.x + this.player.originX) - (this.x + this.getHitBox().width / 2);
            console.log((this.player.y + this.player.originY) - (this.y + this.getHitBox().height));
            this.originY = (this.player.y + this.player.originY) - (this.y + this.getHitBox().height);
        }

        getHitBox() {
            return new SandLib.HitBox(this.x, this.y, 4, 16);
        }
    }
}