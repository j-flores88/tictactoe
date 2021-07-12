const cells = document.querySelectorAll('[data-cell-index]');
const gameBoard = new Array(9)

const cellClick = (e) => {
    const cellIndex = Number(e.target.attributes[1].value);
    gameBoard[cellIndex] = 'clicked';//classlist
    console.log(gameBoard)
}

cells.forEach(cell => {
    cell.addEventListener('click', cellClick, { once: true })
})