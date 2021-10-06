import React from 'react';
import { Shogi, Piece } from 'shogi.js';
import './App.css';

import { Board } from './Board';
import { Menu } from './Menu';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.shogi = new Shogi();
    this.game = {"names": ["1c_note_test", "coduck_pi2_600MHz_1c"], "sfen": "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1", "moves": ["7g7f", "3c3d", "2g2f", "8c8d", "2f2e", "4a3b", "6i7h", "8d8e", "2e2d", "2c2d", "2h2d", "8e8f", "8g8f", "8b8f", "2d3d", "2b8h+", "7i8h", "5a5b", "B*7g", "8f7f", "P*2b", "2a3c", "2b2a+", "3a4b", "2a1a", "7f2f", "P*2g", "2f2e", "4i3h", "P*8c", "3d3f", "B*4e", "3f8f", "7a8b", "3i2h", "6a7b", "8f1f", "1c1d", "1f1d", "P*2f", "2g2f", "2e2f", "P*2g", "2f7f", "1a2a", "P*1b", "L*2d", "7f7d", "4g4f", "4e3d", "2a2b", "3b3a", "2b3a", "4b3a", "P*7e", "7d7e", "2d2a+", "7e7d", "2a3a", "5b6b", "1d2d", "P*2c", "2d1d", "9c9d", "1d1b+", "P*3b", "1b3b", "6b7a", "3b4a", "7a6b", "G*6a"], "win": "b"}
    this.sfen_history = [this.game["sfen"]];
    this.move = 0;
  }

  /**
   * 
   * "7g7f" -> {from: [2, 2], to: [2, 3], promote: false}
   * 
   * @param {string} csa_string 
   */
   parse_csa_move(csa_string) {
    let letter_to_num = { "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8, "i": 9 }
    let drop = csa_string[1] === "*" ? true : false;
    let start_x = drop ? csa_string[0] : Number(csa_string[0]);
    let start_y = Number(letter_to_num[csa_string[1]]); 
    let end_x = Number(csa_string[2]); 
    let end_y = Number(letter_to_num[csa_string[3]]); 
    let promote = csa_string.length === 5;

    let move = {
      from: [start_x, start_y], 
      to: [end_x, end_y],
      drop: drop,
      promote: promote
    }

    return move;
  }

  make_move(move) {
    console.log(move);
    const kind = {
      P: "FU",
      L: "KY", 
      N: "KE",
      S: "GI",
      G: "KI",
      B: "KA",
      R: "HI",
      K: "OU",
    }
    if (move["drop"]) {
      this.shogi.drop(move["to"][0], move["to"][1], kind[move["from"][0]]);
    } else {
      this.shogi.move(move["from"][0], move["from"][1], move["to"][0], move["to"][1], move["promote"]);
    }
  }

  move_back() {
    if (this.move > 0) {
      this.move--;
      this.shogi.initializeFromSFENString(this.sfen_history[this.move]);
      this.setState({s: 3});

    }
  }

  move_forward() {
    if (this.game.moves.length < this.move) {
      return;
    }
    
    if (this.sfen_history.length <= this.move + 1) {
      this.make_move(this.parse_csa_move(this.game["moves"][this.move]));
      this.sfen_history.push(this.shogi.toSFENString());
    } else {
      this.shogi.initializeFromSFENString(this.sfen_history[this.move+1]);
    }

    this.move++; 
    this.setState({s: 3});
  }

  render() {
    return (
      <div className="app">
        <Board shogi={this.shogi}></Board>
        <br></br><br></br>
        <div>
          <button onClick={() => this.move_back()}>&#8592;</button>     
          <button>{this.move}</button>   
          <button onClick={() => this.move_forward()}>&#8594;</button>
        </div>
      </div>
    );
  }
  
}


export default App;
