import React, { useEffect, useState } from "react";
import { Drawer, NumericInput, Label, Button } from "@blueprintjs/core";
import { centerZoom } from "./webgl/actions";

type SettingsProps = {
  store: any;
  iterations: number;
  samplingRate: number;
  renderer: any;
  shaders: Array<{
    name: string;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
  }>;
};

class Settings extends React.Component<SettingsProps> {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    document.body.onkeyup = (event) => {
      if (event.keyCode === 32) {
        this.setState({ isOpen: !this.state.isOpen });
      }
    };
  }

  render() {
    const { isOpen } = this.state;
    const { store, iterations, samplingRate, shaders, renderer } = this.props;
    return (
      <Drawer
        size={220}
        isOpen={isOpen}
        onClose={() => this.setState({ isOpen: false })}
        hasBackdrop={false}
        className="bp3-dark"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: 20,
          }}
        >
          <Label>
            <strong>Iterations:</strong>
            <NumericInput
              className="bp3-dark"
              fill={true}
              min={1}
              max={10000}
              value={iterations}
              onValueChange={(value) => {
                store.updateState({ iterations: value });
              }}
            />
          </Label>
          <Label>
            <strong>Sampling Rate:</strong>
            <NumericInput
              className="bp3-dark"
              fill={true}
              min={1}
              max={8}
              value={samplingRate}
              onValueChange={(value) => {
                store.updateState({ samplingRate: value });
              }}
            />
          </Label>
          <strong>Shader:</strong>
          <div
            className="bp3-select bp3-fill"
            style={{ marginTop: 5, marginBottom: 15 }}
          >
            <select
              onChange={(event) => {
                renderer.current.setShaderProgram(event.currentTarget.value);
              }}
            >
              {shaders.map((shader, index) => {
                return (
                  <option value={index} key={shader.name}>
                    {shader.name}
                  </option>
                );
              })}
            </select>
          </div>
          <strong>Animations:</strong>
          <div style={{ marginTop: 5, width: "100%" }}>
            <Button
              style={{ marginBottom: 15 }}
              icon="function"
              fill={true}
              onClick={() => {
                const limit = iterations;
                store.updateState({ iterations: 0 });
                renderer.current.animateIteration(limit);
              }}
            >
              Animate Iteration
            </Button>
            <Button
              style={{ marginBottom: 15 }}
              icon="function"
              fill={true}
              onClick={() => {
                renderer.current.animateZoom(-1);
              }}
            >
              Animate Zoom In
            </Button>
            <Button
              style={{ marginBottom: 15 }}
              icon="function"
              fill={true}
              onClick={() => {
                renderer.current.animateZoom(1);
              }}
            >
              Animate Zoom Out
            </Button>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              padding: 5,
              marginBottom: 15,
            }}
          >
            <Button
              icon="zoom-in"
              large={true}
              onClick={() => {
                store.updateState(centerZoom(store.getState(), -1));
              }}
            />
            <Button
              icon="zoom-out"
              large={true}
              onClick={() => {
                store.updateState(centerZoom(store.getState(), 1));
              }}
            />
          </div>
        </div>
      </Drawer>
    );
  }
}

export default function (props: any) {
  const { store } = props;
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.listen(() => {
      setState(store.getState());
    });
  });
  return (
    <Settings
      {...props}
      store={store}
      iterations={state.iterations}
      samplingRate={state.samplingRate}
      shaders={state.shaders}
    />
  );
}
