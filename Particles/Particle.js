var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="../SandLib/Core/EntityMoving.ts"/>
var Particles;
(function (Particles) {
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(x, y) {
                _super.call(this, x, y);
            this.decel = 50;
            this.speed = 0;
            this.edgeBuffer = 5;
            this.speed = Math.random() * 150 + 50;
            this.velocity.x = Math.random() * 2 - 1;
            this.velocity.y = Math.random() * 2 - 1;
            var color = {
                r: 255,
                g: 255,
                b: 255,
                a: 1
            };
            this.imageDat = SandLib.Engine.context.createImageData(2, 2);
            for(var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = color.r;
                this.imageDat.data[i + 1] = color.g;
                this.imageDat.data[i + 2] = color.b;
                this.imageDat.data[i + 3] = color.a;
            }
        }
        Particle.prototype.update = function () {
            //this.speed -= this.decel * SandLib.Engine.timeInterval;
            var s = this.scene;
            if(s.mode != s.M_PLACE) {
                var vec = {
                    x: 0,
                    y: 0
                };
                vec.x = this.x - s.actionPoint.x;
                vec.y = this.y - s.actionPoint.y;
                var distance = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
                var d2 = Math.pow(distance, 2);
                if(s.mode == s.M_REPEL) {
                    this.velocity.x += (vec.x / d2) * s.actionPower;
                    this.velocity.y += (vec.y / d2) * s.actionPower;
                }
                if(s.mode == s.M_ATTRACT) {
                    this.velocity.x -= (vec.x / d2) * s.actionPower;
                    this.velocity.y -= (vec.y / d2) * s.actionPower;
                }
            }
            this.velocity = SandLib.Engine.normalizeVector(this.velocity);
            this.velocity.x *= this.speed;
            this.velocity.y *= this.speed;
            if(this.x < -this.edgeBuffer || this.y < -this.edgeBuffer || this.x > SandLib.Engine.width + this.edgeBuffer || this.y > SandLib.Engine.height + this.edgeBuffer) {
                this.scene.remove(this);
                console.log("removed");
            }
            if(this.x < 0) {
                this.x = 0;
                this.velocity.x *= -1;
            }
            if(this.y < 0) {
                this.y = 0;
                this.velocity.y *= -1;
            }
            if(this.x > SandLib.Engine.width) {
                this.x = SandLib.Engine.width - 2;
                this.velocity.x *= -1;
            }
            if(this.y > SandLib.Engine.height) {
                this.y = SandLib.Engine.height - 2;
                this.velocity.y *= -1;
            }
            _super.prototype.update.call(this);
        };
        Particle.prototype.draw = function () {
            SandLib.Engine.context.putImageData(this.imageDat, this.x, this.y);
        };
        return Particle;
    })(SandLib.EntityMoving);
    Particles.Particle = Particle;    
})(Particles || (Particles = {}));
//@ sourceMappingURL=Particle.js.map
