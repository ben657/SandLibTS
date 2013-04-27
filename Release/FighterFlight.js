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
            if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
                return true;
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
                Input.bufferNewKeyStates[event.button] = true;
            }
            Input.bufferMouseBtns[event.button] = true;
        };
        Input.mouseMove = function mouseMove(event) {
            var oX = 0;
            var oY = 0;
            var currentElement = SandLib.Engine.canvas;
            do {
                oX += currentElement.offsetLeft - currentElement.scrollLeft;
                oY += currentElement.offsetTop - currentElement.scrollTop;
            }while(currentElement = currentElement.offsetParent);
            if(event.pageX - oX > 0 && event.pageX - oX < SandLib.Engine.canvas.width && event.pageY - oY > 0 && event.pageY - oY < SandLib.Engine.canvas.height) {
                Input.mouseX = event.pageX - oX;
                Input.mouseY = event.pageY - oY;
            }
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
        function Button(x, y, width, height, text, btnColor, txtColor) {
                _super.call(this, x, y, width, height);
            this.text = "";
            this.text = text;
            this.imageDat = SandLib.Engine.context.createImageData(this.width, this.height);
            for(var i = 0; i < this.imageDat.data.length / 4; i++) {
                this.imageDat.data[i] = btnColor.r;
                this.imageDat.data[i + 1] = btnColor.g;
                this.imageDat.data[i + 2] = btnColor.b;
                this.imageDat.data[i + 3] = btnColor.a;
            }
        }
        Button.prototype.draw = function () {
            SandLib.Engine.context.putImageData(this.imageDat, this.x, this.y);
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
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        };
        return EntityMoving;
    })(SandLib.Entity);
    SandLib.EntityMoving = EntityMoving;    
})(SandLib || (SandLib = {}));
var FF;
(function (FF) {
    var Jet = (function (_super) {
        __extends(Jet, _super);
        function Jet(x, y) {
                _super.call(this, x, y);
        }
        return Jet;
    })(SandLib.EntityMoving);
    FF.Jet = Jet;    
})(FF || (FF = {}));
var FF;
(function (FF) {
    var PlayerJet = (function (_super) {
        __extends(PlayerJet, _super);
        function PlayerJet(x, y) {
                _super.call(this, x, y);
            this.image = SandLib.Engine.getImage("FighterFlight/PlayerJet.png");
        }
        PlayerJet.prototype.update = function () {
            SandLib.Engine.debugText["Jet"] = "test";
            _super.prototype.update.call(this);
            if(this.y < SandLib.Input.mouseY) {
                this.y += 100 * SandLib.Engine.timeInterval;
            } else if(this.y > SandLib.Input.mouseY) {
                this.y -= 100 * SandLib.Engine.timeInterval;
            }
        };
        return PlayerJet;
    })(FF.Jet);
    FF.PlayerJet = PlayerJet;    
})(FF || (FF = {}));
var FF;
(function (FF) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
                _super.call(this);
            this.player = new FF.PlayerJet(10, SandLib.Engine.height / 2);
            console.log(SandLib.Engine.canvas == null);
        }
        return GameScene;
    })(SandLib.Scene);
    FF.GameScene = GameScene;    
})(FF || (FF = {}));
var FF;
(function (FF) {
    var Main = (function () {
        function Main() {
            var canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            document.body.appendChild(canvas);
            var initialScene = new FF.GameScene();
            SandLib.Engine.init(initialScene, canvas);
        }
        return Main;
    })();
    FF.Main = Main;    
})(FF || (FF = {}));
new FF.Main();
