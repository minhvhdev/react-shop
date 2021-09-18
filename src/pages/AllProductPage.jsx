import ListAllProduct from "components/ListAllProduct";
import { comma } from "lib/Helper";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Accordion, Breadcrumb, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NullPage from "./layout/NullPage";
function AllProductPage(props) {
  const param = queryString.parse(props.location.search);
  // @ts-ignore
  const products = useSelector((state) => state.products).data;
  const [range, setRange] = useState(300000);
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
        <Col className="p-0">
          <div className="shadow d-none d-md-block p-3">
            <h5 className="all-post-title pt-1">Bộ lọc</h5>
            <div className="bg-light rounded">
              <div className="mb-3 fw--3" id="type-product">
                <p className="mb-1 fs--8 fw--4">Loại sản phẩm</p>
                <div className="form-check form-switch">
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
                <div className="form-check form-switch">
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
                  min="50000"
                  max="300000"
                  step="25000"
                  onChange={handleRange}
                  defaultValue={range}
                  id="price-range"
                />
              </div>
            </div>
          </div>
          <Accordion className="shadow d-block d-md-none mb-3">
            <Accordion.Item className="border-0" eventKey="0">
              <Accordion.Header>
                <h5 className="pt-1">Bộ lọc</h5>
              </Accordion.Header>
              <Accordion.Body>
                <div className="rounded">
                  <div className="mb-3 fw--3" id="type-product">
                    <p className="mb-1 fs--8 fw--4">Loại sản phẩm</p>
                    <div className="form-check form-switch">
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
                    <div className="form-check form-switch">
                      <Form.Check
                        type="checkbox"
                        onChange={handleChangeOther}
                        checked={other}
                        id="other-product"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="other-product"
                      >
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
                      min="50000"
                      max="300000"
                      step="25000"
                      onChange={handleRange}
                      defaultValue={range}
                      id="price-range"
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs={12} md={8} xl={9} xxl={10} className="shadow pt-3">
          {!(!coffee && !other) ? (
            <ListAllProduct
              products={products}
              range={range}
              coffee={coffee}
              other={other}
            />
          ) : (
            <NullPage />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(AllProductPage);
