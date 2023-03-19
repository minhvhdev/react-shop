import { comma, renderImageLink } from "lib/Helper";
import React, { useEffect, useRef } from "react";
import { Form, Row } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { useSelector } from "react-redux";
import { checkShippingFee } from "redux/slice/orderSlice";
import store from "redux/store";
import PromotionForm from "./Form/PromotionForm";
function CheckOutItem() {
  const order = useSelector((state) => state.order).data;
  const address = useSelector((state) => state.address).data;
  const total = order.orderItem.reduce((total, item) => {
    return +item.quantity * +item.product.price + total;
  }, 0);
  const discount = order.promotionCode ? order.promotionCode.discount : 0;
  const shippingFee = order.shippingFee;
  const shippingFeeReal = total < 200000 ? shippingFee : 0;
  const afterDiscount = total * (discount / 100);
  const showCart = useRef(null);
  const handleShowItem = () => {
    const status = showCart.current.classList[4];
    if (status === "hide") {
      showCart.current.classList.replace("hide", "show");
    } else {
      showCart.current.classList.replace("show", "hide");
    }
  };
  useEffect(() => {
    if (address && address.length > 0) {
      console.log(address);
      const districtId = address.filter((item) => {
        return item.mainAddress === true;
      })[0].districtCode;
      store.dispatch(checkShippingFee(districtId));
    }
  }, [address]);
  return (
    <div className="d-flex flex-column">
      <Form.Label>Chi tiết đơn hàng</Form.Label>
      <Row className="mb-3 order-1 position-relative">
        <PromotionForm />
      </Row>
      <div ref={showCart} className="order-5 mb-lg-3 order-lg-2 check-out show">
        {order.orderItem.map((item, i) => {
          const quantity = item.quantity;
          const price = item.product.price;
          return (
            <div key={i} className="check-out__container">
              <div className="check-out__item cart-item__thumb">
                <img
                  src={renderImageLink(item.product.mainImgLink, 1)}
                  alt=""
                  width="100%"
                />
              </div>
              <div className="check-out__item">
                <p>{item.product.name}</p>
                <p>{item.type}</p>
                <p>SL:{item.quantity}</p>
              </div>
              <div className="check-out__item">
                <p>
                  {comma(quantity * price)}
                  <span className="fs--11">₫</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="check-out__total fs--9 order-4 order-lg-3">
        <p>Đơn hàng:</p>
        <div className="flex-grow-1 text-end">
          {order.promotionCode ? (
            <>
              <span>
                {comma(total - afterDiscount)}
                <span className="fs--10">₫ </span>
              </span>
              <BsArrowLeftShort className="icon" />
              <span className="text-decoration-line-through">
                {comma(total)}
              </span>
            </>
          ) : (
            comma(total)
          )}
          <span className="fs--11">₫</span>
        </div>
      </div>
      <div className="check-out__total fs--9 order-3 order-lg-4">
        <p>Phí giao hàng:</p>
        <div className="flex-grow-1 text-end">
          {total < 200000 ? (
            comma(shippingFee)
          ) : (
            <>
              0<span className="fs--11">₫</span>
              <BsArrowLeftShort className="icon" />
              <span className="text-decoration-line-through">
                {comma(shippingFee)}
              </span>
            </>
          )}
          <span className="fs--11">₫</span>
        </div>
      </div>
      <div className="check-out__total fs--6 order-2 order-lg-5">
        <p className="d-none d-lg-block">Tổng cổng:</p>
        <span
          onClick={handleShowItem}
          className="d-block d-lg-none fs--9 text-primary dropdown-toggle cursor--pointer"
        >
          Thông tin đơn hàng
        </span>
        <div className="flex-grow-1 text-end">
          <span>{comma(total - afterDiscount + shippingFeeReal)}</span>
          <span className="fs--10">₫</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CheckOutItem);
