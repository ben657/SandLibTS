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
        Engine.update = function update() {
            SandLib.Input.update();
            Engine.currentScene.update();
            Engine.draw();
        };
        Engine.init = function init(initialScene, canvas) {
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Engine.width = canvas.width;
            Engine.height = canvas.height;
            SandLib.Input.init();
            setInterval(Engine.update, 20);
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
                console.log(key + ": " + Engine.debugText[key]);
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
var TestGame;
(function (TestGame) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
                _super.call(this);
            this.e = new SandLib.Entity(100, 10);
            this.e.image = SandLib.Engine.getImage("random.png");
            this.add(this.e);
        }
        MainScene.prototype.update = function () {
            _super.prototype.update.call(this);
            if(SandLib.Input.isKeyDown(65)) {
                this.e.x -= 0.5;
            }
            if(SandLib.Input.isKeyDown(68)) {
                this.e.x += 0.5;
            }
            if(SandLib.Input.isKeyDown(87)) {
                this.e.y -= 0.5;
            }
            if(SandLib.Input.isKeyDown(83)) {
                this.e.y += 0.5;
            }
        };
        return MainScene;
    })(SandLib.Scene);
    TestGame.MainScene = MainScene;    
})(TestGame || (TestGame = {}));
var TestGame;
(function (TestGame) {
    var Main = (function () {
        function Main() {
            var canvas = document.getElementById("canvas");
            var initScene = new TestGame.MainScene();
            SandLib.Engine.init(initScene, canvas);
            SandLib.Engine.initTouch();
        }
        return Main;
    })();
    TestGame.Main = Main;    
})(TestGame || (TestGame = {}));
var game = new TestGame.Main();
