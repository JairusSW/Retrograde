import { Entity } from "./Entity";
import { Color } from "./Color";
import { Renderer } from "../Renderer";
import { Position } from "../Position";
import { ShapeType } from "./ShapeType";

export class RectEntity extends Entity {
    public color: Color;
    constructor(renderer: Renderer, height: number, width: number, scale: number, pos: Position, color: Color) {
        super(renderer, height, width, scale, pos, ShapeType.Rect);
        this.color = color;
    }
    draw() {
        this.renderer.drawRect(this.pos.x, this.pos.y, this.width, this.height, this.color.red, this.color.green, this.color.blue, this.color.alpha);
    }
}