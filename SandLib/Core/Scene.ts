/// <reference path="Engine.ts"/>
/// <reference path="Entity.ts"/>

module SandLib {
    export class Scene {

        entities: Entity[];
        camera: Vector = { x: 0, y: 0 };

        constructor() {
            this.entities = [];
        }

        init() {

        }

        end() {

        }

        getAll(type: any, onScreenForce:bool) {
            var returnArray: Entity[] = new Entity[];

            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i] instanceof type) {
                    if (onScreenForce) {
                        if (this.entities[i].isOnScreen()) {
                            returnArray.push(this.entities[i]);
                        }
                    }
                    else {
                        returnArray.push(this.entities[i]);
                    }
                    
                }
            }
            return returnArray;
        }

        add(entity: Entity) {
            entity.scene = this;
            this.entities[this.entities.length] = entity;
        }

        remove(entity: Entity) {
            this.entities.splice(this.entities.indexOf(entity), 1);
        }

        updateEntities() {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
            }
        }

        sortEntities(a: Entity, b: Entity) {
            return b.layer - a.layer;
        }

        update() {
            this.entities.sort(this.sortEntities);
            this.updateEntities();
        }                

        drawEntities() {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        }

        draw() {
            this.drawEntities();
        }        
    }
}
