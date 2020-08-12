export default `
precision mediump float;
const int MAX_ITER = 65535;
const int MAX_SAMPLING_RATE = 4096;
uniform float iterations;
uniform float samplingRate;
uniform float width;
uniform float height;
uniform vec4 boundaries;

vec2 complexMultiplication(vec2 z1, vec2 z2)
{
	return vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);
}

float mandelbrot(vec2 c)
{
	vec2 z = vec2(0, 0);
	float n = 0.0;
	for (int i = 0; i < MAX_ITER; i++) {
		if (length(z) > 2.0) {
			break;
		}
		if (n > iterations) {
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
		if (n > iterations) {
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
		if (n > iterations) {
			break;
		}

		y = 2.0 * x * y + c.y;
		x = x2 - y2 + c.x;
		x2 = x * x;
		y2 = y * y;

		n++;
	}

	if (n < iterations) {
		return float(n) + 1.0 - log((log(x * x + y * y) / 2.0) / log(2.0)) / log(2.0);
	}

	return float(n);
}

float sampling (float x, float y) {
	vec2 c = vec2(boundaries.x + x * (boundaries.y - boundaries.x) / (width), boundaries.z + y * (boundaries.w - boundaries.z) / (height));
	return smoothMandelbrot(c);
}

float superSampling(float x, float y) {
	float change = 1.0 / (samplingRate + 1.0);
	float m = 0.0;
	for (int i = 1; i < MAX_SAMPLING_RATE + 1; i++) {
		if (float(i) > samplingRate + 1.0) {
			break;
		}
		m = m + sampling(x + float(i) * change, y + float(i) * change);
	}
	return m / samplingRate;

}

vec3 greyRender(float m) {
	float color = 1.0 - float(m) / float(iterations);
	return vec3(color, color, color);
}

void main(void)
{
	float x = gl_FragCoord.x - 0.5;
	float y = gl_FragCoord.y - 0.5;

	float m = superSampling(x, y);

	gl_FragColor = vec4(greyRender(m), 1.0);
}
`;
