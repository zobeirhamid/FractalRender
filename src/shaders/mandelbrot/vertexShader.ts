export default `
precision mediump float;
attribute vec2 vPosition;
void main(void)
{
	gl_Position = vec4(vPosition, 0.0, 1.0);
}
`;
