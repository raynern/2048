export default function Welcome({
  setGameStarted,
  getQuote,
  setQuote,
  setResult,
  generateRandomArray,
  setGameDifficulty,
}) {
  return (
    <>
      <p>Hello! Choose your difficulty level, and click start to begin</p>
      <br></br>
      <label id="difficultyDisplay" htmlFor="difficulty" className="form-label">
        Difficulty selected: 4
      </label>
      <input
        type="range"
        className="w-50 mx-auto"
        min="2"
        max="6"
        id="difficulty"
        onInput={() =>
          (document.getElementById(
            "difficultyDisplay"
          ).innerHTML = `Difficulty selected: 
            ${document.getElementById("difficulty").value}`)
        }
      ></input>
      <br></br>
      <button
        className="button w-50 mt-3 mx-auto"
        onClick={() => {
          let difficulty = Number(document.getElementById("difficulty").value);
          setGameDifficulty(difficulty);
          setGameStarted(true);
          setResult([generateRandomArray(difficulty), -1, -1, []]);
          getQuote(setQuote);
        }}
      >
        Start
      </button>
    </>
  );
}
