import { Retrograde } from "../Retrograde";

import { Entity } from "./Entity";
import { Position } from "../Position";
import { RENDER_TYPE } from "../Renderer";

export class LineEntity extends Entity {
  public buffer: Float32Array;
  public rotation: number;
  public scale_x: number;
  public scale_y: number;
  constructor(
    line: number[],
    scale: number,
    pos: Position,
    color: number,
    rotation: number = 0,
    scale_x: number = 0,
    scale_y: number = 0,
    visible: boolean = true
  ) {
    super(scale, pos, color, visible);
    this.buffer = new Float32Array(line);
    this.rotation = rotation;
    this.scale_x = scale_x;
    this.scale_y = scale_y;
  }
  draw() {
    Retrograde.SN.renderer.renderLine(
      this.buffer,
      this.pos.x,
      this.pos.y,
      this.rotation,
      this.scale_x,
      this.scale_y,
      this.color,
      RENDER_TYPE.LINE_LOOP
    );
  }
}
