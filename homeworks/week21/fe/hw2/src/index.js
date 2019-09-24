import React, { Component } from "react";
import ReactDOM from "react-dom";
import Moves from './components/move';
import Board from './components/board';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';


class Game extends Component {
  constructor(props) {
    super(props);
    this.rowNum = 15;
    this.rowSize = 30;

    this.state = {
      history: [
        {
          squares: Array(this.rowNum * this.rowNum).fill(null)
        }
      ],
      blackIsNext: true,
      stepNumber: 0,
      winner: null
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }

    squares[i] = this.state.blackIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      blackIsNext: !this.state.blackIsNext,
      winner: calculateWinner(squares, i, this.rowNum)
    });
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      blackIsNext: step % 2 === 0,
      winner: null
    });
  }

  render() {
    const { stepNumber, winner, blackIsNext } = this.state;
    const history = this.state.history;
    const current = history[stepNumber];
    const theme = winner && (winner === 'X' ? 'win win--black' : 'win win--white');

    return (
      <main className={`main ${theme}`}>
        <Moves
          term={blackIsNext}
          history={history.slice(0, stepNumber)}
          jumpTo={this.jumpTo}
          winner={winner}
        />
        <div className="game" >
          <div className="game-board">
            <Board
              rowSize={this.rowSize}
              rowNum={this.rowNum}
              squares={current.squares}
              blackIsNext={blackIsNext}
              onClick={i => this.handleClick(i)}
            />
          </div>
        </div>
      </main >
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares, i, num) {
  const target = squares[i];

  // => 初始查找位置
  function getStartPosition(type) {
    switch (type) {
      case 'row':
        return [1, -1];
      case 'column':
        return [num, num * -1];
      case 'slash':
        return [num - 1, (num - 1) * -1];
      case 'backslash':
        return [num + 1, (num + 1) * -1];
    }
  }

  // => 計算查找步數
  function countStep(n, init, type) {
    const [startForward, startBack] = getStartPosition(type);
    // 第一次查找，用初始值
    if (n === 0) {
      n = init ? startForward : startBack;
      init = init ? !init : init;
      return [n, init];
    }

    // 之後的查找位置，遞增或遞減初始值
    n > 0 ? n += startForward : n += startBack;
    return [n, init];
  }

  // => 查找該方向有多少同樣的棋子
  function countCredit(type, init, n, credit, end) {
    while (end < 2 && credit < 5) {
      [n, init] = countStep(n, init, type);
      const targetSquare = squares[i + n];

      if (targetSquare && squares[i] === targetSquare) {
        credit++;
      } else {
        end++;
      }
      // 碰到牆就往反方向找
      if (end >= 1 && n >= 1) n = 0;
    }

    return credit;
  }

  // => 檢查結果
  function getResult(credit) {
    if (credit < 4) return null;
    return (target === 'X') ? 'X' : 'O';
  };

  const direction = ['row', 'column', 'slash', 'backslash'];
  const result = direction.find(type => (
    getResult(countCredit(type, true, 0, 0, 0)))
  );
  return result ? target : null;
}
