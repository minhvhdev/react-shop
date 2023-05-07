import InputNumber from "components/InputNumber";
import { comma } from "helper";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  MdAddShoppingCart, MdLocalShipping,
  MdSentimentVerySatisfied
} from "react-icons/md";

import { createBuyNowOrder } from "redux/slice/orderSlice";
import { addToCart } from "redux/slice/shopcartSlice";
import store from "redux/store";
import InputCoffeeType from "./InputCoffeeType";

function ProductDetail({ product }) {
  const [type, setType] = useState(product.type ? "Bột" : null);
  const inputQuantity = useRef(null);
  
  const handleChangeType = (evt) => {
    setType(evt.currentTarget.getAttribute("type-coffee"));
  };
  const handleAddToCart = () => {
    const id = product.id;
    const quantity = +inputQuantity.current.value;
    // noti.addNotification({
    //   ...NOTI,
    //   message: <Message type="success" mess="Thêm sản phẩm thành công" />,
    //   type: "success",
    //   dismiss: {
    //     duration: 2000,
    //   },
    // });
    store.dispatch(
      addToCart({
        product: {
          id,
          name: product.name,
          mainImgLink: product.mainImgLink,
          price: product.price,
        },
        type,
        quantity,
      })
    );
  };
  const handleBuy = () => {
    const quantity = +inputQuantity.current.value;
    const products = [
      {
        product: {
          id: product.id,
          name: product.name,
          mainImgLink: product.mainImgLink,
          price: product.price,
        },
        type,
        quantity,
      },
    ];
    store.dispatch(createBuyNowOrder(products));
  };
  return (
    <div className="fs--9">
      <div className="fs--7">{product.name}</div>
      <div className="fs--1 fw--9 l">
        {comma(product.price)}
        <span className="fs--8">₫</span>
      </div>
      <hr className="mt-1 mb-0" />
      <div className="position-relative pt-4">
        {product.type ? (
          <InputCoffeeType type={type} handleChangeType={handleChangeType} />
        ) : null}
        <div className="mt-4">
          <label className="me-2">Số lượng:</label>
          <InputNumber ref={inputQuantity} />
        </div>
        <Row className="mt-3">
          <Col xs={12} className="pe-ssm-1 pe-sm-3 mb-1 mb-ssm-0 col-ssm-6">
            <Button
              variant="primary"
              className="w-100"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ <MdAddShoppingCart className="icon" />
            </Button>
          </Col>
          <Col xs={12} className="ps-ssm-1 ps-sm-3  col-ssm-6">
            <Link
              href="/buyer/check-out"
              className="btn btn-outline-primary w-100"
              onClick={handleBuy}
            >
              Mua ngay
            </Link>
          </Col>
        </Row>
      </div>
      <div className="bg-light rounded border mt-3 p-3">
        <p>
          <MdSentimentVerySatisfied className="icon" /> Bạn có thể xem mô tả sản
          phẩm ở phía dưới!
        </p>
        <p>
          <MdLocalShipping className="icon" /> Miễn phí vận chuyển toàn quốc với
          đơn hàng từ 200.000₫
        </p>
      </div>
    </div>
  );
}

export default React.memo(ProductDetail);
