import React, { useState } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AdminPage(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar id="header" bg="dark" variant="dark" className="">
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
            <Nav className="d-block d-lg-none">
              <Nav.Link onClick={handleShow} className="ms-3">
                <AiOutlineMenu
                  style={{ verticalAlign: "text-top" }}
                  className="icon fs--3"
                />
              </Nav.Link>
            </Nav>
          </Navbar>
      </Navbar>
      <div className="admin__container">
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default AdminPage;
