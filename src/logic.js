let lineCompress = function (arr) {
  let copyArr = Array.from(arr);
  let moves = [];
  for (let base = 0; base < copyArr.length; base++) {
    for (let i = base; i < copyArr.length; i++) {
      if (copyArr[i] == 0) {
        continue;
      } else if (i == copyArr.length - 1 && i > base) {
        moves.push([i, base]);
        copyArr[base] = copyArr[i];
        copyArr[i] = 0;
      } else {
        for (let j = i + 1; j < copyArr.length; j++) {
          if (copyArr[j] == 0 && j == copyArr.length - 1) {
            if (i != base) {
              moves.push([i, base]);
              copyArr[base] = copyArr[i];
              copyArr[i] = 0;
            }
            break;
          } else if (copyArr[j] == 0) {
            continue;
          } else if (copyArr[i] == copyArr[j]) {
            copyArr[base] = 2 * copyArr[i];
            if (i != base) {
              moves.push([i, base]);
              copyArr[i] = 0;
            }
            moves.push([j, base]);
            copyArr[j] = 0;

            break;
          } else {
            if (i != base) {
              moves.push([i, base]);
              copyArr[base] = copyArr[i];
              copyArr[i] = 0;
            }
            break;
          }
        }
        break;
      }
    }
  }
  return [copyArr, moves];
};

export default function matrixCompress(result, key) {
  let resultingMatrix = [];
  let arr = result[0];
  let rawArr;
  let rawMove;
  let totalMoves = [];
  if (key == "left") {
    for (let i = 0; i < arr.length; i++) {
      [rawArr, rawMove] = lineCompress(arr[i]);
      resultingMatrix.push(rawArr);
      totalMoves = totalMoves.concat(
        rawMove.map((x) => ({
          oldPos: [i, x[0]],
          newPos: [i, x[1]],
        }))
      );
    }
  } else if (key == "right") {
    for (let i = 0; i < arr.length; i++) {
      [rawArr, rawMove] = lineCompress(arr[i].slice().reverse());
      resultingMatrix.push(rawArr.reverse());
      totalMoves = totalMoves.concat(
        rawMove.map((x) => ({
          oldPos: [i, arr[0].length - 1 - x[0]],
          newPos: [i, arr[0].length - 1 - x[1]],
        }))
      );
    }
  } else if (key == "down") {
    resultingMatrix = [...Array(arr[0].length)].map((e) =>
      Array(arr[0].length)
    );
    for (let i = 0; i < arr[0].length; i++) {
      let col = arr.map((x) => x[i]);
      [rawArr, rawMove] = lineCompress(col.reverse());
      let newcol = rawArr.reverse();
      resultingMatrix.forEach((x, index) => (x[i] = newcol[index]));
      totalMoves = totalMoves.concat(
        rawMove.map((x) => ({
          oldPos: [arr[0].length - 1 - x[0], i],
          newPos: [arr[0].length - 1 - x[1], i],
        }))
      );
    }
  } else if (key == "up") {
    resultingMatrix = [...Array(arr[0].length)].map((e) =>
      Array(arr[0].length)
    );
    for (let i = 0; i < arr[0].length; i++) {
      let col = arr.map((x) => x[i]);
      [rawArr, rawMove] = lineCompress(col);
      let newcol = rawArr;
      resultingMatrix.forEach((x, index) => (x[i] = newcol[index]));
      totalMoves = totalMoves.concat(
        rawMove.map((x) => ({
          oldPos: [x[0], i],
          newPos: [x[1], i],
        }))
      );
    }
  }
  if (totalMoves.length == 0) {
    return [resultingMatrix, -1, -1, totalMoves, false, true];
  } else {
    let zeroes = [];
    for (let i = 0; i < resultingMatrix.length; i++) {
      for (let j = 0; j < resultingMatrix.length; j++) {
        if (resultingMatrix[i][j] == 0) {
          zeroes.push([i, j]);
        }
      }
    }
    let [randX, randY] = zeroes[Math.floor(Math.random() * zeroes.length)];
    resultingMatrix[randX][randY] = 2;

    let solvable = false;
    if (zeroes.length > 1) {
      solvable = true;
    }
    for (let i = 0; i < resultingMatrix.length; i++) {
      if (lineCompress(resultingMatrix[i])[1].length > 0) {
        solvable = true;
      }
    }
    for (let i = 0; i < resultingMatrix[0].length; i++) {
      let col = resultingMatrix.map((x) => x[i]);
      if (lineCompress(col)[1].length > 0) {
        solvable = true;
      }
    }
    return [resultingMatrix, randX, randY, totalMoves, true, solvable];
  }
}
