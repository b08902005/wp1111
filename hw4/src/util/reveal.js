/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

function revealAround(board, x, y, newNonMinesCount) {
  if (board[x][y].revealed || board[x][y].flagged)
    return { board, newNonMinesCount };
  board[x][y].revealed = true;
  newNonMinesCount--;
  if (x > 0) {
    if (board[x - 1][y - 1]) {
      if (!board[x - 1][y - 1].revealed && board[x - 1][y - 1].value === 0) {
        ({ board, newNonMinesCount } = revealAround(board, x - 1, y - 1, newNonMinesCount));
      }
      else if (!board[x - 1][y - 1].revealed) {
        board[x - 1][y - 1].revealed = true;
        newNonMinesCount--;
      }
    }
    if (board[x - 1][y]) {
      if (!board[x - 1][y].revealed && board[x - 1][y].value === 0) {
        ({ board, newNonMinesCount } = revealAround(board, x - 1, y, newNonMinesCount));
      }
      else if (!board[x - 1][y].revealed) {
        board[x - 1][y].revealed = true;
        newNonMinesCount--;
      }
    }
    if (board[x - 1][y + 1]) {
      if (!board[x - 1][y + 1].revealed && board[x - 1][y + 1].value === 0) {
        ({ board, newNonMinesCount } = revealAround(board, x - 1, y + 1, newNonMinesCount));
      }
      else if (!board[x - 1][y + 1].revealed) {
        board[x - 1][y + 1].revealed = true;
        newNonMinesCount--;
      }
    }
  }
  if (board[x][y - 1]) {
    if (!board[x][y - 1].revealed && board[x][y - 1].value === 0) {
      ({ board, newNonMinesCount } = revealAround(board, x, y - 1, newNonMinesCount));
    }
    else if (!board[x][y - 1].revealed) {
      board[x][y - 1].revealed = true;
      newNonMinesCount--;
    }
  }
  if (board[x][y + 1]) {
    if (!board[x][y + 1].revealed && board[x][y + 1].value === 0) {
      ({ board, newNonMinesCount } = revealAround(board, x, y + 1, newNonMinesCount));
    }
    else if (!board[x][y + 1].revealed) {
      board[x][y + 1].revealed = true;
      newNonMinesCount--;
    }
  }
  if (x < board.length - 1) {
    if (board[x + 1][y - 1]) {
      if (!board[x + 1][y - 1].revealed && board[x + 1][y - 1].value === 0) {
        ({ board, newNonMinesCount } = revealAround(board, x + 1, y - 1, newNonMinesCount));
      }
      else if (!board[x + 1][y - 1].revealed) {
        board[x + 1][y - 1].revealed = true;
        newNonMinesCount--;
      }
    }
    if (board[x + 1][y]) {
      if (!board[x + 1][y].revealed && board[x + 1][y].value === 0) {
        ({ board, newNonMinesCount } = revealAround(board, x + 1, y, newNonMinesCount));
      }
      else if (!board[x + 1][y].revealed) {
        board[x + 1][y].revealed = true;
        newNonMinesCount--;
      }
    }
    if (board[x + 1][y + 1]) {
      if (!board[x + 1][y + 1].revealed && board[x + 1][y + 1].value === 0) {
        ({ board, newNonMinesCount } = revealAround(board, x + 1, y + 1, newNonMinesCount));
      }
      else if (!board[x + 1][y + 1].revealed) {
        board[x + 1][y + 1].revealed = true;
        newNonMinesCount--;
      }
    }
  }

  return { board, newNonMinesCount };
}

export const revealed = (board, x, y, newNonMinesCount) => {

  if (board[x][y].value === 0)
    ({ board, newNonMinesCount } = revealAround(board, x, y, newNonMinesCount));
  else {
    board[x][y].revealed = true;
    newNonMinesCount--;
  }

  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

  return { board, newNonMinesCount };
};
