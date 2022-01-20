import ShopcartApi from "api/ShopcartApi";
import { createOrder } from "app/slice/orderSlice";
import { updateQuantity } from "app/slice/shopcartSlice";
import store from "app/store";
import AllCartItem from "components/ShowShopcart/AllCartItem";
import NullCartItem from "components/ShowShopcart/NullCartItem";
import React, { useRef } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

function ShopcartPage() {
  const shopcart = useSelector((state) => state.shopcart).data;
  const update = useRef(null);
  const handleUpdate = () => {
    const value = JSON.parse(update.current.value);
    store.dispatch(updateQuantity(value));
    const shopcart = [];
    ShopcartApi.updateCart(shopcart);
  };
  const handleCheckOut = () => {
    store.dispatch(createOrder(shopcart));
  };
  return (
    <Container>
      <Breadcrumb className="fs--11 mt-3">
        <li className="breadcrumb-item">
          <Link href="/">
            <a>Trang chủ</a>
          </Link>
        </li>
        <Breadcrumb.Item active>Giỏ hàng của bạn</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col xs={12}>
          {shopcart.length !== 0 ? (
            <AllCartItem shopcart={shopcart} ref={update} />
          ) : (
            <NullCartItem />
          )}
        </Col>
      </Row>
      {shopcart.length !== 0 ? (
        <Row className="justify-content-end">
          <Col xs={12} lg={6}>
            <Row>
              <Col xs={12} className="col-ssm-6 mb-1">
                <button
                  className="btn btn-outline-primary w-100 pe-0"
                  onClick={handleUpdate}
                >
                  Cập nhật số lượng
                </button>
              </Col>
              <Col xs={12} className="col-ssm-6">
                <Link href="/buyer/check-out">
                  <a className="btn btn-primary w-100" onClick={handleCheckOut}>Thanh toán</a>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-end mb-3">
          <Link href="/allProduct">
            <a className="btn btn-primary px-3">Chọn mua sản phẩm</a>
          </Link>
        </div>
      )}
    </Container>
  );
}

export default ShopcartPage;
