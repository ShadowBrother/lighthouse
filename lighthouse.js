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

const numRows = () => GRID.length;
const numCols = () => !numRows()? 0 : GRID[0].length;
	
cconst gridSize = () => !numRows()? '0 x 0' : `${numRows()} x ${numCols()}`;
const totalCells = () => !numRows()? 0 : numRows() * numCols();

//Enum for Column names.
const ColEnum = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ROCK = '^';//symbol for rock
const CURRENT = "~";//symbol for Current

//lightCell returns the character in the GRID at the specified cell in form A1 - J10
const lightCell = cell =>
{
  
  const Col = cell.substr(0,1);//Grab the Col Letter(first character in the cell arg)
  const Row = cell.substr(1);//Grab the Row number(remaining character/s)
  
  //have to subtract 1 from Row number since GRID starts with index 1, use ColEnum to get index for Col
  return GRID[Row - 1][ColEnum.indexOf(Col)];
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

//isRock returns "true" if the cell contains a rock("^"), else returns "false"
const isRock = cell => compareCell(cell, ROCK);
//isCurrent returns "true" if the cell contains a current("~"), else returns "false"
const isCurrent = cell => compareCell(cell, CURRENT);

//lightRow returns specified row of GRID
const lightRow = row => GRID[row - 1];

//lightRow returns array of cells in column col
const lightColumn = col => {
  
  const colIndex = ColEnum.indexOf(col);
  let colArray = [];
  for(let row of GRID){
    colArray.push(row[colIndex]);
  }
  //console.log(colArray);
  return colArray;
  
}
//print every row of GRID
const printGridLightRow = () =>{
  console.log("printing Grid from lightRow");
  for(let i = 1 ; i <= GRID.length; i++ ){
    console.log(lightRow(i));
  }
}
//prints the GRID
const printGrid = () => {
  
  console.log("  ABCDEFGHIJ");
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
  
  console.log("  ABCDEFGHIJ");
  let rowStr = "";
  let rowNum ;
  for(let i = 1; i <= GRID.length; i++){
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
  
  console.log("  ABCDEFGHIJ");
  let rowStr = "";
  let rowNum ;
  for(let i = 1; i <= GRID.length; i++){
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

