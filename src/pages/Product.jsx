import PropTypes from "prop-types";

export default function Product({ title }) {
  return <li>axios : {title}</li>;
}

Product.propTypes = {
  title: PropTypes.any,
};
