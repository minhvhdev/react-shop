import { comma, formatDateTime, renderImageLink } from "lib/Helper";
import React, { useState } from "react";
import { FaPercentage, FaShippingFast } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function OrderElement(props) {
  const order = props.order;
  const [show, setShow] = useState(false);
  const handleDetail = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const total = order.orderItem.reduce((ini, item) => {
    return ini + item.price*item.quantity;
  }, 0);
  return (
    <div className="shadow p-3 mb-3">
      <div className="d-flex justify-content-between">
        <div>
          <div>
            <FaShippingFast className="d-md-none d-inline icon" />
            <span className="d-none d-md-inline">Phí vận chuyển:</span>{" "}
            {comma(order.shippingFee)}₫
          </div>
          <div>
            <FaPercentage className="d-md-none d-inline icon" />
            <span className="d-none d-md-inline">Khuyến mãi:</span>{" "}
            {order.promotionCode ? order.promotionCode.discount : 0}%
          </div>
          <div className="fs--11 mt-2 text-muted">
            {formatDateTime(order.orderDate, false)}
          </div>
        </div>
        <div className="text-end">
          <div>
            <span className="fs--6 text-dange">{comma(total)}</span>₫
          </div>
          <div className="text--link mt-3" onClick={handleDetail}>
            Xem chi tiết
          </div>
        </div>
      </div>
      {show ? (
        <div className="check-out show">
          {order.orderItem.map((item, i) => {
            const quantity = item.quantity;
            const price = item.product.price;
            console.log(i);
            return (
              <div
                key={i}
                className="check-out__container border-top pt-3 mt-3"
              >
                <div className="check-out__item cart-item__thumb">
                  <Link to={`/product?id=` + item.product.id}>
                    <img
                      src={renderImageLink(item.product.mainImgLink, 1)}
                      alt=""
                      width="100%"
                    />
                  </Link>
                </div>
                <div className="check-out__item">
                  <Link to={`/product?id=` + item.product.id}>
                    {item.product.name}
                  </Link>
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
      ) : null}
    </div>
  );
}

export default React.memo(OrderElement);
