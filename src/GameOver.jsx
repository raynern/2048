import Modal from "react-bootstrap/Modal";

function GameOver({ max, noMoves }) {
  const handleClose = () => location.reload();

  return (
    <>
      <Modal show="show" onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Game Over!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Good attempt, you managed to get to a score of ${max} within ${noMoves} moves`}
        </Modal.Body>
        <Modal.Footer>
          <button className="button mx-auto" onClick={handleClose}>
            Click to restart
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GameOver;
