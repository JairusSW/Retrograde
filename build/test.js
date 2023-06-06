import { Screen, Renderer } from "./Renderer";
console.log("hello :D");
var x = 200;
var y = 30;
var x_position = 200.0;
var y_position = 30.0;
var x_direction = 1.0;
var y_direction = 1.0;
var red = 0;
var green = 0;
var blue = 0;
var toggle = 0;
var screen;
var renderer;
onload = function () {
    screen = new Screen("cnvs");
    renderer = new Renderer(screen);
    requestAnimationFrame(animate);
};
function animate() {
    var speed = 5.0;
    if (toggle === 0) {
        red += 0.1;
        if (red >= 1) {
            toggle = 1;
        }
    }
    if (toggle === 1) {
        red -= 0.1;
        if (red <= 0) {
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
        if (green <= 0) {
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
        if (blue <= 0) {
            toggle = 0;
        }
    }
    x_position += x_direction * speed;
    y_position += y_direction * speed;
    if (x_position <= 0.0 || x_position >= 500.0) {
        x_direction *= -1.0;
    }
    if (y_position <= 0.0 || y_position >= 500.0) {
        y_direction *= -1.0;
    }
    renderer.clearToColor(0.0, 0.0, 1, 1.0);
    renderer.drawRect(x_position, y_position, 100, 100, red, green, blue);
    requestAnimationFrame(function () {
        animate();
    });
}
