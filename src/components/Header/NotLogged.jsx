import React from "react";
import { Nav } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";

export function NotLoggedNav(props) {
  const showLoginForm = props.showLoginForm;
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
              <span onClick={showLoginForm} className="dropdown-item cursor--pointer pl-2">
                Đăng nhập
              </span>
            </li>
            <li>
              <a className="dropdown-item" href="/signup">
                Đăng ký
              </a>
            </li>
          </ul>
        </div>
      </Nav>
    </div>
  );
}
export function NotLoggedOffcanvas(props) {
  const showLoginForm = props.showLoginForm;
  return (
    <>
      <span className="nav-link align-items-center a collapsed collapse--hover">
        <i className="icon-user"></i> Tài khoản
      </span>
      <div className="collapse" id="user-collapse">
        <ul className="collapse__menu fs--9 fw--3">
          <li>
            <span className="a cursor--pointer" onClick={showLoginForm}>Đăng nhập</span>
          </li>
          <li>
            <a href="/signup">Đăng ký</a>
          </li>
        </ul>
      </div>
    </>
  );
}
