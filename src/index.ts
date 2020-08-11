import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import initShaderProgram from "./initShaderProgram";

const canvas = <HTMLCanvasElement>document.getElementById("webgl");

canvas.onwheel = zoom;

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

let width = canvas.width;
let height = (400 / 600) * canvas.width;

if (height > canvas.height) {
  width = (600 / 400) * canvas.height;
  height = canvas.height;
}

const uniformLocations = {
  ITERATIONS: 50,
  boundaries: [
    -2 + (-(canvas.width - width) / 2) * (3 / width),
    1 - (-(canvas.width - width) / 2) * (3 / width),
    -1 + (-(canvas.height - height) / 2) * (2 / height),
    1 - (-(canvas.height - height) / 2) * (2 / height),
  ],
  width: canvas.width,
  height: canvas.height,
};

function paint() {
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
  gl.uniform1f(
    gl.getUniformLocation(shaderProgram, "ITERATIONS"),
    uniformLocations.ITERATIONS
  );
  gl.uniform1f(
    gl.getUniformLocation(shaderProgram, "width"),
    uniformLocations.width
  );
  gl.uniform1f(
    gl.getUniformLocation(shaderProgram, "height"),
    uniformLocations.height
  );
  console.log(uniformLocations.boundaries);
  gl.uniform4fv(
    gl.getUniformLocation(shaderProgram, "boundaries"),
    uniformLocations.boundaries
  );
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

window.addEventListener("resize", resize);

function resize() {
  let width = window.innerWidth - canvas.width;
  let height = window.innerHeight - canvas.height;

  const xLength = Math.abs(
    uniformLocations.boundaries[0] - uniformLocations.boundaries[1]
  );

  const yLength = Math.abs(
    uniformLocations.boundaries[2] - uniformLocations.boundaries[3]
  );

  uniformLocations.boundaries = [
    uniformLocations.boundaries[0] - ((width / 2) * xLength) / canvas.width,
    uniformLocations.boundaries[1] + ((width / 2) * xLength) / canvas.width,
    uniformLocations.boundaries[2] - ((height / 2) * yLength) / canvas.height,
    uniformLocations.boundaries[3] + ((height / 2) * yLength) / canvas.height,
  ];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  uniformLocations.width = canvas.width;
  uniformLocations.height = canvas.height;

  gl.viewport(0, 0, canvas.width, canvas.height);
  paint();
}

function zoom(event: MouseWheelEvent) {
  event.preventDefault();

  const xLength = Math.abs(
    uniformLocations.boundaries[0] - uniformLocations.boundaries[1]
  );

  const yLength = Math.abs(
    uniformLocations.boundaries[2] - uniformLocations.boundaries[3]
  );

  const xw = event.clientX / uniformLocations.width;
  const yw = event.clientY / uniformLocations.height;

  uniformLocations.boundaries = [
    uniformLocations.boundaries[0] + xw * xLength * 0.1,
    uniformLocations.boundaries[1] - (1 - xw) * xLength * 0.1,
    uniformLocations.boundaries[2] + (1 - yw) * yLength * 0.1,
    uniformLocations.boundaries[3] - yw * yLength * 0.1,
  ];

  paint();
}

resize();
