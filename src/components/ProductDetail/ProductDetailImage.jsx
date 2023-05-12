import { renderImageLink } from "helper";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

function ProductDetailImage(props) {
  const product = props.product;
  const [mainImgLink, setMainImgLink] = useState(product.mainImgLink);
  const showImage = (link) => {
    setMainImgLink(link);
  };
  return (
    <Row>
      <Col xs={12}>
        <div className="image-wrapper">
          <img
            className="border p-2"
            src={renderImageLink(mainImgLink, 4)}
            alt={product.name}
          />
        </div>
      </Col>
      <Col xs={12}>
        <div className="d-flex">
          {product.listImage.map((value, index) => {
            return (
              <div
                onMouseOver={(e) => showImage(value.imgLink)}
                className="w--16"
                key={index}
              >
                <img
                  className="img-thumbnail w-100 p-2 rounded-0"
                  src={renderImageLink(value.imgLink, 0)}
                  alt={product.name}
                />
              </div>
            );
          })}
        </div>
      </Col>
    </Row>
  );
}

export default ProductDetailImage;
