var VECTOR_COLOR_LINE_SHADER = /*glsl*/ "#version 300 es\n  precision highp float;\n\n  uniform uint u_color;\n  uniform float u_scale_x;\n  uniform float u_scale_y;\n  uniform float u_rotation;\n  uniform float u_loop_x;\n  uniform float u_loop_y;\n\n  in vec2 position;\n  out vec4 c;\n  \n  void main() {\n    vec2 pos = vec2(position.x * u_scale_x, position.y * u_scale_y);\n\n    float cosine = cos(u_rotation);\n    float sine = sin(u_rotation);\n    float x = (cosine * pos.x) + (sine * pos.y);\n    float y = (cosine * pos.y) - (sine * pos.x);\n    pos.x = x + u_loop_x;\n    pos.y = y + u_loop_y;\n\n    gl_Position = vec4( pos, 0.0, 1.0 );\n    uint mask = uint(0xff); // byte mask\n\n    // convert 32-bit hexadecimal color to four float color\n    uint red = u_color >> 24;\n    uint green = (u_color >> 16) & mask;\n    uint blue = (u_color >> 8) & mask;\n    uint alpha = u_color & mask;\n\n    c = vec4( float(red) / 255.0, \n              float(green) / 255.0,\n              float(blue) / 255.0,\n              float(alpha) / 255.0 );\n  }\n";
var FRAG_SHADER = /*glsl*/ "#version 300 es\n  precision highp float;\n\n  in vec4 c;\n  out vec4 color;\n\n  void main() {\n    color = c;\n  }\n";
export var RENDER_TYPE;
(function (RENDER_TYPE) {
    RENDER_TYPE[RENDER_TYPE["POINTS"] = 0] = "POINTS";
    RENDER_TYPE[RENDER_TYPE["LINES"] = 1] = "LINES";
    RENDER_TYPE[RENDER_TYPE["LINE_LOOP"] = 2] = "LINE_LOOP";
    RENDER_TYPE[RENDER_TYPE["LINE_STRIP"] = 3] = "LINE_STRIP";
})(RENDER_TYPE || (RENDER_TYPE = {}));
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
        this.gl = screen.canvas.getContext("webgl2");
        this.line_shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.line_shader, VECTOR_COLOR_LINE_SHADER);
        this.gl.compileShader(this.line_shader);
        this.fragment_shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.fragment_shader, FRAG_SHADER);
        this.gl.compileShader(this.fragment_shader);
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.line_shader);
        this.gl.attachShader(this.program, this.fragment_shader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        this.color_location = this.gl.getUniformLocation(this.program, "u_color");
        this.scale_x_location = this.gl.getUniformLocation(this.program, "u_scale_x");
        this.scale_y_location = this.gl.getUniformLocation(this.program, "u_scale_y");
        this.rotation_location = this.gl.getUniformLocation(this.program, "u_rotation");
        this.offset_x_location = this.gl.getUniformLocation(this.program, "u_loop_x");
        this.offset_y_location = this.gl.getUniformLocation(this.program, "u_loop_y");
        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.position_al = this.gl.getAttribLocation(this.program, "position");
        this.gl.enableVertexAttribArray(this.position_al);
        this.gl.canvas.width = screen.width;
        this.gl.canvas.height = screen.height;
    }
    Renderer.prototype.clear = function () {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    };
    Renderer.prototype.clearToColor = function (red, blue, green, alpha) {
        this.gl.clearColor(red, green, blue, alpha);
    };
    Renderer.prototype.renderLine = function (line, x, y, rot, scale_x, scale_y, color, type) {
        this.gl.bufferData(this.gl.ARRAY_BUFFER, line, this.gl.DYNAMIC_DRAW);
        this.gl.uniform1ui(this.color_location, color);
        this.gl.uniform1f(this.scale_x_location, scale_x);
        this.gl.uniform1f(this.scale_y_location, scale_y);
        this.gl.uniform1f(this.rotation_location, rot);
        this.gl.uniform1f(this.offset_x_location, x);
        this.gl.uniform1f(this.offset_y_location, y);
        this.gl.vertexAttribPointer(this.position_al, 
        /*dimensions*/ 2, 
        /*data type*/ this.gl.FLOAT, 
        /*normalize*/ false, 
        /*stride*/ 0, 
        /*offset*/ 0);
        this.gl.drawArrays(type, 0, line.length / 2);
    };
    return Renderer;
}());
export { Renderer };
function adjust_pos(size, pos) {
    return (pos / size) * 2.0 - 1.0;
}
