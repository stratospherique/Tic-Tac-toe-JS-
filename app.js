const GameBoard = () => {
  return {
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
}

const Players = () => {
  const players= [];
  const getPlayers = () => {return players}
  const add = function(player){
    players.push(player)
  }
  return {
    getPlayers,add
  }
}

const PlayerFactory = (name,mark) => {
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
  return {    
      playerOneInput: document.querySelector('.nameInput-1'),
      playerTwoInput: document.querySelector('.nameInput-2')    
  }
}


const GameTurn = () => {

}

<<<<<<< HEAD
const GameRunner = (() => {
  const playersList = Players();
  const createPlayers = () => {
    const player1 = playersList.add(PlayerFactory(inputs[0].value,"X"));
    const player2 = playersList.add(PlayerFactory(inputs[1].value,"O"));
    console.log(playersList.getPlayers());
   
  }

  return {playersList,createPlayers}
})();
=======
const createPlayers = () => {
  console.log(UIController.playerOneInput);
  Players().players.push(UIController.playerOneInput);
  Players().players.push(UIController.playerTwoInput);
}
>>>>>>> 99a8c841a15ccca5dacc74f824d8c39390a6d6b1



document.querySelector("#createP").addEventListener('click', GameRunner.createPlayers)
const inputs = document.querySelectorAll('.nameInput')
