# Chess AI in javascript.

Build instructions are simple. Just clone this repo and open the index.html page in your browser (only tested on Google
Chrome).

There are 4 algorithms ->
1. random: Picks a random move using chess.js library
2. look-one-ahead: Adds board evaluation, can pick the current best move.
3. minimax: Adds the minimax algorithm, you can find more about it by googling.
4. alpha-beta: Improves the minimax algo by pruning the search space.

### Acknowledgements

1. [chessboard.js library for board generation](http://chessboardjs.com/)
2. [chess.js library for move generation](https://github.com/jhlywa/chess.js/blob/master/README.md)
3. [Guide by Lauri Hartikka](https://www.freecodecamp.org/news/simple-chess-ai-step-by-step-1d55a9266977/)

### To-Do
1. Deploy online.
2. Improve board evaluation to take into account not just piece value, but also its position.
