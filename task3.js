// Game Variables
let board;
let currentPlayer = 'X';
let gameActive = true;
let againstComputer = false;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// DOM Elements
const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('reset-btn');
const twoPlayerButton = document.getElementById('two-player-btn');
const computerModeButton = document.getElementById('computer-mode-btn');

// Initialize Game
function init() {
    board = Array(9).fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    currentPlayer = 'X';
    gameActive = true;
    statusMessage.textContent = `${currentPlayer}'s turn`;
}

// Event Listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
twoPlayerButton.addEventListener('click', () => {
    againstComputer = false;
    init();
});

computerModeButton.addEventListener('click', () => {
    againstComputer = true;
    init();
});

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) return;

    placeMark(cell, cellIndex);
    checkResult();
    
    if (gameActive && againstComputer && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

// Place mark on the board
function placeMark(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Computer makes a move
function computerMove() {
    let emptyCells = board.map((mark, index) => mark === '' ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    placeMark(cells[randomIndex], randomIndex);
    checkResult();
}

// Check game result (win or draw)
function checkResult() {
    let winner = checkWinner();

    if (winner) {
        gameActive = false;
        statusMessage.textContent = `${winner} wins!`;
        highlightWinningCells(winner);
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        statusMessage.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `${currentPlayer}'s turn`;
    }
}

// Check if there is a winner
function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// Highlight the winning combination
function highlightWinningCells(winner) {
    winningCombinations.forEach(combo => {
        const [a, b, c] = combo;
        if (board[a] === winner && board[b] === winner && board[c] === winner) {
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
        }
    });
}

// Reset the game
function resetGame() {
    init();
}

// Initialize game on load
init();
