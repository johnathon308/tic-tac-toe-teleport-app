import React, { Component } from 'react'
import Board from './Board'

export default class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            isXNext: true,
            stepNumber: 0
        }
    }

    resetGame = () => {
        this.setState({
          history: [{ squares: Array(9).fill(null) }],
          isXNext: true,
          stepNumber: 0,
        });
      };

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currect = history[history.length - 1]
        const squares = currect.squares.slice();

        if (calcuateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isXNext ? 'X' : 'O';

        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            isXNext: !this.state.isXNext,
            stepNumber: history.length,
        },
        () => {
            const winner = calcuateWinner(squares);
            const isDraw = !winner && history.length === 9;
            if (winner || isDraw) {
              this.props.onGameEnd(winner, this.resetGame);
            }
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) == 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calcuateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go To move #' + move : 'Go to Game Start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = `Winner is ${winner}`;
        } else if(history.length === 10) {
            status = "It's a draw!";
        } else {
            status = `Next Player: ${this.state.isXNext ? 'X' : 'O'}`
        }



        return (
            <div className='game'>
                <div className='gamer-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calcuateWinner(squares) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [3, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;

}