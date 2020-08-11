export default `
precision mediump float;

vec2 complexMultiplication(vec2 z1, vec2 z2)
{
	return vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);
}

float mandelbrot(vec2 c)
{
	vec2 z = vec2(0, 0);
	int iterations = 0;
	for (int i = 0; i < 2000; i++) {
		if (length(z) > 2.0) {
			break;
		}
		z = complexMultiplication(z, z) + c;
		iterations++;
	}
	return float(iterations);
}

void main(void)
{
	float x0 = -2.0;
	float x1 = 1.0;
	float y0 = -1.0;
	float y1 = 1.0;

	float width = 600.0;
	float height = 400.0;

	float x = gl_FragCoord.x;
	float y = gl_FragCoord.y;
	vec2 c = vec2(x0 + x * (x1 - x0) / (width), y0 + y * (y1 - y0) / (height));

	float m = mandelbrot(c);

	gl_FragColor = vec4(255.0 / m, 255.0 / m, 255.0 / m, 1.0);
}
`;
