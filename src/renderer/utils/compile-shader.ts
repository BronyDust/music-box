function compileShader(ctx: WebGL2RenderingContext, type: number, source: string) {
	const shader = ctx.createShader(type);

	try {
		if (!shader) throw new Error();

		ctx.shaderSource(shader, source);
		ctx.compileShader(shader);

		const status = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
		if (!status) throw new Error();
	} catch {
		if (shader) console.log(ctx.getShaderInfoLog(shader));
  	ctx.deleteShader(shader);
	}
	
	return shader;
}

export default compileShader;
