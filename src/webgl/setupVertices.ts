function setupVertices(gl: WebGLRenderingContext, shaderProgram: WebGLProgram) {
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
}

export default setupVertices;
