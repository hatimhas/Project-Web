document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("tictactoeBoard");
    const modeSelector = document.getElementById("modeSelector");
    const gameStatus = document.getElementById("gameStatus");
    let currentPlayer = "X";
    let boardState = [];
    let gameActive = false;

    // Disable the board on page load
    disableBoard();

    function startGame() {
        gameActive = true;

        if (gameActive) {
            modeSelector.disabled = true;
        }
    }

    modeSelector.addEventListener("change", function() {
        const selectedMode = modeSelector.value;
        startGame();
        updateGameMode(selectedMode);
    });

    function updateGameMode(mode) {
        if (mode === 'chooseMode') {
            disableBoard();  // Disable the game board
            gameStatus.textContent = "Choose a Game Mode";
            modeSelector.disabled = false;
        } else if (mode === '2player') {
            gameStatus.textContent = "2 Player Mode - Player X's Turn";
            enableBoard();  // Enable the game board
        } else if (mode === 'aiEasy') {
            gameStatus.textContent = "AI (Easy) Mode - Player X's Turn";
            enableBoard();  // Enable the game board
            if (currentPlayer === 'O') {
                makeAiMove();
            }
        } else if (mode === 'aiHard') {
            gameStatus.textContent = "AI (Hard) Mode - Player X's Turn";
            enableBoard();  // Enable the game board
            if (currentPlayer === 'O') {
                makeHardAiMove()
            }
            
        }
    }

    // Initialize boardState
    boardState = Array(9).fill(null);

    // Create Tic Tac Toe Grid
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

        if (!gameActive || boardState[index] !== null) {
            return; // If game is not active or user clicks a filled cell, nothing happens
        }

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(`player-${currentPlayer}`);

        if (currentPlayer === 'X') {
            modeSelector.disabled = true;
        }

        if (checkWinner()) {
            document.getElementById("gameStatus").textContent = `Player ${currentPlayer} Wins!`;
            disableBoard();
        } else if (boardState.every(cell => cell !== null)) {
            document.getElementById("gameStatus").textContent = "It's a Draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("gameStatus").textContent = `Player ${currentPlayer}'s Turn`;
            
            if (currentPlayer === 'O' && modeSelector.value === 'aiEasy') {
                setTimeout(makeAiMove, 500);  // AI makes its move after a short delay
            }
            if (currentPlayer === 'O' && modeSelector.value === 'aiHard') {
                setTimeout(makeHardAiMove, 500);  // AI makes its move after a short delay
            }
        }
    }

    function minimax(boardState, depth, isMaximizing) {
        const scores = { 'X': -1, 'O': 1, 'draw': 0 };
        const winner = checkWinner();
    
        if (winner) {
            return scores[winner];
        }
    
        if (boardState.every(cell => cell !== null)) {
            return scores['draw'];
        }
    
        if (isMaximizing) {
            let bestScore = -Infinity;
    
            for (let i = 0; i < 9; i++) {
                if (boardState[i] === null) {
                    boardState[i] = 'O';
                    let score = minimax(boardState, depth + 1, false);
                    boardState[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
    
            for (let i = 0; i < 9; i++) {
                if (boardState[i] === null) {
                    boardState[i] = 'X';
                    let score = minimax(boardState, depth + 1, true);
                    boardState[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function makeHardAiMove() {
        let bestScore = -Infinity;
        let move;
    
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === null) {
                boardState[i] = 'O';
                let score = minimax(boardState, 0, false);
                boardState[i] = null;
    
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
    
        boardState[move] = 'O';
        const cell = document.querySelector(`.tic-tac-toe-cell[data-index="${move}"]`);
        cell.textContent = 'O';
        cell.classList.add('player-O');
    
        if (checkWinner()) {
            gameStatus.textContent = "AI Wins!";
            disableBoard();
        } else if (boardState.every(cell => cell !== null)) {
            gameStatus.textContent = "It's a Draw!";
        } else {
            currentPlayer = 'X';
            gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
    
    function makeAiMove() {
        const availableMoves = boardState.map((value, index) => value === null ? index : null).filter(value => value !== null);
        if (availableMoves.length === 0) return;  // No moves available

        const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        boardState[randomIndex] = 'O';
        const cell = document.querySelector(`.tic-tac-toe-cell[data-index="${randomIndex}"]`);
        cell.textContent = 'O';
        cell.classList.add('player-O');

        if (checkWinner()) {
            gameStatus.textContent = "AI Wins!";
            disableBoard();
        } else if (boardState.every(cell => cell !== null)) {
            gameStatus.textContent = "It's a Draw!";
        } else {
            currentPlayer = 'X';
            gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]  // diagonals
        ];
    
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a]; // Return 'X' or 'O' as the winner
            }
        }
    
        return null; // No winner yet
    }
    

    function disableBoard() {
        document.querySelectorAll(".tic-tac-toe-cell").forEach(cell => {
            cell.disabled = true;
        });
        gameActive = false;
    }

    function enableBoard() {
        document.querySelectorAll(".tic-tac-toe-cell").forEach(cell => {
            cell.disabled = false;
        });
        gameActive = true;
    }

    document.getElementById("resetButton").addEventListener("click", function() {
        boardState = Array(9).fill(null);
        document.querySelectorAll(".tic-tac-toe-cell").forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("player-X", "player-O");
        });
        currentPlayer = "X";
        modeSelector.disabled = false;
        
        // Re-enable the board if a valid mode is selected
        const selectedMode = modeSelector.value;
        if (selectedMode !== 'chooseMode') {
            updateGameMode(selectedMode);
        } else {
            disableBoard(); // Keep the board disabled if no mode is selected
        }
    });
    
});
