class TicTacToe {
    constructor() {
        this.board = Array(3).fill(null).map(() => Array(3).fill(null));
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.init();
    }

    init() {
        this.renderBoard();
    }

    renderBoard() {
        const boardContainer = document.getElementById('board-container');
        boardContainer.innerHTML = '';

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', () => this.handleCellClick(i, j));
                cell.textContent = this.board[i][j] || '';
                boardContainer.appendChild(cell);
            }
        }

        const resultMessage = document.getElementById('result-message');
        resultMessage.textContent = '';
        resultMessage.style.display = 'none';

        const newGameButton = document.getElementById('new-game-button');
        newGameButton.style.display = 'none';
        newGameButton.addEventListener('click', () => this.newGame());
    }

    handleCellClick(row, col) {
        if (!this.gameOver && !this.board[row][col]) {
            this.board[row][col] = this.currentPlayer;
            this.renderBoard();
            if (this.checkWinner()) {
                this.showResult(`${this.currentPlayer} wins!`);
            } else if (this.isBoardFull()) {
                this.showResult('It\'s a draw!');
            } else {
                this.switchPlayer();
            }
        }
    }

    checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (
                (this.board[i][0] === this.currentPlayer && this.board[i][1] === this.currentPlayer && this.board[i][2] === this.currentPlayer) ||
                (this.board[0][i] === this.currentPlayer && this.board[1][i] === this.currentPlayer && this.board[2][i] === this.currentPlayer)
            ) {
                return true;
            }
        }

        if (
            (this.board[0][0] === this.currentPlayer && this.board[1][1] === this.currentPlayer && this.board[2][2] === this.currentPlayer) ||
            (this.board[0][2] === this.currentPlayer && this.board[1][1] === this.currentPlayer && this.board[2][0] === this.currentPlayer)
        ) {
            return true;
        }

        return false;
    }

    isBoardFull() {
        return this.board.every(row => row.every(cell => cell));
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    showResult(message) {
        const resultMessage = document.getElementById('result-message');
        resultMessage.textContent = message;
        resultMessage.style.display = 'block';

        const newGameButton = document.getElementById('new-game-button');
        newGameButton.style.display = 'block';

        this.gameOver = true;
    }

    newGame() {
        this.board = Array(3).fill(null).map(() => Array(3).fill(null));
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.init();
    }
}

const ticTacToe = new TicTacToe();
