const xClass = 'x';
const circleClass = 'circle';
const cells = document.querySelectorAll('[data-cell-index]');
const gameBoard = new Array(9);
let circleTurn;

const cellClick = (e) => {
    const cell = e.target;
    const cellIndex = Number(e.target.attributes[1].value);
    const currentClass = circleTurn ? circleClass : xClass;

    markCell(cell, cellIndex, currentClass);
    changeTurns()
}

const markCell = (cell, index, currentClass) => {
    cell.classList.add(currentClass);
    gameBoard[index] = currentClass;

    getScore(gameBoard, currentClass)
}

const changeTurns = () => {
    circleTurn = !circleTurn
}

const getScore = (board, playerSign) => {
    playerScore = []
    board.findIndex((sign, index) => {
        if(sign === playerSign) playerScore.push(index)
      })
    // return checkforwin(playerScore)
  };

cells.forEach(cell => {
    cell.addEventListener('click', cellClick, { once: true })
})