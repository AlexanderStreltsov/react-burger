import overlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ handleOverlayClick }) => {
  return <div className={overlayStyles.overlay} onClick={handleOverlayClick} />;
};

export default ModalOverlay;
