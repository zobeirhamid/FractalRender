import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import initShaderProgram from "./initShaderProgram";

const canvas = <HTMLCanvasElement>document.getElementById("webgl");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

function paint(uniformLocations: any) {
  gl.useProgram(shaderProgram);
  gl.vertexAttribPointer(
    0,
    3,
    gl.FLOAT,
    false,
    3 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(0);
  gl.uniform1i(
    gl.getUniformLocation(shaderProgram, "ITERATIONS"),
    uniformLocations.ITERATIONS
  );
  gl.uniform2fv(
    gl.getUniformLocation(shaderProgram, "offset"),
    uniformLocations.offset
  );
  gl.uniform1f(
    gl.getUniformLocation(shaderProgram, "width"),
    uniformLocations.width
  );
  gl.uniform1f(
    gl.getUniformLocation(shaderProgram, "height"),
    uniformLocations.height
  );
  gl.uniform4fv(
    gl.getUniformLocation(shaderProgram, "boundaries"),
    uniformLocations.boundaries
  );
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

window.addEventListener("resize", resize);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let width = canvas.width;
  let height = (400 / 600) * canvas.width;

  if (height > canvas.height) {
    width = (600 / 400) * canvas.height;
    height = canvas.height;
  }

  const uniformLocations = {
    ITERATIONS: 50,
    boundaries: [-2, 1, -1, 1],
    offset: [
      (-(canvas.width - width) / 2) * (3 / width),
      (-(canvas.height - height) / 2) * (2 / height),
    ],
    width,
    height,
  };

  gl.viewport(0, 0, canvas.width, canvas.height);
  paint(uniformLocations);
}

resize();
