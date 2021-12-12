import ShopcartApi from "api/ShopcartApi";
import { removeItem } from "app/slice/shopcartSlice";
import InputNumber from "components/InputNumber";
import Message from "components/Message";
import { NOTI } from "constants/index";
import { comma, renderImageLink } from "lib/Helper";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { GoTrashcan } from "react-icons/go";
// @ts-ignore
import { store as noti } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

function AllCartItem(props, refs) {
  //@ts-ignore
  const shopcart = useSelector((state) => state.shopcart).data;
  const totalPrice = shopcart.reduce((total, item) => {
    return +item.quantity * +item.product.price + total;
  }, 0);
  const [quantity, setQuantity] = useState("[]");
  const dispatch = useDispatch();
  const handleChange = (value, index) => {
    const quan = JSON.parse(quantity);
    let isExist = false;
    quan.forEach((element) => {
      if (element.index === index) {
        element.value = value;
        isExist = true;
      }
    });
    if (!isExist) {
      quan.push({ index, value });
    }

    setQuantity(JSON.stringify(quan));
  };
  const handleRemove = (evt, index) => {
    noti.addNotification({
      ...NOTI,
      message: <Message type="success" mess="Xóa sản phẩm thành công" />,
      type: "success",
      dismiss: {
        duration: 2000,
      },
      width: 160,
    });
    dispatch(removeItem(index));
    const item = shopcart[index];
    ShopcartApi.removeCartItem({ id: item.product.id, type: item.type });
  };
  return (
    <>
      <input ref={refs} type="hidden" value={quantity} />
      <Row id="shopcart__item">
        <div className="border-bottom fs--9 fw--3 d-flex justify-content-between">
          <span>Sản phẩm trong giỏ</span>
          <span className="ms-auto">Thành tiền</span>
        </div>
        <Col xs={12}>
          {shopcart.length > 0
            ? shopcart.map((item, i) => {
                const price = item.product.price;
                const quantity = item.quantity;
                const total = price * quantity;
                return (
                  <div className="cart-item__container" key={i}>
                    <Button
                      variant="outline-danger py-0"
                      onClick={(evt) => handleRemove(evt, i)}
                      className="close-button"
                    >
                      <GoTrashcan />
                    </Button>
                    <div className="cart-item__item cart-item__thumb">
                      <Link href={"/product?id=" + item.product.id}>
                        <a>
                          <img
                            src={renderImageLink(item.product.mainImgLink, 1)}
                            alt=""
                            width="100%"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="cart-item__item">
                      <div>
                        <Link                          
                          href={"/product?id=" + item.product.id}
                        >
                          <a className="link--text">{item.product.name}</a>
                        </Link>
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

export default React.memo(React.forwardRef(AllCartItem));
