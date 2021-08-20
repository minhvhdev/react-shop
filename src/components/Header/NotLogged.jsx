import React from "react";
import { Accordion, Nav } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";

function NavBar(props) {
  const showLoginForm = props.showLoginForm;
  const showSignupForm = props.showSignupForm;
  console.log("render not logged");
  return (
    <div>
      <Nav className="d-none d-lg-flex text-white">
        <div className="dropdown ms-5 d-none d-lg-block">
          <span className="nav-link dropdown-toggle">
            <span>
              <BiUserCircle className="icon fs--1" />
            </span>
          </span>
          <ul className="dropdown-menu dropdown-menu-dark fw-4">
            <li>
              <span
                onClick={showLoginForm}
                className="dropdown-item cursor--pointer pl-2"
              >
                Đăng nhập
              </span>
            </li>
            <li>
              <span onClick={showSignupForm} className="dropdown-item">
                Đăng ký
              </span>
            </li>
          </ul>
        </div>
      </Nav>
    </div>
  );
}
function Offcanvas(props) {
  const showLoginForm = props.showLoginForm;
  const showSignupForm = props.showSignupForm;
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="nav-link collapse--hover a avatar__collapse">
              <i className="icon-user"></i> Tài khoản
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <ul className="collapse__menu fs--9 fw--3">
              <li>
                <span className="a cursor--pointer" onClick={showLoginForm}>
                  Đăng nhập
                </span>
              </li>
              <li>
                <span className="a cursor--pointer" onClick={showSignupForm}>
                  Đăng ký
                </span>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
const NotLoggedOffcanvas = React.memo(Offcanvas);
const NotLoggedNav = React.memo(NavBar);
export { NotLoggedOffcanvas, NotLoggedNav };
