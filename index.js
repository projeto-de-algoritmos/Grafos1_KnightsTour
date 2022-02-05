const chessBoard = document.querySelector('#chessBoard');
const button = document.querySelector('#button');
const userInput = document.querySelector('#gridSize');
const divs = [];
let size = 8;
let gridSize = size ** 2;

g = new Graph(size);
g.createAdjacencyList()

createBoard(size);

initializeKnightTour();


button.addEventListener('click', () => {
    restartChessBoard(size)
});

function createBoard(n){
    let colorSquare = 1;
    for(let i = 0; i < gridSize; i++){
        divs[i] = document.createElement('div');
        divs[i].classList.add('divs');

        if((i % n == 0) && i > 0){
            colorSquare = colorSquare * (-1);
        }
        if(colorSquare == 1){
            divs[i].style.background = `rgb(227,193,111)`;
        }else{
            divs[i].style.background = `rgb(184,139,74)`;
        }
        colorSquare = colorSquare * (-1);
        
        chessBoard.appendChild(divs[i]);
    };

}

function restartChessBoard(n){
    // let colorSquare = 1;
    // for(let i = 0; i < gridSize; i++){
    //     if((i % n == 0) && i > 0){
    //         colorSquare = colorSquare * (-1);
    //     }
    //     if(colorSquare == 1){
    //         divs[i].style.background = `rgb(227,193,111)`;
    //     }else{
    //         divs[i].style.background = `rgb(184,139,74)`;
    //     }
    //     colorSquare = colorSquare * (-1);
    // };
    const allDiv = document.querySelectorAll(".divs");
    for(let i = 0; i < allDiv.length; i++){
        allDiv[i].innerHTML = '';
    }
}

function initializeKnightTour(){
    const allDiv = document.querySelectorAll(".divs");

    for(let i = 0; i < allDiv.length; i++){
        allDiv[i].addEventListener('click', () => knight(i))
    }

}

// function removeDivs(){
//     for(let i = 0; i < divs.length; i++){
//         chessBoard.removeChild(divs[i]);
//     };
// }

// function createGrid(size){
//     removeDivs();
//     gridSize = (size ** 2);
//     chessBoard.setAttribute('style', `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`);

//     g = new Graph(size);
//     g.createAdjacencyList()
//     createBoard(size);
//     initializeKnightTour();    
// }

async function knight(i){
    g.dfsKnight(i);
    const allDiv = document.querySelectorAll(".divs");

    img = document.createElement('img');
    img.setAttribute('src', 'imgs/Chess-Knight.svg');
    img.classList.add('imgs');

    for(let i = 0; i < g.path.length; i++){
        // allDiv[g.path[i]].style.background = `green`;
        allDiv[g.path[i]].appendChild(img);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        if (i != (g.path.length - 1)){
            text = document.createElement('div');
            text.innerHTML = 'X';
            text.classList.add('text');
            allDiv[g.path[i]].appendChild(text);
        }
       

    }
}