#version 300 es
in vec2 manual_position;
uniform vec2 user_resolution;
uniform mat3 user_matrix;

void main() {
	// Transform relative coords to -1.0 -> 1.0
	vec2 translated_position = (user_matrix * vec3(manual_position, 1)).xy;
	vec2 absolute_coords = (translated_position / user_resolution) * 2.0 - 1.0;
	// Flip axes to keep 0.0, 0.0 in top-left corner
	vec2 flipped_absolute_coords = absolute_coords * vec2(1, -1);

	gl_Position = vec4(flipped_absolute_coords, 0, 1);
}
