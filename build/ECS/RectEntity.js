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
import { Entity } from "./Entity";
import { ShapeType } from "./ShapeType";
var RectEntity = /** @class */ (function (_super) {
    __extends(RectEntity, _super);
    function RectEntity(renderer, height, width, scale, pos, color) {
        var _this = _super.call(this, renderer, height, width, scale, pos, ShapeType.Rect) || this;
        _this.color = color;
        return _this;
    }
    RectEntity.prototype.draw = function () {
        this.renderer.drawRect(this.pos.x, this.pos.y, this.width, this.height, this.color.red, this.color.green, this.color.blue, this.color.alpha);
    };
    return RectEntity;
}(Entity));
export { RectEntity };
