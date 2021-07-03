import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { AiFillShopping } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Shopcart() {
  // @ts-ignore
  const shopcart = useSelector((state) => state.shopcart).data;
  const [numItem, setNumItem] = useState();
  const [show, setShow] = useState(-2);
  useEffect(() => {
    const len = shopcart.length || 0;
    const quantity = len?shopcart.reduce((total,item)=>{
      return total+item.quantity
    },0):0;
    if (show === -2) {
      setShow(0);
      setNumItem(quantity);
    } else {
      setNumItem(quantity);
      setShow(1);
      setTimeout(() => {
        setShow(-1);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopcart]);
  return (
    <Nav id="shopcart">
      <Link to="/shopcart" className="ms-2 position-relative nav-link">
        Giỏ hàng
        <AiFillShopping className="icon fs--1" />
        <span className="shopcart__item">{numItem}</span>
      </Link>
      <div
        className={`shopcart__noti ${
          show === 1 ? "show" : show === -1 ? "hide" : null
        }`}
      >
        <div className="shopcart__noti--top"></div>
        Cập nhật thành công
      </div>
    </Nav>
  );
}

export default React.memo(Shopcart);
