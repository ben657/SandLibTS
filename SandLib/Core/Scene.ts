/// <reference path="Engine.ts"/>
/// <reference path="Entity.ts"/>

module SandLib {
    export class Scene {

        entities: Entity[];

        constructor() {
            this.entities = [];
        }

        init() {

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
