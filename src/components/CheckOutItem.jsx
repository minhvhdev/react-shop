import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { comma, renderImageLink } from "lib/Helper";
import { Button, Col, Form, Row } from "react-bootstrap";
function CheckOutItem() {
  const shopcart = useSelector((state) => state.shopcart).data;
  const showCart = useRef(null);
  const [show, setShow] = useState(false);
  const handleShowItem = () => {
    const status = showCart.current.classList[2];
    if (status == "hide") {
      showCart.current.classList.replace("hide", "show");
    } else {
      showCart.current.classList.replace("show", "hide");
    }
  };
  return (
    <div className="d-flex flex-column">
      <Form.Label>Chi tiết đơn hàng</Form.Label>
      <Row className="mb-3 order-1">
        <Form.Group as={Col} xs={7} sm={8}>
          <Form.Control type="text" placeholder="Mã giảm giá" />
        </Form.Group>
        <Form.Group as={Col} xs={5} sm={4}>
          <Button className="w-100">Sử dụng</Button>
        </Form.Group>
      </Row>
      <div ref={showCart} className="order-3 check-out hide">
        {shopcart.map((item, i) => {
          const quantity = item.quantity;
          const price = item.product.price;
          return (
            <div key={i} className="check-out__container">
              <div className="check-out__item cart-item__thumb">
                <img
                  src={renderImageLink(item.product.mainImgLink, 1)}
                  alt=""
                  width="100%"
                />
              </div>
              <div className="check-out__item">
                <p>{item.product.name}</p>
                <p>{item.type}</p>
                <p>SL:{item.quantity}</p>
              </div>
              <div className="check-out__item">
                <p className="fs--4">
                  {comma(quantity * price)}
                  <span className="fs--11">₫</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-between fs--6 order-2 order-lg-3">
        <p className="d-none d-lg-block">Tổng cổng:</p>
        <span
          onClick={handleShowItem}
          className="d-block d-lg-none fs--9 text-primary dropdown-toggle cursor--pointer"
        >
          Thông tin đơn hàng
        </span>
        <div>
          {comma(
            shopcart.reduce((total, item) => {
              console.log(item);
              return +item.quantity * +item.product.price + total;
            }, 0)
          )}
          <span className="fs--10">₫</span>
        </div>
      </div>
    </div>
  );
}

export default CheckOutItem;
