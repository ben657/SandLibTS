/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>

/// <reference path="GameScene.ts"/>

module LD {
    export class Platform extends SandLib.Entity {

        static LOC_BOTTOM: number = 0;
        static LOC_TOP:number = 1;

        imageDat: ImageData;
        width: number = 0;
        height: number = 0;
        location:number = 0;

        constructor(x: number, y: number, width:number,height:number, location:number, color:SandLib.Color) {
            super(x, y);
            this.location = location;
            this.width = width;
            this.height = height;
            this.imageDat = SandLib.Engine.context.createImageData(width, height);
            for (var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = color.r;
                this.imageDat.data[i + 1] = color.g;
                this.imageDat.data[i + 2] = color.b;
                this.imageDat.data[i + 3] = color.a;
            }
        }

        addCoins() {
            var numCoins = Math.round(this.getHitBox().width / 30);
            for (var i = 0; i < numCoins; i++) {
                if (this.location == 0) {
                    SandLib.Engine.currentScene.add(new Coin(this.x + i * 30 + 6, this.y - 20));
                }
                else if (this.location == 1) {
                    SandLib.Engine.currentScene.add(new Coin(this.x + i * 30 + 6, this.y + this.getHitBox().height + 4));
                }
            }
        }

        getHitBox() {
            return new SandLib.HitBox(this.x, this.y, this.width, this.height);
        }

        draw() {            
            if (this.isOnScreen()) {
                SandLib.Engine.context.putImageData(this.imageDat, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
            }
        }
    }
}