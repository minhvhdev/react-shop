import SignUpForm from "components/Form/SignUpForm";
import React, { useState } from "react";
import { Accordion, CloseButton, Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import Link from "next/link";
import LoginForm from "../Form/LoginForm";
import { LoggedNav, LoggedOffcanvas } from "./Logged";
import { NotLoggedNav, NotLoggedOffcanvas } from "./NotLogged";
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
          <Link href="/">
            <a className="navbar-brand">
              <i className="icon-logo fs--logo"></i>
            </a>
          </Link>
          <Navbar className="d-none d-md-flex">
            <Link href="/tat-ca-bai-viet">
              <a className="me-3 nav-link">Bài viết</a>
            </Link>
            <div className="dropdown">
              <Link href="/tat-ca-san-pham">
                <a className="nav-link dropdown-toggle">Sản phẩm</a>
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-dark fw-4"
                aria-labelledby=""
              >
                <li>
                  <Link href="/tat-ca-san-pham?type=1">
                    <a className="dropdown-item">Cà phê</a>
                  </Link>
                </li>
                <li>
                  <Link href="/tat-ca-san-pham?type=0">
                    <a className="dropdown-item">Đặc sản khác</a>
                  </Link>
                </li>
              </ul>
            </div>
          </Navbar>
          <Navbar className="ms-auto">
            {logged.data ? (
              <LoggedNav />
            ) : (
              <NotLoggedNav
                showLoginForm={handleShowLogin}
                showSignupForm={handleShowSignup}
              />
            )}
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
              <Link href="/">
                <a className="nav-link">
                  <i className="icon-home"></i> Trang chủ
                </a>
              </Link>
            </li>
            <li onClick={handleClose} className="nav-item">
              <Link href="/allPost">
                <a className="nav-link"><i className="icon-post"></i> Bài viết</a>
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
                        <Link href="/allProduct">
                          <a>Tất cả sản phẩm</a>
                        </Link>
                      </li>
                      <li onClick={handleClose}>
                        <Link href="/allProduct?type=1">
                          <a>Cà phê</a>
                        </Link>
                      </li>
                      <li onClick={handleClose}>
                        <Link href="/allProduct?type=0">
                          <a>Đặc sản khác</a>
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>
            <li className="pt-3 collapse-group border-top">
              {logged.data ? (
                <LoggedOffcanvas close={handleClose} />
              ) : (
                <NotLoggedOffcanvas
                  showLoginForm={handleShowLogin}
                  showSignupForm={handleShowSignup}
                />
              )}
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      {showLogin ? (
        <LoginForm
          handleClose={handleCloseLogin}
          handleShowSignup={handleShowSignup}
        />
      ) : null}
      {showSignup ? <SignUpForm handleClose={handleCloseSignup} /> : null}
    </>
  );
}

export default React.memo(Header);
