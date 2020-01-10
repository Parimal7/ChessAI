// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js

var board = null
var game = new Chess()

function onDragStart (source, piece) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick pieces for white
  if (piece.search(/^b/) !== -1) return false
}

var evaluateBoard = function(board, color) {
  // Sets the value for each piece using standard piece value
  var pieceValue = {
    'p': 100,
    'n': 350,
    'b': 350,
    'r': 525,
    'q': 1000,
    'k': 10000
  };

  // Loop through all pieces on the board and sum up total
  var value = 0;
  board.forEach(function(row) {
    row.forEach(function(piece) {
      if (piece) {
        // Subtract piece value if it is opponent's piece
        value += pieceValue[piece['type']]
                 * (piece['color'] === color ? 1 : -1);
      }
    });
  });

  return value;
};

var calcBestMoveOne = function(playerColor) {
  // List all possible moves
  var possibleMoves = game.moves();
  // Sort moves randomly, so the same move isn't always picked on ties
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});

  // exit if the game is over
  if (game.game_over() === true || possibleMoves.length === 0) return;

  // Search for move with highest value
  var bestMoveSoFar = null;
  var bestMoveValue = Number.NEGATIVE_INFINITY;
  possibleMoves.forEach(function(move) {
    game.move(move);
    var moveValue = evaluateBoard(game.board(), playerColor);
    if (moveValue > bestMoveValue) {
      bestMoveSoFar = move;
      bestMoveValue = moveValue;
    }
    game.undo();
  });

  game.move(bestMoveSoFar)
  board.position(game.fen());
}

function onDrop (source, target) {
  
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  window.setTimeout(calcBestMoveOne(), 250)
}

function onSnapEnd () {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)