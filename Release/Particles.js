var SandLib;
(function (SandLib) {
    var HitBox = (function () {
        function HitBox(x, y, width, height) {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        HitBox.prototype.isPointIntersecting = function (x, y) {
            if((this.x <= x) && (this.x + this.width >= x)) {
                if((this.y <= y) && (this.y + this.height >= y)) {
                    return true;
                }
            }
            return false;
        };
        HitBox.prototype.isHitboxIntersecting = function (hitbox) {
            if(!(this.x + this.width < hitbox.x || this.x > hitbox.x + hitbox.width)) {
                if(!(this.y + this.height < hitbox.y || this.y > hitbox.y + hitbox.height)) {
                    return true;
                }
            }
            return false;
        };
        return HitBox;
    })();
    SandLib.HitBox = HitBox;    
})(SandLib || (SandLib = {}));
var SandLib;
(function (SandLib) {
    var Entity = (function () {
        function Entity(x, y) {
            this.hidden = false;
            this.scale = 1;
            this.originX = 0;
            this.originY = 0;
            this.rotation = 0;
            this.x = x;
            this.y = y;
        }
        Entity.prototype.update = function () {
        };
        Entity.prototype.isOnScreen = function () {
            var cam = SandLib.Engine.currentScene.camera;
            return (this.x + this.getHitBox().width > cam.x && this.x < cam.x + SandLib.Engine.width);
        };
        Entity.prototype.draw = function () {
            if(!this.hidden) {
                if(this.rotation != 0) {
                    SandLib.Engine.context.save();
                    SandLib.Engine.context.translate(this.x - SandLib.Engine.currentScene.camera.x + this.originX, this.y - SandLib.Engine.currentScene.camera.y + this.originY);
                    SandLib.Engine.context.rotate(this.rotation * Math.PI / 180);
                    SandLib.Engine.context.drawImage(this.image, -this.originX, -this.originY, this.getHitBox().width * this.scale, this.getHitBox().height * this.scale);
                    SandLib.Engine.context.restore();
                } else {
                    SandLib.Engine.context.drawImage(this.image, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
                }
            }
        };
        Entity.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, 0, 0);
        };
        return Entity;
    })();
    SandLib.Entity = Entity;    
})(SandLib || (SandLib = {}));
var SandLib;
(function (SandLib) {
    var Scene = (function () {
        function Scene() {
            this.camera = {
                x: 0,
                y: 0
            };
            this.entities = [];
        }
        Scene.prototype.init = function () {
        };
        Scene.prototype.end = function () {
        };
        Scene.prototype.getAll = function (type, onScreenForce) {
            var returnArray = new Array();
            for(var i = 0; i < this.entities.length; i++) {
                if(this.entities[i] instanceof type) {
                    if(onScreenForce) {
                        if(this.entities[i].isOnScreen()) {
                            returnArray.push(this.entities[i]);
                        }
                    } else {
                        returnArray.push(this.entities[i]);
                    }
                }
            }
            return returnArray;
        };
        Scene.prototype.add = function (entity) {
            entity.scene = this;
            this.entities[this.entities.length] = entity;
        };
        Scene.prototype.remove = function (entity) {
            this.entities.splice(this.entities.indexOf(entity), 1);
        };
        Scene.prototype.updateEntities = function () {
            for(var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
            }
        };
        Scene.prototype.sortEntities = function (a, b) {
            return b.layer - a.layer;
        };
        Scene.prototype.update = function () {
            this.entities.sort(this.sortEntities);
            this.updateEntities();
        };
        Scene.prototype.drawEntities = function () {
            for(var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        };
        Scene.prototype.draw = function () {
            this.drawEntities();
        };
        return Scene;
    })();
    SandLib.Scene = Scene;    
})(SandLib || (SandLib = {}));
var SandLib;
(function (SandLib) {
    ;
    ;
    ;
    var Input = (function () {
        function Input() { }
        Input.keyStates = new Array();
        Input.newKeyStates = new Array();
        Input.bufferKeyStates = new Array();
        Input.bufferNewKeyStates = new Array();
        Input.mouseBtns = new Array();
        Input.lastMouseBtns = new Array();
        Input.newMouseBtns = new Array();
        Input.bufferMouseBtns = new Array();
        Input.bufferNewMouseBtns = new Array();
        Input.onCheat = function onCheat() {
        };
        Input.mouseX = 0;
        Input.mouseY = 0;
        Input.MOUSE_LEFT = 0;
        Input.MOUSE_MIDDLE = 1;
        Input.MOUSE_RIGHT = 2;
        Input.keyUp = function keyUp(event) {
            Input.bufferKeyStates[event.keyCode] = false;
        };
        Input.keyDown = function keyDown(event) {
            if([
                16, 
                37, 
                38, 
                39, 
                40
            ].indexOf(event.keyCode) == 0) {
                event.preventDefault();
            }
            if(Input.keyStates[event.keyCode] == false || Input.keyStates[event.keyCode] == null) {
                Input.bufferNewKeyStates[event.keyCode] = true;
                if(Input.cheatCode != null) {
                    Input.lastPresses.push(event.keyCode);
                    if(Input.lastPresses.length >= 5) {
                        var last5 = Input.lastPresses.slice(Input.lastPresses.length - Input.cheatCode.length, Input.lastPresses.length);
                        var numRight = 0;
                        for(var i = 0; i < last5.length; i++) {
                            if(last5[i] == Input.cheatCode[i]) {
                                numRight++;
                            }
                        }
                        if(numRight == Input.cheatCode.length) {
                            Input.onCheat();
                        }
                    }
                }
            }
            Input.bufferKeyStates[event.keyCode] = true;
        };
        Input.mouseUp = function mouseUp(event) {
            Input.bufferMouseBtns[event.button] = false;
        };
        Input.mouseDown = function mouseDown(event) {
            event.preventDefault();
            if(Input.mouseBtns[event.button] == false || Input.mouseBtns[event.button] == null) {
                Input.bufferNewMouseBtns[event.button] = true;
            }
            Input.bufferMouseBtns[event.button] = true;
        };
        Input.mouseMove = function mouseMove(event) {
            event.preventDefault();
            var rect = SandLib.Engine.canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            if(x < 0) {
                x = 0;
            }
            if(x > SandLib.Engine.width) {
                x = SandLib.Engine.width;
            }
            if(y < 0) {
                y = 0;
            }
            if(y > SandLib.Engine.height) {
                y = SandLib.Engine.height;
            }
            Input.mouseX = x;
            Input.mouseY = y;
        };
        Input.init = function init() {
            addEventListener("keydown", Input.keyDown);
            addEventListener("keyup", Input.keyUp);
            addEventListener("mousedown", Input.mouseDown);
            addEventListener("mouseup", Input.mouseUp);
            addEventListener("mousemove", Input.mouseMove);
            Input.mouseX = 0;
            Input.mouseY = 0;
        };
        Input.clientToCanvasXY = function clientToCanvasXY(x, y) {
            var rect = SandLib.Engine.canvas.getBoundingClientRect();
            return {
                x: x - rect.left,
                y: y - rect.top
            };
        };
        Input.isMouseBtnDown = function isMouseBtnDown(button) {
            var b = Input.mouseBtns[button];
            if(b == null) {
                return false;
            }
            return b;
        };
        Input.isMouseBtnJustDown = function isMouseBtnJustDown(button) {
            var b = Input.newMouseBtns[button];
            if(b == null) {
                return false;
            }
            return b;
        };
        Input.isMouseBtnJustUp = function isMouseBtnJustUp(button) {
            var bNow = Input.mouseBtns[button];
            var bLas = Input.lastMouseBtns[button];
            if((bNow == false || bNow == null) && bLas == true) {
                return true;
            }
            return false;
        };
        Input.isKeyDown = function isKeyDown(keyCode) {
            var b = Input.keyStates[keyCode];
            if(b == null) {
                return false;
            }
            return b;
        };
        Input.isKeyJustDown = function isKeyJustDown(keyCode) {
            var b = Input.newKeyStates[keyCode];
            if(b == null) {
                return false;
            }
            return b;
        };
        Input.registerCheat = function registerCheat(keys, onCheat) {
            Input.onCheat = onCheat;
            Input.cheatCode = keys;
            Input.lastPresses = new Array();
        };
        Input.update = function update() {
            Input.keyStates = Input.bufferKeyStates;
            Input.newKeyStates = Input.bufferNewKeyStates;
            Input.bufferNewKeyStates = new Array();
            Input.lastMouseBtns = Input.mouseBtns;
            Input.mouseBtns = Input.bufferMouseBtns;
            Input.newMouseBtns = Input.bufferNewMouseBtns;
            Input.bufferNewMouseBtns = new Array();
        };
        return Input;
    })();
    SandLib.Input = Input;    
})(SandLib || (SandLib = {}));
var SandLib;
(function (SandLib) {
    var Engine = (function () {
        function Engine() { }
        Engine.debugText = {
        };
        Engine.debugTextCol = "#FF0000";
        Engine.images = {
        };
        Engine.width = 0;
        Engine.height = 0;
        Engine.fillColor = "#AAAAAA";
        Engine.hasTouchScreen = false;
        Engine.lastUpdate = Date.now();
        Engine.timeInterval = 0;
        Engine.update = function update() {
            Engine.timeInterval = (Date.now() - Engine.lastUpdate) / 1000;
            Engine.lastUpdate = Date.now();
            SandLib.Input.update();
            Engine.currentScene.update();
            Engine.draw();
            if(window.requestAnimationFrame != null) {
                requestAnimationFrame(Engine.update);
            }
            Engine.debugText["Interval"] = Engine.timeInterval.toString();
        };
        Engine.init = function init(initialScene, canvas, fps) {
            if (typeof fps === "undefined") { fps = 60; }
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Engine.width = canvas.width;
            Engine.height = canvas.height;
            if(!!("ontouchstart" in window) || !!("onmsgesturechange" in window)) {
                Engine.hasTouchScreen = true;
            }
            SandLib.Input.init();
            Engine.currentScene.init();
            if(window.requestAnimationFrame != null) {
                requestAnimationFrame(Engine.update);
            } else {
                setInterval(Engine.update, (1 / fps) * 1000);
            }
        };
        Engine.getImage = function getImage(path) {
            var img = this.images[path];
            if(img == null) {
                img = new Image();
                img.src = path;
                img.addEventListener("load", function () {
                    Engine.images[path] = img;
                });
            }
            return img;
        };
        Engine.setScene = function setScene(scene) {
            Engine.currentScene.end();
            Engine.currentScene = scene;
            Engine.currentScene.init();
        };
        Engine.normalizeVector = function normalizeVector(vector) {
            var length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
            if(length == 0) {
                return {
                    x: 0,
                    y: 0
                };
            }
            var newVector = {
                x: vector.x / length,
                y: vector.y / length
            };
            return newVector;
        };
        Engine.draw = function draw() {
            Engine.context.save();
            Engine.context.setTransform(1, 0, 0, 1, 0, 0);
            Engine.context.fillStyle = Engine.fillColor;
            Engine.context.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height);
            Engine.context.restore();
            Engine.currentScene.draw();
            Engine.context.fillStyle = Engine.debugTextCol;
            Engine.context.font = "20px Arial";
            Engine.context.textAlign = "left";
            var i = 0;
            for(var key in Engine.debugText) {
                Engine.context.fillText(key + ": " + Engine.debugText[key], 5, (i + 1) * 20);
                i++;
            }
        };
        return Engine;
    })();
    SandLib.Engine = Engine;    
})(SandLib || (SandLib = {}));
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SandLib;
(function (SandLib) {
    var EntityMoving = (function (_super) {
        __extends(EntityMoving, _super);
        function EntityMoving(x, y) {
                _super.call(this, x, y);
            this.velocity = {
                x: 0,
                y: 0
            };
        }
        EntityMoving.prototype.update = function () {
            this.x += this.velocity.x * SandLib.Engine.timeInterval;
            this.y += this.velocity.y * SandLib.Engine.timeInterval;
        };
        return EntityMoving;
    })(SandLib.Entity);
    SandLib.EntityMoving = EntityMoving;    
})(SandLib || (SandLib = {}));
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
var Particles;
(function (Particles) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
                _super.call(this);
            this.M_PLACE = 0;
            this.M_ATTRACT = 1;
            this.M_REPEL = 2;
            this.mode = 0;
            this.actionPoint = null;
            this.actionPower = 10000;
            this.particles = 0;
            this.downLast = false;
        }
        MainScene.prototype.addParticles = function (amount, x, y) {
            for(var i = 0; i < amount; i++) {
                this.add(new Particles.Particle(x, y));
                this.particles++;
            }
        };
        MainScene.prototype.touchMove = function (event) {
            event.preventDefault();
            var s = SandLib.Engine.currentScene;
            for(var i = 0; i < event.touches.length; i++) {
                var touch = event.touches.item(i);
                var pos = SandLib.Input.clientToCanvasXY(touch.clientX, touch.clientY);
                s.addParticles(5, pos.x, pos.y);
            }
        };
        MainScene.prototype.init = function () {
            addEventListener("touchmove", this.touchMove);
            this.addParticles(1, 10, 10);
        };
        MainScene.prototype.update = function () {
            _super.prototype.update.call(this);
            SandLib.Engine.debugText["Particles"] = this.particles;
            SandLib.Engine.debugText["Mode"] = this.mode;
            if(SandLib.Input.isMouseBtnDown(SandLib.Input.MOUSE_LEFT)) {
                switch(this.mode) {
                    case this.M_PLACE:
                        this.addParticles(5, SandLib.Input.mouseX, SandLib.Input.mouseY);
                        break;
                }
            } else {
                this.actionPoint = null;
            }
            if(SandLib.Input.isKeyJustDown(49)) {
                this.mode = this.M_PLACE;
            }
            if(SandLib.Input.isKeyJustDown(50)) {
                this.mode = this.M_REPEL;
            }
            if(SandLib.Input.isKeyJustDown(51)) {
                this.mode = this.M_ATTRACT;
            }
            this.actionPoint = {
                x: SandLib.Input.mouseX,
                y: SandLib.Input.mouseY
            };
        };
        return MainScene;
    })(SandLib.Scene);
    Particles.MainScene = MainScene;    
})(Particles || (Particles = {}));
var Particles;
(function (Particles) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
            canvas.innerText = "Canvas not supported.";
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.debugTextCol = "#FF0000";
            SandLib.Engine.init(new Particles.MainScene(), canvas);
        }
        Main.jumpSnd = new Audio("LD26/jump.mp3");
        Main.landSnd = new Audio("LD26/land.mp3");
        Main.coinSnd = new Audio("LD26/coin.mp3");
        Main.mainSnd = new Audio("LD26/main.mp3");
        return Main;
    })();
    Particles.Main = Main;    
})(Particles || (Particles = {}));
new Particles.Main();
