import { FC } from "react";
import overlayStyles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  handleOverlayClick: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ handleOverlayClick }) => {
  return <div className={overlayStyles.overlay} onClick={handleOverlayClick} />;
};

export default ModalOverlay;
