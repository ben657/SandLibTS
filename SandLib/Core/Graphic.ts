/// <reference path="Scene.ts"/>
/// <reference path="Input.ts"/>

module SandLib {
    export class Graphic {

        static tempCanvas: HTMLCanvasElement;
        static tempCtx: CanvasRenderingContext2D;
        static images: { [index: string]: ImageData; } = {};

        imageData: ImageData;

        constructor(path: string) {
            if (Graphic.tempCanvas == null) {
                Graphic.tempCanvas = <HTMLCanvasElement>document.createElement("canvas");
                Graphic.tempCanvas.width = Engine.width;
                Graphic.tempCanvas.height = Engine.height;
                Graphic.tempCtx = Graphic.tempCanvas.getContext("2d");
            }

            var imgDat: ImageData = Graphic.images[path];
            if (imgDat == null) {
                var img: HTMLImageElement = new Image();
                img.src = path;
                console.log(img.width);
                Graphic.tempCtx.drawImage(img, 0, 0);
                imgDat = Graphic.tempCtx.getImageData(0, 0, img.width, img.height);
                Graphic.images[path] = imgDat;
            }
            this.imageData = imgDat;
        }
    }
}