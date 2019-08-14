const GameBoard = () => {
  const board = ["1", "2", "3", "4", "o", "6", "7", "8", "9"];
  const position = {
    horizontal: {
      top: [board[0], board[1], board[2]].join(''),
      mid: [board[3], board[4], board[5]].join(''),
      low: [board[6], board[7], board[8]].join('')
    },

    vertical: {
      left: [board[0], board[3], board[6]].join(''),
      middle: [board[1], board[4], board[7]].join(''),
      right: [board[2], board[5], board[8]].join('')
    },

    diagonal: {
      oneNine: [board[0], board[4], board[8]].join(''),
      threeSeven: [board[2], board[4], board[6]].join('')
    }
  }
  return {
    board, position
  }
}

const Players = () => {
  const players= [];
  const getPlayers = () => {return players}
  const add = function(player){
    players.push(player)
    return player
  }
  return {
    getPlayers,add
  }
}

const PlayerFactory = (name,mark) => {
  const getPlayerName = () => name;
  const getPlayermark = () => mark;
  return { name ,mark,getPlayerName,getPlayermark};
}

const CheckWin = () => {
  const x = 'xxx';
  const o = 'ooo';
  const horTop = GameRunner.gameBoard.position.horizontal.top;
  const horMid = GameRunner.gameBoard.position.horizontal.mid;
  const horDow = GameRunner.gameBoard.position.horizontal.down;
  const verLeft = GameRunner.gameBoard.position.vertical.left;
  const verMid = GameRunner.gameBoard.position.vertical.mid;
  const verRight = GameRunner.gameBoard.position.vertical.right;
  const diagOne = GameRunner.gameBoard.position.diagonal.oneNine;
  const diagTwo = GameRunner.gameBoard.position.diagonal.threeSeven;

  if( (horTop === x) || (horMid === x) || (horDow === x) || (verLeft === x)|| (verMid === x) || (verRight === x) || (diagOne === x) || (diagTwo === x)){
    console.log('X is the winner')
  }else if ( (horTop === o) || (horMid === o) || (horDow === o) || (verLeft === o)|| (verMid === o) || (verRight === o) || (diagOne === o) || (diagTwo === o) ) {
    console.log("O is the winner")
  } else {
    console.log("no winner yet")
  }
}

const UIController = () => {
  return {    
      playerOneInput: document.querySelector('.nameInput-1'),
      playerTwoInput: document.querySelector('.nameInput-2'),
      cellOne: document.getElementById("cell-1"),
      cellTow: document.getElementById("cell-2"),
      cellThree: document.getElementById("cell-3"),
      cellFour: document.getElementById("cell-4"),
      cellFive: document.getElementById("cell-5"),
      cellSix: document.getElementById("cell-6"),
      cellSeven: document.getElementById("cell-7"),
      cellEight: document.getElementById("cell-8"),
      cellNine: document.getElementById("cell-9"),
      board: document.querySelector('.board'),
      inputDetails: document.querySelector('.player-details')
  }
}

const clickChange = (clickID,i) => {
  let change = document.getElementById(clickID);
  const mark =  GameRunner.currentPlayer().getPlayermark();
 
  if(mark === "X"){
    change.classList.add('color-blue');
  }else if(mark === "O"){    
    change.classList.add('color-red')
  }else {
    change.classList.add('color-red')    
  }  
  change.innerHTML= mark
  GameRunner.gameBoard.board[i] = mark;
  GameRunner.changePlayer();
}
const GameTurn = () => {
  let turn = 0;
  let player = GameRunner.playersList.getPlayers()[turn];
}

const GameRunner = (() => {
  const gameBoard = GameBoard();
  const playersList = Players();
  let index = 0;
  let currentPlayer = () => playersList.getPlayers()[index];;
  const changePlayer = () => {index = index == 1 ? 0 : 1}
  const createPlayers = () => {
    const player1 = playersList.add(PlayerFactory(UIController().playerOneInput.value,"X"));
    const player2 = playersList.add(PlayerFactory(UIController().playerTwoInput.value,"O"));  
    UIController().board.classList.remove('hide');
    const html = `
      <div class="player-1"><span>Player 1: </span><span>${player1.getPlayerName()}</span></div>
      <div class="player-2"><span>Player 2: </span><span>${player2.getPlayerName()}</span></div>
    `
    UIController().inputDetails.innerHTML = html;
    UIController().inputDetails.classList.add("ongoing")
  }

 

  return {playersList,createPlayers,currentPlayer,changePlayer,gameBoard}
})();




document.querySelector("#createP").addEventListener('click', GameRunner.createPlayers)
