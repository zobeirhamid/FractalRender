export function xLength(state: any) {
  return Math.abs(state.boundaries[0] - state.boundaries[1]);
}

export function yLength(state: any) {
  return Math.abs(state.boundaries[2] - state.boundaries[3]);
}

export function resize(state: any) {
  let width = window.innerWidth - state.width;
  let height = window.innerHeight - state.height;

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    boundaries: [
      state.boundaries[0] - ((width / 2) * xLength(state)) / state.width,
      state.boundaries[1] + ((width / 2) * xLength(state)) / state.width,
      state.boundaries[2] - ((height / 2) * yLength(state)) / state.height,
      state.boundaries[3] + ((height / 2) * yLength(state)) / state.height,
    ],
  };
}

export function centerZoom(state: any, direction: number) {
  return manualZoom(
    state,
    window.innerWidth / 2,
    window.innerHeight / 2,
    direction
  );
}

export function manualZoom(
  state: any,
  x: number,
  y: number,
  direction: number
) {
  const zoomFactor = direction < 0 ? 0.05 : -0.05;
  const xw = x / state.width;
  const yw = y / state.height;
  return {
    boundaries: [
      state.boundaries[0] + xw * xLength(state) * zoomFactor,
      state.boundaries[1] - (1 - xw) * xLength(state) * zoomFactor,
      state.boundaries[2] + (1 - yw) * yLength(state) * zoomFactor,
      state.boundaries[3] - yw * yLength(state) * zoomFactor,
    ],
  };
}

export function zoom(
  state: any,
  event: MouseWheelEvent,
  canvas: HTMLCanvasElement
) {
  event.preventDefault();

  if (
    event.clientX > canvas.offsetLeft &&
    event.clientX < canvas.offsetLeft + state.width &&
    event.clientY > canvas.offsetTop &&
    event.clientY < canvas.offsetTop + state.height
  ) {
    return manualZoom(
      state,
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop,
      event.deltaY
    );
  }
}

export function dragging() {
  const DRAGGING = 0;
  const NO_DRAGGING = 1;

  const dragger = {
    mode: NO_DRAGGING,
    previousPosition: [0, 0],
  };

  function startDrag(event: MouseEvent) {
    dragger.mode = DRAGGING;
    dragger.previousPosition = [event.clientX, event.clientY];
  }

  function endDrag(event: MouseEvent) {
    dragger.mode = NO_DRAGGING;
    dragger.previousPosition = [event.clientX, event.clientY];
  }
  function move(state: any, event: MouseEvent) {
    if (dragger.mode === DRAGGING) {
      const position = [event.clientX, event.clientY];

      const dx =
        ((dragger.previousPosition[0] - position[0]) * xLength(state)) /
        state.width;
      const dy =
        ((dragger.previousPosition[1] - position[1]) * yLength(state)) /
        state.height;

      dragger.previousPosition = position;
      return {
        boundaries: [
          state.boundaries[0] + dx,
          state.boundaries[1] + dx,
          state.boundaries[2] - dy,
          state.boundaries[3] - dy,
        ],
      };
    }
  }

  return {
    startDrag,
    endDrag,
    move,
    isDragging: () => dragger.mode === DRAGGING,
  };
}

export function download(canvas: HTMLCanvasElement, filename: string) {
  const image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  const anchor = document.createElement("a");
  anchor.setAttribute("download", filename);
  anchor.setAttribute("href", image);
  anchor.click();
}
