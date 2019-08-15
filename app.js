const GameBoard = () => {
  const board = GameRunner.gameBoard;
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
  const x = 'XXX';
  const o = 'OOO';
  const horTop = GameBoard().position.horizontal.top;
  const horMid = GameBoard().position.horizontal.mid;
  const horDow = GameBoard().position.horizontal.down;
  const verLeft = GameBoard().position.vertical.left;
  const verMid = GameBoard().position.vertical.mid;
  const verRight = GameBoard().position.vertical.right;
  const diagOne = GameBoard().position.diagonal.oneNine;
  const diagTwo = GameBoard().position.diagonal.threeSeven;

  if( (horTop === x) || (horMid === x) || (horDow === x) || (verLeft === x)|| (verMid === x) || (verRight === x) || (diagOne === x) || (diagTwo === x)){
    console.log('X is the winner')
    UIController().cells.
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
      inputDetails: document.querySelector('.player-details'),
      cells: document.querySelectorAll('.cell')
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
  GameRunner.gameBoard[i] = mark;
  GameRunner.changePlayer();
  GameRunner.checkWin();
}
const GameTurn = () => {
  let turn = 0;
  let player = GameRunner.playersList.getPlayers()[turn];
}

const GameRunner = (() => {
  const gameBoard = [1,2,3,4,5,6,7,8,9];
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
  const checkWin = () => CheckWin(); 

  return {playersList,createPlayers,currentPlayer,changePlayer,gameBoard,checkWin}
})();




document.querySelector("#createP").addEventListener('click', GameRunner.createPlayers)
