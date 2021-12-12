import { resetAddress } from "app/slice/addressSlice";
import { resetOrder } from "app/slice/orderSlice";
import { resetCart } from "app/slice/shopcartSlice";
import { logout } from "app/slice/userSlice";
import store from "app/store";
import React from "react";
import { Accordion, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

const handleLogoutClick = () => {
  store.dispatch(logout());
  store.dispatch(resetCart());
  store.dispatch(resetAddress());
  store.dispatch(resetOrder());
};
export function LoggedNav(props) {
  // @ts-ignore
  const logged = useSelector((state) => state.logged);
  return (
    <Nav className="text-white">
      {console.log("render logged")}
      <div className="dropdown ms-5 d-none d-lg-block">
        <span className="nav-link avatar__dropdown dropdown-toggle">
          <span>
            <img
              alt="avatar"
              draggable="false"
              src={logged.data.avatarLink}
            ></img>
            <span>{logged.data.fullName}</span>
          </span>
        </span>
        <ul className="dropdown-menu dropdown-menu-dark fw-4">
          <li>
            <Link className="dropdown-item" href="/myAccount">
              <a>Tài khoản</a>
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/myfavs">
              <a>Sản phẩm yêu thích</a>
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/myOrder">
              <a>Đơn hàng của tôi</a>
            </Link>
          </li>
          {logged.data.role === "ROLE_ADMIN" ? (
            <li>
              <Link className="dropdown-item" href="/admin">
                <a>Trang quản trị</a>
              </Link>
            </li>
          ) : null}
          <li
            className="dropdown-item cursor--pointer"
            onClick={handleLogoutClick}
          >
            Đăng xuất
          </li>
        </ul>
      </div>
    </Nav>
  );
}
export function LoggedOffcanvas(props) {
  // @ts-ignore
  const logged = useSelector((state) => state.logged);
  const handleClose = props.close;
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="nav-link collapse--hover a avatar__collapse">
              <span>
                <img
                  alt="avatar"
                  draggable="false"
                  src={logged.data.avatarLink}
                ></img>
                <span>{logged.data.fullName}</span>
              </span>
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <ul className="collapse__menu fs--8 fw--3">
              <li onClick={handleClose}>
                <Link href="/myAccount"><a>Tài khoản</a></Link>
              </li>
              <li onClick={handleClose}>
                <Link href="/myfavs"><a>Sản phẩm yêu thích</a></Link>
              </li>
              <li onClick={handleClose}>
                <Link href="/myOrder"><a>Đơn hàng của tôi</a></Link>
              </li>
              <li onClick={handleClose}>
                <span className="a cursor--pointer" onClick={handleLogoutClick}>
                  Đăng xuất
                </span>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
