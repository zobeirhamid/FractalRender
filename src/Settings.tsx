import React, { useEffect, useState } from "react";
import {
  Drawer,
  NumericInput,
  Label,
  Button,
  Checkbox,
} from "@blueprintjs/core";
import { centerZoom } from "./webgl/actions";

type SettingsProps = {
  store: any;
  iterations: number;
  samplingRate: number;
  renderer: any;
  activeMode: number;
  smooth: boolean;
  interpolation: boolean;
  radius: number;
  modes: Array<string>;
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
    const {
      store,
      iterations,
      samplingRate,
      renderer,
      radius,
      activeMode,
      modes,
      smooth,
      interpolation,
    } = this.props;
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
          <strong>Shader:</strong>
          <div
            className="bp3-select bp3-fill"
            style={{ marginTop: 5, marginBottom: 15 }}
          >
            <select>
              <option>Mandelbrot</option>
            </select>
          </div>
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
            <strong>Radius:</strong>
            <NumericInput
              disabled={smooth}
              className="bp3-dark"
              fill={true}
              min={0}
              max={5}
              stepSize={0.1}
              value={radius}
              onValueChange={(value) => {
                store.updateState({ radius: value });
              }}
            />
          </Label>
          <Label>
            <strong>Sampling Rate: </strong>
            <span className="bp3-text-muted">(NxN)</span>
            <NumericInput
              className="bp3-dark"
              fill={true}
              min={1}
              max={64}
              value={samplingRate}
              onValueChange={(value) => {
                store.updateState({ samplingRate: value });
              }}
            />
          </Label>
          <strong>Mode:</strong>
          <div
            className="bp3-select bp3-fill"
            style={{ marginTop: 5, marginBottom: 15 }}
          >
            <select
              onChange={(event) => {
                store.updateState({ mode: event.currentTarget.value });
              }}
              value={activeMode}
            >
              {modes.map((mode, index) => {
                return (
                  <option value={index} key={mode}>
                    {mode}
                  </option>
                );
              })}
            </select>
          </div>
          <strong>Extra Options:</strong>
          <div className="bp3-fill" style={{ marginTop: 5, marginBottom: 5 }}>
            <Checkbox
              checked={smooth}
              onChange={() => {
                store.updateState({ smooth: !smooth });
              }}
            >
              Smooth
            </Checkbox>
            <Checkbox
              checked={interpolation}
              onChange={() => {
                store.updateState({ interpolation: !interpolation });
              }}
            >
              Interpolation
            </Checkbox>
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
              disabled={smooth}
              onClick={() => {
                store.updateState({ radius: 0 });
                renderer.current.animateRadius();
              }}
            >
              Animate Radius
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
      activeMode={state.mode}
      modes={state.modes}
      smooth={state.smooth}
      interpolation={state.interpolation}
      radius={state.radius}
    />
  );
}
