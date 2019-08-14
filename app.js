const GameBoard = () => {
  const board = ["o", "2", "3", "4", "o", "6", "7", "8", "o"];
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

const clickChange = (clickID) => {
  let change = document.getElementById(clickID);
  const mark =  GameRunner.currentPlayer().getPlayermark();

  if(mark === "X"){
    change.classList.add('color-blue');
  }else if(mark === "O"){    
    change.classList.add('color-red')
  }else {
    change.classList.add('color-red')    
  }  
  change.innerHTML= GameRunner.currentPlayer().getPlayermark()
  /* if (mark === "X"){
    GameRunner.currentPlayer = () => GameRunner.playersList.getPlayers()[1]
  }else if(mark === "O"){
    GameRunner.currentPlayer = () => GameRunner.playersList.getPlayers()[0]
  } */
  GameRunner.changePlayer();
}
const GameTurn = () => {
  let turn = 0;
  let player = GameRunner.playersList.getPlayers()[turn];
}

const GameRunner = (() => {
  const playersList = Players();
 
  let currentPlayer = () => playersList.getPlayers()[0];;
  const changePlayer = () => {currentPlayer = () => [...playersList.getPlayers()].filter(e=>e.getPlayermark()==current.getPlayermark())[0]}
  const createPlayers = () => {
    const player1 = playersList.add(PlayerFactory(UIController().playerOneInput.value,"X"));
    const player2 = playersList.add(PlayerFactory(UIController().playerTwoInput.value,"O"));  
    UIController().board.classList.remove('hide');
    const html = `
      <div><span>Player 1 :</span><span>${player1.getPlayerName()}</span></div>
      <div><span>Player 2 :</span><span>${player2.getPlayerName()}</span></div>
    `
    UIController().inputDetails.innerHTML = html;
    UIController().inputDetails.classList.add("ongoing")
  }

 

  return {playersList,createPlayers,currentPlayer,changePlayer}
})();




document.querySelector("#createP").addEventListener('click', GameRunner.createPlayers)
