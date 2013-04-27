
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

        private static preventTouchDefault:bool = false;

        private static keyStates: bool[] = new bool[];
        private static newKeyStates:bool[] = new bool[];
        private static bufferKeyStates:bool[] = new bool[];
        private static bufferNewKeyStates: bool[] = new bool[];

        private static mouseBtns: bool[] = new bool[];
        private static newMouseBtns: bool[] = new bool[];
        private static bufferMouseBtns: bool[] = new bool[];
        private static bufferNewMouseBtns:bool[] = new bool[];

        static mouseX: number = 0;
        static mouseY: number = 0;

        static MOUSE_LEFT = 0;
        static MOUSE_MIDDLE = 1;
        static MOUSE_RIGHT = 2;

        private static keyUp(event: KeyboardEvent) {
            bufferKeyStates[event.keyCode] = false;
        }

        private static keyDown(event: KeyboardEvent) {
            if ([37, 38, 39, 40].indexOf(event.keyCode) == 0) {
                event.preventDefault();
            }
            if (Input.keyStates[event.keyCode] == false || Input.keyStates[event.keyCode] == null) {
                Input.bufferNewKeyStates[event.keyCode] = true;
            }
            Input.bufferKeyStates[event.keyCode] = true;
        }

        private static mouseUp(event: MouseEvent) {
            Input.bufferMouseBtns[event.button] = false;
        }

        private static mouseDown(event: MouseEvent) {
            if (Input.mouseBtns[event.button] == false || Input.mouseBtns[event.button] == null) {
                Input.bufferNewMouseBtns[event.button] = true;
            }
            Input.bufferMouseBtns[event.button] = true;            
        }

        private static mouseMove(event: MouseEvent) {            
            var rect: ClientRect = Engine.canvas.getBoundingClientRect();
            Input.mouseX = event.clientX - rect.left;
            Input.mouseY = event.clientY - rect.top;
            Engine.debugText["Mouse"] = Input.mouseX + ":" + Input.mouseY;
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

        static update() {            
            keyStates = bufferKeyStates;
            newKeyStates = bufferNewKeyStates;
            bufferNewKeyStates = new bool[];

            mouseBtns = bufferMouseBtns;
            newMouseBtns = bufferNewMouseBtns;
            bufferNewMouseBtns = new bool[];            
        }

    }
}