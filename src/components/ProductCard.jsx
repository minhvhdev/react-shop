import React from 'react';
import { Card } from 'react-bootstrap';
import { comma, convertToUrl, renderImageLink } from 'helper';
import Link from 'next/link';
import PropTypes from 'prop-types';

function ProductCard(props) {
  const product = props.product;
  return (
    <Card className="product-card">
      <Link href={convertToUrl(`${product.name}-${product.id}`)}>
        <Card.Img variant="top" src={renderImageLink(product.mainImgLink, 3)} />
      </Link>
      <Link href={convertToUrl(`${product.name}-${product.id}`)} className="text-decoration-none ">
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
  product: PropTypes.object.isRequired
};
export default React.memo(ProductCard);
