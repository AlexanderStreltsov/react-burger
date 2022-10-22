import { FC } from "react";
import elementStyles from "./burger-empty-element.module.css";

interface IBurgerEmptyElementProps {
  top?: boolean;
  bottom?: boolean;
}

const BurgerEmptyElement: FC<IBurgerEmptyElementProps> = ({
  top = false,
  bottom = false,
}) => {
  const title =
    top || bottom
      ? "Переместите выбранную булку"
      : "Переместите выбранные начинки или соусы";

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

export default BurgerEmptyElement;
