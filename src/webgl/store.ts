function createStore() {
  let width = window.innerWidth;
  let height = (400 / 600) * width;

  if (height > window.innerHeight) {
    width = (600 / 400) * window.innerHeight;
    height = window.innerHeight;
  }
  const offset = [window.innerWidth - width, window.innerHeight - height];

  let state = {
    ITERATIONS: 100,
    boundaries: [
      -2 - (offset[0] / 2) * (3 / width),
      1 + (offset[0] / 2) * (3 / width),
      -1 - (offset[1] / 2) * (2 / height),
      1 + (offset[1] / 2) * (2 / height),
    ],
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const listeners: Array<(state: any) => {}> = [];

  function getState() {
    return state;
  }

  function listen(listener: (state: any) => {}) {
    listeners.push(listener);
  }

  function fire() {
    for (let listener of listeners) {
      listener(state);
    }
  }

  function updateState(newState: any) {
    state = { ...state, ...newState };
    fire();
  }

  return { getState, updateState, listen, fire };
}

const store = createStore();

export default store;
