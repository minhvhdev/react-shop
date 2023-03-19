import ProductApi from "api/ProductApi";
import ProductDetail from "components/ProductDetail/ProductDetail";
import ProductDetailImage from "components/ProductDetail/ProductDetailImage";
import ProductRating from "components/ProductRating/ProductRating";
import {
    convertToUrl, getIdFromUrl, renderImageLink,
    shortDescriptionProduct
} from "lib/Helper";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Breadcrumb, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

function ProductPage({ product }) {
  const [key, setKey] = useState("description");
  return (
    <>
      <Head>
        <title>{`${product.coffee ? "Cà phê" : ""} ${product.name}`}</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${product.coffee ? "Cà phê" : ""} ${product.name}`}
        />
        <meta
          property="og:image"
          content={renderImageLink(product.mainImgLink, 4)}
          data-rh="true"
        />
        <meta
          property="og:description"
          content={shortDescriptionProduct(product.description)}
        />
        <meta property="og:url" content="https://caphethodung.vn" />
        <meta property="og:site_name" content="Cà Phê Thơ Dũng" />
      </Head>
      <Container>
        <Breadcrumb className="fs--11 mt-3">
          <li className="breadcrumb-item">
            <Link href="/">
              Trang chủ
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/allProduct">
              Tất cả sản phẩm
            </Link>
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
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </Tab>
              <Tab eventKey="rating" title="Các đánh giá">
                <ProductRating productId={product.id} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export async function getStaticProps({ params }) {
  const productId = getIdFromUrl(params.product);
  const products = await ProductApi.getAll();
  const product = products.filter((el) => el.id == productId)[0];
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const products = await ProductApi.getAll();
  const paths = products.map((product) => ({
    params: { product: convertToUrl(`${product.name}-${product.id}`) },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default React.memo(ProductPage);
