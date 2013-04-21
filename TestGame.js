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
    var Input = (function () {
        function Input() { }
        Input.currentKeyStates = new Array();
        Input.lastKeyStates = new Array();
        Input.currentMouseState = {
            mouseButtons: new Array(),
            x: 0,
            y: 0
        };
        Input.keyUp = function keyUp(event) {
            Input.currentKeyStates[event.keyCode] = false;
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
            Input.currentKeyStates[event.keyCode] = true;
        };
        Input.mouseUp = function mouseUp(event) {
            Input.currentMouseState.mouseButtons[event.button] = false;
        };
        Input.mouseDown = function mouseDown(event) {
            Input.currentMouseState.mouseButtons[event.button] = true;
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
                Input.currentMouseState.x = event.pageX - oX;
                Input.currentMouseState.y = event.pageY - oY;
            }
            console.log(Input.currentMouseState.x + ":" + Input.currentMouseState.y);
        };
        Input.init = function init() {
            addEventListener("keydown", Input.keyDown);
            addEventListener("keyup", Input.keyUp);
            addEventListener("mousedown", Input.mouseDown);
            addEventListener("mouseup", Input.mouseUp);
            addEventListener("mousemove", Input.mouseMove);
            Input.currentMouseState.x = 0;
            Input.currentMouseState.y = 0;
        };
        Input.isKeyDown = function isKeyDown(keyCode) {
            var b = Input.currentKeyStates[keyCode];
            if(b == null) {
                return false;
            }
            return b;
        };
        Input.isKeyJustDown = function isKeyJustDown(keyCode) {
            var bNow = Input.currentKeyStates[keyCode];
            var bThen = Input.lastKeyStates[keyCode];
            if(bNow == true && (bThen == false || bThen == null)) {
                return true;
            }
            return false;
        };
        Input.update = function update() {
            Input.lastKeyStates = Input.currentKeyStates;
        };
        return Input;
    })();
    SandLib.Input = Input;    
})(SandLib || (SandLib = {}));
var SandLib;
(function (SandLib) {
    var Engine = (function () {
        function Engine() { }
        Engine.images = {
        };
        Engine.update = function update() {
            SandLib.Input.update();
            Engine.currentScene.update();
            Engine.draw();
            requestAnimationFrame(Engine.update);
        };
        Engine.init = function init(initialScene, canvas) {
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            SandLib.Input.init();
            requestAnimationFrame(Engine.update);
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
            Engine.context.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);
            Engine.context.restore();
            Engine.currentScene.draw();
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
            this.e = new SandLib.Entity(10, 10);
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
        }
        return Main;
    })();
    TestGame.Main = Main;    
})(TestGame || (TestGame = {}));
var game = new TestGame.Main();
