const parsePidFiltersTree = (ctx, jnyTreeNodeL) => {
	const parsedNodes = new WeakMap() // raw node -> parsed node
	const parseNode = (idx) => {
		const _ = jnyTreeNodeL[idx]
		if (!_) throw new Error(`missing node ${idx}`) // todo: don't let this happen
		if (parsedNodes.has(_)) return parsedNodes.get(_)

		// todo: what is _.type?
		// todo: what is _.stat.rt? nr of children with realtime data?
		// todo: what is _.stat.ont?
		// todo: what is _.stat.cncl? nr of canceled children?
		// todo: what is _.stat.delGrpL & _.stat.delCntL?
		// todo: what is _.stat.him? nr of children with HIM messages?
		const node = {
			name: _.name,
			pidFilter: _.pid, // todo [breaking]: rename field?
			// todo [breaking]: rename field?
			// todo: parse differently? most tree nodes have a sparse common.prodL[_.prodX]
			product: _.line,
			// todo: _.icon?
		}
		parsedNodes.set(_, node)

		if (Array.isArray(_.childRefL)) {
			node.children = _.childRefL.map(parseNode)
		}

		return node
	}

	const rootChildren = jnyTreeNodeL
		.map((node, idx) => [idx, node])
		.filter(([_, node]) => !jnyTreeNodeL[node.parRefX]) // keep nodes without parent
		.map(([idx]) => parseNode(idx))

	return {
		// mock root node
		kind: 'root',
		name: null,
		pid: null,
		product: null,
		children: rootChildren,
	}
}

export {
	parsePidFiltersTree,
}
