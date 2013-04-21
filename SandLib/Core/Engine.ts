/// <reference path="Scene.ts"/>
/// <reference path="Input.ts"/>

module SandLib {
    export class Engine {

        static canvas: HTMLCanvasElement;
        static context: CanvasRenderingContext2D;

        static images: { [index: string]: HTMLImageElement; } = {};

        static currentScene: Scene;
        static lastScene: Scene;

        static update() {
            Input.update();
            currentScene.update();            
            draw();
            requestAnimationFrame(update);
        }

        static init(initialScene: Scene, canvas: HTMLCanvasElement) {
            Engine.currentScene = initialScene;
            Engine.canvas = canvas;
            Engine.context = canvas.getContext("2d");
            Input.init();
            requestAnimationFrame(update);
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

        static draw() {
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);           
            context.restore();
            currentScene.draw();
        }
    }
}