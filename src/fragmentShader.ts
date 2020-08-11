export default `
precision mediump float;
const int MAX_ITER = 2000;
uniform float ITERATIONS;
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

float mandelbrot(vec2 c)
{
	vec2 z = vec2(0, 0);
	float n = 0.0;
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
	return float(n);
}

float optimizedMandelbrot(vec2 c)
{
	float n = 0.0;
	float x2 = 0.0;
	float y2 = 0.0;
	float x = 0.0;
	float y = 0.0;
	for (int i = 0; i < MAX_ITER; i++) {
		if (x2 + y2 > 4.0) {
			break;
		}
		if (n > ITERATIONS) {
			break;
		}

		y = 2.0 * x * y + c.y;
		x = x2 - y2 + c.x;
		x2 = x * x;
		y2 = y * y;

		n++;
	}

	return float(n);
}

float smoothMandelbrot(vec2 c)
{
	float n = 0.0;
	float x2 = 0.0;
	float y2 = 0.0;
	float x = 0.0;
	float y = 0.0;
	for (int i = 0; i < MAX_ITER; i++) {
		if (x * x + y * y > pow(2.0, 8.0)) {
			break;
		}
		if (n > ITERATIONS) {
			break;
		}

		y = 2.0 * x * y + c.y;
		x = x2 - y2 + c.x;
		x2 = x * x;
		y2 = y * y;

		n++;
	}

	if (n < ITERATIONS) {
		return float(n) + 1.0 - log((log(x * x + y * y) / 2.0) / log(2.0)) / log(2.0);
	}

	return float(n);
}

float sampling (float x, float y) {
	vec2 c = vec2(boundaries.x + x * (boundaries.y - boundaries.x) / (width), boundaries.z + y * (boundaries.w - boundaries.z) / (height));
	return smoothMandelbrot(c);
}

float superSampling(float x, float y) {
	const float samplingRate = 1.0;

	float change = 1.0 / (samplingRate + 1.0);
	float m = 0.0;
	for (float i = 1.0; i < samplingRate + 1.0; i++) {
		m = m + sampling(x + i * change, y + i * change);
	}
	return m / samplingRate;

}

void main(void)
{
	float x = gl_FragCoord.x - 0.5;
	float y = gl_FragCoord.y - 0.5;

	float m = superSampling(x, y);

	// VERSION 1
	//int color = 1 - int(m / ITERATIONS);
	//gl_FragColor = vec4(color, color, color, 1.0);

	// VERSION 2
	//float color = 1.0 - float(m) / float(ITERATIONS);
	//gl_FragColor = vec4(color, color, color, 1.0);


	// VERSION 3
	float hue = m / ITERATIONS;
	float saturation = 1.0;
	float value = m < ITERATIONS ? 1.0 : 0.0;
	gl_FragColor = vec4(hsv2rgb(vec3(hue, saturation, value)), 1.0);
}
`;
