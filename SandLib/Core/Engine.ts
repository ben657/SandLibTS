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
        static debugTextCol:string = "#000000";

        static canvas: HTMLCanvasElement;
        static context: CanvasRenderingContext2D;

        static images: { [index: string]: HTMLImageElement; } = {};

        static currentScene: Scene;
        static lastScene: Scene;

        static width = 0;
        static height = 0;
        static fillColor: string = "#AAAAAA";

        private static lastUpdate = new Date();
        static timeInterval:number = 0;

        static update() {
            var now: Date = new Date();
            timeInterval = (now.getTime() - Engine.lastUpdate.getTime()) / 1000;
            Engine.lastUpdate = now;
            Input.update();
            currentScene.update();            
            draw();
            //Engine.debugText["Interval"] = Engine.timeInterval.toString();
            requestAnimationFrame(update);
        }

        static init(initialScene: Scene, canvas: HTMLCanvasElement) {            
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Engine.width = canvas.width;
            Engine.height = canvas.height;
            Input.init();
            currentScene.init();
            requestAnimationFrame(update);
            //setInterval(update, 16);
        }

        static initTouch() {
            Input.preventTouchDefault = true;
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
            Engine.currentScene = scene;
            Engine.currentScene.init();
        }

        static normalizeVector(vector:Vector) {
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