import vertexShader from "./shaders/mandelbrot/vertexShader";
import fragmentShader from "./shaders/mandelbrot/fragmentShader";
import initShaderProgram from "./webgl/initShaderProgram";
import { zoom, dragging, resize } from "./webgl/actions";
import draw from "./webgl/draw";
import createStore from "./webgl/store";
import setupVertices from "./webgl/setupVertices";

const store = createStore({
  /*
  boundaries: [-2, 1, -1, 1],
  width: 600,
  height: 400,
  */
});

const canvas = <HTMLCanvasElement>document.getElementById("webgl");
canvas.width = store.getState().width;
canvas.height = store.getState().height;
const gl = <WebGLRenderingContext>canvas.getContext("webgl");
const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);
setupVertices(gl, shaderProgram);

window.addEventListener("resize", () => {
  store.updateState(resize(store.getState()));
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  draw(gl, shaderProgram, store.getState());
});

canvas.onwheel = (event) => {
  store.updateState(zoom(store.getState(), event, canvas));
  draw(gl, shaderProgram, store.getState());
};

const dragger = dragging();
canvas.onmousedown = (event) => {
  dragger.startDrag(event);
  draw(gl, shaderProgram, store.getState());
};

canvas.onmouseup = (event) => {
  dragger.endDrag(event);
  draw(gl, shaderProgram, store.getState());
};

canvas.onmousemove = (event) => {
  store.updateState(dragger.move(store.getState(), event));
  draw(gl, shaderProgram, store.getState());
};

draw(gl, shaderProgram, store.getState());
