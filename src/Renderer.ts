import { Key } from "./Key";

const VECTOR_COLOR_LINE_SHADER = /*glsl*/ `#version 300 es
  precision highp float;

  uniform uint u_color;
  uniform float u_scale_x;
  uniform float u_scale_y;
  uniform float u_rotation;
  uniform float u_loop_x;
  uniform float u_loop_y;

  in vec2 position;
  out vec4 c;
  
  void main() {
    vec2 pos = vec2(position.x * u_scale_x, position.y * u_scale_y);

    float cosine = cos(u_rotation);
    float sine = sin(u_rotation);
    float x = (cosine * pos.x) + (sine * pos.y);
    float y = (cosine * pos.y) - (sine * pos.x);
    pos.x = x + u_loop_x;
    pos.y = y + u_loop_y;

    gl_Position = vec4( pos, 0.0, 1.0 );
    uint mask = uint(0xff); // byte mask

    // convert 32-bit hexadecimal color to four float color
    uint red = u_color >> 24;
    uint green = (u_color >> 16) & mask;
    uint blue = (u_color >> 8) & mask;
    uint alpha = u_color & mask;

    c = vec4( float(red) / 255.0, 
              float(green) / 255.0,
              float(blue) / 255.0,
              float(alpha) / 255.0 );
  }
`;

const FRAG_SHADER = /*glsl*/ `#version 300 es
  precision highp float;

  in vec4 c;
  out vec4 color;

  void main() {
    color = c;
  }
`;
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
  public buffer: WebGLBuffer;

  private line_shader: WebGLShader;
  private fragment_shader: WebGLShader;
  private program: WebGLProgram;
  private color_location: WebGLUniformLocation;
  private scale_x_location: WebGLUniformLocation;
  private scale_y_location: WebGLUniformLocation;
  private rotation_location: WebGLUniformLocation;
  private offset_x_location: WebGLUniformLocation;
  private offset_y_location: WebGLUniformLocation;
  private position_al: number;
  constructor(screen: Screen) {
    this.screen = screen;
    this.gl = screen.canvas.getContext("webgl2") as WebGLRenderingContext;
    this.line_shader = this.gl.createShader(this.gl.VERTEX_SHADER) as WebGLShader;
    this.gl.shaderSource(this.line_shader, VECTOR_COLOR_LINE_SHADER);
    this.gl.compileShader(this.line_shader);

    this.fragment_shader = this.gl.createShader(this.gl.FRAGMENT_SHADER) as WebGLShader;
    this.gl.shaderSource(this.fragment_shader, FRAG_SHADER);
    this.gl.compileShader(this.fragment_shader);

    this.program = this.gl.createProgram() as WebGLProgram;

    this.gl.attachShader(this.program, this.line_shader);
    this.gl.attachShader(this.program, this.fragment_shader);

    this.gl.linkProgram(this.program);

    this.gl.useProgram(this.program);

    this.color_location = this.gl.getUniformLocation(this.program, "u_color") as WebGLUniformLocation;
    this.scale_x_location = this.gl.getUniformLocation(this.program, "u_scale_x") as WebGLUniformLocation;
    this.scale_y_location = this.gl.getUniformLocation(this.program, "u_scale_y") as WebGLUniformLocation;
    this.rotation_location = this.gl.getUniformLocation(this.program, "u_rotation") as WebGLUniformLocation;
    this.offset_x_location = this.gl.getUniformLocation(this.program, "u_loop_x") as WebGLUniformLocation;
    this.offset_y_location = this.gl.getUniformLocation(this.program, "u_loop_y") as WebGLUniformLocation;

    this.buffer = this.gl.createBuffer() as WebGLBuffer;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

    this.position_al = this.gl.getAttribLocation(this.program, "position");
    this.gl.enableVertexAttribArray(this.position_al);
    this.gl.canvas.width = screen.width;
    this.gl.canvas.height = screen.height;
    this.gl.viewport(0, 0, this.screen.width, this.screen.height);

    this.clearToColor(0.0, 0.0, 0.0, 0.0);
    this.renderRect(0, 0, 32, 32);
    this.clear();
  }
  clear() {
    // Clear color from canvas
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  clearToColor(red: number, blue: number, green: number, alpha: number) {
    this.gl.clearColor(red, green, blue, alpha);
  }
  renderLine(line: Float32Array, len, x, y, rot, scale_x, scale_y, color: number, type) {
    this.gl.bufferData(this.gl.ARRAY_BUFFER, line, this.gl.DYNAMIC_DRAW);

    this.gl.uniform1i(this.color_location, color);
    this.gl.uniform1f(this.scale_x_location, scale_x);
    this.gl.uniform1f(this.scale_y_location, scale_y); // 0x00_ff_00_ff
    this.gl.uniform1f(this.rotation_location, rot);
    this.gl.uniform1f(this.offset_x_location, x);
    this.gl.uniform1f(this.offset_y_location, y);

    this.gl.vertexAttribPointer(
      this.position_al,
      /*dimensions*/ 2,
      /*data type*/ this.gl.FLOAT,
      /*normalize*/ false,
      /*stride*/ 0,
      /*offset*/ 0
    );

    this.gl.drawArrays(type, 0, line.length / 2);
  }
  renderCircle(x: number, y: number, radius: number, red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {
    const segments = 50; // Number of segments to approximate the circle
    const angleIncrement = (2 * Math.PI) / segments; 
    const vertices = [];

    // Create the vertices of the circle
    for (let i = 0; i <= segments; i++) {
      const angle = angleIncrement * i;
      const vertexX = x + Math.cos(angle) * radius;
      const vertexY = y + Math.sin(angle) * radius;
      vertices.push(adjust_pos(this.gl.canvas.width, vertexX));
      vertices.push(adjust_pos(this.gl.canvas.height, vertexY));
    }

    const data_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, data_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(this.position_attribute_location, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.useProgram(this.program);
    this.gl.uniform4f(this.color_uniform_location, red, green, blue, alpha);
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, segments + 2);
    this.gl.deleteBuffer(data_buffer);
  }
  renderRect(
    x: number,
    y: number,
    width: number,
    height: number,
    red: number = 0,
    green: number = 0,
    blue: number = 0,
    alpha: number = 1
  ) {
    const data_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, data_buffer);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        adjust_pos(this.gl.canvas.width, x),
        adjust_pos(this.gl.canvas.height, y),
        adjust_pos(this.gl.canvas.width, x + width),
        adjust_pos(this.gl.canvas.height, y),
        adjust_pos(this.gl.canvas.width, x + width),
        adjust_pos(this.gl.canvas.height, y + height),
        adjust_pos(this.gl.canvas.width, x),
        adjust_pos(this.gl.canvas.height, y + height)
      ]),
      this.gl.STATIC_DRAW
    );

    this.gl.vertexAttribPointer(this.position_attribute_location, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.useProgram(this.program);
    this.gl.uniform4f(this.color_uniform_location, red, green, blue, alpha);
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
    this.gl.deleteBuffer(data_buffer);
  }
}

function adjust_pos(size: number, pos: number) {
  return (pos / size) * 2.0 - 1.0;
}
