const chessBoard = document.querySelector('#chessBoard');
const restartButton = document.querySelector('#restartButton');
const tutorialButton = document.querySelector('#tutorialButton');
const size = 8;
const gridSize = size ** 2;

g = new Graph(size);
g.createAdjacencyList()

createBoard(size);

initializeKnightTour();


restartButton.addEventListener('click', () => {
    restartChessBoard(size)
});

tutorialButton.addEventListener('click', () => {
    changeTutorialPage(document.querySelector('img'))
});

function initializeKnightTour(){
    const chessSquares = document.querySelectorAll(".chessSquares");

    for(let i = 0; i < chessSquares.length; i++){
        chessSquares[i].addEventListener('click', () => knight(i))
    }
}

function createBoard(n){
    let colorSquare = 1;
    for(let i = 0; i < gridSize; i++){
        let chessSquare = document.createElement('div');
        chessSquare.classList.add('chessSquares');

        if((i % n == 0) && i > 0){
            colorSquare = colorSquare * (-1);
        }
        if(colorSquare == 1){
            chessSquare.style.background = `rgb(227,193,111)`;
        }else{
            chessSquare.style.background = `rgb(184,139,74)`;
        }
        colorSquare = colorSquare * (-1);
        
        chessBoard.appendChild(chessSquare);
    };

}

function changeTutorialPage(img) {
    if (img.getAttribute('src') == 'imgs/tutorial1.svg'){
        img.src = "imgs/tutorial2.svg"
    }
    else {
        img.src = "imgs/tutorial1.svg"
    }
}

function restartChessBoard(n){
    g = new Graph(size)
    g.createAdjacencyList()

    chessBoard.setAttribute('style', `pointer-events: all`)
    const chessSquares = document.querySelectorAll(".chessSquares");
    for(let i = 0; i < chessSquares.length; i++){
        chessSquares[i].innerHTML = '';
    }
}

async function knight(initialNode){
    g.dfsKnight(initialNode);
    const chessSquares = document.querySelectorAll(".chessSquares");

    let chessKnight = document.createElement('img');
    chessKnight.setAttribute('src', 'imgs/Chess-Knight.svg');
    chessKnight.classList.add('chessKnight');

    chessBoard.setAttribute('style', `pointer-events: none`)
    for(let i = 0; i < g.path.length; i++){
        chessSquares[g.path[i]].appendChild(chessKnight);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        if (i != (g.path.length - 1)){
            let visitedSquare = document.createElement('div');
            visitedSquare.innerHTML = 'X';
            visitedSquare.classList.add('visitedSquares');
            chessSquares[g.path[i]].appendChild(visitedSquare);
        }
       

    }
}