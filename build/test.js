import { Screen, Renderer } from "./Renderer";
import { RectEntity } from "./ECS/RectEntity";
import { Position } from "./Position";
import { Color } from "./ECS/Color";
var screen;
var renderer;
onload = function () {
    var _a;
    screen = new Screen("cnvs");
    renderer = new Renderer(screen);
    var rect = new RectEntity(renderer, 50, 200, 1, new Position(100, 100), new Color(1, 0, 0, 1));
    document.onkeydown = function (key) {
        if (key.key == "a" || key.key == "ArrowLeft") {
            rect.pos.x -= 10;
            console.log("Moving Left");
        }
        else if (key.key == "d" || key.key == "ArrowRight") {
            rect.pos.x += 10;
            console.log("Moving Right");
        }
    };
    var wholeWidth = (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.clientWidth;
    document.onmousemove = function (mouse) {
        rect.pos.x = mouse.x - (rect.width / 2);
        rect.pos.y = mouse.y; // - (rect.height / 2);
    };
    animate(rect);
};
var red = 0;
var green = 0;
var blue = 0;
var toggle = 0;
function animate(entity) {
    if (toggle === 0) {
        red += 0.1;
        if (red >= 1) {
            toggle = 1;
        }
    }
    if (toggle === 1) {
        red -= 0.1;
        if (red <= 0.3) {
            toggle = 2;
        }
    }
    if (toggle === 2) {
        green += 0.1;
        if (green >= 1) {
            toggle = 3;
        }
    }
    if (toggle === 3) {
        green -= 0.1;
        if (green <= 0.3) {
            toggle = 4;
        }
    }
    if (toggle === 4) {
        blue += 0.1;
        if (blue >= 1) {
            toggle = 5;
        }
    }
    if (toggle === 5) {
        blue -= 0.1;
        if (blue <= 0.3) {
            toggle = 0;
        }
    }
    entity.color.red = red;
    entity.color.blue = blue;
    entity.color.green = green;
    requestAnimationFrame(function () {
        entity.render();
        animate(entity);
    });
}
