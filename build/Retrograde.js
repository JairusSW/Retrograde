import { Renderer } from "./Renderer";
var Retrograde = /** @class */ (function () {
    function Retrograde(screen) {
        this.entities = [];
        // Create singleton
        if (Retrograde.SN == null) {
            Retrograde.SN = this;
        }
        this.screen = screen;
        this.renderer = new Renderer(this.screen);
    }
    Retrograde.prototype.addEntity = function (entity) {
        entity.id = this.entities.length + 1;
        this.entities.push(entity);
    };
    Retrograde.prototype.removeEntity = function (entity) {
        this.entities.splice(this.entities.findIndex(function (v) { return v.id === entity.id; }), 1);
    };
    Retrograde.prototype.renderAll = function () {
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            if (entity.visible) {
                entity.render();
            }
        }
    };
    return Retrograde;
}());
export { Retrograde };
