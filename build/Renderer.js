"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = exports.Screen = void 0;
class Screen {
    constructor(height, width, canvas) {
        this.height = height;
        this.width = width;
        this.size = height * width;
        this.canvas = canvas;
    }
}
exports.Screen = Screen;
class Renderer {
    constructor(screen) {
        this.screen = screen;
        this.ctx = screen.canvas.getContext("2d");
        this.buffer = new Uint8ClampedArray(this.screen.height * this.screen.width);
        this.image_data = new ImageData(this.buffer, this.screen.width, this.screen.height);
        this.buffer_i32 = new Uint32Array(this.buffer);
    }
    clear() {
        // Color the screen black
        this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    }
    render() {
        this.ctx.putImageData(this.image_data, 0, 0);
    }
    generateCubes() {
        for (let i = 0; i < 3000 * 4; i += 4) {
            let temp = Math.floor(Math.random() * this.screen.size);
            this.buffer_i32[i] = temp;
            temp = Math.floor(Math.random() * this.screen.size);
            this.buffer_i32[i + 1] = temp;
            temp = (Math.round(Math.random() * 4) - 2);
            this.buffer_i32[i + 2] = temp;
            temp = (Math.round(Math.random() * 4) - 2);
            this.buffer_i32[i + 3] = temp;
        }
    }
}
exports.Renderer = Renderer;
