import { addToCart } from "app/slice/shopcartSlice";
import store from "app/store";
import InputNumber from "components/InputNumber";
import { comma } from "lib/Helper";
import React, { useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import InputCoffeeType from "./InputCoffeeType";

function ProductDetail(props) {
  console.log("render detail");
  const product = props.product;
  const [type, setType] = useState("Bột");
  // @ts-ignore
  const rates = useSelector((state) => state.rates);
  const numberRate = rates.data.length || 0;
  const inputQuantity = useRef(null);
  let totalRating = rates.data.reduce((total, item) => {
    return total + item.star;
  }, 0);

  const handleChangeType = (evt) => {
    setType(evt.currentTarget.getAttribute("type-coffee"));
  };
  const handleAddToCart = () => {
    store.dispatch(
      addToCart({
        product: {
          id:product.id,
          name:product.name,
          mainImgLink:product.mainImgLink,
          price:product.price
        },
        type: type,
        quantity: +inputQuantity.current.value,
      })
    );
  };
  return (
    <div className="fs--9">
      <div className="fs--7">{product.name}</div>
      <div>
        <StarRatings
          rating={totalRating}
          starRatedColor="#008248"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
        />
        <span className="va--text-top product__info">
          {numberRate} đánh giá
        </span>
        <span className="va--text-top product__info">
          {product.numSelled} đã bán
        </span>
      </div>
      <div className="fs--1 fw--9 l">
        {comma(product.price)}
        <span className="fs--8">₫</span>
      </div>
      <hr className="mb-4 mt-1" />
      {product.coffee ? (
        <InputCoffeeType type={type} handleChangeType={handleChangeType} />
      ) : null}
      <div className="mt-4">
        <label className="me-2">Số lượng:</label>
        <InputNumber ref={inputQuantity} />
      </div>
      <Row className="mt-3">
        <Col xs={12} className="pe-ssm-1 pe-sm-3 mb-1 mb-ssm-0 col-ssm-6">
          <Button variant="primary" className="w-100" onClick={handleAddToCart}>
            Thêm vào giỏ <MdAddShoppingCart className="icon" />
          </Button>
        </Col>
        <Col xs={12} className="ps-ssm-1 ps-sm-3  col-ssm-6">
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => console.log("Primary")}
          >
            Mua ngay
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(ProductDetail);
