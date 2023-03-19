import Link from "next/link";
import { Accordion, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { resetAddress } from "redux/slice/addressSlice";
import { resetOrder } from "redux/slice/orderSlice";
import { resetCart } from "redux/slice/shopcartSlice";
import { logout } from "redux/slice/userSlice";
import store from "redux/store";

const handleLogoutClick = () => {
  store.dispatch(logout());
  store.dispatch(resetCart());
  store.dispatch(resetAddress());
  store.dispatch(resetOrder());
};
export function LoggedNav(props) {
  const logged = useSelector((state) => state.logged);
  return (
    <>
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
              <Link href="/user/my-account" className="dropdown-item">
                Tài khoản
              </Link>
            </li>
            <li>
              <Link href="/user/liked-product" className="dropdown-item">
                Sản phẩm yêu thích
              </Link>
            </li>
            <li>
              <Link href="/user/my-orders" className="dropdown-item">
                Đơn hàng của tôi
              </Link>
            </li>
            {logged.data.role === "ROLE_ADMIN" ? (
              <li>
                <Link href="/admin/pending-orders" className="dropdown-item">
                  Trang quản trị
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
    </>
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
                <Link href="//user/my-account">Tài khoản</Link>
              </li>
              <li onClick={handleClose}>
                <Link href="/user/liked-product">Sản phẩm yêu thích</Link>
              </li>
              <li onClick={handleClose}>
                <Link href="/user/my-orders">Đơn hàng của tôi</Link>
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
