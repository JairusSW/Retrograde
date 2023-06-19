var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Retrograde } from "../Retrograde";
import { Entity } from "./Entity";
var CircleEntity = /** @class */ (function (_super) {
    __extends(CircleEntity, _super);
    function CircleEntity(radius, scale, pos, color) {
        var _this = _super.call(this, radius * 2, radius * 2, scale, pos, color) || this;
        _this.radius = radius;
        return _this;
    }
    CircleEntity.prototype.render = function () {
        Retrograde.SN.renderer.renderCircle(this.pos.x, this.pos.y, this.radius, this.color.red, this.color.green, this.color.blue, this.color.alpha);
    };
    return CircleEntity;
}(Entity));
export { CircleEntity };
