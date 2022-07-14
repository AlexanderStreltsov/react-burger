import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ title = "", handleCloseModals, children }) => {
  useEffect(() => {
    const handleEscKey = (evt) => evt.key === "Escape" && handleCloseModals();
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [handleCloseModals]);

  return ReactDOM.createPortal(
    <>
      <div className={`${modalStyles.modal} pt-10 pl-10 pb-15 pr-10`}>
        <div className={modalStyles.titleWrapper}>
          <h3 className="text text_type_main-large mt-4 mb-4">{title}</h3>
          <i className={modalStyles.icon} onClick={handleCloseModals}>
            <CloseIcon />
          </i>
        </div>
        {children}
      </div>
      <ModalOverlay handleOverlayClick={handleCloseModals} />
    </>,
    modalsContainer
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  handleCloseModals: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
