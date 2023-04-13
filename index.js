const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    // Reset
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    // New Round
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    // squares
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  state: {
    moves: [{}],
  },

  init() {
    App.registerEventListeners();
  },
  registerEventListeners() {
    console.log(App.$.squares);
    App.$.menu.addEventListener('click', e => {
      App.$.menuItems.classList.toggle('hidden');
    });
    App.$.resetBtn.addEventListener('click', e => {
      console.log('reset');
    });
    App.$.newRoundBtn.addEventListener('click', e => {
      console.log('new round');
    });

    App.$.squares.forEach(squares => {
      squares.addEventListener('click', e => {
        if (squares.hasChildNodes()) {
          return;
        }

        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = playerId => (1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);

        const icon = document.createElement('i');

        if (currentPlayer === 1) {
          icon.classList.add('fa-solid', 'fa-x', 'yellow');
        } else {
          icon.classList.add('fa-solid', 'fa-o', 'turquoise');
        }
        App.state.moves.push({
          squareId: +squares.id,
          playerId: currentPlayer,
        });
        App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

        squares.replaceChildren(icon);
        console.log(App.state);

        const winningPatterns = [
          [1, 2, 3],
          [1, 5, 9],
          [1, 4, 7],
          [2, 5, 8],
          [3, 5, 7],
          [3, 6, 9],
          [4, 5, 6],
          [7, 8, 9],
        ];
      });
    });
  },
};

window.addEventListener('load', App.init);
