import { Screen, Renderer } from "./Renderer";
import { Key } from "./Key";
import { RectEntity } from "./ECS/RectEntity";
import { CircleEntity } from "./ECS/CircleEntity";
import { Position } from "./Position";
import { Color } from "./ECS/Color";
let screen!: Screen;
let renderer!: Renderer;
onload = () => {
  screen = new Screen("cnvs");
  renderer = new Renderer(screen);

  const rect = new RectEntity(renderer, 50, 200, 1, new Position(100, 100), new Color(1, 0, 0, 1));
  document.onkeydown = key => {
    if (key.key == "a" || key.key == "ArrowLeft") {
      rect.pos.x -= 10;
      console.log("Moving Left");
      
    } else if (key.key == "d" || key.key == "ArrowRight") {
      rect.pos.x += 10;
      console.log("Moving Right");
      
    }
  };

  const wholeWidth = document.querySelector("body")?.clientWidth!

  document.onmousemove = mouse => {
    rect.pos.x = mouse.x - (rect.width / 2);
    rect.pos.y = mouse.y// - (rect.height / 2);
  }

  animate(rect);
};

let red = 0;
let green = 0;
let blue = 0;

let toggle = 0;


function animate(rect: RectEntity) {
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
  rect.color.red = red;
  rect.color.blue = blue;
  rect.color.green = green;
  requestAnimationFrame(() => {
    rect.draw();
    animate(rect);
  });
}
