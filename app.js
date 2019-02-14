const gameBoard = (() => {
  const gameBoardArray = [
  '','','',
  '','','',
  '','','',];

  const gameBoardDOM = [...document.getElementsByTagName('td')];

  const addMarker = function () {
    if(this.className === 'empty') {
      const key = parseInt(this.dataset.key, 10);
      gameBoardArray[key] = playerController.currentPlayer.getMarker();
      playerController.switchPlayer();
      render();
    }
  }

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

  const render = () => {
    gameBoardArray.forEach((elem, index) => {
      gameBoardDOM[index].innerText = elem;
    });

    addClass();
  }

  return {gameBoardDOM, render};
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