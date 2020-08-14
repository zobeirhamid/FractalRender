export default `
precision highp int;
precision highp float;

const int MAX_ITER = 65535;
const int MAX_SAMPLING_RATE = 4096;
uniform float iterations;
uniform int samplingRate;
uniform float width;
uniform float height;
uniform vec4 boundaries;
uniform float radius;
uniform int mode;
uniform int smooth;
uniform int interpolation;

varying float totalIterations;

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
		if (length(z) > radius) {
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
	float bound = radius * radius;
	for (int i = 0; i < MAX_ITER; i++) {
		if (x2 + y2 > bound) {
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

	if (smooth == 1) {
		return smoothMandelbrot(c);
	}
	return optimizedMandelbrot(c);
}

float superSampling(float x, float y) {
	float change = 1.0 / (float(samplingRate) + 1.0);
	float m = 0.0;
	for (int i = 1; i < MAX_SAMPLING_RATE + 1; i++) {
		if (i > samplingRate) {
			break;
		}
		for (int j = 1; j < MAX_SAMPLING_RATE + 1; j++) {
			if (j > samplingRate) {
				break;
			}
			m = m + sampling(x + float(i) * change, y + float(j) * change);
		}
	}
	return m / float(samplingRate * samplingRate);
}

vec3 bwRender(float m) {
	int color = 1 - int(m / iterations);
	return vec3(color, color, color);
}

vec3 greyRender(float m) {
	float color = 1.0 - float(m) / float(iterations);
	return vec3(color, color, color);
}

vec3 colorRender(float m) {
	float hue = m / iterations;
	float saturation = 1.0;
	float value = m < iterations ? 1.0 : 0.0;
	return hsv2rgb(vec3(hue, saturation, value));
}

void main(void)
{

	float x = gl_FragCoord.x - 0.5;
	float y = gl_FragCoord.y - 0.5;

	float m = superSampling(x, y);

	if (interpolation == 1){
		m = float(int(m));
	}

	vec3 color1;
	vec3 color2;

	if (mode == 0) {
		color1 = colorRender(m);
		color2 = colorRender(m + 1.0);
	}

	if (mode == 1) {
		color1 = greyRender(m);
		color2 = greyRender(m + 1.0);
	}

	if (mode == 2) {
		color1 = bwRender(m);
		color2 = bwRender(m + 1.0);
	}

	vec3 color = color1;
	if (interpolation == 1){
		color = mix(color1, color2, m); 
	}

	gl_FragColor = vec4(color, 1.0);
}
`;
