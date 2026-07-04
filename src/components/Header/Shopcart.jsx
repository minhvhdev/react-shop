import React from 'react';
import { Nav } from 'react-bootstrap';
import { AiFillShopping } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Link from 'next/link';

function Shopcart() {
  const shopcart = useSelector((state) => state.shopcart).data;
  const numItem =
    shopcart?.reduce((total, item) => {
      return total + item.quantity;
    }, 0) ?? 0;

  return (
    <Nav id="shopcart">
      <Link href="/buyer/shopcart" className="ms-2 position-relative nav-link">
        Giỏ hàng
        <AiFillShopping className="icon fs--1" />
        <span className="shopcart__item">{numItem}</span>
      </Link>
    </Nav>
  );
}

export default React.memo(Shopcart);
