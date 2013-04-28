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
        Engine.setScene = function setScene(scene) {
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
            this.textCol = "#000000";
            this.textPos = {
                x: 0,
                y: 0
            };
            this.text = text;
            this.textCol = txtColor;
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
            SandLib.Engine.context.fillStyle = this.textCol;
            SandLib.Engine.context.font = "20px Arial";
            SandLib.Engine.context.textAlign = "center";
            SandLib.Engine.context.fillText(this.text, this.textPos.x, this.textPos.y);
        };
        return Button;
    })(SandLib.Component);
    SandLib.Button = Button;    
})(SandLib || (SandLib = {}));
var SandLib;
(function (SandLib) {
    var EntityText = (function (_super) {
        __extends(EntityText, _super);
        function EntityText(x, y, text, size, color) {
                _super.call(this, x, y);
            this.text = "";
            this.textCol = {
                r: 0,
                g: 0,
                b: 0,
                a: 255
            };
            this.textSize = 20;
            this.text = text;
            this.textSize = size;
            this.textCol = color;
        }
        EntityText.prototype.draw = function () {
            if(!this.hidden) {
                SandLib.Engine.context.fillStyle = "rgba(" + this.textCol.r + ", " + this.textCol.g + ", " + this.textCol.b + ", " + this.textCol.a + ")";
                SandLib.Engine.context.font = this.textSize + "px Arial";
                SandLib.Engine.context.textAlign = "left";
                SandLib.Engine.context.fillText(this.text, this.x - SandLib.Engine.currentScene.camera.x, this.y - SandLib.Engine.currentScene.camera.y);
            }
        };
        return EntityText;
    })(SandLib.Entity);
    SandLib.EntityText = EntityText;    
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
            this.gravity = 40;
            this.jumpPow = 1000;
            this.jumpBoost = 1.2;
            this.accel = 0.05;
            this.maxVel = 1500;
            this.decel = 20;
            this.coins = 0;
            this.cameraMoveZone = 100;
            this.onGround = true;
            this.image = SandLib.Engine.getImage("LD26/player.png");
            this.image.width = this.image.height = 32;
            var hb = this.getHitBox();
            this.originX = hb.width / 2;
            this.originY = hb.height / 2;
            this.velocity.x = 300;
            SandLib.Input.registerCheat(this.cheatato, function () {
                console.log("potato");
                LD.GameScene.player.image = SandLib.Engine.getImage("LD26/potato.png");
            });
        }
        Player.prototype.update = function () {
            this.velocity.y += this.gravity;
            if(SandLib.Input.isKeyJustDown(16)) {
                this.gravity *= -1;
                this.jumpPow *= -1;
            }
            this.velocity.x += this.accel;
            if(this.velocity.x > this.maxVel) {
                this.velocity.x -= this.decel;
            }
            if(this.x > this.cameraMoveZone) {
                SandLib.Engine.currentScene.camera.x = this.x - this.cameraMoveZone;
            }
            var platforms = SandLib.Engine.currentScene.getAll(LD.Platform, true);
            for(var i in platforms) {
                var p = platforms[i];
                if(p.location == LD.Platform.LOC_BOTTOM) {
                    if(p.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                        this.y = p.y - this.getHitBox().height;
                        if(!this.onGround) {
                            LD.Main.landSnd.play();
                        }
                        this.onGround = true;
                        this.velocity.y = 0;
                    } else if(this.y + this.getHitBox().height > p.y && this.x < p.x + p.getHitBox().width && this.x + this.getHitBox().width + this.velocity.x * SandLib.Engine.timeInterval >= p.x) {
                        this.velocity.x = 0;
                        this.onGround = false;
                    }
                } else if(p.location == LD.Platform.LOC_TOP) {
                    if(p.getHitBox().isHitboxIntersecting(this.getHitBox())) {
                        this.y = p.y + p.getHitBox().height;
                        if(!this.onGround) {
                            LD.Main.landSnd.play();
                        }
                        this.onGround = true;
                        this.velocity.y = 0;
                    } else if(this.y < p.y + p.getHitBox().height && this.x < p.x + p.getHitBox().width && this.x + this.getHitBox().width + this.velocity.x * SandLib.Engine.timeInterval >= p.x) {
                        this.velocity.x = 0;
                        this.onGround = false;
                    }
                }
            }
            if(SandLib.Input.isKeyJustDown(32) && this.onGround) {
                this.velocity.y -= this.jumpPow;
                this.velocity.x *= this.jumpBoost;
                this.onGround = false;
                LD.Main.jumpSnd.play();
            }
            if(this.y > 800 || this.y < -800) {
                this.die();
            }
            _super.prototype.update.call(this);
        };
        Player.prototype.die = function () {
            if(this.coins > LD.MainMenu.hiScore) {
                localStorage.setItem("hiScore", this.coins.toString());
            }
            SandLib.Engine.setScene(new LD.MainMenu());
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
        function Platform(x, y, width, height, location, color) {
                _super.call(this, x, y);
            this.width = 0;
            this.height = 0;
            this.location = 0;
            this.location = location;
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
        Platform.prototype.addCoins = function () {
            var numCoins = Math.round(this.getHitBox().width / 30);
            for(var i = 0; i < numCoins; i++) {
                if(this.location == 0) {
                    SandLib.Engine.currentScene.add(new LD.Coin(this.x + i * 30 + 6, this.y - 20));
                } else if(this.location == 1) {
                    SandLib.Engine.currentScene.add(new LD.Coin(this.x + i * 30 + 6, this.y + this.getHitBox().height + 4));
                }
            }
        };
        Platform.prototype.getHitBox = function () {
            return new SandLib.HitBox(this.x, this.y, this.width, this.height);
        };
        Platform.prototype.draw = function () {
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
                    LD.GameScene.flashMoneyLbl();
                    LD.Main.coinSnd.play();
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
                r: 255,
                g: 255,
                b: 255,
                a: 255
            };
        }
        GameScene.prototype.init = function () {
            GameScene.player = new LD.Player(10, this.lastY - 32);
            GameScene.moneyLbl = new SandLib.EntityText(0, 0, "Coins: 0", 20, {
                r: 255,
                g: 255,
                b: 255,
                a: 0
            });
            GameScene.moneyLbl.hidden = true;
            var platformWidth = Math.random() * 100 + 300;
            this.add(new LD.Platform(this.endX, this.lastY, platformWidth, 40, LD.Platform.LOC_BOTTOM, this.platformCol));
            this.add(new LD.Platform(this.endX, 0, platformWidth, 40, LD.Platform.LOC_TOP, this.platformCol));
            this.add(GameScene.player);
            this.add(GameScene.moneyLbl);
        };
        GameScene.flashMoneyLbl = function flashMoneyLbl() {
            GameScene.moneyLbl.textCol.a = 1;
            GameScene.moneyLbl.hidden = false;
            GameScene.moneyLbl.text = "Coins: " + GameScene.player.coins;
        };
        GameScene.prototype.update = function () {
            _super.prototype.update.call(this);
            if(this.endX < SandLib.Engine.width + SandLib.Engine.currentScene.camera.x) {
                this.generatePlatform();
            }
            if(GameScene.moneyLbl.textCol.a > 0) {
                GameScene.moneyLbl.textCol.a -= 0.02;
                console.log(GameScene.moneyLbl.textCol.a);
                GameScene.moneyLbl.x = GameScene.player.x - 10;
                if(GameScene.player.gravity < 0) {
                    GameScene.moneyLbl.y = GameScene.player.y + 50;
                } else {
                    GameScene.moneyLbl.y = GameScene.player.y - 8;
                }
            }
            if(GameScene.moneyLbl.textCol.a <= 0) {
                GameScene.moneyLbl.hidden = true;
            }
        };
        GameScene.prototype.generatePlatform = function () {
            var topHasCoins = Math.random() <= 0.3;
            var bottomHasCoins = Math.random() <= 0.3;
            var platformWidth = Math.random() * 200 + 300 + GameScene.player.velocity.x * 0.15;
            var minGap = 0;
            var speedMult = 0.7;
            if(GameScene.player.velocity.x * speedMult < 100) {
                minGap = 100;
            } else {
                minGap = GameScene.player.velocity.x * speedMult;
            }
            var gap = Math.random() * 150 + minGap;
            var height = SandLib.Engine.height - this.lastY;
            var pTop = new LD.Platform(this.endX + gap, this.lastY, platformWidth, height, LD.Platform.LOC_BOTTOM, this.platformCol);
            var pBottom = new LD.Platform(this.endX + gap, 0, platformWidth, height, LD.Platform.LOC_TOP, this.platformCol);
            this.add(pTop);
            this.add(pBottom);
            if(topHasCoins) {
                pTop.addCoins();
            }
            if(bottomHasCoins) {
                pBottom.addCoins();
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
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
                _super.call(this);
            this.btnCol = {
                r: 100,
                g: 100,
                b: 100,
                a: 255
            };
            this.txtCol = {
                r: 255,
                g: 255,
                b: 255,
                a: 255
            };
        }
        MainMenu.hiScore = 0;
        MainMenu.prototype.init = function () {
            this.playBtn = new SandLib.Button(SandLib.Engine.width / 2 - 50, SandLib.Engine.height / 5, 100, 30, "Play", this.btnCol, "#FFFFFF", function () {
                SandLib.Engine.setScene(new LD.GameScene());
            });
            MainMenu.hiScore = parseInt(localStorage.getItem("hiScore"));
            if(isNaN(MainMenu.hiScore)) {
                MainMenu.hiScore = 0;
            }
            this.add(this.playBtn);
            this.add(new SandLib.EntityText(this.playBtn.x, SandLib.Engine.height / 5 * 2, "HiScore: " + MainMenu.hiScore, 20, {
                r: 255,
                g: 255,
                b: 255,
                a: 1
            }));
        };
        MainMenu.prototype.update = function () {
            _super.prototype.update.call(this);
            if(SandLib.Input.isKeyJustDown(32)) {
                SandLib.Engine.setScene(new LD.GameScene());
            }
        };
        return MainMenu;
    })(SandLib.Scene);
    LD.MainMenu = MainMenu;    
})(LD || (LD = {}));
var LD;
(function (LD) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = 1024;
            canvas.height = 540;
            document.body.appendChild(canvas);
            SandLib.Engine.fillColor = "#000000";
            SandLib.Engine.debugTextCol = "#FFFFFF";
            SandLib.Engine.init(new LD.MainMenu(), canvas);
        }
        Main.jumpSnd = new Audio("LD26/jump.mp3");
        Main.landSnd = new Audio("LD26/land.mp3");
        Main.coinSnd = new Audio("LD26/coin.mp3");
        Main.mainSnd = new Audio("LD26/main.mp3");
        return Main;
    })();
    LD.Main = Main;    
})(LD || (LD = {}));
new LD.Main();
