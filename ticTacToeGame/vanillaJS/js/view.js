export default class View {
	$ = {};
	constructor() {
		// this.$.menu = document.querySelector('[data-id="menu-button"]');
		this.$.menuBtn = document.querySelector('[data-id="menu-btn"]');
		this.$.menuItems = document.querySelector('[data-id="menu-popover"]');
		this.$.resetButton = document.querySelector('[data-id="reset-btn"]');
		this.$.newRoundButton = document.querySelector('[data-id="new-round-btn"]');
		this.$.squares = document.querySelectorAll('[data-id="square"]');
		this.$.modal = document.querySelector('[data-id="modal"]');
		this.$.modalText = document.querySelector('[data-id="modal-text"]');
		this.$.modalBtn = document.querySelector('[data-id="modal-btn"]');
		this.$.turn = document.querySelector('[data-id="turn"]');

		this.$.menuBtn.addEventListener('click', (e) => {
			this.toggleMenu();
		});
	}
	bindGameResetEvent(handler) {
		this.$.resetButton.addEventListener('click', handler);
	}
	bindNewRoundEvent(handler) {
		this.$.newRoundButton.addEventListener('click', handler);
	}

	bindPlayerMoveEvent(handler) {
		this.$.squares.forEach((square) => {
			square.addEventListener('click', handler);
		});
	}
	toggleMenu() {
		this.$.menuItems.classList.toggle('hidden');
	}
}
//  test``

//test 2 //
