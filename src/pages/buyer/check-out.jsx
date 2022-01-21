import AddressForm from "components/Form/AddressForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Form as BForm,
  Modal,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import { useSelector } from "react-redux";
import CheckOutItem from "components/CheckOutItem";
import store from "app/store";
import { checkShippingFee, resetOrder } from "app/slice/orderSlice";
import { GoLocation } from "react-icons/go";
import AddressTab from "components/AddressTab";
import OrderApi from "api/OrderApi";
import Message from "components/Message";
import { NOTI } from "constants/index";
//@ts-ignore
import { store as noti } from "react-notifications-component";
import Loading from "layout/Loading";
import { resetCart } from "app/slice/shopcartSlice";
import { useRouter } from "next/router";
import NotFound from "layout/NotFound";

function CheckOutPage(props) {
  const router = useRouter();
  const order = useSelector((state) => state.order).data;
  const allAddress = useSelector((state) => state.address).data;
  const refAddress = useRef(null);
  const logged = useSelector((state) => state.logged).data;
  const user = logged ? logged : { fullName: "", phone: "" };
  const [status, setStatus] = useState("idle");
  const [showAddress, setShowAddress] = useState(false);
  const handleClickAddress = () => setShowAddress(true);
  const handleCloseModal = () => setShowAddress(false);
  const handleOnWard = (districtCode) => {
    store.dispatch(checkShippingFee(districtCode));
  };
  const handleSubmitNoLogin = (values) => {
    const addressObj = JSON.parse(refAddress.current.value);
    const pCode = addressObj.province.value;
    const dCode = addressObj.district.value;
    const wCode = addressObj.ward.value;
    const street = addressObj.street;
    if (pCode && dCode && wCode && street !== "") {
      setStatus("idle");
      const addressStr = `${street} - ${addressObj.ward.label} - ${addressObj.district.label} - ${addressObj.province.label}`;
      return {
        fullName: values.fullName,
        phone: values.phone,
        note: values.note,
        address: addressStr,
      };
    } else {
      setStatus("miss");
      return null;
    }
  };
  const handleSubmitLogin = (values) => {
    const addressObj = (allAddress || []).filter((item) => {
      return item.mainAddress === true;
    });
    const addressStr = addressObj.length ? addressObj[0].addressStr : null;
    if (addressStr) {
      setStatus("idle");
      return {
        fullName: values.fullName,
        phone: values.phone,
        note: values.note,
        address: addressStr,
      };
    } else {
      setStatus("miss");
      return null;
    }
  };
  return (
    <>
      {order.orderItem.length ? (
        <Container className=" position-relative">
          <Breadcrumb className="fs--11 mt-3">
            <li className="breadcrumb-item">
              <Link href="/">
                <a>Trang chủ</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/shopcart">
                <a>Giỏ hàng của bạn</a>
              </Link>
            </li>
            <Breadcrumb.Item active>Thanh toán</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xs={12} lg={7} className="order-2 order-lg-1 mb-3">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  fullName: user.fullName || "",
                  phone: user.phone || "",
                  note: "",
                }}
                validationSchema={Yup.object({
                  fullName: Yup.string().required("Đây là trường bắt buộc"),
                  phone: Yup.string().required("Đây là trường bắt buộc"),
                })}
                onSubmit={(values) => {
                  let request = null;
                  if (logged) {
                    request = handleSubmitLogin(values);
                  } else {
                    request = handleSubmitNoLogin(values);
                  }
                  if (request) {
                    setStatus("loading");
                    OrderApi.createOrder({ ...order, ...request })
                      .then((res) => {
                        setStatus("idle");
                        noti.addNotification({
                          ...NOTI,
                          message: (
                            <Message
                              type="success"
                              mess="Chúc mừng bạn đã đặt hàng thành công! Cảm ơn bạn vì đã tin tưởng sản phẩm của chúng tôi <3"
                            />
                          ),
                          type: "success",
                          dismiss: {
                            duration: 3000,
                          },
                        });
                        store.dispatch(resetOrder());
                        if (!order.buyNow) {
                          store.dispatch(resetCart());
                        }
                        router.push("/");
                      })
                      .catch((res) => {
                        setStatus("idle");
                        noti.addNotification({
                          ...NOTI,
                          message: (
                            <Message
                              type="error"
                              mess="Hệ thống có lỗi chưa xác định, mong bạn thông cảm và thử lại sau!"
                            />
                          ),
                          type: "danger",
                          dismiss: {
                            duration: 3000,
                          },
                        });
                      });
                  }
                }}
              >
                <Form>
                  <Modal
                    fullscreen="md-down"
                    dialogClassName="check-out__model"
                    show={showAddress}
                    onHide={handleCloseModal}
                  >
                    <Modal.Header closeButton>Chọn địa chỉ</Modal.Header>
                    <Modal.Body>
                      <AddressTab />
                    </Modal.Body>
                  </Modal>
                  {logged ? (
                    <>
                      <BForm.Label>Địa chỉ:*</BForm.Label>
                      {allAddress && allAddress.length > 0 ? (
                        allAddress.map((item, i) => {
                          if (item.mainAddress) {
                            return (
                              <div
                                data-id={item.id}
                                data-name={item.name}
                                key={i}
                                onClick={() => handleClickAddress()}
                                className="flex-column flex-md-row check-out__address mb-3"
                              >
                                <div className="fw--6">
                                  <GoLocation className="icon" /> {item.name}
                                </div>
                                <div className="mt-3 mt-md-0">
                                  {item.addressStr}
                                </div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })
                      ) : (
                        <>
                          <Button
                            variant="outline-primary mx-3 px-3"
                            size="sm"
                            onClick={handleClickAddress}
                          >
                            Chọn địa chỉ mặc định
                          </Button>
                          <BForm.Text className="text-danger">
                            {status === "miss"
                              ? "Chưa có địa chỉ nhận hàng!!!"
                              : null}
                          </BForm.Text>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <AddressForm
                        ref={refAddress}
                        onWard={handleOnWard}
                        address={{}}
                      />
                      <BForm.Text className="text-danger">
                        {status === "miss"
                          ? "Chưa nhập đầy đủ địa chỉ!!!"
                          : null}
                      </BForm.Text>
                    </>
                  )}
                  <BForm.Group className="mb-3">
                    <BForm.Label>Họ và tên:*</BForm.Label>
                    <Field name="fullName">
                      {({ field }) => (
                        <BForm.Control
                          {...field}
                          placeholder="Nhập họ và tên người nhận"
                        />
                      )}
                    </Field>
                    <BForm.Text className="text-danger">
                      <ErrorMessage name="fullName" />
                    </BForm.Text>
                  </BForm.Group>
                  <BForm.Group className="mb-3">
                    <BForm.Label>Số điện thoại:*</BForm.Label>
                    <Field name="phone">
                      {({ field }) => (
                        <BForm.Control
                          {...field}
                          placeholder="Nhập SĐT người nhận"
                        />
                      )}
                    </Field>
                    <BForm.Text className="text-danger">
                      <ErrorMessage name="phone" />
                    </BForm.Text>
                  </BForm.Group>
                  <BForm.Group className="mb-3">
                    <BForm.Label>Ghi chú:</BForm.Label>
                    <Field name="note">
                      {({ field }) => (
                        <BForm.Control
                          as="textarea"
                          {...field}
                          placeholder="Ghi chú thêm cho đơn hàng"
                        />
                      )}
                    </Field>
                  </BForm.Group>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" className="px-5" type="submit">
                      Đặt hàng
                    </Button>
                  </div>
                  {status === "loading" ? (
                    <>
                      <div className="backdrop"></div>
                      <Loading type="inline" />
                    </>
                  ) : null}
                </Form>
              </Formik>
            </Col>
            <Col xs={12} lg={5} className="order-1 order-lg-2">
              <CheckOutItem />
              <hr className="d-block d-lg-none" />
            </Col>
          </Row>
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default React.memo(CheckOutPage);
