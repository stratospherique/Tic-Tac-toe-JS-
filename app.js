const PlayerFactory = (name, mark) => {
  const placeMarker = (index) => {
    GameBoard.board[index] = mark;
  };
  return {
    name, mark, placeMarker,
  };
};

const GameBoard = (() => {
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const position = () => ({
    top: [board[0], board[1], board[2]].join(''),
    mid: [board[3], board[4], board[5]].join(''),
    low: [board[6], board[7], board[8]].join(''),
    left: [board[0], board[3], board[6]].join(''),
    middle: [board[1], board[4], board[7]].join(''),
    right: [board[2], board[5], board[8]].join(''),
    oneNine: [board[0], board[4], board[8]].join(''),
    threeSeven: [board[2], board[4], board[6]].join(''),
  }
  );

  const CheckWin = () => {
    const { statusText } = UIController.getDOM();
    const { currentPlayer, changePlayer } = GameRunner;
    const { handleStatus } = UIController;
    const x = 'XXX';
    const o = 'OOO';
    const {
      top: horTop, mid: horMid, down: horDow, left: verLeft,
      middle: verMid, right: verRight, oneNine: diagOne, threeSeven: diagTwo,
    } = position();
    let result = false;
    if ((horTop === x) || (horMid === x) || (horDow === x) || (verLeft === x)
    || (verMid === x) || (verRight === x) || (diagOne === x) || (diagTwo === x)) {
      handleStatus(1);
      result = true;
    } else if ((horTop === o) || (horMid === o) || (horDow === o) || (verLeft === o)
    || (verMid === o) || (verRight === o) || (diagOne === o) || (diagTwo === o)) {
      handleStatus(2);
      result = true;
    } else if (board.every((cell) => typeof cell === 'string')) {
      handleStatus(-1);
      result = true;
    } else {
      changePlayer();
      statusText.innerText = `${currentPlayer().name}'s turn`;
    }
    return result;
  };

  return {
    board, position, CheckWin,
  };
})();

const UIController = (() => {
  const drawBoard = () => {
    const { cells } = UIController.getDOM();
    const { checkWin, currentPlayer } = GameRunner;
    const { 'player-0': player1, 'player-1': player2 } = UIController.getDOM();
    GameBoard.board.forEach((item, index) => {
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
    if (!checkWin()) {
      const { mark } = currentPlayer();
      if (mark === 'X') {
        player1.classList.add('scale');
        player2.classList.remove('scale');
      } else {
        player1.classList.remove('scale');
        player2.classList.add('scale');
      }
    }
  };
  const getDOM = () => ({
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
  });
  const handleStatus = (condition) => {
    const { statusText, cells, reload } = UIController.getDOM();
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
  return {
    getDOM,
    drawBoard,
    handleStatus,
  };
})();

const GameRunner = (() => {
  const {
    inputDetails, board, statusBanner, statusText, playerOneInput, playerTwoInput,
  } = UIController.getDOM();
  const { CheckWin } = GameBoard;
  const { board: gameBoard } = GameBoard;
  const playersList = [];
  let index = 0;
  const currentPlayer = () => playersList[index];
  const changePlayer = () => { index = index === 1 ? 0 : 1; };
  const createPlayers = () => {
    playersList.push(PlayerFactory(playerOneInput.value, 'X'));
    playersList.push(PlayerFactory(playerTwoInput.value, 'O'));
    board.classList.remove('hide');
    const html = `
      <div class="player player-0"><span>Player 1: </span><span>${playersList[0].name}</span></div>
      <div class="player player-1"><span>Player 2: </span><span>${playersList[1].name}</span></div>
    `;
    inputDetails.innerHTML = html;
    UIController.getDOM()[`player-${index}`].classList.add('scale');
    statusBanner.classList.remove('hide');
    inputDetails.classList.add('ongoing');
    statusText.innerText = `${playersList[0].name}'s turn`;
  };
  const reload = () => location.reload();
  const checkWin = () => CheckWin();

  const clickChange = (i) => {
    currentPlayer().placeMarker(i);
    UIController.drawBoard();
  };

  return {
    playersList,
    createPlayers,
    currentPlayer,
    changePlayer,
    gameBoard,
    checkWin,
    reload,
    clickChange,
  };
})();

document.querySelector('#createP').addEventListener('click', GameRunner.createPlayers);
