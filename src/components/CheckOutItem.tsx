import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { comma, renderImageLink } from 'helper';
import { RootState } from 'redux/store';

const CheckOutItem: React.FC = () => {
  const order = useSelector((state: RootState) => state.order).data;
  const total = order.orderItems.reduce((total, item) => {
    return +item.quantity * +item.product.price + total;
  }, 0);
  const discount = order.promotionCode ? order.promotionCode.discount : 0;
  const shippingFee = order.shippingFee;
  const shippingFeeReal = total < 200000 && shippingFee ? shippingFee : 0;
  const afterDiscount = total * (discount / 100);
  const showCart = useRef<HTMLDivElement>(null);

  const handleShowItem = () => {
    if (!showCart.current) return;
    const status = showCart.current.classList[4];
    if (status === 'hide') {
      showCart.current.classList.replace('hide', 'show');
    } else {
      showCart.current.classList.replace('show', 'hide');
    }
  };

  return (
    <div className="d-flex flex-column">
      <Form.Label>Chi tiết đơn hàng</Form.Label>
      {/* <Row className="mb-3 order-1 position-relative">
        <PromotionForm />
      </Row> */}
      <div ref={showCart} className="order-5 mb-lg-3 order-lg-2 check-out show">
        {order.orderItems.map((item, i) => {
          const quantity = item.quantity;
          const price = item.product.price;
          return (
            <div key={i} className="check-out__container">
              <div className="check-out__item cart-item__thumb">
                <img src={renderImageLink(item.product.mainImgLink, 1)} alt="" width="100%" />
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
              <span className="text-decoration-line-through">{comma(total)}</span>
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
            comma(shippingFee || 0)
          ) : (
            <>
              0<span className="fs--11">₫</span>
              <BsArrowLeftShort className="icon" />
              <span className="text-decoration-line-through">{comma(shippingFee || 0)}</span>
            </>
          )}
          <span className="fs--11">₫</span>
        </div>
      </div>
      <div className="check-out__total fs--6 order-2 order-lg-5">
        <p className="d-none d-lg-block">Tổng cổng:</p>
        <span
          onClick={handleShowItem}
          className="d-block d-lg-none fs--9 text-primary dropdown-toggle cursor--pointer">
          Thông tin đơn hàng
        </span>
        <div className="flex-grow-1 text-end">
          <span>{comma(total - afterDiscount + shippingFeeReal)}</span>
          <span className="fs--10">₫</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CheckOutItem);
