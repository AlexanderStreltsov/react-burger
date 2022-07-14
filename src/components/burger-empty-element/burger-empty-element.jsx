import PropTypes from "prop-types";
import elementStyles from "./burger-empty-element.module.css";

const BurgerEmptyElement = ({ top = false, bottom = false }) => {
  const title =
    top || bottom
      ? "Перенесите выбранную булку"
      : "Перенесите выбранные начинки или соусы";

  return (
    <div
      className={`
        constructor-element
        ${top && "constructor-element_pos_top"}
        ${bottom && "constructor-element_pos_bottom"}
        ${elementStyles.element}
      `}
    >
      {title}
    </div>
  );
};

BurgerEmptyElement.propTypes = {
  top: PropTypes.bool,
  bottom: PropTypes.bool,
};

export default BurgerEmptyElement;
