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

    console.log(gameBoard)
}

const changeTurns = () => {
    circleTurn = !circleTurn
}

cells.forEach(cell => {
    cell.addEventListener('click', cellClick, { once: true })
})