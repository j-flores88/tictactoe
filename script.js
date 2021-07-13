(function ()
    {const xClass = 'x';
    const circleClass = 'circle';
    const cells = document.querySelectorAll('[data-cell-index]');
    const board = document.querySelector('.board');
    const restartBtn = document.getElementById('restartButton');
    const gameOverScreen = document.getElementById('gameover-message');
    const gameOverMessage = document.querySelector('[data-gameover-message-text]')
    let gameBoard = new Array(9);
    let circleTurn;
    let turnCount = 0;

    const cellClick = (e) => {
        const cell = e.target;
        const cellIndex = Number(e.target.attributes[1].value);
        const currentClass = circleTurn ? circleClass : xClass;
        turnCount++

        markCell(cell, cellIndex, currentClass);
        changeTurns()
    }

    const markCell = (cell, index, currentClass) => {
        cell.classList.add(currentClass);
        gameBoard[index] = currentClass;

        getScore(gameBoard, currentClass)
    }

    const changeTurns = () => {
        circleTurn = !circleTurn;
        addBoardClass()
    }

    const addBoardClass = () => {
        if(!circleTurn) {
            board.classList.remove('circle')
            board.classList.add('x')
        } else {
            board.classList.remove('x')
            board.classList.add('circle')
        }
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
        const winner = circleTurn ? `O's` : `X's`;;
        const [ winsCheck ] = wins;

        winsCheck.forEach(win => {
            scores.forEach(score => {
                if(score === win) {
                winArr.push(score)
                matchCount++
                }
            })
            if(matchCount === 3) {
                gameOverScreen.style.display = 'flex' //gameovermessage
                gameOverMessage.innerHTML = `${winner} win!`
            } else if (matchCount !== 3 && turnCount === 9) {
                gameOverScreen.style.display = 'flex' 
                gameOverMessage.innerHTML = `Draw!`
            }
        })
    }

    cells.forEach(cell => {
        cell.addEventListener('click', cellClick, { once: true })
    });

    restartBtn.addEventListener('click',  () => {
        gameBoard = new Array(9);
        turnCount = 0;
        gameOverScreen.style.display = 'none' 

        cells.forEach(cell => {
            cell.classList.remove(xClass) || cell.classList.remove(circleClass)
            cell.addEventListener('click', cellClick, { once: true } )
        });
    })

    addBoardClass()
})();