import { Retrograde } from "../Retrograde";
import { Position } from "../Position";
import { Color } from "./Color";

// Grug say all global be unsafe
let idCount = 0;
export abstract class Entity {
    public id: number;
    public scale: number;
    public pos: Position;
    public color: number;
    public visible: boolean;
    
    constructor(scale: number, pos: Position, color: number, visible: boolean = true) {
        this.scale = scale;
        this.pos = pos;
        this.color = color;
        this.visible = visible;
        this.id = ++idCount;
    }

    abstract draw(): void;
}