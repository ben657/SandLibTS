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
            if(this.rotation != 0) {
                SandLib.Engine.context.save();
                SandLib.Engine.context.translate(this.x - SandLib.Engine.currentScene.camera.x + this.originX, this.y - SandLib.Engine.currentScene.camera.y + this.originY);
                SandLib.Engine.context.rotate(this.rotation * Math.PI / 180);
                SandLib.Engine.context.drawImage(this.image, -this.originX, -this.originY, this.getHitBox().width * this.scale, this.getHitBox().height * this.scale);
                SandLib.Engine.context.restore();
            } else {
                SandLib.Engine.context.drawImage(this.image, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
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
        Scene.prototype.getAll = function (type) {
            var returnArray = new Array();
            for(var i = 0; i < this.entities.length; i++) {
                if(this.entities[i] instanceof type) {
                    returnArray.push(this.entities[i]);
                }
            }
            return returnArray;
        };
        Scene.prototype.add = function (entity) {
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
        Input.preventTouchDefault = false;
        Input.keyStates = new Array();
        Input.newKeyStates = new Array();
        Input.bufferKeyStates = new Array();
        Input.bufferNewKeyStates = new Array();
        Input.mouseBtns = new Array();
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
            if(Input.mouseBtns[event.button] == false || Input.mouseBtns[event.button] == null) {
                Input.bufferNewMouseBtns[event.button] = true;
            }
            Input.bufferMouseBtns[event.button] = true;
        };
        Input.mouseMove = function mouseMove(event) {
            var rect = SandLib.Engine.canvas.getBoundingClientRect();
            Input.mouseX = event.clientX - rect.left;
            Input.mouseY = event.clientY - rect.top;
            SandLib.Engine.debugText["Mouse"] = Input.mouseX + ":" + Input.mouseY;
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
        Engine.debugTextCol = "#000000";
        Engine.images = {
        };
        Engine.width = 0;
        Engine.height = 0;
        Engine.fillColor = "#AAAAAA";
        Engine.lastUpdate = new Date();
        Engine.timeInterval = 0;
        Engine.update = function update() {
            var now = new Date();
            Engine.timeInterval = (now.getTime() - Engine.lastUpdate.getTime()) / 1000;
            Engine.lastUpdate = now;
            SandLib.Input.update();
            Engine.currentScene.update();
            Engine.draw();
            Engine.debugText["Interval"] = Engine.timeInterval.toString();
            requestAnimationFrame(Engine.update);
        };
        Engine.init = function init(initialScene, canvas) {
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Engine.width = canvas.width;
            Engine.height = canvas.height;
            SandLib.Input.init();
            Engine.currentScene.init();
            requestAnimationFrame(Engine.update);
        };
        Engine.initTouch = function initTouch() {
            SandLib.Input.preventTouchDefault = true;
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
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component(x, y, width, height) {
                _super.call(this, x, y);
            this.width = 0;
            this.height = 0;
            this.width = width;
            this.height = height;
        }
        Component.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, this.width, this.height);
        };
        return Component;
    })(SandLib.Entity);
    SandLib.Component = Component;    
})(SandLib || (SandLib = {}));
var SandLib;
(function (SandLib) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(x, y, width, height, text, btnColor, txtColor, clickFunc) {
                _super.call(this, x, y, width, height);
            this.text = "";
            this.textHeight = 12;
            this.textPos = {
                x: 0,
                y: 0
            };
            this.text = text;
            var textSize = SandLib.Engine.context.measureText(this.text);
            this.textPos.x = (this.x + this.width / 2);
            this.textPos.y = (this.y + this.height / 2) + (this.textHeight / 2);
            this.clickFunc = clickFunc;
            this.imageDat = SandLib.Engine.context.createImageData(this.width, this.height);
            for(var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = btnColor.r;
                this.imageDat.data[i + 1] = btnColor.g;
                this.imageDat.data[i + 2] = btnColor.b;
                this.imageDat.data[i + 3] = btnColor.a;
            }
        }
        Button.prototype.clickFunc = function () {
        };
        Button.prototype.update = function () {
            _super.prototype.update.call(this);
            if(SandLib.Input.isMouseBtnJustDown(SandLib.Input.MOUSE_LEFT)) {
                if(this.getHitBox().isPointIntersecting(SandLib.Input.mouseX, SandLib.Input.mouseY)) {
                    this.clickFunc();
                }
            }
        };
        Button.prototype.draw = function () {
            SandLib.Engine.context.putImageData(this.imageDat, this.x, this.y);
            SandLib.Engine.context.fillStyle = "'#000000";
            SandLib.Engine.context.font = "12px Arial";
            SandLib.Engine.context.textAlign = "center";
            SandLib.Engine.context.fillText(this.text, this.textPos.x, this.textPos.y);
        };
        return Button;
    })(SandLib.Component);
    SandLib.Button = Button;    
})(SandLib || (SandLib = {}));
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
            _super.prototype.update.call(this);
            this.x += this.velocity.x * SandLib.Engine.timeInterval;
            this.y += this.velocity.y * SandLib.Engine.timeInterval;
        };
        return EntityMoving;
    })(SandLib.Entity);
    SandLib.EntityMoving = EntityMoving;    
})(SandLib || (SandLib = {}));
var LD;
(function (LD) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(x, y) {
                _super.call(this, x, y);
            this.cheatato = [
                32, 
                32, 
                16, 
                32, 
                16
            ];
            this.gravity = 50;
            this.jumpPow = 1000;
            this.accel = 3;
            this.maxVel = 800;
            this.decel = 20;
            this.coins = 0;
            this.cameraMoveZone = 100;
            this.onGround = false;
            this.image = SandLib.Engine.getImage("LD26/player.png");
            this.image.width = this.image.height = 32;
            var hb = this.getHitBox();
            this.originX = hb.width / 2;
            this.originY = hb.height / 2;
            SandLib.Input.registerCheat(this.cheatato, function () {
                console.log("potato");
                LD.GameScene.player.image = SandLib.Engine.getImage("LD26/potato.png");
            });
        }
        Player.prototype.update = function () {
            SandLib.Engine.debugText["Coins"] = this.coins;
            this.velocity.y += this.gravity;
            if(SandLib.Input.isKeyJustDown(16)) {
                this.gravity *= -1;
                this.jumpPow *= -1;
            }
            if(SandLib.Input.isKeyJustDown(32) && this.onGround) {
                this.velocity.y -= this.jumpPow;
                this.onGround = false;
            }
            this.velocity.x += this.accel;
            if(this.velocity.x > this.maxVel) {
                this.velocity.x = this.maxVel;
            }
            if(this.x > this.cameraMoveZone) {
                SandLib.Engine.currentScene.camera.x = this.x - this.cameraMoveZone;
            }
            _super.prototype.update.call(this);
        };
        Player.prototype.draw = function () {
            _super.prototype.draw.call(this);
        };
        Player.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, this.image.height, this.image.width);
        };
        return Player;
    })(SandLib.EntityMoving);
    LD.Player = Player;    
})(LD || (LD = {}));
var LD;
(function (LD) {
    var Platform = (function (_super) {
        __extends(Platform, _super);
        function Platform(x, y, width, height, color) {
                _super.call(this, x, y);
            this.width = 0;
            this.height = 0;
            this.location = 0;
            this.width = width;
            this.height = height;
            this.imageDat = SandLib.Engine.context.createImageData(width, height);
            for(var i = 0; i < this.imageDat.data.length; i += 4) {
                this.imageDat.data[i] = color.r;
                this.imageDat.data[i + 1] = color.g;
                this.imageDat.data[i + 2] = color.b;
                this.imageDat.data[i + 3] = color.a;
            }
        }
        Platform.LOC_BOTTOM = 0;
        Platform.LOC_TOP = 1;
        Platform.prototype.update = function () {
        };
        Platform.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, this.width, this.height);
        };
        Platform.prototype.draw = function () {
            if(this.isOnScreen()) {
                if((LD.GameScene.player.y + LD.GameScene.player.getHitBox().height) - this.y > 8 && this.x - (LD.GameScene.player.x + LD.GameScene.player.getHitBox().width) < 1 && this.x - LD.GameScene.player.x >= 0) {
                    LD.GameScene.player.velocity.x = -10;
                }
                if(this.getHitBox().isHitboxIntersecting(LD.GameScene.player.getHitBox())) {
                    LD.GameScene.player.y = this.y - LD.GameScene.player.getHitBox().height;
                    LD.GameScene.player.velocity.y = 0;
                    LD.GameScene.player.onGround = true;
                }
            }
            if(this.isOnScreen()) {
                SandLib.Engine.context.putImageData(this.imageDat, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
            }
        };
        return Platform;
    })(SandLib.Entity);
    LD.Platform = Platform;    
})(LD || (LD = {}));
var LD;
(function (LD) {
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin(x, y) {
                _super.call(this, x, y);
            this.image = SandLib.Engine.getImage("LD26/coin.png");
        }
        Coin.prototype.update = function () {
            if(this.isOnScreen()) {
                if(LD.GameScene.player.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                    SandLib.Engine.currentScene.remove(this);
                    LD.GameScene.player.coins++;
                }
            }
        };
        Coin.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, 12, 16);
        };
        return Coin;
    })(SandLib.Entity);
    LD.Coin = Coin;    
})(LD || (LD = {}));
var LD;
(function (LD) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
                _super.call(this);
            this.endX = 0;
            this.lastY = 500;
            this.maxY = 530;
            this.minY = 400;
            this.platformCol = {
                r: 200,
                g: 200,
                b: 200,
                a: 255
            };
        }
        GameScene.prototype.init = function () {
            GameScene.player = new LD.Player(10, 320);
            var platformWidth = Math.random() * 100 + 300;
            this.add(new LD.Platform(this.endX, this.lastY, platformWidth, 200, this.platformCol));
            this.add(GameScene.player);
        };
        GameScene.prototype.update = function () {
            _super.prototype.update.call(this);
            if(this.endX < SandLib.Engine.width + SandLib.Engine.currentScene.camera.x) {
                this.generatePlatform();
            }
        };
        GameScene.prototype.generatePlatform = function () {
            var hasCoins = Math.random() <= 0.5;
            var platformWidth = Math.random() * 100 + 300;
            var gap = Math.random() * 200 + 100;
            this.add(new LD.Platform(this.endX + gap, this.lastY, platformWidth, 200, this.platformCol));
            if(hasCoins) {
                console.log("ran");
                var numCoins = Math.round(platformWidth / 30);
                for(var i = 0; i < numCoins; i++) {
                    this.add(new LD.Coin(this.endX + gap + i * 30 + 6, this.lastY - 17));
                }
            }
            this.lastY = Math.random() * 100 + this.lastY - 50;
            this.endX += gap + platformWidth;
            if(this.lastY > this.maxY) {
                this.lastY = this.maxY;
            }
            if(this.lastY < this.minY) {
                this.lastY = this.minY;
            }
        };
        return GameScene;
    })(SandLib.Scene);
    LD.GameScene = GameScene;    
})(LD || (LD = {}));
var LD;
(function (LD) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = 960;
            canvas.height = 540;
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.debugTextCol = "#FFFFFF";
            SandLib.Engine.init(new LD.GameScene(), canvas);
        }
        return Main;
    })();
    LD.Main = Main;    
})(LD || (LD = {}));
new LD.Main();
