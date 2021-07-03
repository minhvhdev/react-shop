import { comma, renderImageLink } from "lib/Helper";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProductCard(props) {
  const product = props.product;
  return (
    <Card className="product-card">
      <Link to={"product?id=" + product.id}>
        <Card.Img variant="top" src={renderImageLink(product.mainImgLink, 3)} />
      </Link>
      <Link className="text-decoration-none " to={"product?id=" + product.id}>
        <Card.Body>
          <p className="text-dark">{product.name}</p>
          <h1 className="fs--6 mb-0">
            {comma(product.price)}
            <span className="fs--8">₫</span>
          </h1>
        </Card.Body>
      </Link>
    </Card>
  );
}
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
export default React.memo(ProductCard);
