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
const GRID_LENGTH = 5;
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
function checkstatus(){
    if(turns >= 2*GRID_LENGTH - 1){
        var win = checkWinner(turn);
        if(win != -1){
            flashWinner(win);
            return true;
        }
    }
    if(turns == GRID_LENGTH*GRID_LENGTH){
        flashWinner(0);
        return true;
    }
    return false;
}
function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx] != 0){
        return;
    }
    let newValue = 1 , done0 = false,doneX = false;
    grid[colIdx][rowIdx] = newValue;
    turns +=1
    turn = 'X';
    renderMainGrid();
    if (checkstatus()){
        return;
    };
    turn = '0';
    done0 = ComputerTurn(2);//check for computer winning combination
    if (!done0){
        doneX = ComputerTurn(1);// block player winning combination
    } 
     
    if(!doneX && !done0){
        index = GenerateRandomIndex();
        grid[index[0]][index[1]] = 2;
    } 
    turns +=1;
    renderMainGrid();
    if (checkstatus()){
        return;
    };
    addClickHandlers();
}

function GenerateRandomIndex(){
    let colIdx ;
    let rowIdx ;
    while (1){
        colIdx = Math.floor((Math.random() * (GRID_LENGTH)));
        rowIdx = Math.floor((Math.random() * (GRID_LENGTH)));
        if(grid[colIdx][rowIdx] == 0)
        break;
    }
    return [colIdx,rowIdx];
}
function ComputerTurn(value) {
    if(turns < 2*GRID_LENGTH - 3){
        return false;
    }
    let index = -1, count = 0 , pdcount = 0,sdcount = 0 , indexpd = [],indexsd = [];
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
        
            if(grid[rowidx][colIdx] == value){
                count++;
            }
            if(grid[rowidx][colIdx] == 0){
                index = rowidx;
            }
        }
        if(count == GRID_LENGTH - 1) {
        if(index != -1){
            grid[index][colIdx] = 2;
        return true;
        }
        }
        count = 0;
        index = -1;
    }
    count = 0;
    index = -1;
    for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++){
        for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++){
            if(grid[rowidx][colIdx] == value){
                count++;
            }
            if(grid[rowidx][colIdx] == 0){
                index = colIdx;
            }
        }
        if(count == GRID_LENGTH - 1) {
            if(index != -1){
            grid[rowidx][index] = 2;
            return true;
            }
        }
            count = 0;
            index = -1;
    }
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if((rowidx == colIdx) ){
            
            if(grid[colIdx][rowidx] == value){
                pdcount++;
            }
            if(grid[colIdx][rowidx] == 0){
                indexpd = [colIdx,rowidx]
            }


        }
        if((colIdx == GRID_LENGTH - rowidx - 1)){
            
            if(grid[colIdx][rowidx] == value){
                sdcount++;
            }
            if(grid[colIdx][rowidx] == 0){
                indexsd = [colIdx,rowidx]
            }
        }
        }
    }
    if(pdcount == GRID_LENGTH -1 ){
        if(indexpd.length>0){
        grid[indexpd[0]][indexpd[1]] = 2;
    return true;
        }
    }
    if(sdcount == GRID_LENGTH -1 ){
        if(indexsd.length>0){
        grid[indexsd[0]][indexsd[1]] = 2;
        return true;
        }
        }
    
        return false;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function checkWinner(turn) {
    let value = turn == 'X'? 1:2;
    let count = 0 , pdcount = 0,sdcount = 0 ;
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if(grid[rowidx][colIdx] == value){
                count++;
            }
        }
        if(count == GRID_LENGTH) {
        return value;
        }
        count = 0;
    }
    count = 0;
    for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++){
        for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++){
            if(grid[rowidx][colIdx] == value){
                count++;
            }
        }
        if(count == GRID_LENGTH) {
            return value;
            }
            count = 0;

    }
    for (let colIdx = 0;colIdx < GRID_LENGTH ; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if((rowidx == colIdx) ){
            if(grid[colIdx][rowidx] == value){
                pdcount++;
            }
        }
        if((colIdx == GRID_LENGTH - rowidx - 1)){
            if(grid[colIdx][rowidx] == value){
                sdcount++;
            }
        }
        }
    }
    if(pdcount == GRID_LENGTH  || sdcount == GRID_LENGTH  ){
    return value;
    }
    return -1;
}

  

initializeGrid();
renderMainGrid();
addClickHandlers();
