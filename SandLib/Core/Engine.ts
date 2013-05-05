/// <reference path="Scene.ts"/>
/// <reference path="Input.ts"/>

module SandLib {

    export interface Vector {
        x: number;
        y: number;
    }

    export interface Color {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    export class Engine {

        static debugText: { [index: string]: any; } = {};
        static debugTextCol: string = "#FF0000";

        static canvas: HTMLCanvasElement;
        static context: CanvasRenderingContext2D;

        static images: { [index: string]: HTMLImageElement; } = {};

        static currentScene: Scene;
        static lastScene: Scene;

        static width = 0;
        static height = 0;
        static fillColor: string = "#AAAAAA";
        static hasTouchScreen: bool = false;

        static nextFrame: ImageData;

        private static lastUpdate: number = Date.now();
        static timeInterval: number = 0;

        static update() {
            Engine.timeInterval = (Date.now() - Engine.lastUpdate) / 1000;
            Engine.lastUpdate = Date.now();
            Input.update();
            currentScene.update();
            draw();
            if (window.requestAnimationFrame != null) {
                requestAnimationFrame(Engine.update);
            }
            Engine.debugText["Interval"] = Engine.timeInterval.toString();
        }

        static init(initialScene: Scene, canvas: HTMLCanvasElement, fps?: number = 60) {
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Engine.width = canvas.width;
            Engine.height = canvas.height;
            if (!!("ontouchstart" in window) || !!("onmsgesturechange" in window)) {
                Engine.hasTouchScreen = true;
            }
            Input.init();
            currentScene.init();
            if (window.requestAnimationFrame != null) {
                requestAnimationFrame(Engine.update);
            }
            else {
                setInterval(update, (1 / fps) * 1000);
            }

        }

        static getImage(path: string): HTMLImageElement {
            var img: HTMLImageElement = this.images[path];
            if (img == null) {
                img = new Image();
                img.src = path;
                img.addEventListener("load", function () {
                    Engine.images[path] = img;
                });
            }
            return img;
        }

        static setScene(scene: Scene) {
            Engine.currentScene.end();
            Engine.currentScene = scene;
            Engine.currentScene.init();
        }

        static normalizeVector(vector: Vector):Vector {
            var length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
            if (length == 0) {
                return { x: 0, y: 0 };
            }
            var newVector = { x: vector.x / length, y: vector.y / length };
            return newVector;
        }

        static draw() {
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.fillStyle = fillColor;
            context.fillRect(0, 0, canvas.width, canvas.height);           
            context.restore();
            currentScene.draw();
            context.fillStyle = Engine.debugTextCol;
            context.font = "20px Arial";
            context.textAlign = "left";
            var i = 0;
            for (var key in debugText) {
                context.fillText(key + ": " + debugText[key], 5, (i + 1) * 20);
                i++;
            }
        }
    }
}