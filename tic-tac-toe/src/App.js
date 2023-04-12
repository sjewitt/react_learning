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

function Square( {val,onSquareClick} ){	//from parent Board
	return (
	<button className="square" onClick={onSquareClick}> 
		{val} 
	</button>
	);
}

// export default function Board(){
// function Board(){
// 'onPlay' is the function ref passed from Game()
//export default function Board(){
// function Board(){
{/* params are REACT params - need to be surrounded by curly braces! */}
function Board({xIsNext, squares, onPlay}){	//'lifted' params to Game() function
	//console.log("xIsNext: ",xIsNext);
	//console.log("squares: ",squares);
	//console.log("onPlay: ",onPlay);
	
	//const [xIsNext,setXIsNext] = useState(true);
	//const [squares, setSquares] = useState(Array(9).fill(null));
	//let fish = [null,null,null,null,null,null,null,null];
	//const fish2 = fish.slice();
	//console.log(fish, fish2);
	//function handling the click on a square:
	function handleClick(i){
		//console.log('HANDLECLICK: ',i, squares);

		
		// ensure we don't toggle already-filled squares:
		// note that this returns a winning result AFTER the game has 
		// completed - it will return 
		// only if the game is ALREADY won!
		// but see function call above!
		// if( squares[index] || checkMoveResult(squares) ){
		if( calculateWinner(squares) || squares[i] ){
			return;
		} 
		
		const nextSquares = squares.slice();
		
		if(xIsNext){
			nextSquares[i] = "X";
		} 
		else {
			nextSquares[i] = "0";
		}
		//and flip the boolean:
		//setXIsNext(!xIsNext);

		//setSquares(nextSquares);
		// console.log('calling onPlay')
		onPlay(nextSquares);
		
		// console.log({index});
		// console.log({nextSquares});
	}
	
	// logic to determine whether an X or a O is to be placed next.
	// start with X always...
	// const [xIsNext, setXIsNext] = useState(true);	//now handled by the Game() function
	
	//declare an array of length 9, representing the squares:
	// const [squares, setSquares] = useState(Array(9).fill(null));	//now handled by the Game() function
	
	//check for a winner on each move
	const winner = calculateWinner(squares);	//?
	let status;
	if(winner){
		status = "Winner: " + winner;
	}
	else{
		status = "Next player: " + (xIsNext ? "X" : "0");
	}

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


export default function Game(){
//function Game(){
	// console.log('starting...');
	// set up states for this component:
	//const [xIsNext,setXIsNext] = useState(true);
	// because we know that if even numbered moves, xIsNext === true, we can do this (see 
    // also check later in code)...
	
	// initialise our history with a starting state (all nulls):
	const [history, setHistory] = useState([Array(9).fill(null)]);
	
	
	// we also need to keep track of the move being viewed:
	const [currentMove, setCurrentMove] = useState(0);
	
	// work out xIsNext based on currentMove (even === true):
	const xIsNext = currentMove % 2 === 0;
	
	// now we can calculate the board state from the most recent history item, as long 
	// as it is set BEFORE we use it...
	console.log("in GAME: ",history);
	console.log("len: ",history.length);
	console.log("starting array: ",history[history.length-1]);
	
	// and the currentSquares needs to also account for jumping to a particular game state:
	// const currentSquares = history[history.length-1]
	const currentSquares = history[currentMove];
	
	
	console.log("starting array (currentSquares): ",currentSquares);
	console.log("history (spread-ed)): ",[...history]);
	
	function handlePlay(nextSquares){
		// setHistory([...history, nextSquares]);	//array 'spread' syntax - ALL items, but see below:
		// here, we now reset the history if we jump back to a point in time (from jumpTo(), below)
		const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
		setHistory(nextHistory);
		
		// and set the currentMove state:
		setCurrentMove(nextHistory.length-1);
		
		// setXIsNext(!xIsNext);
	}
	// console.log("GAME: ",history,currentSquares);

	//placeholder for handler to access game state history:
	// nextMove is NOT a React component!
	function jumpTo(nextMove){
		// when this function is called, jump to the specified move index:
		setCurrentMove(nextMove);
		// and work out whether that move was an X or a 0:
		// setXIsNext(nextMove % 2 === 0); //i.e. is it an odd or even numbered move., so we can remove the xIsNext state var!
	}
	
	// use JS map() to translate the history of moves into an array of React components:
	const moves = history.map(
		(squares, move) => {
			let description;
			if(move > 0){
				description = 'Go to move #' + move;
			}
			else{
				description = 'Go to game start';
			};				
			{/* see notes on tutorial: a key needs to be unique for the list scope. In this case, we
				are OK to use the move number because the list will not be changed otherwise.  */}
			return (
				<li key={move}>
					<button onClick={ () => jumpTo(move) }>
						{description}
					</button>
				</li>
			);
		}
	);

	return(
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
			</div>
			<div className="game-info">
				<ol>
					{moves} {/*call the history function to render the move list. Note the use of key*/}
				</ol>
			</div>
		</div>
	);
}




/* take the current state and check if 3-in-a-row, and which player */
function calculateWinner(squares){
	console.log('checking game status...')
	const lines = [
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
	for(let i=0;i<lines.length;i++){
		const [a,b,c] = lines[i];
		if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
			console.log('matched winning line ',i)
			return squares[a]; //will be 'X' or '0'
		}
	}
	//otherwise return null (not a winning line)
	return null;
}


///* come back to this. note the braces arount the nested react value: */
//function get_square(val){
//	return <button className="square">{val}</button>;
//}
//
//function get_row(squares){
//	return <div className="board-row">{squares}</div>
//}