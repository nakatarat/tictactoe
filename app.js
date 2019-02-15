const gameBoard = (() => {
  const gameBoardArray = [
  '','','',
  '','','',
  '','','',];

  const winningIndices = [[0,1,2], [3,4,5], [6,7,8],
                          [0,3,6], [1,4,7], [2,5,8],
                          [0,4,8], [2,4,6]];

  const gameBoardDOM = [...document.getElementsByTagName('td')];
  const winnerDisplay = document.querySelector('p');

  let winnerExists = false;

  const checkWinner = (currentPlayer) => {
    const markerToCheck = currentPlayer.getMarker();
    const indices = [];
    gameBoardArray.forEach((elem, index) => {
      if(elem === markerToCheck) {
        indices.push(index);
      }
    });

    var winner;

    for(var i = 0; i < 8; i++) {
      var matchThree = 0;
      for(var j = 0; j < 3; j++) {
        if(indices.includes(winningIndices[i][j])){
          matchThree++;
          if (matchThree === 3) { break; }
        } else { break; }
      }

      if (matchThree === 3) {
        winner = i;
        break;
      }
    }

    if(winner !== undefined) {
      winnerExists = true;
      return true;
    }
    
  }

  const addMarker = function () {
    if(this.className === 'empty' && !winnerExists) {
      const key = parseInt(this.dataset.key, 10);
      gameBoardArray[key] = playerController.currentPlayer.getMarker();
      const winnerExists = checkWinner(playerController.currentPlayer);
      render(winnerExists, playerController.currentPlayer.getName());
      playerController.switchPlayer();
    }
  }

  // Add event listeners to each tic tac toe square
  gameBoardDOM.forEach((elem) => {
    elem.addEventListener('click', addMarker);
  });

  const addClass = () => {
    gameBoardArray.forEach((elem, index) => {
      switch (elem) {
        case 'X':
          gameBoardDOM[index].className = 'X';
          break;
        case 'O':
          gameBoardDOM[index].className = 'O';
          break;
        default:
          gameBoardDOM[index].className = 'empty';
      }
    });
  }




  const render = (winnerExists, winner) => {
    gameBoardArray.forEach((elem, index) => {
      gameBoardDOM[index].innerText = elem;
    });

    addClass();

    if (winnerExists) {
      const winnerText = document.createTextNode(`${winner} wins!`);
      winnerDisplay.appendChild(winnerText);
    }
  }

  return {gameBoardDOM, render, gameBoardArray};
})();

// CREATE PLAYERS
const Player = (marker, name) => {
  const getMarker = () => marker;
  const getName = () => name;

  return {getMarker, getName}
}

// MOCK PLAYERS
const player1 = Player('X', 'Tara');
const player2 = Player('O', 'Sam');

const playerController = {
  currentPlayerToggle: false,
  currentPlayer: player1,
  switchPlayer: () => {
    playerController.currentPlayerToggle = !playerController.currentPlayerToggle;
    if(playerController.currentPlayerToggle === false) {
      playerController.currentPlayer = player1;
    } else {
      playerController.currentPlayer = player2;
    }
  }
};

gameBoard.render();