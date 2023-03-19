import ProductApi from "api/ProductApi";
import ShopcartApi from "api/ShopcartApi";
import InputNumber from "components/InputNumber";
import Message from "components/Message";
import { NOTI } from "constants/index";
import { comma } from "lib/Helper";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
    MdAddShoppingCart,
    MdFavorite,
    MdFavoriteBorder,
    MdLocalShipping,
    MdSentimentVerySatisfied
} from "react-icons/md";

import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { createBuyNowOrder } from "redux/slice/orderSlice";
import { addToCart } from "redux/slice/shopcartSlice";
import store from "redux/store";
import InputCoffeeType from "./InputCoffeeType";

function ProductDetail({ product }) {
  const logged = useSelector((state) => state.logged);
  const [type, setType] = useState(product.type ? "Bột" : null);
  const [liked, setLiked] = useState(false);
  const rates = useSelector((state) => state.rates);
  const numberRate = rates.data.length || 0;
  const inputQuantity = useRef(null);

  let totalRating = rates.data.reduce((total, item) => {
    return total + item.star;
  }, 0);

  const handleUnLike = () => {
    setLiked(false);
    // noti.addNotification({
    //   ...NOTI,
    //   message: <Message type="success" mess="Đã bỏ yêu thích sản phẩm" />,
    //   type: "success",
    //   dismiss: {
    //     duration: 2000,
    //   },
    // });
    ProductApi.updateLike({ id: product.id, status: false });
  };
  const handleLike = () => {
    // noti.addNotification({
    //   ...NOTI,
    //   message: <Message type="success" mess="Đã thêm yêu thích sản phẩm!" />,
    //   type: "success",
    //   dismiss: {
    //     duration: 2000,
    //   },
    // });
    setLiked(true);
    ProductApi.updateLike({ id: product.id, status: true });
  };
  const handleChangeType = (evt) => {
    setType(evt.currentTarget.getAttribute("type-coffee"));
  };
  const handleAddToCart = () => {
    const id = product.id;
    const quantity = +inputQuantity.current.value;
    // noti.addNotification({
    //   ...NOTI,
    //   message: <Message type="success" mess="Thêm sản phẩm thành công" />,
    //   type: "success",
    //   dismiss: {
    //     duration: 2000,
    //   },
    // });
    store.dispatch(
      addToCart({
        product: {
          id,
          name: product.name,
          mainImgLink: product.mainImgLink,
          price: product.price,
        },
        type,
        quantity,
      })
    );
    ShopcartApi.addToCart({ id, type, quantity });
  };
  const handleBuy = () => {
    const quantity = +inputQuantity.current.value;
    const products = [
      {
        product: {
          id: product.id,
          name: product.name,
          mainImgLink: product.mainImgLink,
          price: product.price,
        },
        type,
        quantity,
      },
    ];
    store.dispatch(createBuyNowOrder(products));
  };
  useEffect(() => {
    if (logged.data) {
      ProductApi.checkLiked({ id: product.id }).then((res) => {
        setLiked(res);
      });
    }
  }, [logged.data, product.id]);
  return (
    <div className="fs--9">
      <div className="fs--7">{product.name}</div>
      <div>
        <StarRatings
          rating={totalRating}
          starRatedColor="#008248"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
        />
        <span className="va--text-top product__info">
          {numberRate} đánh giá
        </span>
        <span className="va--text-top product__info">
          {product.numSelled} đã bán
        </span>
      </div>
      <div className="fs--1 fw--9 l">
        {comma(product.price)}
        <span className="fs--8">₫</span>
      </div>
      <hr className="mt-1 mb-0" />
      <div className="position-relative pt-4">
        {logged.data ? (
          <div className="like__button">
            {liked ? (
              <MdFavorite onClick={handleUnLike} />
            ) : (
              <MdFavoriteBorder onClick={handleLike} />
            )}
          </div>
        ) : null}
        {product.type ? (
          <InputCoffeeType type={type} handleChangeType={handleChangeType} />
        ) : null}
        <div className="mt-4">
          <label className="me-2">Số lượng:</label>
          <InputNumber ref={inputQuantity} />
        </div>
        <Row className="mt-3">
          <Col xs={12} className="pe-ssm-1 pe-sm-3 mb-1 mb-ssm-0 col-ssm-6">
            <Button
              variant="primary"
              className="w-100"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ <MdAddShoppingCart className="icon" />
            </Button>
          </Col>
          <Col xs={12} className="ps-ssm-1 ps-sm-3  col-ssm-6">
            <Link
              href="/buyer/check-out"
              className="btn btn-outline-primary w-100"
              onClick={handleBuy}
            >
              Mua ngay
            </Link>
          </Col>
        </Row>
      </div>
      <div className="bg-light rounded border mt-3 p-3">
        <p>
          <MdSentimentVerySatisfied className="icon" /> Bạn có thể xem mô tả sản
          phẩm cũng như các đánh giá ở phía dưới!
        </p>
        <p>
          <MdLocalShipping className="icon" /> Miễn phí vận chuyển toàn quốc với
          đơn hàng từ 200.000₫
        </p>
      </div>
    </div>
  );
}

export default React.memo(ProductDetail);
