/* https://react.dev/learn/tutorial-tic-tac-toe */
/* 
'export' makes this function global 
'default' indicates entry point
return JSX component must be single-rooted
note how the function call is a tag:
conponents have STATE...
key is PARENT container retains state of childs (the X or O in this case 
for each square). This is LIFTING the state
*/
import {useState} from 'react';

function Square({val,onSquareClick}){	//from parent Board
	//enable state for this component!!:
//	const [val,setValue] = useState(null);
//	
//	function handleClick(){
//		console.log(val);
//		if(val==='X'){
//			setValue(null);
//		}
//		else{
//			setValue('X');
//		}
//	};
	return <button className="square" onClick={onSquareClick}>{val}</button>;
}

export default function Board(){
	//declare an array of length 9, representing the squares:
	const [squares, setSquares] = useState(Array(9).fill(null));
	
	//function handling the click on a square:
	function handleClick(index){
		const nextSquares = squares.slice();
		if(nextSquares[index] === "X"){
			nextSquares[index] = null;
		}
		else{
			nextSquares[index] = "X";
		}
		setSquares(nextSquares);
	}
	
	return( <>
		<div className="board-row">
			{/* here we need to pass the correct index to the handleclick function */}
			<Square val={squares[0]} onSquareClick={function(){handleClick(0)}} />
			{/* or, arrow functions*/}
			<Square val={squares[1]} onSquareClick={()=>handleClick(1)}  />
			<Square val={squares[2]} onSquareClick={()=>handleClick(2)}  />
		</div>
		<div className="board-row">
			<Square val={squares[3]} onSquareClick={()=>handleClick(3)}  />
			<Square val={squares[4]} onSquareClick={()=>handleClick(4)}  />
			<Square val={squares[5]} onSquareClick={()=>handleClick(5)}  />
		</div>
		<div className="board-row">
			<Square val={squares[6]} onSquareClick={()=>handleClick(6)}  />
			<Square val={squares[7]} onSquareClick={()=>handleClick(7)}  />
			<Square val={squares[8]} onSquareClick={()=>handleClick(8)}  />
		</div>
	</>)
}


/* come back to this. note the braces arount the nested react value: */
//export default function Square() {
export function SquareXXX() {
  //return <button className="square">X</button>;
	//return get_square('y');
	let _out = []
	for(let x=1;x<=9;x++)
	{
		/*  */
		_out.push(get_square(x));
	}
	return <>{_out}</>
}

function get_square(val){
	return <button className="square">{val}</button>;
}

function get_row(squares){
	return <div className="board-row">{squares}</div>
}