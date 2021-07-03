import AllCartItem from "components/ShowShopcart/AllCartItem";
import NullCartItem from "components/ShowShopcart/NullCartItem";
import React from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ShopcartPage() {
  // @ts-ignore
  const shopcart = useSelector((state) => state.shopcart).data;
  return (
    <Container>
      <Breadcrumb className="fs--11 mt-3">
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Giỏ hàng của bạn</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col xs={12}>
          {shopcart.length !== 0 ? <AllCartItem shopcart={shopcart} /> : <NullCartItem />}
        </Col>
      </Row>
      <div className="d-flex justify-content-end mb-3">
        {shopcart.length !== 0 ? (
          <Link className="btn btn-primary px-5" to="/checkout">
            Thanh toán
          </Link>
        ) : (
          <Link className="btn btn-primary px-3" to="/allProduct">
            Chọn mua sản phẩm
          </Link>
        )}
      </div>
    </Container>
  );
}

export default ShopcartPage;
