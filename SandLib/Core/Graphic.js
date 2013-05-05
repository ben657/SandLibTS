/// <reference path="Scene.ts"/>
/// <reference path="Input.ts"/>
var SandLib;
(function (SandLib) {
    var Graphic = (function () {
        function Graphic(path) {
            if(Graphic.tempCanvas == null) {
                Graphic.tempCanvas = document.createElement("canvas");
                Graphic.tempCanvas.width = SandLib.Engine.width;
                Graphic.tempCanvas.height = SandLib.Engine.height;
                Graphic.tempCtx = Graphic.tempCanvas.getContext("2d");
            }
            var imgDat = Graphic.images[path];
            if(imgDat == null) {
                var img = new Image();
                img.src = path;
                console.log(img.width);
                Graphic.tempCtx.drawImage(img, 0, 0);
                imgDat = Graphic.tempCtx.getImageData(0, 0, img.width, img.height);
                Graphic.images[path] = imgDat;
            }
            this.imageData = imgDat;
        }
        Graphic.images = {
        };
        return Graphic;
    })();
    SandLib.Graphic = Graphic;    
})(SandLib || (SandLib = {}));
//@ sourceMappingURL=Graphic.js.map
