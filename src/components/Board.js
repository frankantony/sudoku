import React from 'react';
import Square from './Square';
import '../game/Game.css';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: props.squares,
            loading: props.loading,
        }
    }

    renderSquare(i) {
        const squares = this.state.squares;
        const paused = this.props.paused;
        return (
            <Square
                key={i}
                value={squares[i].value}
                blocked = {squares[i].blocked}
                paused = {paused}
                isInitValue={squares[i].isInitValue}
                remainsMove = {squares[i].remainsMove}
                square={i}
                error={squares[i].error}
                onChange={(e, k) => this.props.onChange(e, k)}
            />
        )

    }

    renderRow(i) {
        let rows = []
        for (let k = 0; k < 9; k++) {
            rows.push(this.renderSquare(i * 9 + k));
        }
        return rows;
    }

    render() {
        let boardPrint = [];
        if (!this.state.loading) {
            for (let i = 0; i < 9; i++) {
                boardPrint.push(<div key={i} className="board-row">{this.renderRow(i)}</div>);
            }
        }
        return (
            <div>
                {boardPrint}
            </div>
        );

    }
}

export default Board;