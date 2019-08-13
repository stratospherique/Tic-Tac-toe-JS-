const GameBoard = () => {
  return {
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
}

const Players = () => {
  const players= [];
  const add = function(player){
    players.push(player)
  }
  return {
    players,add
  }
}

const PlayerFacory = (name) => {
  const mark = "";
  return { name ,mark};
}

const GameFinish = () => {
    const horizontal = {
      top: [GameBoard().board[0], GameBoard().board[1], GameBoard().board[2]],
      mid: [GameBoard().board[3], GameBoard().board[4], GameBoard().board[5]],
      low: [GameBoard().board[6], GameBoard().board[7], GameBoard().board[8]]
    }

    const vertical = {
      left: [GameBoard().board[0], GameBoard().board[3], GameBoard().board[6]],
      middle: [GameBoard().board[1], GameBoard().board[4], GameBoard().board[7]],
      right: [GameBoard().board[2], GameBoard().board[5], GameBoard().board[8]]
    }

    const diagonal = {
      oneNine: [GameBoard().board[0], GameBoard().board[4], GameBoard().board[8]],
      threeSeven: [GameBoard().board[2], GameBoard().board[4], GameBoard().board[6]]
    }
}

const UIController = () => {

}

const GameTurn = () => {

}

const GameRunner = (() => {
  const createPlayer = (name,mark) => Players.add(PlayerFacory(name,mark));
})



document.querySelector("#createP").addEventListener('click', createPlayers)
const inputs = document.querySelectorAll('.nameInput')
