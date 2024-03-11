function generateRandomArray(diff) {
  let arr = [...Array(diff)].map(() => Array(diff));
  for (let i = 0; i < diff; i++) {
    for (let j = 0; j < diff; j++) {
      arr[i][j] = 0;
    }
  }
  let [rand1x, rand1y] = [
    Math.floor(Math.random() * diff),
    Math.floor(Math.random() * diff),
  ];
  let [rand2x, rand2y] = [
    Math.floor(Math.random() * diff),
    Math.floor(Math.random() * diff),
  ];
  while (rand1x == rand2x && rand1y == rand2y) {
    [rand2x, rand2y] = [
      Math.floor(Math.random() * diff),
      Math.floor(Math.random() * diff),
    ];
  }
  arr[rand1x][rand1y] = 2;
  arr[rand2x][rand2y] = 2;

  return arr;
}

function offset(totalMoves, difficulty) {
  const blues = {
    2: "#89CFF0",
    4: "#0000FF",
    8: "#7393B3",
    16: "#088F8F",
    32: "#0096FF",
    64: "#5F9EA0",
    128: "#0047AB",
    256: "#6495ED",
    512: "#00FFFF",
    1024: "#00008B",
  };

  let len = difficulty;
  for (let i = 0; i < totalMoves.length; i++) {
    let move = totalMoves[i];
    document.getElementById(
      `${move.oldPos[0]}${move.oldPos[1]}`
    ).style.top = `${((move.newPos[0] * 2 + 1.25) / (len * 2 + 1)) * 100}%`;
    document.getElementById(
      `${move.oldPos[0]}${move.oldPos[1]}`
    ).style.left = `${((move.newPos[1] * 2 + 1.25) / (len * 2 + 1)) * 100}%`;
    document.getElementById(
      `${move.oldPos[0]}${move.oldPos[1]}`
    ).style.opacity = "0.8";
    document.getElementById(
      `${move.oldPos[0]}${move.oldPos[1]}`
    ).style.boxShadow = "";
  }
}

async function getQuote(setQuote) {
  let response = await fetch("https://api.quotable.io/random" + "?tags=Life");
  let quote = await response.json();
  setQuote(`"${quote.content}"`);
}

export { offset, getQuote, generateRandomArray };
