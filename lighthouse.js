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



//numSurroundSafeCells(cell) returns number of safe cells around cell
const numSurroundSafeCells = cell => {
  
  const neighbors = getAllNeighbors(cell);
  let count = 0 ;
  for (let neighbor of neighbors){
    if(isSafe(neighbor)) count++;
  }
  return count;
  
};

//distressBeacon(cell) takes a cell, and returns a safe cell 1 cell away
const distressBeacon = cell => {
  
  const neighbors = getAllNeighbors(cell);
  let safetyRankings = [];
  for(let neighbor of neighbors){
    
    if(isSafe(neighbor)) safetyRankings.push([neighbor, numSurroundSafeCells(neighbor)]);
    
  }
  //console.log(safetyRankings);
  let sortedRankings = safetyRankings.sort((a,b) => {
      if(a[1] < b[1]) return 1;//want highest number sorted first
      if(a[1] > b[1]) return - 1;
      return 0;
    });
    //console.log(sortedRankings);
    return sortedRankings.shift().shift();//take safest cell
  
};

//setCell(cell, symbol) sets cell to symbol
const setCell = (cell, symbol) => {
  const [col, row] = cellToIndexes(cell);
  GRID[row][col] = symbol;
}
//addRock(cell) sets cell to ROCK("^")
const addRock = cell => setCell(cell, ROCK);

addRock('J9');

//rounding function from //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

function round(number, precision) {
  var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }  
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

//percentageReport() returns array of the total number of open cells, cells with rocks, cells with currents
const percentageReport = () => {
  
  //return [round(allRocks().length/totalCells()*100, 2), round(allCurrents().length/totalCells()*100,2)];
  return [allSymbols("").length, allRocks().length, allCurrents().length];
}

//flattens GRID to one dimensional array
const flattenGrid = () => GRID.reduce((acc, cur) => acc.concat(cur));


//returns the number of safe cells
const safetyReport = () =>  `${round((flattenGrid().map(cell => (cell == "")?1:0).reduce((acc,cur) => acc + cur,0))/totalCells() * 100,1)}%` ;

//calcDistance takes 2 cells and returns the distance between them
const calcDistance = (cell1, cell2) =>{
  
  const [x1, y1] = cellToIndexes(cell1);
  const [x2, y2] = cellToIndexes(cell2);
  
  return round(Math.pow(Math.pow(x2-x1,2) + Math.pow(y2-y1,2),1/2),2);
  
}

//evaluates a route return false if any cells in route are rocks
const evaluateRoute = route => {
  
  //return false if any cells in route are rocks or if there are more than 2 strong currents in route
  if(route.reduce((acc, cur) => { return acc || isRock(cur)}, false)) return false;
    
   
  //return false if more than 2 strong currents in route
  if(route.reduce((acc, cur) =>{return acc + (isCurrent(cur)?1:0)}, 0) > 2) return false;
  return true;
  
  
};

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

