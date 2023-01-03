const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

const boardState = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];


cells.forEach(cell => {
	cell.addEventListener('click', handleClick);
});

function updateBoardState(cell, player) {
	const cellIndex = cell.getAttribute('data-index');
	const row = Math.floor(cellIndex / 3);
	const col = cellIndex % 3;
	boardState[row][col] = player;
}


function handleClick(e) {
	const cell = e.target;

	// Verifica se a célula já está ocupada
	if (cell.textContent !== '') {
		return;
	}

	// Coloca o símbolo do jogador atual na célula
	cell.textContent = currentPlayer;

	// Atualiza o estado do tabuleiro
	updateBoardState(cell, currentPlayer);

	// Altera o jogador atual para o próximo jogador
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

	// Verifica se o jogo terminou
	checkGameOver();
}

function checkWin(player) {
	// Verifica as linhas
	for (let row = 0; row < 3; row++) {
		if (boardState[row][0] === player && boardState[row][1] === player && boardState[row][2] === player) {
			return true;
		}
	}

	// Verifica as colunas
	for (let col = 0; col < 3; col++) {
		if (boardState[0][col] === player && boardState[1][col] === player && boardState[2][col] === player) {
			return true;
		}
	}

	// Verifica as diagonais
	if (boardState[0][0] === player && boardState[1][1] === player && boardState[2][2] === player) {
		return true;
	}
	if (boardState[0][2] === player && boardState[1][1] === player && boardState[2][0] === player) {
		return true;
	}

	// Não há combinação vencedora
	return false;
}

function checkGameOver() {
	// Verifica se o jogador X venceu
	if (checkWin('X')) {
		alert('Jogador X venceu!');
		resetGame();
		return;
	}

	// Verifica se o jogador O venceu
	if (checkWin('O')) {
		alert('Jogador O venceu!');
		resetGame();
		return;
	}

	// Verifica se houve empate
	let emptyCells = 0;
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (boardState[row][col] === null) {
				emptyCells++;
			}
		}
	}
	if (emptyCells === 0) {
		alert('Empate!');
		resetGame();
	}
}


function resetGame() {
	cells.forEach(cell => {
		cell.textContent = '';
	});
	boardState = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	currentPlayer = 'X';
}
