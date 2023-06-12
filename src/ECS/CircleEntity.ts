import { Entity } from "./Entity";
import { Color } from "./Color";
import { Renderer } from "../Renderer";
import { Position } from "../Position";
import { ShapeType } from "./ShapeType";

export class CircleEntity extends Entity {
    public color: Color;
    public radius: number;
    constructor(renderer: Renderer, radius: number, scale: number, pos: Position, color: Color) {
        super(renderer, radius * 2, radius * 2, scale, pos, ShapeType.Rect);
        this.radius = radius;
        this.color = color;
    }
    draw() {
        this.renderer.drawCircle(this.pos.x, this.pos.y, this.radius, this.color.red, this.color.green, this.color.blue, this.color.alpha);
    }
}