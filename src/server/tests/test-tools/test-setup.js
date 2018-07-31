/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia = global.matchMedia || function m() {
	return {
		matches : false,
		addListener() {},
		removeListener() {}
	}
}