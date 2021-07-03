import React, { useState } from "react";
import { CloseButton, Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { LoggedNav, LoggedOffcanvas } from "./Logged";
import LoginForm from "./LoginForm";
import { NotLoggedNav, NotLoggedOffcanvas } from "./NotLogged";
import Shopcart from "./Shopcart";

function Header() {
  //show offsetcanvas bootstrap mặc định
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => {
    setShowLogin(true);
    setShow(false);
  };
  // @ts-ignore
  const logged = useSelector((state) => state.logged);
  return (
    <>
      {console.log("render Header")}
      <Navbar id="header" bg="dark" variant="dark" className="">
        <Container fluid="xl">
          <Link className="navbar-brand" to="/">
            <i className="icon-logo fs--logo"></i>
          </Link>
          <Navbar className="d-none d-md-flex">
            <Link className="me-3 nav-link" to="/allPost">
              Bài viết
            </Link>
            <div className="dropdown">
              <Link className="nav-link dropdown-toggle" to="/allProduct">
                Sản phẩm
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-dark fw-4"
                aria-labelledby=""
              >
                <li>
                  <Link className="dropdown-item" to="/allProduct?type=1">
                    Cà phê
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/allProduct?type=0">
                    Đặc sản khác
                  </Link>
                </li>
              </ul>
            </div>
          </Navbar>
          <Navbar className="ms-auto">
            {logged.data.fullName ? (
              <LoggedNav />
            ) : (
              <NotLoggedNav showLoginForm={handleShowLogin} />
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
        scroll={false}
      >
        <Offcanvas.Header>
          <i className="icon-logo-full fs--logo"></i>
          <CloseButton variant="white" onClick={handleClose} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column fs--8">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="icon-home"></i> Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/allPost" className="nav-link">
                <i className="icon-post"></i> Bài viết
              </Link>
            </li>
            <li className="pb-3 collapse-group">
              <span className="nav-link align-items-center a collapsed collapse--hover">
                <i className="icon-product"></i> Sản phẩm
              </span>
              <div className="collapse" id="orders-collapse">
                <ul className="collapse__menu fs--9 fw--3">
                  <li>
                    <Link to="/allProduct">Tất cả sản phẩm</Link>
                  </li>
                  <li>
                    <Link href="/allProduct?type=1">Cà phê</Link>
                  </li>
                  <li>
                    <Link href="/allProduct?type=0">
                      Đặc sản khác
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="pt-3 collapse-group border-top">
              {logged.data.fullName ? (
                <LoggedOffcanvas />
              ) : (
                <NotLoggedOffcanvas showLoginForm={handleShowLogin} />
              )}
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      {showLogin ? <LoginForm handleClose={handleCloseLogin} /> : null}
    </>
  );
}

export default React.memo(Header);
