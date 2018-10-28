/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let turns = 0;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}
function resetGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            grid[colIdx][rowidx] = 0;
        }
    }
}
function reset(){
    turns = 0;
    resetGrid();
    renderMainGrid();
    addClickHandlers();
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function flashWinner(win){
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var message = document.getElementById("ShowWinner");

modal.style.display = "block";
message.innerHTML = win==1?"Player Wins" : win==2?"Computer Wins":"It's a Tie"; 
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx] != 0){
        return;
    }
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    turns +=1
    turn = 'X';
    renderMainGrid();
    if(turns >= 4){
        var win = checkWinner(turn);
        if(win != -1){
            flashWinner(win);
            return;
        }
    }
    if(turns == 9){
        flashWinner(0);
        return;
    }
    turn = '0';
    ComputerTurn();
    turns +=1;
    renderMainGrid();
    if(turns >= 4){
        var win = checkWinner(turn);
        if(win != -1){
            flashWinner(win);
            return;
        }
    }
    addClickHandlers();
}

function GenerateRandomIndex(){
    var colIdx ;
    var rowIdx ;
    while (1){
        colIdx = Math.floor((Math.random() * (GRID_LENGTH-1)));
        rowIdx = Math.floor((Math.random() * (GRID_LENGTH-1)));
        if(grid[colIdx][rowIdx] == 0)
        break;
    }
    return [colIdx,rowIdx];
}
function ComputerTurn() {
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if ((grid[colIdx][rowidx] == 2 && grid[(colIdx+1)%GRID_LENGTH][rowidx] == 2)){
               if(grid[(colIdx+2)%GRID_LENGTH][rowidx] == 0){
                grid[(colIdx+2)%GRID_LENGTH][rowidx] = 2;
               return;
               }
            }
        }
    }
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if ( (grid[colIdx][(rowidx)%GRID_LENGTH] == 2 && grid[colIdx][(rowidx+1)%GRID_LENGTH] == 2)){
               if(grid[colIdx][(rowidx+2)%GRID_LENGTH] == 0){
                grid[colIdx][(rowidx+2)%GRID_LENGTH] = 2;
               return;
               }
            }
        }
    }
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if((rowidx == colIdx) ){
            if ( (grid[colIdx][rowidx] == 2 && grid[(colIdx+1)%GRID_LENGTH][(rowidx+1)%GRID_LENGTH] == 2)){
                if(grid[(colIdx+2)%GRID_LENGTH][(rowidx+2)%GRID_LENGTH] == 0){
               grid[(colIdx+2)%GRID_LENGTH][(rowidx+2)%GRID_LENGTH] = 2;
               return;
                }
            }
        }
        if((colIdx == GRID_LENGTH - rowidx - 1)){
            if ( (grid[colIdx][rowidx] == 2 && grid[(colIdx+1)%GRID_LENGTH][(rowidx-1 +GRID_LENGTH )%GRID_LENGTH] == 2)){
                if(grid[(colIdx+2)%GRID_LENGTH][(rowidx-2 + GRID_LENGTH)%GRID_LENGTH] == 0){
                grid[(colIdx+2)%GRID_LENGTH][(rowidx-2 + GRID_LENGTH)%GRID_LENGTH] = 2;
                return;
                }
             }
        }
        }
    }
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if ((grid[colIdx][rowidx] == 1 && grid[(colIdx+1)%GRID_LENGTH][rowidx] == 1) ){
               if(grid[(colIdx+2)%GRID_LENGTH][rowidx] == 0){
                grid[(colIdx+2)%GRID_LENGTH][rowidx] = 2;
               return;
               }
            }
        }
    }
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if ((grid[colIdx][(rowidx)%GRID_LENGTH] == 1 && grid[colIdx][(rowidx+1)%GRID_LENGTH] == 1) ){
               if(grid[colIdx][(rowidx+2)%GRID_LENGTH] == 0){
                grid[colIdx][(rowidx+2)%GRID_LENGTH] = 2;
               return;
               }
            }
        }
    }
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if((rowidx == colIdx)){
            if ((grid[colIdx][rowidx] == 1 && grid[(colIdx+1)%GRID_LENGTH][(rowidx+1)%GRID_LENGTH] == 1) ){
               if(grid[(colIdx+2)%GRID_LENGTH][(rowidx+2)%GRID_LENGTH] == 0){
                grid[(colIdx+2)%GRID_LENGTH][(rowidx+2)%GRID_LENGTH] = 2;
               return;
               }
            }
        }
        if((colIdx == GRID_LENGTH - rowidx - 1)){
            if ( (grid[colIdx][rowidx] == 1 && grid[(colIdx+1)%GRID_LENGTH][(rowidx-1 + GRID_LENGTH)%GRID_LENGTH] == 1)){
                if(grid[(colIdx+2)%GRID_LENGTH][(rowidx-2 + GRID_LENGTH)%GRID_LENGTH] == 0){
                grid[(colIdx+2)%GRID_LENGTH][(rowidx-2 + GRID_LENGTH)%GRID_LENGTH] = 2;
                return;
                }
             }
        }
        }
    }
        index = GenerateRandomIndex();
        grid[index[0]][index[1]] = 2;

}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function checkWinner(turn) {
    var value = turn == 'X'? 1:2;
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) { 
        if (grid[colIdx][0]==grid[colIdx][1] && 
            grid[colIdx][1]==grid[colIdx][2] && grid[colIdx][0] == value) 
        { 
            return grid[colIdx][0];
        }
    }
    for (let rowidx = 0;rowidx < GRID_LENGTH; rowidx++) { 
            if (grid[0][rowidx]==grid[1][rowidx] && 
                grid[1][rowidx]==grid[2][rowidx] && grid[0][rowidx] == value) 
            { 
                return grid[0][rowidx]; 
            }   
    } 

    if(grid[0][0] == grid[1][1] && grid[2][2] == grid[1][1] && grid[0][0] == value){
        return grid[0][0];
    }

    if(grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[0][2] == value){
        return grid[1][1];
    }
    return -1;
}

  

initializeGrid();
renderMainGrid();
addClickHandlers();
