import { Screen } from "./Renderer";
import { LineEntity } from "./ECS/LineEntity";
import { Position } from "./Position";
import { Retrograde } from "./Retrograde";
onload = function () {
    var screen = new Screen("cnvs");
    var retrograde = new Retrograde(screen);
    var line = new LineEntity([
        0.25, 0.875, 0.5, 0.75, 0.75, 0.5, 0.875, 0.25, 0.875, -0.25, 0.75, -0.5,
        0.5, -0.75, 0.25, -0.875, -0.25, -0.875, -0.5, -0.75, -0.75, -0.5, -0.875,
        -0.25, -0.875, 0.25, -0.7421875, 0.4921875, -0.5, 0.75, -0.25, 0.875,
    ], 0.05, new Position(0, 0), 16711935, 0, 0.05, 0.06);
    retrograde.addEntity(line);
    document.onkeydown = function (key) {
        if (key.key == "a" || key.key == "ArrowLeft") {
            line.pos.x -= 0.01;
        }
        else if (key.key == "d" || key.key == "ArrowRight") {
            line.pos.x += 0.01;
        }
    };
    animate(line);
};
function animate(entity) {
    requestAnimationFrame(function () {
        Retrograde.SN.drawAll();
        animate(entity);
    });
}
