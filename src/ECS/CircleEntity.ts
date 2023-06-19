import { Retrograde } from "../Retrograde";

import { Entity } from "./Entity";
import { Color } from "./Color";
import { Renderer } from "../Renderer";
import { Position } from "../Position";
import { ShapeType } from "./ShapeType";

export class CircleEntity extends Entity {
    public radius: number;
    constructor(radius: number, scale: number, pos: Position, color: Color) {
        super(radius * 2, radius * 2, scale, pos, color);
        this.radius = radius;
    }
    render() {
        Retrograde.SN.renderer.renderCircle(this.pos.x, this.pos.y, this.radius, this.color.red, this.color.green, this.color.blue, this.color.alpha);
    }
}