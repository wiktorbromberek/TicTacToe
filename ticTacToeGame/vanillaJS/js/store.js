const initialValue = {
	moves: [],
};

export default class Store {
	#state = initialValue;

	constructor(players) {
		this.players = players;
	}

	get game() {
		const state = this.#getState();

		const currentPlayer = this.players[state.moves.length % 2];
		return {
			currentPlayer,
		};
	}

	playerMove(squareId) {
		const state = this.#getState();

		const stateClone = structuredClone(state);

		stateClone.moves.push({
			squareId,
			player: this.game.currentPlayer,
		});
		this.#saveState(stateClone);
	}

	#getState() {
		return this.#state;
	}

	#saveState(stateOrFun) {
		const prevState = this.#getState();
		let newState;

		switch (typeof stateOrFun) {
			case 'function':
				newState = stateOrFun(prevState);
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
