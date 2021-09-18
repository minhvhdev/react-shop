import { logout } from "app/slice/userSlice";
import store from "app/store";
import React, { useState } from "react";
import {
  Button,
  CloseButton,
  Container,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AdminHeader() {
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    store.dispatch(logout());
  };
  return (
    <>
      <Navbar id="header" bg="dark" variant="dark">
        <Container fluid="xl">
          <Nav className="d-block d-md-none">
            <Nav.Link onClick={handleShow}>
              <AiOutlineMenu
                style={{ verticalAlign: "text-top" }}
                className="icon fs--3"
              />
            </Nav.Link>
          </Nav>
          <Nav className="d-none d-md-flex">
            <Link replace 
              className={`me-5 nav-link admin__nav--link ${
                tab === 1 ? "active" : ""
              }`}
              to="/admin/pendingOrder"
              onClick={() => setTab(1)}
            >
              ĐƠN ĐẶT HÀNG
            </Link>
            <Link replace 
              className={`me-5 nav-link admin__nav--link ${
                tab === 2 ? "active" : ""
              }`}
              to="/admin/shippingOrder"
              onClick={() => setTab(2)}
            >
              ĐƠN ĐANG GIAO
            </Link>
            <Link replace 
              className={`me-5 nav-link admin__nav--link ${
                tab === 3 ? "active" : ""
              }`}
              to="/admin/allOrder"
              onClick={() => setTab(3)}
            >
              LỊCH SỬ
            </Link>
            <Link replace 
              className={`nav-link admin__nav--link ${
                tab === 4 ? "active" : ""
              }`}
              to="/admin/promotion"
              onClick={() => setTab(4)}
            >
              MÃ GIẢM GIÁ
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Offcanvas
        onHide={handleClose}
        placement="start"
        id="offcanvas"
        show={show}
        backdrop={true}
        // scroll={true}
        enforceFocus={false}
      >
        <Offcanvas.Header>
          <i className="icon-logo-full fs--logo"></i>
          <CloseButton variant="white" onClick={handleClose} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column fs--8">
            <li onClick={handleClose} className="nav-item">
              <Link replace 
                className={`nav-link admin__nav--link ${
                  tab === 1 ? "active" : ""
                }`}
                to="/admin/pendingOrder"
                onClick={() => setTab(1)}
              >
                Đơn đặt hàng
              </Link>
            </li>
            <li onClick={handleClose} className="nav-item">
              <Link replace 
                className={`nav-link admin__nav--link ${
                  tab === 2 ? "active" : ""
                }`}
                to="/admin/shippingOrder"
                onClick={() => setTab(2)}
              >
                Đơn đang giao
              </Link>
            </li>
            <li onClick={handleClose} className="nav-item">
              <Link replace 
                className={`nav-link admin__nav--link ${
                  tab === 3 ? "active" : ""
                }`}
                to="/admin/allOrder"
                onClick={() => setTab(3)}
              >
                Lịch sử
              </Link>
            </li>
            <li onClick={handleClose} className="nav-item">
              <Link replace 
                className={`nav-link admin__nav--link ${
                  tab === 4 ? "active" : ""
                }`}
                to="/admin/promotion"
                onClick={() => setTab(4)}
              >
                Mã giảm giá
              </Link>
            </li>
            <li className="pb-3 collapse-group"></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default React.memo(AdminHeader);
