import PropTypes from "prop-types";

const ingredient = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
  name: PropTypes.string.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
};

export const ingredientPropType = PropTypes.shape(ingredient);

export const ingredientInOrderPropType = PropTypes.shape({
  ...ingredient,
  count: PropTypes.number.isRequired,
});
