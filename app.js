const GameBoard = () => {
  const board = GameRunner.gameBoard;
  const position = {
    horizontal: {
      top: [board[0], board[1], board[2]].join(''),
      mid: [board[3], board[4], board[5]].join(''),
      low: [board[6], board[7], board[8]].join(''),
    },

    vertical: {
      left: [board[0], board[3], board[6]].join(''),
      middle: [board[1], board[4], board[7]].join(''),
      right: [board[2], board[5], board[8]].join(''),
    },

    diagonal: {
      oneNine: [board[0], board[4], board[8]].join(''),
      threeSeven: [board[2], board[4], board[6]].join(''),
    },
  };
  return {
    board, position,
  };
};

const Players = () => {
  const players = [];
  const getPlayers = () => { return players; };
  const add = (player) => {
    players.push(player);
    return player;
  };
  return {
    getPlayers, add,
  };
};

const PlayerFactory = (name, mark) => {
  const getPlayerName = () => name;
  const getPlayermark = () => mark;
  return {
    name, mark, getPlayerName, getPlayermark,
  };
};

const CheckWin = () => {
  const x = 'XXX';
  const o = 'OOO';
  const horTop = GameBoard().position.horizontal.top;
  const horMid = GameBoard().position.horizontal.mid;
  const horDow = GameBoard().position.horizontal.down;
  const verLeft = GameBoard().position.vertical.left;
  const verMid = GameBoard().position.vertical.middle;
  const verRight = GameBoard().position.vertical.right;
  const diagOne = GameBoard().position.diagonal.oneNine;
  const diagTwo = GameBoard().position.diagonal.threeSeven;

  if ((horTop === x) || (horMid === x) || (horDow === x) || (verLeft === x)
  || (verMid === x) || (verRight === x) || (diagOne === x) || (diagTwo === x)) {
    UIController().statusText.innerText = 'player 1 is the winner!!';
    UIController().statusText.classList.add('color-2');
    UIController().cells.forEach((cell) => { cell.removeAttribute('onclick'); });
    UIController().reload.classList.add('show');
    UIController().reload.classList.add('color-2');
    UIController().reload.addEventListener('click', GameRunner.reload);
    return true;
  } if ((horTop === o) || (horMid === o) || (horDow === o) || (verLeft === o)
  || (verMid === o) || (verRight === o) || (diagOne === o) || (diagTwo === o)) {
    UIController().statusText.innerText = 'player 2 is the winner!!';
    UIController().statusText.classList.add('color-1');
    UIController().cells.forEach((cell) => { cell.removeAttribute('onclick'); });
    UIController().reload.classList.add('show');
    UIController().reload.addEventListener('click', GameRunner.reload);
    return true;
  }

  GameRunner.changePlayer();
  UIController().statusText.innerText = `${GameRunner.currentPlayer().name}'s turn`;

  return false;
};

const UIController = () => {
  return {
    playerOneInput: document.querySelector('.nameInput-1'),
    playerTwoInput: document.querySelector('.nameInput-2'),
    board: document.querySelector('.board'),
    inputDetails: document.querySelector('.player-details'),
    cells: document.querySelectorAll('.cell'),
    statusBanner: document.querySelector('.events'),
    statusText: document.querySelector('.status'),
    'player-0': document.querySelector('.player-0'),
    'player-1': document.querySelector('.player-1'),
    reload: document.querySelector('.reload'),
  };
};

const drawBoard = () => {
  const {cells} = UIController();
  let test = []
  GameRunner.gameBoard.forEach((item,index)=>{
    let mark = item === "X" ? item : "---";
    mark = item === "O" ? item : "---";
    test.push(mark)
    cells[index].textContent = mark;
    if (mark === 'X') {
      cells[index].classList.add('color-red');
      cells[index].removeAttribute('onclick');
    } else if (mark === 'O') {    
      cells[index].classList.add('color-blue');
      cells[index].removeAttribute('onclick');
    } 
  });
  console.log(test)
}

const clickChange = (clickID,i) => {
 /* const change = document.getElementById(clickID);
  let mark =  GameRunner.currentPlayer().getPlayermark();

  if (mark === 'X') {
    change.classList.add ('color-red');
  } else if (mark === 'O') {    
    change.classList.add('color-blue');
  } else {
    change.classList.add('color-red');
  } 
  change.innerHTML = mark;
  change.removeAttribute('onclick');*/
  GameRunner.gameBoard[i] = GameRunner.currentPlayer().getPlayermark();
  drawBoard();
  if (!GameRunner.checkWin()) {
    mark = GameRunner.currentPlayer().getPlayermark();
    if (mark === 'X') {
      UIController()['player-0'].classList.add('scale');
      UIController()['player-1'].classList.remove('scale');
    } else {
      UIController()['player-0'].classList.remove('scale');
      UIController()['player-1'].classList.add('scale');
    }
  }
};

const GameRunner = (() => {
  const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const playersList = Players();
  let index = 0;
  const currentPlayer = () => playersList.getPlayers()[index];
  const changePlayer = () => { index = index === 1 ? 0 : 1; };
  const createPlayers = () => {
    const player1 = playersList.add(PlayerFactory(UIController().playerOneInput.value, 'X'));
    const player2 = playersList.add(PlayerFactory(UIController().playerTwoInput.value, 'O'));
    UIController().board.classList.remove('hide');
    const html = `
      <div class="player player-0"><span>Player 1: </span><span>${player1.getPlayerName()}</span></div>
      <div class="player player-1"><span>Player 2: </span><span>${player2.getPlayerName()}</span></div>
    `;
    UIController().inputDetails.innerHTML = html;
    UIController()[`player-${index}`].classList.add('scale');
    UIController().statusBanner.classList.remove('hide');
    UIController().inputDetails.classList.add('ongoing');
    UIController().statusText.innerText = `${player1.getPlayerName()}'s turn`;
  };
  const reload = () => location.reload();
  const checkWin = () => CheckWin();

  return {
    // eslint-disable-next-line comma-dangle
    playersList, createPlayers, currentPlayer, changePlayer, gameBoard, checkWin, reload
  };
})();
document.querySelector('#createP').addEventListener('click', GameRunner.createPlayers);
