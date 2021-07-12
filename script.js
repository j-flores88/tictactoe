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
    compareScores(playerScore)
};

const compareScores = (score) => {
    if(score.length < 3) return
  
    scoreArr = score.sort()
    const winCondition = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ]
    winCondition.forEach(win => {
      for(let i = 0; i < scoreArr.length; i++) {
        if(scoreArr[i] === win[0]) {
          checkForWin(scoreArr, win)
        } 
      }
    })
  };

  const checkForWin = (scores, ...wins) => {
    let winArr = [];
    let matchCount = 0;
    const winner = circleTurn ? 'circle' : 'x'
  
    const [ winsCheck ] = wins;
    winsCheck.forEach(win => {
      scores.forEach(score => {
        if(score === win) {
          winArr.push(score)
          matchCount++
        }
      })
      if(matchCount === 3) {
        console.log(winArr, `winner is ${winner}`) //gameovermessage
      }
    })
  }

cells.forEach(cell => {
    cell.addEventListener('click', cellClick, { once: true })
})