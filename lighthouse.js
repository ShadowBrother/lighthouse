const GRID = [
      ["", "", "", "^", "", "", "", "", "", ""],
      ["", "", "", "", "~", "", "", "", "", ""],
      ["", "", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "^", "~", "~", "", "", "", "^", "", ""],
      ["", "^", "", "~", "~", "", "", "", "", ""],
      ["", "^", "", "", "~", "~", "", "", "", ""],
    ];


/*const GRID = [
      ["^", "", "", "^", "", "", "", "", "", ""],
      ["", "", "^", "", "~", "", "", "", "", ""]];
*/
const numRows = () => GRID.length;
const numCols = () => !numRows()? 0 : GRID[0].length;
  
const gridSize = () => !numRows()? '0 x 0' : `${numCols()} x ${numRows()}`;
const totalCells = () => !numRows()? 0 : numCols() * numRows();

console.log("Col,Row: ",numCols(),numRows());
console.log("WxH: ",gridSize());

//Enum for Column names.
let ColEnum = [];
for(let i = 0, len = numCols(); i < len; i++){
  ColEnum.push(String.fromCharCode(65 + i));//65 is A
}

//const ColEnum = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];


const ROCK = '^';//symbol for rock
const CURRENT = "~";//symbol for Current

//splitCell takes cell in 'A1' form, returns array [A,1]
const splitCell = cell => [cell.substr(0,1),cell.substr(1)];

//converts cell row number to GRID index
const rowToIndex = row => row - 1;
//converts cell col letter to GRID index
const colToIndex = col => ColEnum.indexOf(col);

//convert row index to row name
const indexToRow = row => row + 1;
//convert col index to col name
const indexToCol = col => ColEnum[col] ;

//convert cell to indexes ex. 'A1' => [0,0]
const cellToIndexes = cell => {
  const [col,row] = splitCell(cell) ;
  return [colToIndex(col), rowToIndex(row)];
}
//convert col,row indexes to cell name
const indexesToCell = colRowArray => `${indexToCol(colRowArray[0])}${indexToRow(colRowArray[1])}`;


//lightCell returns the character in the GRID at the specified cell in form A1 - J10
const lightCell = cell =>
{
  
  //const Col = cell.substr(0,1);//Grab the Col Letter(first character in the cell arg)
  //const Row = cell.substr(1);//Grab the Row number(remaining character/s)
  
  const [col, row] = cellToIndexes(cell);
  
  if( col == -1) return false;//if col is not in ColEnum, it must be an invalid column letter
  if(row < 0 || row >= numRows() ) return false;//make sure row is within bounds
  
  
  return GRID[row][col];
};

//compares cell to a character, returns true or false
const compareCell = (cell, symbol) => 
{
  
  const cellContent = lightCell(cell);
  //console.log(cell);
  //console.log(cellContent, symbol);
  if(cellContent == symbol)
  {
    return true;
  }
  else
    {
      return false;
    }
  
}

//isRock returns true if the cell contains a rock("^"), else returns false
const isRock = cell => compareCell(cell, ROCK);
//isCurrent returns true if the cell contains a current("~"), else returns false
const isCurrent = cell => compareCell(cell, CURRENT);
//isSage returns true if there is no rock or current in the given cell, else returns false
const isSafe = cell => !isRock(cell) && !isCurrent(cell) ;
//lightRow returns specified row of GRID
const lightRow = row => GRID[rowToIndex(row)];

//lightRow returns array of cells in column col
const lightColumn = col => {
  
  const colIndex = colToIndex(col);
  let colArray = [];
  for(let row of GRID){
    colArray.push(row[colIndex]);
  }
  //console.log(colArray);
  return colArray;
  
};

//allSymbols(symbol) returns an array of all cells that contain given symbol
const allSymbols = (symbol) =>{
  let result = [];
  for(let i = 0 ; i < numRows(); i++ ){
    for(let j = 0; j < numCols(); j++){
      let cell = indexesToCell([j,i]);
      //console.log(cell);
      //console.log(isRock(cell));
      if(compareCell(cell, symbol)){
        //console.log(`${cell} is ${symbol}`);
        result.push(cell);
      }
    }
  }
  return result;
};

//allRocks returns an array of all cells containing rocks
const allRocks = () => allSymbols(ROCK);
//allCurrents returns an array of all cells containing currents
const allCurrents = () => allSymbols(CURRENT);
//firstRock returns the first rock in the GRID or undefined if no rocks
const firstRock = () => allRocks().shift();
//firstCurrent returns the first current in the GRID or undefined if no currents
const firstCurrent = () => allCurrents().shift();

//getOrthogonalNeighbors(cell) returns an array of all cells orthogonally adjacent to cell
const getOrthogonalNeighbors = cell => {
  
  let neighbors = [] ;
  let [col, row] = cellToIndexes(cell);
  //above
  if(row > 0) neighbors.push(indexesToCell([col,row - 1]));
  //below
  if(row < numRows() - 1) neighbors.push(indexesToCell([col, row + 1]));
  //left
  if(col > 0) neighbors.push(indexesToCell([col - 1, row]));
  //right
  if(col < numCols() - 1) neighbors.push(indexesToCell([col + 1, row]));
  
  return neighbors;
                             
  
};

console.log(getOrthogonalNeighbors('E4'));

//getDiagonalNeighbors(cell) returns an array of cells diagonally adjacent to cell
const getDiagonalNeighbors = cell => {
  
  let neighbors = [] ;
  let [col, row] = cellToIndexes(cell) ;
  
  //above, left
  if((row > 0) && (col > 0)) neighbors.push(indexesToCell([col - 1, row - 1]));
  //above, right
  if((row > 0) && (col < numCols() - 1)) neighbors.push(indexesToCell([col + 1, row - 1]));
  //below, right
  if((row < numRows() - 1) && (col < numCols() - 1)) neighbors.push(indexesToCell([col + 1, row + 1]));
  //below,left
  if((row < numRows() - 1) && (col > 0)) neighbors.push(indexesToCell([col - 1, row + 1]));
  
  return neighbors;
  
};

console.log(getDiagonalNeighbors('E4'));

//getAllNeighbors returns an array of cells orthogonally and diagonally adjacent to cellToIndexes
const getAllNeighbors = cell => getDiagonalNeighbors(cell).concat(getOrthogonalNeighbors(cell));

console.log(getAllNeighbors('E4'));

//isDangerous(cell) returns true if there is a rock or a strong current in it, OR in the cells immediately above, below, left, or right of it.
const isDangerous = cell => {
  
  const neighbors = getOrthogonalNeighbors(cell) ;
  
  //test if cell is safe, if not return true
  if(!isSafe(cell)) return true ;
  //cell is safe, but need to check neighboring cells
  for(let neighbor of neighbors){
    if(!isSafe(neighbor)) return true;//if any neighboring cell is not safe, return true
  }
  return false;//neither the cell, nor any of it's orthogonal neighbors are dangerous
  
}

console.log("isDangerous('E4')[true]: ", isDangerous('E4'));
console.log("isDangerous('B9')[true]: ", isDangerous('B9'));
console.log("isDangerous('I6')[false]: ", isDangerous('I6'));

//print every row of GRID
const printGridLightRow = () =>{
  console.log("printing Grid from lightRow");
  for(let i = 1, len = numRows() ; i <= len; i++ ){
    console.log(lightRow(i));
  }
}
//prints the GRID
const printGrid = () => {
  
  console.log("  " + ColEnum.join(''));
  let rowStr = "";
  let rowNum ;
  for(let row in GRID){
    rowNum = parseInt(row, 10) + 1;
    rowStr  = (rowNum < 10)? " " + rowNum : rowNum  ;
    for (let cell of GRID[row]){
      rowStr+= cell? cell : ' ';
    }
    console.log(rowStr);
    
  }
};
printGrid();

//prints GRID but by using the lightCell function, test to make sure lightCell is returning every cell in grid correctly
const printGridLightCell = () => {
  
  console.log("  " + ColEnum.join(''));
  let rowStr = "";
  let rowNum ;
  for(let i = 1, len = numRows(); i <= len; i++){
    rowNum = i;
    rowStr  = rowNum.toString()  ;
    for (let col of ColEnum){
      //console.log(col + rowNum);
      let cell = lightCell(col + rowNum);
      rowStr+= cell? cell : " ";
      //console.log(lightCell(col + rowNum.toString()));
    }
    console.log(rowStr);
    
  }
};
printGridLightCell();

//prints all Columns in GRID using lightCol
const printAllLightCol = () => {
  console.log("print all columns");
  for(let col of ColEnum){
    
    console.log(col, lightColumn(col));
  }
  
}

//prints out the GRID but with all true or false if has Rock, test to make sure isRock is returning correct for every cell
const printIsRock = () => {
  
  console.log("  " + ColEnum.join(''));
  let rowStr = "";
  let rowNum ;
  for(let i = 1, len = numRows(); i <= len; i++){
    rowNum = i;
    rowStr  = rowNum.toString()  ;
    for (let col of ColEnum){
      //console.log(col + rowNum);
      let isrock = isRock(col + rowNum);
      rowStr+= isrock;
    }
    console.log(rowStr);
    
  }
};
printIsRock();

