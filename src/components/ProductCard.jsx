import { comma, renderImageLink } from "lib/Helper";
import React from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";
import PropTypes from "prop-types";

function ProductCard(props) {
  const product = props.product;
  return (
    <Card className="product-card">
      <Link href={"product?id=" + product.id}>
        <a>
          <Card.Img
            variant="top"
            src={renderImageLink(product.mainImgLink, 3)}
          />
        </a>
      </Link>
      <Link href={"product?id=" + product.id}>
        <a className="text-decoration-none ">
          <Card.Body>
            <p className="text-dark">{product.name}</p>
            <h1 className="fs--6 mb-0">
              {comma(product.price)}
              <span className="fs--8">₫</span>
            </h1>
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
}
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
export default React.memo(ProductCard);
