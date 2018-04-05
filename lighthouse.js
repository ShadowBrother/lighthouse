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

//lightCell returns the character in the GRID at the specified cell in form A1 - J10
const lightCell = cell =>
{
  
  const Col = cell.substr(0,1);//Grab the Col Letter(first character in the cell arg)
  const Row = cell.substr(1);//Grab the Row number(remaining character/s)
  
  //have to subtract 1 from Row number since GRID starts with index 1, use ColEnum to get index for Col
  return GRID[Row - 1][ColEnum.indexOf(Col)];
};