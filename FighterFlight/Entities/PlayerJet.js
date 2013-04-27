var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../SandLib/Core/Engine.ts"/>
/// <reference path="Jet.ts"/>
var FF;
(function (FF) {
    var PlayerJet = (function (_super) {
        __extends(PlayerJet, _super);
        function PlayerJet(x, y) {
                _super.call(this, x, y);
            this.image = SandLib.Engine.getImage("FighterFlight/PlayerJet.png");
        }
        PlayerJet.prototype.update = function () {
            SandLib.Engine.debugText["Jet"] = "test";
            _super.prototype.update.call(this);
            if(this.y < SandLib.Input.mouseY) {
                this.y += 100 * SandLib.Engine.timeInterval;
            } else if(this.y > SandLib.Input.mouseY) {
                this.y -= 100 * SandLib.Engine.timeInterval;
            }
        };
        return PlayerJet;
    })(FF.Jet);
    FF.PlayerJet = PlayerJet;    
})(FF || (FF = {}));
//@ sourceMappingURL=PlayerJet.js.map
