var Entity = /** @class */ (function () {
    function Entity(renderer, height, width, scale, pos, shapeType) {
        this.renderer = renderer;
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.pos = pos;
        this.shapeType = shapeType;
    }
    Entity.prototype.draw = function () { };
    return Entity;
}());
export { Entity };
