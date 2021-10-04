import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Shogi } from 'shogi.js';


export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.selected = false;  
    this.selectedPiece = null;
    this.selectedPosition = [0, 0];
    // this.props.shogi.initializeFromSFENString("8l/1l+R2P3/p2pBG1pp/kps1p4/Nn1P2G2/P1P1P2PP/1PS6/1KSG3+r1/LN2+p3L w Sbgn3p 124");
  }

  handleClick(x, y) {
    console.log(x, y);
    if (this.selected) {
      try {
        this.props.shogi.move(this.selectedPosition[0]+1, this.selectedPosition[1]+1, x+1, y+1);
      } catch (e) {
        this.selectedPiece = null;
      }
    } else {
      this.selectedPosition = [x, y];
      this.selectedPiece = this.props.shogi.board[x][y];
    }
    this.selected = !this.selected;
    this.setState({selected: !this.selected}); 
    super.setState();
  }

  /**
   * Returns the Japanese symbol of the piece
   * @param {Piece} piece 
   */
  getSymbol(piece) {
    let name = piece.kind;
    let symbol;
    switch (name) {
      case "KY": symbol = "香"; break;
      case "KE": symbol = "桂"; break;
      case "GI": symbol = "銀"; break;
      case "KI": symbol = "金"; break;
      case "OU": symbol = "玉"; break;
      case "HI": symbol = "飛"; break;
      case "KA": symbol = "角"; break;
      case "FU": symbol = "歩"; break;
      case "TO": symbol = "と"; break;
      case "NY": symbol = "杏"; break;
      case "NK": symbol = "圭"; break;
      case "NG": symbol = "全"; break;
      case "UM": symbol = "馬"; break;
      case "RY": symbol = "竜"; break;

      default:
        break;
    }

    return symbol;
  }

  render() {
    return (
      <div>
        <div className="board-area">
          <div className="hand-gote">
            &#9651; 
            {
              this.props.shogi.hands[1].map((piece, i) => {
                return <div className="hand-square">{this.getSymbol(piece)}</div>
              })
            }
          </div>
          <div>&nbsp;</div>
          <div className="board">
            {
              this.props.shogi.board.map((row, j) => {
                return <div className="board-row"> 
                        {row.map((cell, i) => {
                        return <Cell 
                                rotate={this.props.shogi.board[8-i][j] ? (this.props.shogi.board[8-i][j].color === 1 ? true : false) : false}
                                key={[j,i]} 
                                value={this.props.shogi.board[8-i][j] ? this.getSymbol(this.props.shogi.board[8-i][j]) : " "} 
                                onClick={() => this.handleClick(8-i, j)}
                              >
                              </Cell>;
                        })}
                      </div>})
            }
          </div>
          <div>&nbsp;</div>
          <div className="hand-sente">
            &#9650; 
            {
              this.props.shogi.hands[0].map((piece, i) => {
                return <div className="hand-square">{this.getSymbol(piece)}</div>
              })
            }
          </div>
        </div>
        <br></br><br></br>
        <div className="turn-manager">
          <button>{this.props.shogi.turn ? "P2" : "P1"}</button>
        </div>
      </div>
    );
  }
}

class Cell extends React.Component {
  render() {
    return (
      <button 
        className={this.props.rotate ? "square gote" : "square"}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}