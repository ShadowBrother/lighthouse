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
	
const gridSize = () => !GRID.length? '0 x 0' : `${GRID[0].length} x ${GRID.length}`;
const totalCells = () => !GRID.length? 0 : GRID[0].length * GRID.length;

//Enum for Column names.
const ColEnum = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ROCK = '^';//symbol for rock

//lightCell returns the character in the GRID at the specified cell in form A1 - J10
const lightCell = cell =>
{
  
  const Col = cell.substr(0,1);//Grab the Col Letter(first character in the cell arg)
  const Row = cell.substr(1);//Grab the Row number(remaining character/s)
  
  //have to subtract 1 from Row number since GRID starts with index 1, use ColEnum to get index for Col
  return GRID[Row - 1][ColEnum.indexOf(Col)];
};

//isRock returns "true" if the cell contains a rock("^"), else returns "false"
const isRock = cell => { if( lightCell(cell) == "^") return "true"; else return "false";};

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
  for(let i = 1; i <= 10; i++){
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

//prints out the GRID but with all true or false if has Rock, test to make sure isRock is returning correct for every cell
const printIsRock = () => {
  
  console.log("  ABCDEFGHIJ");
  let rowStr = "";
  let rowNum ;
  for(let i = 1; i <= 10; i++){
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

