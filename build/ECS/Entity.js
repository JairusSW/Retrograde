// Grug say all global be unsafe
var idCount = 0;
var Entity = /** @class */ (function () {
    function Entity(height, width, scale, pos, color, visible) {
        if (visible === void 0) { visible = true; }
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.pos = pos;
        this.color = color;
        this.visible = visible;
        this.id = ++idCount;
    }
    Entity.prototype.render = function () { };
    return Entity;
}());
export { Entity };
