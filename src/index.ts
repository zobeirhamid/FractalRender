import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import initShaderProgram from "./initShaderProgram";

const canvas = <HTMLCanvasElement>document.getElementById("webgl");

canvas.width = 600;
canvas.height = 400;

const gl = <WebGLRenderingContext>canvas.getContext("webgl");

const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);
gl.useProgram(shaderProgram);

const vertices = [
  -1.0,
  -1.0,
  0.0,
  1.0,
  -1.0,
  0.0,
  1.0,
  1.0,
  0.0,
  -1.0,
  1.0,
  0.0,
];
const verticesBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, verticesBufferObject);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

gl.vertexAttribPointer(
  0,
  3,
  gl.FLOAT,
  false,
  3 * Float32Array.BYTES_PER_ELEMENT,
  0
);
gl.enableVertexAttribArray(0);

gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
