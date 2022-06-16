import PropTypes from "prop-types";
import overlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ handleOverlayClick }) => {
  return <div className={overlayStyles.overlay} onClick={handleOverlayClick} />;
};

ModalOverlay.propTypes = {
  handleOverlayClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
