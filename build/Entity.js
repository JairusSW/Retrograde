var Entity = /** @class */ (function () {
    function Entity(height, width, scale, pos, shapeType, visible) {
        if (visible === void 0) { visible = false; }
        this.visible = false;
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.pos = pos;
        this.shapeType = shapeType;
        this.visible = visible;
    }
    Entity.prototype.draw = function () { };
    return Entity;
}());
export { Entity };
