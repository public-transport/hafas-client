'use strict'

// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L5
// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L47-L234

const createParseBitmask = require('../../parse/products-bitmask')
const createFormatBitmask = require('../../format/products-bitmask')

const products = require('./products')

const transformReqBody = (body) => {
	body.client = {type: 'IPA', id: 'OEBB'}
	// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_config_base-properties-L33 shows 1.16
	body.ver = '1.15'
	body.auth = {type: 'AID', aid: 'OWDL4fE4ixNiPBBm'}

	return body
}

const oebbProfile = {
	locale: 'de-AT',
	timezone: 'Europe/Vienna',
	// todo: there is also https://beta.verkehrsauskunft.at/bin/mgate.exe
	endpoint: 'http://fahrplan.oebb.at/bin/mgate.exe',
	transformReqBody,

	products: products.allProducts,

	parseProducts: createParseBitmask(products.bitmasks),

	formatProducts: createFormatBitmask(products)
}

module.exports = oebbProfile
