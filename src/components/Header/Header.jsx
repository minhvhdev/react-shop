import Link from "next/link";
import React, { useState } from "react";
import { Accordion, CloseButton, Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import Shopcart from "./Shopcart";

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const handleCloseLogin = () => {
    setShowLogin(false);
    setShow(false);
  };
  const handleCloseSignup = () => {
    setShowSignup(false);
    setShow(false);
  };
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleShowSignup = () => {
    setShowSignup(true);
  };
  // @ts-ignore
  const logged = useSelector((state) => state.logged);
  return (
    <>
      <Navbar id="header" bg="dark" variant="dark">
        <Container fluid="xl">
          <Link href="/" className="navbar-brand">
            <i className="icon-logo fs--logo"></i>
          </Link>
          <Navbar className="d-none d-md-flex">
            <Link href="/tat-ca-bai-viet" className="me-3 nav-link">
              Bài viết
            </Link>
            <div className="dropdown">
              <Link
                href="/tat-ca-san-pham"
                className="nav-link dropdown-toggle"
              >
                Sản phẩm
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-dark fw-4"
                aria-labelledby=""
              >
                <li>
                  <Link
                    href="/tat-ca-san-pham?type=1"
                    className="dropdown-item"
                  >
                    Cà phê
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tat-ca-san-pham?type=0"
                    className="dropdown-item"
                  >
                    Đặc sản khác
                  </Link>
                </li>
              </ul>
            </div>
          </Navbar>
          <Navbar className="ms-auto">
            <Shopcart />
            <Nav className="d-block d-lg-none">
              <Nav.Link onClick={handleShow} className="ms-3">
                <AiOutlineMenu
                  style={{ verticalAlign: "text-top" }}
                  className="icon fs--3"
                />
              </Nav.Link>
            </Nav>
          </Navbar>
        </Container>
      </Navbar>
      <Offcanvas
        onHide={handleClose}
        placement="end"
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
              <Link href="/" className="nav-link">
                <i className="icon-home"></i> Trang chủ
              </Link>
            </li>
            <li onClick={handleClose} className="nav-item">
              <Link href="/allPost" className="nav-link">
                <i className="icon-post"></i> Bài viết
              </Link>
            </li>
            <li className="pb-3 collapse-group">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <span className="nav-link align-items-center a collapsed collapse--hover">
                      <i className="icon-product"></i> Sản phẩm
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="collapse__menu fs--9 fw--3">
                      <li onClick={handleClose}>
                        <Link href="/allProduct">Tất cả sản phẩm</Link>
                      </li>
                      <li onClick={handleClose}>
                        <Link href="/allProduct?type=1">Cà phê</Link>
                      </li>
                      <li onClick={handleClose}>
                        <Link href="/allProduct?type=0">Đặc sản khác</Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default React.memo(Header);
