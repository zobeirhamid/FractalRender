import React from "react";
import initShaderProgram from "./webgl/initShaderProgram";
import { zoom, dragging, resize, centerZoom, download } from "./webgl/actions";
import draw from "./webgl/draw";
import setupVertices from "./webgl/setupVertices";
import vertexShader from "./shaders/mandelbrot/vertexShader";
import fragmentShader from "./shaders/mandelbrot/fragmentShader";

type RendererProps = {
  store: any;
};

class Renderer extends React.Component<RendererProps> {
  gl: any;

  componentDidMount() {
    const store = this.props.store;

    const canvas = document.getElementById("webgl") as HTMLCanvasElement;
    if (canvas !== null) {
      canvas.width = store.getState().width;
      canvas.height = store.getState().height;
      let gl = canvas.getContext("webgl", {
        preserveDrawingBuffer: true,
      }) as WebGLRenderingContext;
      if (!gl)
        gl = canvas.getContext("experimental-webgl", {
          preserveDrawingBuffer: true,
        }) as WebGLRenderingContext;
      if (!gl) alert("Your browser does not support WebGL.");

      const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);
      if (shaderProgram !== null) {
        setupVertices(gl, shaderProgram);

        store.listen(() => {
          gl.useProgram(shaderProgram);
          draw(gl, shaderProgram, store.getState());
        });

        window.addEventListener("resize", () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
          store.updateState(resize(store.getState()));
        });

        canvas.onwheel = (event) => {
          store.updateState(zoom(store.getState(), event, canvas));
        };

        const dragger = dragging();
        canvas.onmousedown = (event) => {
          dragger.startDrag(event);
        };

        canvas.onmouseup = (event) => {
          dragger.endDrag(event);
        };

        canvas.onmousemove = (event) => {
          if (dragger.isDragging()) {
            store.updateState(dragger.move(store.getState(), event));
          }
        };

        this.animateIteration();
      }
    }
    //this.animateZoom();
  }

  animateZoom(direction = -1, times = 0) {
    const { store } = this.props;
    if (times < 50) {
      store.updateState(centerZoom(store.getState(), direction));
      requestAnimationFrame(() => this.animateZoom(direction, times + 1));
    }
  }

  animateIteration(limit = 100) {
    const { store } = this.props;
    const { iterations } = store.getState();
    if (iterations < limit) {
      store.updateState({ iterations: iterations + 1 });
      requestAnimationFrame(() => this.animateIteration(limit));
    }
  }

  animateRadius(limit = 2) {
    const { store } = this.props;
    const { radius } = store.getState();
    if (radius < limit) {
      store.updateState({ radius: radius + 0.01 });
      requestAnimationFrame(() => this.animateRadius(limit));
    }
  }

  downloadImage() {
    const { store } = this.props;
    const { iterations, samplingRate, radius, boundaries } = store.getState();
    const canvas = document.getElementById("webgl") as HTMLCanvasElement;
    const filename =
      "mandelbrot_" +
      iterations +
      "_" +
      samplingRate +
      "_" +
      radius +
      "_" +
      boundaries.reduce(
        (string: string, boundary: number, index: number) =>
          string +
          boundary.toString() +
          (index + 1 !== boundaries.length ? "_" : ""),
        ""
      ) +
      ".png";
    download(canvas, filename);
  }

  render() {
    return <canvas id="webgl"></canvas>;
  }
}

export default Renderer;
