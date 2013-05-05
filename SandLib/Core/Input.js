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
//@ sourceMappingURL=Input.js.map
