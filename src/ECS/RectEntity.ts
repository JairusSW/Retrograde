import { Retrograde } from "../Retrograde";
import { Entity } from "./Entity";
import { Color } from "./Color";
import { Renderer } from "../Renderer";
import { Position } from "../Position";

export class RectEntity extends Entity {
    constructor(height: number, width: number, scale: number, pos: Position, color: Color) {
    super(height, width, scale, pos, color);
    }
    render() {
        Retrograde.SN.renderer.renderRect(this.pos.x, this.pos.y, this.width, this.height, this.color.red, this.color.green, this.color.blue, this.color.alpha);
    }
}