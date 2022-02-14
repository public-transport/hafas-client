import omit from 'lodash/omit.js'
// todo: get the original parseHint differently
import {parseHint as _parseHint} from '../parse/hint.js'

// todo (from a stopover):
// {
// 	"value": "bus stop Bäkedamm in front of Lindenstraße",
// 	"key": "BN",
// 	"type": "A",
// 	"priority": 300,
// 	"txtN": "bus stop Bäkedamm in front of Lindenstraße"
// },
// {
// 	"value": "nicht bedingt barrierefrei",
// 	"key": "B-",
// 	"type": "A",
// 	"priority": 920,
// 	"txtN": "nicht bedingt barrierefrei"
// },
// {
// 	"value": "nicht barrierefrei",
// 	"key": "B=",
// 	"type": "A",
// 	"priority": 920,
// 	"txtN": "nicht barrierefrei"
// },
// {
// 	"value": "de:12069:900220020::1",
// 	"key": "IF",
// 	"type": "I",
// 	"txtN": "de:12069:900220020::1"
// },
// {
// 	"value": "0",
// 	"key": "LV",
// 	"type": "I",
// 	"txtN": "0"
// },
// {
// 	"value": "Bushalt Bäkedamm vor Lindenstraße",
// 	"key": "Nd",
// 	"type": "I",
// 	"txtN": "Bushalt Bäkedamm vor Lindenstraße"
// },
// {
// 	"value": "bus stop Bäkedamm in front of Lindenstraße",
// 	"key": "Ne",
// 	"type": "I",
// 	"txtN": "bus stop Bäkedamm in front of Lindenstraße"
// },
// {
// 	"value": "301199001 5953 Teltow % Stahnsdorf, Stahnsdorfer Hof",
// 	"key": "TW",
// 	"type": "I",
// 	"txtN": "301199001 5953 Teltow % Stahnsdorf, Stahnsdorfer Hof"
// }

const parseHint = (ctx, hint) => {
	return _parseHint(ctx, {
		...omit(hint, ['value']),
		code: hint.key,
		txtN: hint.value
		// todo: map hint.routeIdxFrom & hint.routeIdxTo
	})
}

export {
	parseHint,
}
