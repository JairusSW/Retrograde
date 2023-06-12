import { Renderer } from "../Renderer";
import { Position } from "../Position";
import { ShapeType } from "./ShapeType";

export class Entity {
    public renderer: Renderer;
    public height: number;
    public width: number;
    public scale: number;

    public pos: Position;

    public shapeType: ShapeType;
    
    constructor(renderer: Renderer, height: number, width: number, scale: number, pos: Position, shapeType: ShapeType) {
        this.renderer = renderer;
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.pos = pos;
        this.shapeType = shapeType;
    }

    draw() {}
}