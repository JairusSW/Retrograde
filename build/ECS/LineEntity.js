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
import { RENDER_TYPE } from "../Renderer";
var LineEntity = /** @class */ (function (_super) {
    __extends(LineEntity, _super);
    function LineEntity(line, scale, pos, color, rotation, scale_x, scale_y, visible) {
        if (rotation === void 0) { rotation = 0; }
        if (scale_x === void 0) { scale_x = 0; }
        if (scale_y === void 0) { scale_y = 0; }
        if (visible === void 0) { visible = true; }
        var _this = _super.call(this, scale, pos, color, visible) || this;
        _this.buffer = new Float32Array(line);
        _this.rotation = rotation;
        _this.scale_x = scale_x;
        _this.scale_y = scale_y;
        return _this;
    }
    LineEntity.prototype.draw = function () {
        Retrograde.SN.renderer.renderLine(this.buffer, this.pos.x, this.pos.y, this.rotation, this.scale_x, this.scale_y, this.color, RENDER_TYPE.LINE_LOOP);
    };
    return LineEntity;
}(Entity));
export { LineEntity };
