import validateFptf from 'validate-fptf';
const {defaultValidators} = validateFptf;
import anyOf from 'validate-fptf/lib/any-of.js';

import validators from './validators.js';

const createValidateFptfWith = (cfg, customValidators = {}) => {
	const val = Object.assign({}, defaultValidators);
	for (let key of Object.keys(validators)) {
		val[key] = validators[key](cfg);
	}
	Object.assign(val, customValidators);

	const validateFptfWith = (t, item, allowedTypes, name) => {
		if ('string' === typeof allowedTypes) {
			val[allowedTypes](val, item, name);
		} else {
			anyOf(allowedTypes, val, item, name);
		}
		t.pass(name + ' is valid');
	};
	return validateFptfWith;
};

export {
	createValidateFptfWith,
};
