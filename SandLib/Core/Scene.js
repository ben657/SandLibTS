/// <reference path="Engine.ts"/>
/// <reference path="Entity.ts"/>
var SandLib;
(function (SandLib) {
    var Scene = (function () {
        function Scene() {
            this.camera = {
                x: 0,
                y: 0
            };
            this.entities = [];
        }
        Scene.prototype.init = function () {
        };
        Scene.prototype.getAll = function (type) {
            var returnArray = new Array();
            for(var i = 0; i < this.entities.length; i++) {
                if(this.entities[i] instanceof type) {
                    returnArray.push(this.entities[i]);
                }
            }
            return returnArray;
        };
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
//@ sourceMappingURL=Scene.js.map
