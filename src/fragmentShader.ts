export default `
precision mediump float;
const int MAX_ITER = 2000;
uniform int ITERATIONS;
uniform vec2 offset;
uniform float width;
uniform float height;
uniform vec4 boundaries;

vec2 complexMultiplication(vec2 z1, vec2 z2)
{
	return vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);
}

// https://github.com/hughsk/glsl-hsv2rgb/blob/master/index.glsl
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

int mandelbrot(vec2 c)
{
	vec2 z = vec2(0, 0);
	int n = 0;
	for (int i = 0; i < MAX_ITER; i++) {
		if (length(z) > 2.0) {
			break;
		}
		if (n > ITERATIONS) {
			break;

		}
		z = complexMultiplication(z, z) + c;
		n++;
	}
	return n;
}

void main(void)
{
	float x = gl_FragCoord.x;
	float y = gl_FragCoord.y;
	vec2 c = vec2(offset.x + boundaries.x + x * (boundaries.y - boundaries.x) / (width), offset.y + boundaries.z + y * (boundaries.w - boundaries.z) / (height));

	int m = mandelbrot(c);
	// VERSION 1
	//int color = 1 - m / ITERATIONS;

	// VERSION 2
	// float color = 1.0 - float(m) / float(ITERATIONS);
	// gl_FragColor = vec4(color, color, color, 1.0);


	// VERSION 3
	float hue = float(m) / float(ITERATIONS);
	float saturation = 1.0;
	float value = m < ITERATIONS ? 1.0 : 0.0;
	gl_FragColor = vec4(hsv2rgb(vec3(hue, saturation, value)), 1.0);
}
`;
