import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {
  deleteConstructor,
  sortConstructor,
} from "../../services/actions/constructor";
import elementStyles from "./burger-constructor-element.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { dragDropTypes } from "../../utils/drag-drop-types";

const BurgerConstructorElement = ({ index, ingredient }) => {
  const dispatch = useDispatch();

  const { id, name, price, image } = ingredient;

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: dragDropTypes.sort,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sortConstructor(dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: dragDropTypes.sort,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  drag(drop(ref));

  return (
    <li
      className={elementStyles.listItem}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <i className={elementStyles.dragIcon}>
        <DragIcon />
      </i>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          dispatch(deleteConstructor(index));
        }}
      />
    </li>
  );
};

BurgerConstructorElement.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: ingredientPropType,
};

export default BurgerConstructorElement;
