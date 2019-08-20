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
  const { position } = GameBoard();
  const { statusText } = UIController();
  const { currentPlayer } = GameRunner;
  const x = 'XXX';
  const o = 'OOO';
  const horTop = position.horizontal.top;
  const horMid = position.horizontal.mid;
  const horDow = position.horizontal.down;
  const verLeft = position.vertical.left;
  const verMid = position.vertical.middle;
  const verRight = position.vertical.right;
  const diagOne = position.diagonal.oneNine;
  const diagTwo = position.diagonal.threeSeven;
  let result = false;
  if ((horTop === x) || (horMid === x) || (horDow === x) || (verLeft === x)
  || (verMid === x) || (verRight === x) || (diagOne === x) || (diagTwo === x)) {
    handleStatus(1);
    result = true;
  } else if ((horTop === o) || (horMid === o) || (horDow === o) || (verLeft === o)
  || (verMid === o) || (verRight === o) || (diagOne === o) || (diagTwo === o)) {
    handleStatus(2);
    result = true;
  } else if (GameRunner.gameBoard.every((cell) => typeof cell === 'string')) {
    handleStatus(-1);
    result = true;
  } else {
    GameRunner.changePlayer();
    statusText.innerText = `${currentPlayer().name}'s turn`;
  }
  return result;
};

const handleStatus = (condition) => {
  const { statusText, cells, reload } = UIController();
  if (condition === 1) {
    statusText.innerText = 'player 1 is the winner!!';
    statusText.classList.add('color-2');
    cells.forEach((cell) => { cell.removeAttribute('onclick'); });
    reload.classList.add('show');
    reload.classList.add('color-2');
    reload.addEventListener('click', GameRunner.reload);
  } else if (condition === 2) {
    statusText.innerText = 'player 2 is the winner!!';
    statusText.classList.add('color-1');
    cells.forEach((cell) => { cell.removeAttribute('onclick'); });
    reload.classList.add('show');
    reload.addEventListener('click', GameRunner.reload);
  } else {
    statusText.innerText = 'It"s a draw!!';
    statusText.classList.add('color-3');
    cells.forEach((cell) => { cell.removeAttribute('onclick'); });
    reload.classList.add('show');
    reload.addEventListener('click', GameRunner.reload);
  }
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
  const { currentPlayer } = GameRunner;
  const { cells } = UIController();
  const { gameBoard } = GameRunner;
  const { 'player-0': player1, 'player-1': player2 } = UIController();
  gameBoard.forEach((item,index) => {
    const mark = item === 'X' || item === 'O' ? item : '---';
    cells[index].textContent = mark;
    if (mark === 'X') {
      cells[index].classList.add('color-red');
      cells[index].removeAttribute('onclick');
    } else if (mark === 'O') {    
      cells[index].classList.add('color-blue');
      cells[index].removeAttribute('onclick');
    }
  });

  if (!GameRunner.checkWin()) {
    const mark = currentPlayer().getPlayermark();
    if (mark === 'X') {
      player1.classList.add('scale');
      player2.classList.remove('scale');
    } else {
      player1.classList.remove('scale');
      player2.classList.add('scale');
    }
  }
};

const clickChange = (i) => {
  GameRunner.gameBoard[i] = GameRunner.currentPlayer().getPlayermark();  
  drawBoard();
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
