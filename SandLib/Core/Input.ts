
module SandLib {

    export interface Touch {
        identifier: number;
        target: EventTarget;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
    };

    export interface TouchList {
        length: number;
        item(index: number): Touch;
        identifiedTouch(identifier: number): Touch;
    };

    export interface TouchEvent extends UIEvent {
        touches: TouchList;
        targetTouches: TouchList;
        changedTouches: TouchList;
        altKey: bool;
        metaKey: bool;
        ctrlKey: bool;
        shiftKey: bool;
        initTouchEvent(type: string, canBubble: bool, cancelable: bool, view: AbstractView, detail: number, ctrlKey: bool, altKey: bool, shiftKey: bool, metaKey: bool, touches: TouchList, targetTouches: TouchList, changedTouches: TouchList);
    };

    declare var TouchEvent: {
        prototype: TouchEvent;
        new (): TouchEvent;
    }

    export interface MouseState {
        mouseButtons: bool[];
        x: number;
        y: number;
    }

    export class Input {

        private static keyStates: bool[] = new bool[];
        private static newKeyStates:bool[] = new bool[];
        private static bufferKeyStates:bool[] = new bool[];
        private static bufferNewKeyStates: bool[] = new bool[];

        private static mouseBtns: bool[] = new bool[];
        private static lastMouseBtns:bool[] = new bool[];
        private static newMouseBtns: bool[] = new bool[];
        private static bufferMouseBtns: bool[] = new bool[];
        private static bufferNewMouseBtns: bool[] = new bool[];

        private static cheatCode: number[];
        private static lastPresses: number[];
        private static onCheat(){};

        static mouseX: number = 0;
        static mouseY: number = 0;

        static MOUSE_LEFT = 0;
        static MOUSE_MIDDLE = 1;
        static MOUSE_RIGHT = 2;        

        private static keyUp(event: KeyboardEvent) {
            bufferKeyStates[event.keyCode] = false;
        }

        private static keyDown(event: KeyboardEvent) {
            if ([16, 37, 38, 39, 40].indexOf(event.keyCode) == 0) {
                event.preventDefault();
            }
            if (Input.keyStates[event.keyCode] == false || Input.keyStates[event.keyCode] == null) {
                Input.bufferNewKeyStates[event.keyCode] = true;
                if (Input.cheatCode != null) {
                    Input.lastPresses.push(event.keyCode);
                    if (Input.lastPresses.length >= 5) {                        
                        var last5: number[] = Input.lastPresses.slice(Input.lastPresses.length - Input.cheatCode.length, Input.lastPresses.length);
                        var numRight: number = 0;
                        for (var i = 0; i < last5.length; i++) {
                            if (last5[i] == Input.cheatCode[i]) {
                                numRight++;
                            }
                        }
                        if (numRight == Input.cheatCode.length) {
                            Input.onCheat();
                        }
                    }
                }
            }
            Input.bufferKeyStates[event.keyCode] = true;
        }

        private static mouseUp(event: MouseEvent) {
            Input.bufferMouseBtns[event.button] = false;
        }

        private static mouseDown(event: MouseEvent) {
            event.preventDefault();
            if (Input.mouseBtns[event.button] == false || Input.mouseBtns[event.button] == null) {
                Input.bufferNewMouseBtns[event.button] = true;
            }
            Input.bufferMouseBtns[event.button] = true;            
        }

        private static mouseMove(event: MouseEvent) {
            event.preventDefault();
            var rect: ClientRect = Engine.canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            if (x < 0) { x = 0; }
            if (x > Engine.width) { x = Engine.width; }
            if (y < 0) { y = 0; }
            if (y > Engine.height) { y = Engine.height; }
            Input.mouseX = x;
            Input.mouseY = y;
        }    

        static init() {
            addEventListener("keydown", keyDown);
            addEventListener("keyup", keyUp);
            addEventListener("mousedown", mouseDown);
            addEventListener("mouseup", mouseUp);
            addEventListener("mousemove", mouseMove);

            mouseX = 0;
            mouseY = 0;
        }

        static clientToCanvasXY(x: number, y: number):Vector {
            var rect: ClientRect = Engine.canvas.getBoundingClientRect();
            return { x: x - rect.left, y: y - rect.top };
        }

        static isMouseBtnDown(button: number) {
            var b: bool = Input.mouseBtns[button];
            if (b == null) {
                return false;
            }
            return b;
        }

        static isMouseBtnJustDown(button: number) {
            var b: bool = Input.newMouseBtns[button];
            if (b == null) {
                return false;
            }
            return b;
        }

        static isMouseBtnJustUp(button: number) {
            var bNow: bool = Input.mouseBtns[button];
            var bLas: bool = Input.lastMouseBtns[button];
            if ((bNow == false || bNow == null) && bLas == true) {
                return true;
            }
            return false;
        }

        static isKeyDown(keyCode: number) {
            var b: bool = keyStates[keyCode];
            if (b == null) {
                return false;
            }
            return b;
        }

        static isKeyJustDown(keyCode: number) {                        
            var b: bool = newKeyStates[keyCode];
            if (b == null) {
                return false;
            }
            return b;
        }

        static registerCheat(keys: number[], onCheat:any) {
            Input.onCheat = onCheat;
            Input.cheatCode = keys;
            Input.lastPresses = new number[];
        }

        static update() {            
            keyStates = bufferKeyStates;
            newKeyStates = bufferNewKeyStates;
            bufferNewKeyStates = new bool[];

            lastMouseBtns = mouseBtns;
            mouseBtns = bufferMouseBtns;
            newMouseBtns = bufferNewMouseBtns;
            bufferNewMouseBtns = new bool[];            
        }

    }
}