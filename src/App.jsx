import { useState, useEffect } from "react";
import "./App.css";
import Grid from "./Grid";
import Welcome from "./Welcome";
import Score from "./Score";
import matrixCompress from "./logic";
import { offset, getQuote, generateRandomArray } from "./utils";
import GameOver from "./GameOver";

let unlocked = true;

const SWIPE_DURATION = 300;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(5);
  const [result, setResult] = useState([]);
  const [quote, setQuote] = useState("");
  const [noMoves, setNoMoves] = useState(0);
  const [max, setMax] = useState(2);
  const [gameBoardKey, setGameBoardKey] = useState(0);
  const [show, setShow] = useState(false);

  function handleClick(direction) {
    if (direction && unlocked) {
      unlocked = false;
      let output = matrixCompress(result, direction);
      if (output[4]) {
        offset(output[3], gameDifficulty);
        setTimeout(function () {
          unlocked = true;
          setResult(output);
          setNoMoves(noMoves + 1);
          setMax(Math.max(...output[0].map((x) => Math.max(...x))));
          if (!output[5]) {
            setShow(true);
          }
        }, SWIPE_DURATION * 1.01);
      } else {
        document.getElementById("gameBoard").style.boxShadow =
          "0 0 20px yellow";
        setTimeout(function () {
          unlocked = true;
          setGameBoardKey(Math.random());
        }, 200);
      }
    }
  }

  useEffect(() => {
    const arrowMap = {
      ArrowDown: "down",
      ArrowUp: "up",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    function handleKeyDown(e) {
      if (
        (e.key == "ArrowDown" ||
          e.key == "ArrowUp" ||
          e.key == "ArrowLeft" ||
          e.key == "ArrowRight") &&
        unlocked
      ) {
        e.preventDefault();
        unlocked = false;
        let output = matrixCompress(result, arrowMap[e.key]);
        if (output[4]) {
          offset(output[3], gameDifficulty);
          setTimeout(function () {
            unlocked = true;
            setResult(output);
            setNoMoves(noMoves + 1);
            setMax(Math.max(...output[0].map((x) => Math.max(...x))));
            if (!output[5]) {
              setShow(true);
            }
          }, SWIPE_DURATION * 1.01);
        } else {
          document.getElementById("gameBoard").style.boxShadow =
            "0 0 20px yellow";
          setTimeout(function () {
            unlocked = true;
            setGameBoardKey(Math.random());
          }, 200);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [result, gameDifficulty, noMoves, arrowMap]);

  return (
    <>
      <h1 className="display-5 text-white">
        The <strong>2048</strong> Game 😁
      </h1>
      <div className="card my-3 w-75 mx-auto py-2 informative">
        {gameStarted ? (
          <Score max={max} noMoves={noMoves}></Score>
        ) : (
          "Instructions: Use the arrow keys to slide the numbers. Adjacent numbers that are similar will get summed up. Get to 2048!"
        )}
      </div>
      <div key={gameBoardKey} id="gameBoard" className="w-75 mx-auto mb-2 card">
        {gameStarted ? (
          <>
            <Grid result={result} swipeDuration={SWIPE_DURATION}></Grid>
            <br></br>
          </>
        ) : (
          <Welcome
            setGameStarted={setGameStarted}
            getQuote={getQuote}
            setQuote={setQuote}
            setResult={setResult}
            generateRandomArray={generateRandomArray}
            setGameDifficulty={setGameDifficulty}
          ></Welcome>
        )}
      </div>
      <div id="gameKey" className="card w-75 mx-auto pt-2 pb-1 container">
        <div className="row d-flex justify-content-center">
          <div className="col-4 display-3">
            <button
              onClick={() => handleClick("up")}
              id="gameButton"
              className="p-0 button"
            >
              ⬆️
            </button>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-4 display-3">
            <button
              onClick={() => handleClick("left")}
              id="gameButton"
              className="p-0 button"
            >
              ⬅️
            </button>
          </div>
          <div className="col-4 display-3"> </div>
          <div className="col-4 display-3">
            <button
              onClick={() => handleClick("right")}
              id="gameButton"
              className="p-0 button"
            >
              ➡️
            </button>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-4 display-3">
            <button
              onClick={() => handleClick("down")}
              id="gameButton"
              className="p-0 button"
            >
              ⬇️
            </button>
          </div>
        </div>
      </div>

      {gameStarted ? (
        <div id="quote" className="informative card p-2 w-75 mx-auto my-4">
          {quote}
        </div>
      ) : null}
      <div id="footer" className="card p-1">
        This game was made by Rayner, as part of the Rocket Academy Bootcamp
        Project 1.
      </div>
      {show ? <GameOver max={max} noMoves={noMoves}></GameOver> : null}
    </>
  );
}

export default App;
