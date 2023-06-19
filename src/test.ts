import { Screen, Renderer } from "./Renderer";
import { Key } from "./Key";
import { Entity } from "./ECS/Entity";
import { LineEntity } from "./ECS/LineEntity";
import { Position } from "./Position";
import { Color } from "./ECS/Color";
import { Retrograde } from "./Retrograde";
onload = () => {
  const screen = new Screen("cnvs");
  const retrograde = new Retrograde(screen);

  const line = new LineEntity(
    [
      0.25, 0.875, 0.5, 0.75, 0.75, 0.5, 0.875, 0.25, 0.875, -0.25, 0.75, -0.5,
      0.5, -0.75, 0.25, -0.875, -0.25, -0.875, -0.5, -0.75, -0.75, -0.5, -0.875,
      -0.25, -0.875, 0.25, -0.7421875, 0.4921875, -0.5, 0.75, -0.25, 0.875,
    ],
    0.05,
    new Position(0, 0),
    0x00_ff_00_ff,
    0,
    0.05,
    0.06
  );

  retrograde.addEntity(line);

  document.onkeydown = (key) => {
    if (key.key == "a" || key.key == "ArrowLeft") {
      line.pos.x -= 0.01;
    } else if (key.key == "d" || key.key == "ArrowRight") {
      line.pos.x += 0.01;
    }
  };
  animate(line);
};
function animate(entity: LineEntity) {
  requestAnimationFrame(() => {
    Retrograde.SN.drawAll();
    animate(entity);
  });
}
