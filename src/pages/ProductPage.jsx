import ProductDetail from "components/ProductDetail/ProductDetail";
import ProductDetailImage from "components/ProductDetail/ProductDetailImage";
import ProductRating from "components/ProductRating/ProductRating";
import queryString from "query-string";
import ReactMarkdown from "react-markdown";
import React, { useState } from "react";
import { Breadcrumb, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";
import Loading from "../layout/Loading";
import NotFound from "../layout/NotFound";

function ProductPage(props) {
  const [key, setKey] = useState("description");
  const param = queryString.parse(window.location.hash);
  console.log(param);
  const productId = param["product?id"];
  // @ts-ignore
  const products = useSelector((state) => state.products);
  let product = products.data.filter((value) => {
    return value.id === +productId;
  })[0];
  console.log("render ProductPage");
  return (
    <>
      {products.status === "loading" ? (
        <Loading />
      ) : product ? (
        <Container>
          <Breadcrumb className="fs--11 mt-3">
            <li className="breadcrumb-item">
              <Link href="/"><a>Trang chủ</a></Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/allProduct"><a>Tất cả sản phẩm</a></Link>
            </li>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xs={12} md={6}>
              <ProductDetailImage product={product} />
            </Col>
            <Col xs={12} md={6}>
              <ProductDetail product={product} />
            </Col>
          </Row>
          <hr />
          <Row className="border-top-1">
            <Col xs={12}>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="description" title="Mô tả sản phẩm">                 
                  <ReactMarkdown>
                  {product.description}
                  </ReactMarkdown>
                </Tab>
                <Tab eventKey="rating" title="Các đánh giá">
                  <ProductRating productId={+productId} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default React.memo(ProductPage);
