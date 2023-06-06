import { Key } from "./Key";
var Screen = /** @class */ (function () {
    function Screen(canvasId, height, width) {
        this.canvas = document.getElementById(canvasId);
        if (height)
            this.canvas.height = height;
        if (width)
            this.canvas.width = width;
        this.height = this.canvas.clientHeight;
        this.width = this.canvas.clientWidth;
        this.size = this.height * this.width;
    }
    return Screen;
}());
export { Screen };
var Renderer = /** @class */ (function () {
    function Renderer(screen) {
        this.screen = screen;
        this.gl = screen.canvas.getContext("webgl");
        this.vertex_shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.vertex_shader, "\n        attribute vec2 vertex_position;\n        void main(void) {\n            gl_Position = vec4(vertex_position, 0.0, 1.0);\n        }");
        this.gl.compileShader(this.vertex_shader);
        this.fragment_shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.fragment_shader, "\n        void main() {\n            gl_FragColor = vec4(1.0, 0.5, 0.313, 1.0);\n        }");
        this.gl.compileShader(this.fragment_shader);
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertex_shader);
        this.gl.attachShader(this.program, this.fragment_shader);
        this.gl.linkProgram(this.program);
        this.position_attribute_location = this.gl.getAttribLocation(this.program, "vertex_position");
        this.gl.enableVertexAttribArray(this.position_attribute_location);
        this.gl.canvas.width = screen.width;
        this.gl.canvas.height = screen.height;
        this.gl.viewport(0, 0, this.screen.width, this.screen.height);
        this.clearToColor(1.0, 0.0, 0.0, 1.0);
        this.drawRect(0, 0, 32, 32);
        this.clear();
    }
    Renderer.prototype.clear = function () {
        // Clear color from canvas
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    };
    Renderer.prototype.clearToColor = function (red, blue, green, alpha) {
        this.gl.clearColor(red, green, blue, alpha);
    };
    Renderer.prototype.drawRect = function (x, y, width, height) {
        var data_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, data_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            adjust_pos(this.gl.canvas.width, x), adjust_pos(this.gl.canvas.height, y),
            adjust_pos(this.gl.canvas.width, x + width), adjust_pos(this.gl.canvas.height, y),
            adjust_pos(this.gl.canvas.width, x + width), adjust_pos(this.gl.canvas.height, y + height),
            adjust_pos(this.gl.canvas.width, x), adjust_pos(this.gl.canvas.height, y + height)
        ]), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.position_attribute_location, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
        this.gl.deleteBuffer(data_buffer);
    };
    Renderer.prototype.detectKeyPress = function (callback) {
        document.onkeydown = function (_a) {
            var key = _a.key;
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
        };
    };
    return Renderer;
}());
export { Renderer };
function adjust_pos(size, pos) {
    return (pos / size) * 2.0 - 1.0;
}
