export default function Score({ max, noMoves }) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-around">
        <div className="col-4 p-0">
          Score: <br></br>
          {max}
        </div>
        <div className="col-4 p-0">
          Moves: <br></br>
          {noMoves}
        </div>
      </div>
    </div>
  );
}
