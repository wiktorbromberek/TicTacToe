import Store from './store.js';
import View from './view.js';

const App = {
	$: {
		menu: document.querySelector('[data-id="menu-button"]'),
		menuItems: document.querySelector('[data-id="menu-popover"]'),
		resetButton: document.querySelector('[data-id="reset-btn"]'),
		newRoundButton: document.querySelector('[data-id="new-round-btn"]'),
		squares: document.querySelectorAll('[data-id="square"]'),
		modal: document.querySelector('[data-id="modal"]'),
		modalText: document.querySelector('[data-id="modal-text"]'),
		modalBtn: document.querySelector('[data-id="modal-btn"]'),
		turn: document.querySelector('[data-id="turn"]'),
	},

	state: {
		moves: [],
	},

	getGameStatus(moves) {
		const p1Moves = moves
			.filter((move) => move.playerId === 1)
			.map((move) => +move.squareId);
		const p2Moves = moves
			.filter((move) => move.playerId === 2)
			.map((move) => +move.squareId);

		const winningPatterns = [
			[1, 2, 3],
			[1, 5, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 5, 7],
			[3, 6, 9],
			[4, 5, 6],
			[7, 8, 9],
		];
		let winner = null;
		winningPatterns.forEach((pattern) => {
			const p1Wins = pattern.every((v) => p1Moves.includes(v));
			const p2Wins = pattern.every((v) => p2Moves.includes(v));
			if (p1Wins) winner = 1;
			if (p2Wins) winner = 2;
		});

		return {
			status: moves.length === 9 || winner != null ? 'complete' : 'in progress',
			winner: winner,
		};
	},

	init() {
		App.registerEventListeners();
	},

	registerEventListeners() {
		App.$.menu.addEventListener('click', () => {
			App.$.menuItems.classList.toggle('hidden');
		});
		App.$.resetButton.addEventListener('click', () => {
			console.log('Reset the game');
		});
		App.$.newRoundButton.addEventListener('click', () => {
			console.log('Start the new round');
		});
		App.$.modalBtn.addEventListener('click', (e) => {
			App.state.moves = [];
			App.$.squares.forEach((square) => square.replaceChildren());
			App.$.modal.classList.add('hidden');
		});

		App.$.squares.forEach((square) => {
			square.addEventListener('click', (e) => {
				const hasMove = (squareId) => {
					const existingMove = App.state.moves.find(
						(move) => move.squareId === squareId
					);
					return existingMove !== undefined;
				};

				if (hasMove(+square.id)) {
					return;
				}
				const lastMove = App.state.moves.at(-1);
				const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
				const currentPlayer =
					App.state.moves.length === 0
						? 1
						: getOppositePlayer(lastMove.playerId);
				const nextPlayer = getOppositePlayer(currentPlayer);
				const icon = document.createElement('i');
				const turnIcon = document.createElement('i');
				const turnLabel = document.createElement('p');
				turnLabel.innerText = `Player ${nextPlayer}, you are up!`;

				if (currentPlayer === 1) {
					icon.classList.add('fa-solid', 'fa-x', 'yellow');
					turnIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
					turnLabel.classList = 'turquoise';
				} else {
					icon.classList.add('fa-solid', 'fa-o', 'turquoise');
					turnIcon.classList.add('fa-solid', 'fa-x', 'yellow');
					turnLabel.classList = 'yellow';
				}
				App.$.turn.replaceChildren(turnIcon, turnLabel);

				App.state.moves.push({
					squareId: +square.id,
					playerId: currentPlayer,
				});

				square.replaceChildren(icon);

				const game = App.getGameStatus(App.state.moves);

				if (game.status === 'complete') {
					App.$.modal.classList.remove('hidden');
					let message = 'da';
					if (game.winner) {
						message = `Player ${game.winner} wins!`;
					} else {
						message = `Games' a tie!`;
					}
					App.$.modalText.textContent = message;
				}
			});
		});
	},
};

// window.addEventListener('load', App.init);

const players = [
	{
		id: 1,
		name: 'Player 1',
		iconClass: 'fa-x',
		colorClass: 'turquoise',
	},
	{
		id: 2,
		name: 'Player 2',
		iconClass: 'fa-o',
		colorClass: 'yellow',
	},
];

function init() {
	const view = new View();
	const store = new Store(players);

	console.log(store.game);
	view.bindGameResetEvent((e) => {
		console.log(e);
		console.log('resetevent');
	});
	view.bindNewRoundEvent((e) => {
		console.log(e);
		console.log('newround');
	});
	view.bindPlayerMoveEvent((e) => {
		const clickedSquare = e.target;

		view.setTurnIndicator(clickedSquare, store.game.currentPlayer);

		

		view.handlePlayerMove(e.target, players[1]);
	});
}
window.addEventListener('load', init);
