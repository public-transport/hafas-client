const createParse = (ctx) => {
	const parse = (type, ...args) => {
		const parseFn = ctx.profile['parse' + type[0].toUpperCase() + type.slice(1)]
		if ('function' !== typeof parseFn) throw new Error('no parse fn for ' + type)
		return parseFn({...ctx, parsed: {}}, ...args)
	}
	return parse
}

module.exports = createParse
