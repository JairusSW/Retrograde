import { Screen, Renderer } from "./Renderer";
import { Key } from "./Key";
console.log("hello :D");
let x = 200;
let y = 30;

let x_position = 200.0;
let y_position = 30.0;

let x_direction = 1.0;
let y_direction = 1.0;

let screen!: Screen;
let renderer!: Renderer
onload = () => {
    screen = new Screen("cnvs");
    renderer = new Renderer(screen);
    requestAnimationFrame(animate);
}

function animate() {
    let speed = 5.0;

    x_position += x_direction * speed;
    y_position += y_direction * speed;
    if (x_position <= 0.0 || x_position >= 500.0) {
        x_direction *= -1.0;
    }
    if (y_position <= 0.0 || y_position >= 500.0) {
        y_direction *= -1.0;
    }
    renderer.clearToColor(0.0, 0.0, 1, 1.0);
    renderer.drawRect(x_position, y_position, 100, 100);
    requestAnimationFrame(() => {
        animate();
    });
}