import tap from 'tap'
// import omit from 'lodash/omit.js'
import {parseProduct as parse} from '../../parse/product.js'
import {profile as bvgProfile} from '../../p/bvg/index.js'

const baseCtx = {
	data: {},
	opt: {},
}

tap.test('BVG: parses S8 correctly', (t) => {
	const input = {
		// made up of
		// 1. "L" for line ID?
		// 2. "0" ? some namespace?
		// 		VBB/BVG: RE1 (DB Regio) & RE4 (ODEG) both have "6"
		// 3. "S" for product?
		// 		VBB/BVG: RE1 (DB Regio) & RE4 (ODEG) both have "RE", so it isn't the operator
		// 4. "B1090519025" ? data source/provider? not the operator!
		// 		VBB/BVG: RE1/RE3/RE5/RE6/RE7/RB21/RB22 (DB Regio) & ICE 595 (DB Fernverkehr) both have "B0002373722"
		// 		VBB/BVG: RE2/RE4/RB33 (ODEG) has "B3113392179"
		// 5. "S_1090519025_" 3 & 4 (see above)
		// 6. "S8" line name
		// 7. "*" for all routes/directions/trips of the line?
		// thus, if as long as a pid starts with "L::" and ends with "::*", it describes a line
		pid: 'L::0::S::B1090519025::S_1090519025_S8::*',
		name: 'S8',
		nameS: 'S8',
		number: 'S8',
		icoX: 0, // todo
		cls: 1,
		oprX: 0, // todo
		prodCtx: {
			name: '      S8',
			num: '25595',
			line: 'S8',
			matchId: '8074',
			catOut: 'S       ',
			catOutS: 'S-8',
			catOutL: 'S       ',
			catIn: 'S-8',
			catCode: '0',
			admin: 'DBS---',
		},
	}
	const expected = {
		// type: 'line',
		// id: 'foo',
		// fahrtNr: 123,
		// name: 'foo line',
		// public: true,
		// adminCode: 'foo---',
	}

	const ctx = {...baseCtx, profile: bvgProfile}
	t.same(parse(ctx, input), expected)
})
