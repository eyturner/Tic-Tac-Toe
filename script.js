createGrid = function(numRows) {
  let sketchDiv = document.querySelector('.sketchDiv');
  for (let i = 0; i < numRows; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < numRows; j++) {
      var cell = document.createElement('div');
      cell.className = 'cell';
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

createGrid(3);
