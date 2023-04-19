export default class Store {
	#state = { moves: [] };

	constructor() {}

	#getState() {
		return this.#state;
	}

	#saveState(stateOrFun) {
		const prevstate = this.#getState();
		let newState;

		switch (typeof stateOrFun) {
			case 'function':
				newState = stateOrFun(prevstate);
				break;
			case 'object':
				newState = stateOrFun;
				break;
			default:
				throw new Error('Invalid argumend passed to newState');
		}
		this.#state = newState;
	}
}
