import { logout } from "app/slice/headerSlice";
import React from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function LoggedNav(props) {
  const dispatch = useDispatch();
  // @ts-ignore
  const logged = useSelector((state) => state.logged);
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };
  return (
    <Nav className="text-white">{console.log("render logged")}
      <div className="dropdown ms-5 d-none d-lg-block">
        <span className="nav-link avatar__dropdown dropdown-toggle">
          <span>
            <img alt="avatar" draggable="false" src={logged.data.avatarLink}></img>
            <span>{logged.data.fullName}</span>
          </span>
        </span>
        <ul className="dropdown-menu dropdown-menu-dark fw-4">
          <li>
            <a className="dropdown-item" href="/account">
              Tài khoản
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/myfavs">
              Sản phẩm yêu thích
            </a>
          </li>
          <li>
            <Link className="dropdown-item" to="/myOrder">
              Đơn hàng của tôi
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/promo">
              Khuyến mãi
            </Link>
          </li>
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
  const dispatch = useDispatch();
  // @ts-ignore
  const logged = useSelector((state) => state.logged);
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };
  return (
    <>
      <span className="nav-link collapse--hover avatar__collapse">
        <span>
          <img alt="avatar" draggable="false" src={logged.data.avatarLink}></img>
          <span>{logged.data.fullName}</span>
        </span>
      </span>
      <div className="collapse" id="user-collapse">
        <ul className="collapse__menu fs--9 fw--3">
          <li>
            <a href="/account">Tài khoản</a>
          </li>
          <li>
            <a href="/favProduct">Sản phẩm yêu thích</a>
          </li>
          <li>
            <a href="/myOrder">Đơn hàng của tôi</a>
          </li>
          <li>
            <a href="/myAddress">Địa chỉ của tôi</a>
          </li>
          <li>
            <a href="/promo">Khuyến mãi</a>
          </li>
          <li>
            <span className="a cursor--pointer" onClick={handleLogoutClick}>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </>
  );
}
