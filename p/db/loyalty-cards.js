import {deepStrictEqual as eql} from 'node:assert';

// todo: generate from https://reiseauskunft.bahn.de/addons/fachkonfig-utf8.cfg ?
const c = {
	NONE: Symbol('no loyalty card'),
	BAHNCARD: Symbol('Bahncard'),
	VORTEILSCARD: Symbol('VorteilsCard'),
	HALBTAXABO: Symbol('HalbtaxAbo'),
	VOORDEELURENABO: Symbol('Voordeelurenabo'),
	SHCARD: Symbol('SH-Card'),
	GENERALABONNEMENT: Symbol('General-Abonnement'),
};

// see https://gist.github.com/juliuste/202bb04f450a79f8fa12a2ec3abcd72d
const formatLoyaltyCard = (data) => {
	if (data.type === c.BAHNCARD) {
		if (data.discount === 25) {
			return data.class === 1
				? 1
				: 2;
		}
		if (data.discount === 50) {
			return data.class === 1
				? 3
				: 4;
		}
	}
	if (data.type === c.VORTEILSCARD) {
		return 9;
	}
	if (data.type === c.HALBTAXABO) {
		return data.railplus
			? 10
			: 11;
	}
	if (data.type === c.VOORDEELURENABO) {
		return data.railplus
			? 12
			: 13;
	}
	if (data.type === c.SHCARD) {
		return 14;
	}
	if (data.type === c.GENERALABONNEMENT) {
		return 15;
	}
	return 0;
};

const parseLoyaltyCard = (cardId) => {
	switch (cardId) {
		case 1:
		case 2: return {type: c.BAHNCARD, discount: 25, class: cardId === 1 ? 1 : 2};
		case 3:
		case 4: return {type: c.BAHNCARD, discount: 50, class: cardId === 3 ? 1 : 2};
		case 9: return {type: c.VORTEILSCARD};
		case 10:
		case 11: return {type: c.HALBTAXABO, railplus: cardId === 10};
		case 12:
		case 13: return {type: c.VOORDEELURENABO, railplus: cardId === 12};
		case 14: return {type: c.SHCARD};
		case 15: return {type: c.GENERALABONNEMENT};
		default: return {type: c.NONE};
	}
};

const bcFirst50 = {
	type: c.BAHNCARD,
	class: 1,
	discount: 50,
};
eql(parseLoyaltyCard(formatLoyaltyCard(bcFirst50)), bcFirst50);
const halbtaxRailplus = {
	type: c.HALBTAXABO,
	railplus: true,
};
eql(parseLoyaltyCard(formatLoyaltyCard(halbtaxRailplus)), halbtaxRailplus);

export {
	c as data,
	formatLoyaltyCard,
	parseLoyaltyCard,
};
