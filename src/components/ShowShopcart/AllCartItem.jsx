import { removeItem, updateQuantity } from "app/slice/shopcartSlice";
import InputNumber from "components/InputNumber";
import { comma, renderImageLink } from "lib/Helper";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { CloseButton, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

AllCartItem.propTypes = {
  shopcart: PropTypes.array.isRequired,
};
function AllCartItem(props) {
  const shopcart = useSelector((state) => state.shopcart).data;
  const arrLength = shopcart.length;
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const handleChange = (value, index) => {
    dispatch(updateQuantity({ value, index }));
  };
  const handleRemove = (evt) => {
    dispatch(removeItem(evt.target.getAttribute("data-index")));
  };
  
  useEffect(() => {
    setTotalPrice(shopcart.reduce((total,item)=>{
      console.log(item);
      return +item.quantity*+item.product.price+total;
    },0));
  }, [shopcart]);
  return (
    <>
      {console.log("render a;lsfjl;ạk")}
      <Row id="shopcart__item">
        <div className="border-bottom fs--9 fw--3 d-flex justify-content-between">
          <span>Sản phẩm trong giỏ</span>
          <span className="ms-auto">Thành tiền</span>
        </div>
        <Col xs={12}>
          {arrLength > 0
            ? shopcart.map((item, i) => {
                const price = item.product.price;
                const quantity = item.quantity;
                const total = price * quantity;
                return (
                  <div className="cart-item__container" key={i}>
                    <CloseButton
                      onClick={handleRemove}
                      data-index={i}
                      className="close-button"
                    ></CloseButton>
                    <div className="cart-item__item cart-item__thumb">
                      <img
                        src={renderImageLink(item.product.mainImgLink, 1)}
                        alt=""
                        width="100%"
                      />
                    </div>
                    <div className="cart-item__item">
                      <div>
                        <p>{item.product.name}</p>
                        <p>{comma(price)}₫</p>
                        <p>{item.type}</p>
                      </div>
                    </div>
                    <div className="cart-item__item">
                      <div className="element--center position-relative ">
                        <InputNumber
                          index={i}
                          onChange={handleChange}
                          className="small"
                          value={quantity}
                        />
                      </div>
                    </div>
                    <div className="cart-item__item vertical__block">
                      <p className="text-end fs--8 vertical--center">
                        {comma(total)}₫
                      </p>
                    </div>
                  </div>
                );
              })
            : null}
        </Col>
        <div className="fs--7 mb-3 pt-3 d-flex justify-content-between">
          <span>Tổng cộng:</span>
          <span className="ms-auto">{comma(totalPrice)}₫</span>
        </div>
      </Row>
    </>
  );
}

export default React.memo(AllCartItem);
