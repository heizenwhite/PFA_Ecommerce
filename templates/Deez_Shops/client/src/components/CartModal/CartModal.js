import classes from "./CartModal.module.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
function CartModal({ showModal, closeModal }) {
  const handleClose = () => {
    closeModal();
  };
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Ajouter un item à votre</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez vous continuer à votre shop ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Rester sur le shop
          </Button>
          <Button variant="secondary">
            <Link className={classes.link} to="/cart">
              Aller au panier
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartModal;
