import React from 'react';
import './Game.css';
import Board from '../components/Board';

import {
  generateInitialBoard, checkConflictsLine,
  checkConflictsColumn, checkConflictsBlock, updateAtribute, difficultyClick
} from '../utils/Util.js';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(81).fill(''),
      loading: true,
      remainingMoves: 0,
    }
  }

  //Initialize the board.
  componentDidMount() {
    console.log('initialing...');
    const level = this.props.level;
    const initialBoard = difficultyClick(level);
    
    const squares = generateInitialBoard(initialBoard);

    let initials = 0;

    //Calculate the amount of initials squares.
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].isInitValue)
        initials++;
    }

    this.setState({
      squares: squares,
      loading: false,
      remainingMoves: 81 - initials,
      history: [{
        squares,
      }],
    });
  }

  handleClick(e, i) {
    let inputValue = e.target.value;
    let remainingMoves = this.state.remainingMoves;
    let errorMessage = false;

    const history = this.state.history.slice();
    const currentsquares = history.slice(history.length - 1);

    //Initialize the parameters
    for (let k = 0; k < currentsquares[0].squares.length; k++) {
      currentsquares[0].squares[k].error = false;
      currentsquares[0].squares[k].blocked = false;
    }

    let lastDigitedNumber = inputValue.charAt(inputValue.length - 1);

    if (isNaN(inputValue)) {
      e.target.value = "";
      return null;
    }

    if (inputValue.length > 1) {
      e.target.value = lastDigitedNumber;
      remainingMoves++;
    }

    currentsquares[0].squares[i].value = e.target.value;

    // Check if the new input is not repeated in the board.
    let lineConflict = checkConflictsLine(currentsquares[0].squares, currentsquares[0].squares[i]);
    let columnConflict = checkConflictsColumn(currentsquares[0].squares, currentsquares[0].squares[i]);
    let blockConflict = checkConflictsBlock(currentsquares[0].squares, currentsquares[0].squares[i])

    if (lineConflict !== -1) {
      errorMessage = true;
    }
    if (columnConflict !== -1) {
      errorMessage = true;
    }
    if (blockConflict !== -1) {
      errorMessage = true;
    }

    //Calculates how many moves remains to finish the game.
    if (e.target.value.length > 0) {
      remainingMoves--;
    }

    if (e.target.value === "") {
      remainingMoves++;
      errorMessage = false;
    }

    //Error when to digit the zero number.
    if (e.target.value === '0')
      errorMessage = true;

    currentsquares[0].squares[i].error = errorMessage;

    if (errorMessage) {
      updateAtribute(currentsquares[0].squares, i, true);

      if (lineConflict !== -1)
        currentsquares[0].squares[lineConflict].error = errorMessage;
      if (columnConflict !== -1)
        currentsquares[0].squares[columnConflict].error = errorMessage;
      if (blockConflict !== -1)
        currentsquares[0].squares[blockConflict].error = errorMessage;
    }

    this.setState({
      history: history.concat({ squares: currentsquares[0].squares }),
      remainingMoves: remainingMoves,
    });
  }

  render() {
    const squares = this.state.squares;
    const remainingMoves = this.state.remainingMoves;
    const paused = this.props.paused;

    return (
      <div>
        <div className="game-info">
          <div>{(remainingMoves === 0) ?
            "You Won!!!" :
            (paused ? <h2 className='paused'> Paused!!</h2> :
              <ol>Remains  {remainingMoves} steps for to conclude the game!</ol>)
          }
          </div>
        </div>

        <div className="game">
          <div className="game-board">
            {this.state.loading ?
              ("loading...") :
              (<Board
                paused={paused}
                squares={squares}
                onChange={(e, i) => this.handleClick(e, i)}
              />)
            }
          </div>
        </div>
      </div>
    );
  }

}

export default Game;