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
        Input.lastMouseState = {
            mouseButtons: new Array(),
            x: 0,
            y: 0
        };
        Input.mouseX = 0;
        Input.mouseY = 0;
        Input.MOUSE_LEFT = 0;
        Input.MOUSE_MIDDLE = 1;
        Input.MOUSE_RIGHT = 2;
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
            Input.mouseX = Input.currentMouseState.x;
            Input.mouseY = Input.currentMouseState.y;
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
        Input.isMouseBtnDown = function isMouseBtnDown(button) {
            return Input.currentMouseState.mouseButtons[button];
        };
        Input.isMouseBtnJustDown = function isMouseBtnJustDown(button) {
            if(Input.lastMouseState.mouseButtons[button] == false && Input.currentMouseState.mouseButtons[button] == true) {
                return true;
            }
            return false;
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
//@ sourceMappingURL=Input.js.map
