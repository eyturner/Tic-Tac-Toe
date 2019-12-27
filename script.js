getRow = (id) => (Math.floor(id / 3));
getCol = (id) => (id % 3);

createGrid = function(numRows) {
  let sketchDiv = document.querySelector('.sketchDiv');
  for (let i = 0; i < numRows; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < numRows; j++) {
      var cell = document.createElement('button');
      cell.className = 'cell';
      cell.id = (numRows * i + j).toString();
      cell.style.backgroundColor = 'white';
      row.appendChild(cell);
    }
    sketchDiv.appendChild(row);
  }
  setCellSize(numRows);
}

setCellSize = function(numRows) {
  let cells = document.querySelectorAll('.cell');
  let row = document.querySelector('.row')
  let rowWidth = row.offsetWidth;
  var width = (rowWidth / numRows);
  var height = (555 / numRows);
  cells.forEach((cell) => {
    cell.style.height = height + 'px';
    cell.style.width = width + 'px';
  });
}

const gameBoard = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  const checkForWin = function() {
    //Check rows, cols, and diags. Returns winner if one, else returns false

    //Row check
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
        return board[i][0];
      }
    }

    //Col check
    for (let i = 0; i < board[0].length; i++) {
      if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
        return board[0][i];
      }
    }

    //Diag check
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
      return board[0][0];
    } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
      return board[0][2];
    }
    return false;
  }

  const isFull = function() {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] == '') {
          return false;
        }
      }
    }
    return true;
  }

  const isDrawn = function() {
    //Check board is full. If full and no win, it is drawn.
    if (gameBoard.isFull() && (!gameBoard.checkForWin())) {
      return true;
    }
    return false;
  }

  const addMark = function(mark, row, col) {
    board[row][col] = mark;
    return board;
  }

  const isValidMove = function(row, col) {
    console.log("Verifying:", row, col);
    if (board[row][col] == '') {
      return true;
    }
    console.log("YOU CAN'T DO THAT");
    return false;
  }

  const printBoard = function() {
    for (var i = 0; i < board.length; i++) {
      console.log(board[i]);
    }
  }

  return {
    checkForWin,
    isFull,
    isDrawn,
    addMark,
    isValidMove,
    printBoard
  };

})();

const Player = (name, char, AI) => {
  const getName = () => name;
  const getChar = () => char;
  const isAI = () => {
    if (AI) {
      return true;
    }
    return false;
  }
  const isWinner = (winningChar) => {
    if (char == winningChar) {
      return true;
    }
    return false;
  }

  return {
    getName,
    getChar,
    isAI,
    isWinner
  };
}

const eli = Player('Eli', 'X', false);
const comp = Player('Com', 'O', true);
let players = [eli, comp];
let title = document.querySelector('.title');

let turn = 0;
createGrid(3);
const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    let winChar = gameBoard.checkForWin();
    let row = getRow(cell.id);
    let col = getCol(cell.id);
    let mark = players[turn % 2].getChar()
    if (!gameBoard.isFull() && !winChar) {
      gameBoard.addMark(mark, row, col);
      cell.textContent = mark;
    }
    turn += 1;

    winChar = gameBoard.checkForWin();
    if (winChar) {
      for (var i = 0; i < players.length; i++) {
        if (players[i].isWinner(winChar)) {
          title.textContent = players[i].getName() + ' WINS!';
        }
      }
    }

    if (players[turn % 2].isAI() && !gameBoard.isFull() && !winChar) {
      choice = Math.floor(Math.random() * Math.floor(9));
      row = getRow(choice);
      col = getCol(choice);
      mark = players[turn % 2].getChar()
      while (!gameBoard.isValidMove(row, col)) {
        console.log('CHOICE:', choice);
        choice = Math.floor(Math.random() * Math.floor(9));
        row = getRow(choice);
        col = getCol(choice);
      }
      id = '#\\3'.concat(choice.toString());
      cellChoice = document.querySelector(id);
      gameBoard.addMark(mark, row, col);
      cellChoice.textContent = players[turn % 2].getChar();
      turn += 1
    }

    winChar = gameBoard.checkForWin();
    if (winChar) {
      for (var i = 0; i < players.length; i++) {
        if (players[i].isWinner(winChar)) {
          title.textContent = players[i].getName() + ' WINS!';
        }
      }
    }
    if(gameBoard.isDrawn()) {
      title.textContent = "Cat's game!";
      winChar = 'C';
    }

  });
});
