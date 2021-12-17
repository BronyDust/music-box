#version 300 es
precision mediump float;

out vec4 out_color;
uniform vec4 user_color;

void main() {
	vec4 normalized_color = user_color * vec4(0.0039, 0.0039, 0.0039, 1);

	out_color = normalized_color;
}
