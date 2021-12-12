import ProductApi from "api/ProductApi";
import ListAllProduct from "components/ListAllProduct";
import { comma } from "lib/Helper";
import React, { useEffect, useState } from "react";
import { Accordion, Breadcrumb, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import Loading from "../../layout/Loading";
import NullPage from "../../layout/NullPage";
function LikedProductPage(props) {
  const [status, setStatus] = useState("loading");
  const [list, setList] = useState([]);
  const [range, setRange] = useState(1000000);
  const [coffee, setCoffee] = useState(true);
  const [other, setOther] = useState(true);
  const handleRange = (evt) => {
    setRange(evt.target.value);
  };
  const handleChangeCoffee = (evt) => {
    setCoffee(evt.target.checked);
    console.log(coffee);
  };
  const handleChangeOther = (evt) => setOther(evt.target.checked);
  useEffect(() => {
    ProductApi.getLiked()
      .then((res) => {
        // @ts-ignore
        const len = res.length;
        if (len > 0) {
          // @ts-ignore
          setList(res);
          setStatus("success");
        } else {
          setStatus("null");
        }
      })
      .catch(() => {
        setStatus("null");
      });
  }, []);
  return (
    <Container>
      <Breadcrumb className="fs--11 mt-3">
        <li className="breadcrumb-item">
          <Link href="/"><a>Trang chủ</a></Link>
        </li>
        <Breadcrumb.Item active>Sản phẩm yêu thích</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <h4>Danh sách sản phẩm yêu thích</h4>
        <Col xs={12} md={4} xl={3} xxl={2} className="p-0">
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
        {status === "loading" ? (
          <Loading />
        ) : (
          <Col xs={12} md={8} xl={9} xxl={10} className="shadow pt-3">
            {!(!coffee && !other) ? (
              <ListAllProduct
                products={list}
                range={range}
                coffee={coffee}
                other={other}
              />
            ) : (
              <NullPage />
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default React.memo(LikedProductPage);
