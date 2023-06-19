// Grug say all global be unsafe
var idCount = 0;
var Entity = /** @class */ (function () {
    function Entity(scale, pos, color, visible) {
        if (visible === void 0) { visible = true; }
        this.scale = scale;
        this.pos = pos;
        this.color = color;
        this.visible = visible;
        this.id = ++idCount;
    }
    return Entity;
}());
export { Entity };
