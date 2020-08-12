import React from "react";
import initShaderProgram from "./webgl/initShaderProgram";
import { zoom, dragging, resize, centerZoom } from "./webgl/actions";
import draw from "./webgl/draw";
import setupVertices from "./webgl/setupVertices";

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
      this.gl = canvas.getContext("webgl") as WebGLRenderingContext;
      if (!this.gl)
        this.gl = canvas.getContext(
          "experimental-webgl"
        ) as WebGLRenderingContext;
      if (!this.gl) alert("Your browser does not support WebGL.");

      store.listen(() => {
        if (store.getState().shaderProgram !== null) {
          this.gl.useProgram(store.getState().shaderProgram);
          draw(this.gl, store.getState());
        }
      });

      this.setShaderProgram(0);

      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        store.updateState(resize(store.getState()));
        this.gl.viewport(0, 0, canvas.width, canvas.height);
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
    }
    this.animateIteration();
    //this.animateZoom();
  }

  setShaderProgram(program = 0) {
    const store = this.props.store;
    const shaderProgram = initShaderProgram(
      this.gl,
      store.getState().shaders[program].vertexShader,
      store.getState().shaders[program].fragmentShader
    );
    if (shaderProgram !== null) {
      setupVertices(this.gl, shaderProgram);
      store.updateState({ shaderProgram });
    }
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

  render() {
    return <canvas id="webgl"></canvas>;
  }
}

export default Renderer;
