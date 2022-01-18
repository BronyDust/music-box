#version 300 es

in vec2 manual_position;
uniform mat3 user_matrix;

void main() {
	gl_Position = vec4((user_matrix * vec3(manual_position, 1)).xy, 0, 1);
}
