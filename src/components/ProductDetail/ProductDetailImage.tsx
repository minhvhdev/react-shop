import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IProduct } from '@types';
import { renderImageLink } from 'helper';

interface Props {
  product: IProduct;
}

const ProductDetailImage: React.FC<Props> = ({ product }: Props) => {
  const [mainImgLink, setMainImgLink] = useState(product.mainImgLink);

  const showImage = (link: string): void => {
    setMainImgLink(link);
  };

  return (
    <Row>
      <Col xs={12}>
        <div className="image-wrapper">
          <img className="border p-2" src={renderImageLink(mainImgLink, 4)} alt={product.name} />
        </div>
      </Col>
      <Col xs={12}>
        <div className="d-flex">
          {product.listImage.map((value, index) => {
            return (
              <div onMouseOver={() => showImage(value.imgLink)} className="w--16" key={index}>
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
};

export default ProductDetailImage;
