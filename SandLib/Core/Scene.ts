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

        getAll(type: any) {
            var returnArray: Entity[] = new Entity[];

            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i] instanceof type) {
                    returnArray.push(this.entities[i]);
                }
            }
            return returnArray;
        }

        add(entity: Entity) {
            this.entities[this.entities.length] = entity;
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
