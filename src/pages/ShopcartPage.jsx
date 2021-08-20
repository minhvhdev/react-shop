import ShopcartApi from "api/ShopcartApi";
import { createOrder } from "app/slice/orderSlice";
import { updateQuantity } from "app/slice/shopcartSlice";
import store from "app/store";
import AllCartItem from "components/ShowShopcart/AllCartItem";
import NullCartItem from "components/ShowShopcart/NullCartItem";
import React, { useRef } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ShopcartPage() {
  // @ts-ignore
  const shopcart = useSelector((state) => state.shopcart).data;
  const update = useRef(null);
  const handleUpdate = () => {
    const value = JSON.parse(update.current.value);
    store.dispatch(updateQuantity(value));
    const shopcart = JSON.parse(localStorage.getItem("_shopcart"));
    ShopcartApi.updateCart(shopcart);
  };
  const handleCheckOut = () => {
    store.dispatch(createOrder(shopcart));
  };
  return (
    <Container>
      <Breadcrumb className="fs--11 mt-3">
        <li className="breadcrumb-item">
          <Link to="/">Trang chủ</Link>
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
                <Link
                  className="btn btn-primary w-100"
                  to="/checkout"
                  onClick={handleCheckOut}
                >
                  Thanh toán
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-end mb-3">
          <Link className="btn btn-primary px-3" to="/allProduct">
            Chọn mua sản phẩm
          </Link>
        </div>
      )}
    </Container>
  );
}

export default ShopcartPage;
