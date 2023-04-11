/* https://react.dev/learn/tutorial-tic-tac-toe */
/* 
'export' makes this function global 
'default' indicates entry point
returned JSX component must be single-rooted
note how the function call is a tag:
conponents have STATE...
key is PARENT container retains state of childs (the X or O in this case 
for each square). This is LIFTING the state
*/
import {useState} from 'react';



export default function Game(){
	// set up states for tis component:
	const [xIsNext,setXIsNext] = useState(true);
	
	// initialise our history with a starting state (all nulls):
	const [history, setHostory] = useState([Array(9).fill(null)]);
	
	// now we can calculate the board state from the most recent history item, as long 
	// as it is set BEFORE we use it...
	const currentSquares = history[history.length-1]
	
	function handlePlay(nextSquares){
		
	}
	
	return(
		<div className="game">
			<div classname="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
			</div>
			<div className="game-info">
				<ol>
					{/* TODO! */}
				</ol>
			</div>
		</div>
	)
}



// export default function Board(){
// function Board(){
function Board(xIsNext,squares,onPlay){	//'lifted' params to Game() function
	// logic to determine whether an X or a O is to be placed next.
	// start with X always...
	// const [xIsNext, setXIsNext] = useState(true);	//now handled by the Game() function
	
	//declare an array of length 9, representing the squares:
	// const [squares, setSquares] = useState(Array(9).fill(null));	//now handled by the Game() function
	
	//check for a winner on each move
	const winner = checkMoveResult(squares);	//?
	let status;
	if(winner){
		status = "Winner: " + winner;
	}
	else{
		status = "Next player: " + (xIsNext ? "X" : "0");
	}
	
	//function handling the click on a square:
	function handleClick(index){
		const nextSquares = squares.slice();
		
		// ensure we don't toggle already-filled squares:
		// note that this returns a winning result AFTER the game has 
		// completed - it will return 
		// only if the game is ALREADY won!
		// but see function call above!
		if( squares[index] || checkMoveResult(squares) ){
			return;
		} 
		
		if(xIsNext) nextSquares[index] = "X";
		else nextSquares[index] = "0";
		//and flip the boolean:
		setXIsNext(!xIsNext);

		setSquares(nextSquares);
		
		console.log({index});
		console.log({nextSquares});
	};

	return( <>
		<div className="status">{status}</div>
		<div className="board-row">
			{/* here we need to pass the correct index to the handleclick function */}
			<Square val={squares[0]} onSquareClick={function(){handleClick(0)}} />
			{/* or, arrow functions (note this comment syntax.) */}
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

function Square({val,onSquareClick}){	//from parent Board
	return <button className="square" onClick={onSquareClick}>{val}</button>;
}

/* take the current state and check if 3-in-a-row, and which player */
function checkMoveResult(squares){
	console.log('checking game status...')
	const winningLines = [
		[0,1,2], //top row
		[3,4,5], //middle row
		[6,7,8], //bottom row
		[0,3,6], //lh col
		[1,4,7], //middle col
		[2,5,8], //rh col
		[0,4,8], // '\'
		[2,4,6]  // '/'
	];
	console.log(squares)
	for(let i=0;i<winningLines.length;i++){
		const [a,b,c] = winningLines[i];
		if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
			console.log('matched winning line ',i)
			return squares[a]; //will be 'X' or '0'
		}
	}
	//otherwise return null (not a winning line)
	return null;
}


/* come back to this. note the braces arount the nested react value: */
function get_square(val){
	return <button className="square">{val}</button>;
}

function get_row(squares){
	return <div className="board-row">{squares}</div>
}