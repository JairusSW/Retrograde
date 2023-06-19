import { Retrograde } from "../Retrograde";
import { Position } from "../Position";
import { Color } from "./Color";

// Grug say all global be unsafe
let idCount = 0;
export class Entity {
    public id: number;
    public height: number;
    public width: number;
    public scale: number;
    public pos: Position;
    public color: Color;
    public visible: boolean;
    
    constructor(height: number, width: number, scale: number, pos: Position, color: Color, visible: boolean = true) {
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.pos = pos;
        this.color = color;
        this.visible = visible;
        this.id = ++idCount;
    }

    render() {}
}