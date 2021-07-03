import ProductCard from "components/ProductCard";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import ListAllProduct from "components/ListAllProduct";
import { comma } from "lib/Helper";
import queryString from "query-string";
import NullPage from "./layout/NullPage";
function AllProductPage(props) {
  const param = queryString.parse(props.location.search);
  const [range, setRange] = useState(1000000);
  const [coffee, setCoffee] = useState(param.type === "0" ? false : true);
  const [other, setOther] = useState(param.type === "1" ? false : true);
  const handleRange = (evt) => {
    setRange(evt.target.value);
  };
  const handleChangeCoffee = (evt) => {
    setCoffee(evt.target.checked);
    console.log(coffee);
  };
  const handleChangeOther = (evt) => setOther(evt.target.checked);
  useEffect(() => {
    console.log(1);
    setCoffee(param.type === "0" ? false : true);
    setOther(param.type === "1" ? false : true);
  }, [param.type]);
  return (
    <Container>
      <Breadcrumb className="fs--11 mt-3">
        <li className="breadcrumb-item">
          <Link to="/">Trang chủ</Link>
        </li>
        <Breadcrumb.Item active>Tất cả sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <h4>Cà phê và đặc sản</h4>
        <Col>
          <h5 className="all-post-title pt-1">Bộ lọc</h5>
          <div className="p-3 bg-light rounded">
            <div className="mb-3 fw--3" id="type-product">
              <p className="mb-1 fs--8 fw--4">Loại sản phẩm</p>
              <div className="form-check form-switch js-apply-filter">
                <Form.Check
                  onChange={handleChangeCoffee}
                  type="checkbox"
                  checked={coffee}
                  id="coffee"
                />
                <label className="form-check-label" htmlFor="coffee">
                  Cà phê
                </label>
              </div>
              <div className="form-check form-switch js-apply-filter">
                <Form.Check
                  type="checkbox"
                  onChange={handleChangeOther}
                  checked={other}
                  id="other-product"
                />
                <label className="form-check-label" htmlFor="other-product">
                  Đặc sản khác
                </label>
              </div>
            </div>
            <div>
              <p className="mb-1 fs--8">Khoảng giá</p>
              <Form.Label className="form-label fw--3">
                0 - <span id="max-price">{comma(range)}₫</span>
              </Form.Label>
              <Form.Range
                min="100000"
                max="1000000"
                step="100000"
                onChange={handleRange}
                defaultValue={range}
                id="price-range"
              />
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} lg={8} xl={9} xxl={10}>
          {!(!coffee && !other) ? (
            <ListAllProduct range={range} coffee={coffee} other={other} />
          ) : (
            <NullPage />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(AllProductPage);
