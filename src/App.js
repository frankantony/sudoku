import React from 'react';
import './App.css';
import Board from './Board';
import {
  generateInitialBoard, checkConflictsLine,
  checkConflictsColumn, checkConflictsBlock
} from './Util.js';

const initialBoard = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(81).fill(0),
      loading: true,
      remainingMoves: 0,
    }
  }

  //Initialize the board.
  componentDidMount() {

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

    if (isNaN(inputValue)) {
      e.target.value = "";
      return null;
    }
    if (inputValue.length > 1) {
      e.target.value = inputValue.charAt(inputValue.length - 1);
    }

    // Check if the new input is not repeated in the board.
    currentsquares[0].squares[i].value = e.target.value;
    if (!checkConflictsLine(currentsquares[0].squares, currentsquares[0].squares[i])) {
      errorMessage = true;
    }
    if (!checkConflictsColumn(currentsquares[0].squares, currentsquares[0].squares[i])) {
      errorMessage = true;
    }
    if (!checkConflictsBlock(currentsquares[0].squares, currentsquares[0].squares[i])) {
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
    currentsquares[0].squares[i].error = errorMessage;

    this.setState({
      history: history.concat({ squares: currentsquares[0].squares }),
      remainingMoves: remainingMoves,
    });
  }

  render() {
    const squares = this.state.squares;
    const remainingMoves = this.state.remainingMoves;

    return (
      <div>
        <div className="game-info">
          <div>{(remainingMoves === 0) ?
            "You Won!!!" :
            ""
          }
          </div>
          <ol>Remains  {remainingMoves} steps for to conclude the game!</ol>
        </div>

        <div className="game">
          <div className="game-board">
            {this.state.loading ?
              ("loading...") :
              (<Board
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

export default App;