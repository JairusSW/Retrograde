import { Key } from "./Key";

export class Screen {
    public height: number;
    public width: number;
    public size: number;
    public canvas: HTMLCanvasElement;
    constructor(canvasId: string, height?: number, width?: number) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (height) this.canvas.height = height;
        if (width) this.canvas.width = width;

        this.height = this.canvas.clientHeight;
        this.width = this.canvas.clientWidth;
        this.size = this.height * this.width;
    }
}

export class Renderer {
    public screen: Screen;
    public gl: WebGLRenderingContext;

    private vertex_shader: WebGLShader;
    private fragment_shader: WebGLShader;
    private program: WebGLProgram;
    private position_attribute_location: number;
    private color_uniform_location: WebGLUniformLocation;
    constructor(screen: Screen) {
        this.screen = screen;
        this.gl = screen.canvas.getContext("webgl") as WebGLRenderingContext;
        this.vertex_shader = this.gl.createShader(this.gl.VERTEX_SHADER) as WebGLShader;
        this.gl.shaderSource(this.vertex_shader, `
        attribute vec2 vertex_position;
        void main(void) {
            gl_Position = vec4(vertex_position, 0.0, 1.0);
        }`);
        this.gl.compileShader(this.vertex_shader);

        this.fragment_shader = this.gl.createShader(this.gl.FRAGMENT_SHADER) as WebGLShader;
        this.gl.shaderSource(this.fragment_shader, `
        precision mediump float;
        uniform vec4 color;
        void main() {
            gl_FragColor = color;
        }`);
        this.gl.compileShader(this.fragment_shader);

        this.program = this.gl.createProgram() as WebGLProgram;
        this.gl.attachShader(this.program, this.vertex_shader);
        this.gl.attachShader(this.program, this.fragment_shader);
        this.gl.linkProgram(this.program);

        this.position_attribute_location = this.gl.getAttribLocation(this.program, "vertex_position");

        this.gl.enableVertexAttribArray(this.position_attribute_location);
        this.color_uniform_location = this.gl.getUniformLocation(this.program, "color") as WebGLUniformLocation;
        this.gl.canvas.width = screen.width;
        this.gl.canvas.height = screen.height;
        this.gl.viewport(0, 0, this.screen.width, this.screen.height);

        this.clearToColor(1.0, 0.0, 0.0, 1.0);
        this.drawRect(0, 0, 32, 32);
        this.clear();
    }
    clear() {
        // Clear color from canvas
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    clearToColor(red: number, blue: number, green: number, alpha: number) {
        this.gl.clearColor(red, green, blue, alpha);
    }
    drawRect(x: number, y: number, width: number, height: number, red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {
        const data_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, data_buffer);

        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([
                adjust_pos(this.gl.canvas.width, x), adjust_pos(this.gl.canvas.height, y),
                adjust_pos(this.gl.canvas.width, x + width), adjust_pos(this.gl.canvas.height, y),
                adjust_pos(this.gl.canvas.width, x + width), adjust_pos(this.gl.canvas.height, y + height),
                adjust_pos(this.gl.canvas.width, x), adjust_pos(this.gl.canvas.height, y + height)
            ]),
            this.gl.STATIC_DRAW);

        this.gl.vertexAttribPointer(
            this.position_attribute_location,
            2,
            this.gl.FLOAT,
            false, 0, 0
        );

        this.gl.useProgram(this.program);
        this.gl.uniform4f(this.color_uniform_location, red, green, blue, alpha);
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
        this.gl.deleteBuffer(data_buffer);
    }
    detectKeyPress(callback: (key: Key) => void) {
        document.onkeydown = ({ key }) => {
            switch (key) {
                case "w": {
                    callback(Key.W);
                    break;
                }
                case "a": {
                    callback(Key.A);
                    break;
                }
                case "s": {
                    callback(Key.S);
                    break;
                }
                case "d": {
                    callback(Key.D);
                    break;
                }
                case "Space": {
                    callback(Key.Space);
                    break;
                }
                case "ArrowLeft": {
                    callback(Key.Left);
                    break;
                }
                case "ArrowRight": {
                    callback(Key.Right);
                    break;
                }
                case "ArrowUp": {
                    callback(Key.Up);
                    break;
                }
                case "ArrowDown": {
                    callback(Key.Down);
                    break;
                }
            }
        }
    }
}

function adjust_pos(size: number, pos: number) {
    return (pos / size) * 2.0 - 1.0;
}