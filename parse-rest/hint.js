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

// todo (from a trip):
// {
// 	"value": "Platform track 1",
// 	"key": "BN",
// 	"type": "A",
// 	"txtN": "Platform track 1"
// },
// {
// 	"value": "nicht bedingt barrierefrei",
// 	"key": "B-",
// 	"type": "A",
// 	"txtN": "nicht bedingt barrierefrei"
// },
// {
// 	"value": "nicht barrierefrei",
// 	"key": "B=",
// 	"type": "A",
// 	"txtN": "nicht barrierefrei"
// },
// {
// 	"value": "de:11000:900120005:1:50",
// 	"key": "IF",
// 	"type": "I",
// 	"txtN": "de:11000:900120005:1:50"
// },
// {
// 	"value": "2",
// 	"key": "LV",
// 	"type": "I",
// 	"txtN": "2"
// },
// {
// 	"value": "8003137",
// 	"key": "EE",
// 	"type": "I",
// 	"txtN": "8003137"
// },
// {
// 	"value": "900120005",
// 	"key": "BB",
// 	"type": "I",
// 	"txtN": "900120005"
// },
// {
// 	"value": "Bahnsteig Gleis 1",
// 	"key": "Nd",
// 	"type": "I",
// 	"txtN": "Bahnsteig Gleis 1"
// },
// {
// 	"value": "Platform track 1",
// 	"key": "Ne",
// 	"type": "I",
// 	"txtN": "Platform track 1"
// },
// {
// 	"value": "300188201 5555 Berlin AB % S Ostbahnhof (Berlin)",
// 	"key": "TW",
// 	"type": "I",
// 	"txtN": "300188201 5555 Berlin AB % S Ostbahnhof (Berlin)"
// },
// {
// 	"value": "8010255",
// 	"key": "TD",
// 	"type": "I",
// 	"txtN": "8010255"
// },
// {
// 	"value": "8003137",
// 	"key": "TE",
// 	"type": "I",
// 	"txtN": "8003137"
// },
// {
// 	"value": "Der Bahnhof besteht aus zwei Ebenen. <break msecs=300/> In der oberen Ebene, fahren die S-Bahnen, Regional- und Fern-Züge ab. <break msecs=300/> Die Bahnsteige sind über Aufzüge barriere-frei erreichbar. Die Bahnsteige der S-Bahn sind zusätzlich durch Roll-Treppen erreichbar. <break msecs=300/> In der Nähe des Bahnhofs, befinden sich Bus-Haltestellen. <break msecs=300/> Im Bahnhofs-Gebäude, befindet sich ein barriere-freies WC. <break msecs=300/> Alle Bahnsteige verfügen über Blinden-Leitstreifen.",
// 	"key": "bd",
// 	"type": "I",
// 	"txtN": "Der Bahnhof besteht aus zwei Ebenen. <break msecs=300/> In der oberen Ebene, fahren die S-Bahnen, Regional- und Fern-Züge ab. <break msecs=300/> Die Bahnsteige sind über Aufzüge barriere-frei erreichbar. Die Bahnsteige der S-Bahn sind zusätzlich durch Roll-Treppen erreichbar. <break msecs=300/> In der Nähe des Bahnhofs, befinden sich Bus-Haltestellen. <break msecs=300/> Im Bahnhofs-Gebäude, befindet sich ein barriere-freies WC. <break msecs=300/> Alle Bahnsteige verfügen über Blinden-Leitstreifen."
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
