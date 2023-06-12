import { Position } from "./Position";
import { ShapeType } from "./ECS/ShapeType";

export class Entity {
    public height: number;
    public width: number;
    public scale: number;

    public pos: Position;

    public shapeType: ShapeType;

    public visible: boolean = false;
    
    constructor(height: number, width: number, scale: number, pos: Position, shapeType: ShapeType, visible: boolean = false) {
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.pos = pos;
        this.shapeType = shapeType; 
        this.visible = visible;
    }

    draw() {}
}