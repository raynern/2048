export default function Grid({ result, swipeDuration }) {
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
  };

  let arr = result[0];
  let [randX, randY] = [result[1], result[2]];
  let len = arr.length;
  return (
    <>
      {arr.map((row, i) =>
        row.map((no, j) => (
          <div
            key={Math.random()}
            id={`${i}${j}`}
            className="rounded tile"
            style={{
              position: "absolute",
              top: `${((i * 2 + 1.25) / (len * 2 + 1)) * 100}%`,
              left: `${((j * 2 + 1.25) / (len * 2 + 1)) * 100}%`,
              backgroundColor: blues[no],
              color: "white",
              opacity: "1",
              width: `${100 / (len + 4)}%`,
              height: "3rem",
              lineHeight: "3rem",
              fontWeight: "bold",
              boxShadow:
                randX == i && randY == j ? "0 0 10px 10px orange" : null,
              transition: `all ${
                swipeDuration / 1000
              }s ease-out 0s, boxShadow 0s linear 0s `,
            }}
          >
            {no > 0 ? no : null}
          </div>
        ))
      )}
    </>
  );
}
