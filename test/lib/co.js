'use strict'

// https://github.com/babel/babel/blob/3c8d831fe41f502cbe2459a271d19c7329ffe369/packages/babel-helpers/src/helpers.js#L242-L270
const co = (fn) => {
	return function run () {
		const self = this, args = arguments
		return new Promise((resolve, reject) => {
			const gen = fn.apply(self, args)
			const step = (key, arg) => {
				try {
					var info = gen[key](arg)
					var value = info.value
				} catch (error) {
					reject(error)
					return
				}
				if (info.done) resolve(value)
				else Promise.resolve(value).then(_next, _throw)
			}

			const _next = (value) => {
				step('next', value)
			}
			const _throw = (err) => {
				step('throw', err)
			}

			_next()
		})
	}
}

module.exports = co
