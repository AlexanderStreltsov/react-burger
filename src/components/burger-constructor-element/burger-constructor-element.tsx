import { useRef, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks";
import {
  deleteConstructor,
  sortConstructor,
} from "../../services/constructor/actions";
import elementStyles from "./burger-constructor-element.module.css";
import { DragDropTypes } from "../../utils/drag-drop-types";
import { IIngredientWithId } from "../../utils/types";

interface IBurgerConstructorElementProps {
  index: number;
  ingredient: IIngredientWithId;
}

interface IDragItem {
  index: number;
  id: string;
  type: string;
}

const BurgerConstructorElement: FC<IBurgerConstructorElementProps> = ({
  index,
  ingredient,
}) => {
  const dispatch = useDispatch();

  const { id, name, price, image } = ingredient;

  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<
    IDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragDropTypes.SORT,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IDragItem, monitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
    type: DragDropTypes.SORT,
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
        <DragIcon type="primary" />
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

export default BurgerConstructorElement;
