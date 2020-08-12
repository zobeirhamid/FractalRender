import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Renderer from "./Renderer";
import Settings from "./Settings";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import createStore from "./webgl/store";
const store = createStore({
  /*
  boundaries: [-2, 1, -1, 1],
  width: 600,
  height: 400,
  */
});

const App = () => {
  const renderer = useRef(null);

  return (
    <React.Fragment>
      <Renderer store={store} ref={renderer} />
      <Settings store={store} renderer={renderer} />
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
