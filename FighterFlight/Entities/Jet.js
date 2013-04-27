var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../SandLib/Core/Entity.ts"/>
/// <reference path="../../SandLib/Core/EntityMoving.ts"/>
var FF;
(function (FF) {
    var Jet = (function (_super) {
        __extends(Jet, _super);
        function Jet(x, y) {
                _super.call(this, x, y);
        }
        return Jet;
    })(SandLib.EntityMoving);
    FF.Jet = Jet;    
})(FF || (FF = {}));
//@ sourceMappingURL=Jet.js.map
