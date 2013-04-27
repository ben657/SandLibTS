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
            this.x = x;
            this.y = y;
        }
        Entity.prototype.update = function () {
        };
        Entity.prototype.draw = function () {
            SandLib.Engine.context.drawImage(this.image, this.x, this.y);
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
            this.entities = [];
        }
        Scene.prototype.init = function () {
        };
        Scene.prototype.add = function (entity) {
            this.entities[this.entities.length] = entity;
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
                37, 
                38, 
                39, 
                40
            ].indexOf(event.keyCode) == 0) {
                event.preventDefault();
            }
            if(Input.keyStates[event.keyCode] == false || Input.keyStates[event.keyCode] == null) {
                Input.bufferNewKeyStates[event.keyCode] = true;
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
        };
        Engine.init = function init(initialScene, canvas) {
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Engine.width = canvas.width;
            Engine.height = canvas.height;
            SandLib.Input.init();
            Engine.currentScene.init();
            setInterval(Engine.update, 16);
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
        Engine.draw = function draw() {
            Engine.context.save();
            Engine.context.setTransform(1, 0, 0, 1, 0, 0);
            Engine.context.fillStyle = Engine.fillColor;
            Engine.context.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height);
            Engine.context.restore();
            Engine.currentScene.draw();
            Engine.context.fillStyle = "'#000000";
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
var TG;
(function (TG) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
                _super.call(this);
        }
        MainScene.prototype.init = function () {
            var button = new SandLib.Button(10, 100, 50, 100, "Text", {
                r: 255,
                g: 0,
                b: 0,
                a: 255
            }, null, function () {
                console.log("ran");
            });
            this.add(button);
        };
        return MainScene;
    })(SandLib.Scene);
    TG.MainScene = MainScene;    
})(TG || (TG = {}));
var TG;
(function (TG) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            document.body.appendChild(canvas);
            SandLib.Engine.init(new TG.MainScene(), canvas);
        }
        return Main;
    })();
    TG.Main = Main;    
})(TG || (TG = {}));
new TG.Main();
