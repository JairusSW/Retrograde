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

export enum RENDER_TYPE {
  POINTS = 0x0000,
  LINES = 0x0001,
  LINE_LOOP = 0x0002,
  LINE_STRIP = 0x0003,
}

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
  public gl: WebGL2RenderingContext;
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
    this.gl = screen.canvas.getContext("webgl2") as WebGL2RenderingContext;
    this.line_shader = this.gl.createShader(
      this.gl.VERTEX_SHADER
    ) as WebGLShader;
    this.gl.shaderSource(this.line_shader, VECTOR_COLOR_LINE_SHADER);
    this.gl.compileShader(this.line_shader);

    this.fragment_shader = this.gl.createShader(
      this.gl.FRAGMENT_SHADER
    ) as WebGLShader;
    this.gl.shaderSource(this.fragment_shader, FRAG_SHADER);
    this.gl.compileShader(this.fragment_shader);

    this.program = this.gl.createProgram() as WebGLProgram;

    this.gl.attachShader(this.program, this.line_shader);
    this.gl.attachShader(this.program, this.fragment_shader);

    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    this.color_location = this.gl.getUniformLocation(
      this.program,
      "u_color"
    ) as WebGLUniformLocation;
    this.scale_x_location = this.gl.getUniformLocation(
      this.program,
      "u_scale_x"
    ) as WebGLUniformLocation;
    this.scale_y_location = this.gl.getUniformLocation(
      this.program,
      "u_scale_y"
    ) as WebGLUniformLocation;
    this.rotation_location = this.gl.getUniformLocation(
      this.program,
      "u_rotation"
    ) as WebGLUniformLocation;
    this.offset_x_location = this.gl.getUniformLocation(
      this.program,
      "u_loop_x"
    ) as WebGLUniformLocation;
    this.offset_y_location = this.gl.getUniformLocation(
      this.program,
      "u_loop_y"
    ) as WebGLUniformLocation;

    this.buffer = this.gl.createBuffer() as WebGLBuffer;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);

    this.position_al = this.gl.getAttribLocation(this.program, "position");
    this.gl.enableVertexAttribArray(this.position_al);

    this.gl.canvas.width = screen.width;
    this.gl.canvas.height = screen.height;
  }
  clear() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  clearToColor(red: number, blue: number, green: number, alpha: number) {
    this.gl.clearColor(red, green, blue, alpha);
  }
  renderLine(
    line: Float32Array,
    x: number,
    y: number,
    rot: number,
    scale_x: number,
    scale_y: number,
    color: number,
    type: RENDER_TYPE
  ) {
    this.gl.bufferData(this.gl.ARRAY_BUFFER, line, this.gl.DYNAMIC_DRAW);

    this.gl.uniform1ui(this.color_location, color);
    this.gl.uniform1f(this.scale_x_location, scale_x);
    this.gl.uniform1f(this.scale_y_location, scale_y);
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
}

function adjust_pos(size: number, pos: number) {
  return (pos / size) * 2.0 - 1.0;
}
