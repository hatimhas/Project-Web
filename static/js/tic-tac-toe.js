document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("tictactoeBoard");
    let currentPlayer = "X";
    let boardState = Array(9).fill(null);

    //Creating Tic Tac Toe Grid
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("button");
        cell.classList.add("tic-tac-toe-cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (boardState[index] !== null) {
            return; // If user clicks filled cell, nothing happens, until user clicks unfilled cell
        }

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(`player-${currentPlayer}`);

        if (checkWinner()) {
            document.getElementById("gameStatus").textContent = `Player ${currentPlayer} Wins!`;
            disableBoard();
        } else if (boardState.every(cell => cell !== null)) {
            document.getElementById("gameStatus").textContent = "It's a Draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("gameStatus").textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]  // diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                console.log(`Winning combination: ${combination}`); // Log the winning combination
                return true;
            }
            return false;
        });
    }

    function disableBoard() {
        document.querySelectorAll(".tic-tac-toe-cell").forEach(cell => {
            cell.disabled = true;
        });
    }

    document.getElementById("resetButton").addEventListener("click", function() {
        boardState = Array(9).fill(null);
        document.querySelectorAll(".tic-tac-toe-cell").forEach(cell => {
            cell.textContent = "";
            cell.disabled = false;
            cell.classList.remove("player-X", "player-O");
        });
        currentPlayer = "X";
        document.getElementById("gameStatus").textContent = "Player X's Turn";
    });
});

