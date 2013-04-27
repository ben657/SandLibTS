/// <reference path="../../SandLib/Core/Entity.ts"/>
/// <reference path="../../SandLib/Core/EntityMoving.ts"/>

module FF {

    export class Jet extends SandLib.EntityMoving {
        
        constructor(x:number, y:number) {
            super(x, y);         
        }
    }
}