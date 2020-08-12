function draw(gl: WebGLRenderingContext, state: any) {
  const shaderProgram = state.shaderProgram as WebGLProgram;
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
    gl.getUniformLocation(shaderProgram, "iterations"),
    state.iterations
  );
  gl.uniform1i(
    gl.getUniformLocation(shaderProgram, "samplingRate"),
    state.samplingRate
  );
  gl.uniform1f(gl.getUniformLocation(shaderProgram, "width"), state.width);
  gl.uniform1f(gl.getUniformLocation(shaderProgram, "height"), state.height);

  //console.log(uniformLocations.boundaries);

  gl.uniform4fv(
    gl.getUniformLocation(shaderProgram, "boundaries"),
    state.boundaries
  );
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

export default draw;
