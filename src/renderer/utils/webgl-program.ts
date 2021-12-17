function webglProgram(context: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
	const program = context.createProgram();

	try {
		if (!program) throw new Error();

		context.attachShader(program, vertexShader);
		context.attachShader(program, fragmentShader);

		context.linkProgram(program);
		const status = context.getProgramParameter(program, context.LINK_STATUS);
		if (!status) throw new Error();
	} catch {
		if (program) console.log(context.getProgramInfoLog(program));
		context.deleteProgram(program);
	}

	return program;
}

export default webglProgram;
