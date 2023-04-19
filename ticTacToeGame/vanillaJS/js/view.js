export default class View {
	$ = {};
	$$ = {};
	constructor() {
		// this.$.menu = document.querySelector('[data-id="menu-button"]');
		this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
		this.$.menuItems = this.#qs('[data-id="menu-popover"]');
		this.$.resetButton = this.#qs('[data-id="reset-btn"]');
		this.$.newRoundButton = this.#qs('[data-id="new-round-btn"]');
		this.$.modal = this.#qs('[data-id="modal"]');
		this.$.modalText = this.#qs('[data-id="modal-text"]');
		this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
		this.$.turn = this.#qs('[data-id="turn"]');

		this.$$.squares = this.#qsAll('[data-id="square"]');

		this.$.menuBtn.addEventListener('click', (e) => {
			this.#toggleMenu();
		});
	}
	bindGameResetEvent(handler) {
		this.$.resetButton.addEventListener('click', handler);
	}
	bindNewRoundEvent(handler) {
		this.$.newRoundButton.addEventListener('click', handler);
	}

	bindPlayerMoveEvent(handler) {
		this.$$.squares.forEach((square) => {
			square.addEventListener('click', handler);
		});
	}
	#toggleMenu() {
		this.$.menuItems.classList.toggle('hidden');
		this.$.menuBtn.classList.toggle('border');

		const icon = this.$.menuBtn.querySelector('i');

		icon.classList.toggle('fa-chevron-down');
		icon.classList.toggle('fa-chevron-up');
	}
	handlePlayerMove(squareEl, player) {
		const icon = document.createElement('i');
		icon.classList.add('fa-solid', player.iconClass, player.colorClass);
		squareEl.replaceChildren(icon);
	}

	setTurnIndicator(player) {
		const icon = document.createElement('i');
		const label = document.createElement('p');

		icon.classList.add('fa-solid', player.iconClass, player.colorClass);

		label.classList.add(player.colorClass);

		label.innerText = `${player.name}, you're up!`;

		this.$.turn.replaceChildren(icon, label);
	}

	#qs(selector, parent) {
		const el = parent
			? parent.querySelector(selector)
			: document.querySelector(selector);

		if (!el) throw new Error('Could not find elements');

		return el;
	}
	#qsAll(selector) {
		const elList = document.querySelectorAll(selector);

		if (!elList) throw new Error('Could not find elements');

		return elList;
	}
}
