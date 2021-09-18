import React, { useEffect, useState } from "react";
import queryString from "query-string";
import AdminApi from "api/AdminApi";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Loading from "pages/layout/Loading";
import { comma, formatDateTime, renderImageLink } from "lib/Helper";
import { BsArrowLeftShort } from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function AdminOrderPage(props) {
  const param = queryString.parse(window.location.hash);
  const id = param["admin/order?id"];
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("loading");
  const history = useHistory();
  const handleReject = () => {
    AdminApi.rejectOrder({ id })
      .then((res) => {
        history.push("/#admin/pendingOrder");
      })
      .catch(() => {
        alert("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  };
  const handleAccept = () => {
    AdminApi.acceptOrder({ id })
      .then((res) => {
        history.push("/#admin/pendingOrder");
        alert("Cập nhật thành công");
      })
      .catch(() => {
        alert("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  };
  const handleCancel = () => {
    AdminApi.cancelOrder({ id })
      .then((res) => {
        history.push("/#admin/shippingOrder");
        alert("Cập nhật thành công");
      })
      .catch(() => {
        alert("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  };
  const handleSuccess = () => {
    AdminApi.successOrder({ id })
      .then((res) => {
        history.push("/#admin/shippinOrder");
        alert("Cập nhật thành công");
      })
      .catch(() => {
        alert("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  };
  useEffect(() => {
    AdminApi.getOrderDetail({ id })
      .then((res) => {
        setOrder(res);
        setStatus("idle");
      })
      .catch(() => {
        setStatus("error");
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      });
  }, [id]);
  return (
    <Container id="order-page" className="pt-3">
      <div>
        <BsArrowLeftShort
          className="back-button"
          onClick={() => {
            window.history.back();
          }}
        />
        <h4 className="text-center mb-3">Chi tiết đơn hàng</h4>
      </div>
      {status === "loading" ? (
        <Loading type="inline" />
      ) : (
        <>
          <Row>
            <Col lg={6}>
              <h5>Thông tin</h5>
              <Table responsive bordered hover>
                <tbody>
                  <tr>
                    <th>Họ và tên:</th>
                    <td>{order.fullName}</td>
                  </tr>
                  <tr>
                    <th>Ngày đặt:</th>
                    <td>{formatDateTime(order.orderDate, false)}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ:</th>
                    <td>{order.address}</td>
                  </tr>
                  <tr>
                    <th>SĐT:</th>
                    <td>{order.phone}</td>
                  </tr>
                  <tr>
                    <th>Ghi chú:</th>
                    <td>{order.note}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ:</th>
                    <td>{order.address}</td>
                  </tr>
                  <tr>
                    <th>Mã giảm giá:</th>
                    <td>
                      {order.promotionCode.code} ({order.promotionCode.discount}
                      %)
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col lg={6}>
              <div className="mb-lg-3 check-out show">
                <h5>Đơn hàng</h5>
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
                <p>Tổng cộng:</p>
                <div className="flex-grow-1 text-end">
                  {(() => {
                    const total = order.orderItem.reduce((total, item) => {
                      return +item.quantity * +item.product.price + total;
                    }, 0);
                    const discount = order.promotionCode
                      ? order.promotionCode.discount
                      : 0;
                    const afterDiscount = total * (discount / 100);
                    return order.promotionCode ? (
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
                    );
                  })()}
                  <span className="fs--11">₫</span>
                </div>
              </div>
            </Col>
            {order.orderStatus === 0 ? (
              <div className="d-flex gap-3 col-12 col-lg-6">
                <Button className="w-50 btn-danger" onClick={handleReject}>
                  Từ chối
                </Button>
                <Button className="w-50" onClick={handleAccept}>
                  Duyệt đơn
                </Button>
              </div>
            ) : order.orderStatus === 1 ? (
              <div className="d-flex gap-3 col-12 col-lg-6">
                <Button className="w-50 btn-danger" onClick={handleCancel}>
                  Khách trả hàng
                </Button>
                <Button className="w-50" onClick={handleSuccess}>
                  Đã hoàn thành
                </Button>
              </div>
            ) : order.orderStatus === 2 ? (
              <div className="text-primary">Đơn hàng đã hoàn thành</div>
            ) : order.orderStatus === -1 ? (
              <div className="text-danger">Đơn hàng đã bị hủy</div>
            ) : (
              <div className="text-danger">
                Đơn hàng đã bị từ chối và trả lại
              </div>
            )}
          </Row>
        </>
      )}
    </Container>
  );
}

export default AdminOrderPage;
