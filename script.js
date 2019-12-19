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

getRow = (id) => (Math.floor(id / 3));
getCol = (id) => (id % 3);


const gameBoard = (() => {
  const board = [
    ['X', 'O', 'X'],
    ['X', 'O', 'X'],
    ['O', 'X', ''],
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
    //Add mark to board[row][col]
    if(board[row][col] != '') {
      console.log('You cant do that!');
      return board;
    }
    board[row][col] = mark;
    return board;
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
    printBoard
  };

})();

gameBoard.addMark('X', 2, 2);
gameBoard.printBoard();

createGrid(3);
const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    console.log(getCol(cell.id));
  });
});
