import OrderApi from "api/OrderApi";
import OrderElement from "components/OrderElement";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Loading from "./layout/Loading";
import NullPage from "./layout/NullPage";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");
  const [offset, setOffset] = useState(0);
  const perPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };
  useEffect(() => {
    OrderApi.getMyOrder().then((res) => {
      // @ts-ignore
      setOrders(res);
      if (!res.length) {
        setStatus("null");
      } else {
        // @ts-ignore
        setPageCount(Math.ceil(res.length / perPage));
        setStatus("idle");
      }
    });
  }, []);
  return (
    <Container>
      <Breadcrumb className="fs--11 mt-3">
        <li className="breadcrumb-item">
          <Link to="/">Trang chủ</Link>
        </li>
        <Breadcrumb.Item active>Đơn hàng của tôi</Breadcrumb.Item>
      </Breadcrumb>
      <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        <Row>
          <Col xs={12} md={3} className="mb-3 mb-md-0">
            <Nav variant="pills" className="flex-row flex-md-column shadow-lg">
              <Nav.Item>
                <Nav.Link eventKey="1">Tất cả</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2">Chờ xác nhận</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3">Chờ giao hàng</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={12} md={9} className="position-relative">
            {status === "loading" ? (
              <Loading type="inline" />
            ) : status === "null" ? (
              <NullPage />
            ) : (
              <Tab.Content>
                <Tab.Pane eventKey="1">
                  {orders
                    .slice(offset, offset + perPage)
                    .map((order, index) => {
                      return <OrderElement key={index} order={order} />;
                    })}
                  {pageCount > 1 ? (
                    <div className="d-flex justify-content-center mt-2">
                      <ReactPaginate
                        previousLabel={<GrCaretPrevious />}
                        nextLabel={<GrCaretNext />}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                      />
                    </div>
                  ) : null}
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  {orders
                    .filter((order) => {
                      return !order.orderStatus;
                    })
                    .map((order, index) => {
                      return <OrderElement key={index} order={order} />;
                    })}
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  {orders
                    .filter((order) => {
                      return order.orderStatus;
                    })
                    .map((order, index) => {
                      return <OrderElement key={index} order={order} />;
                    })}
                </Tab.Pane>
              </Tab.Content>
            )}
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default MyOrdersPage;
