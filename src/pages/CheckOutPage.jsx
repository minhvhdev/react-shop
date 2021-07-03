import AddressApi from "api/AddressApi";
import AddressForm from "components/AddressForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Form as BForm,
  Row,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";
import { useSelector } from "react-redux";

import CheckOutItem from "components/CheckOutItem";

function CheckOutPage(props) {
  const shopcart = useSelector((state) => state.shopcart).data;
  return (
    <>
      {shopcart.length > 0 ? (
        <Container>
          <Breadcrumb className="fs--11 mt-3">
            <li className="breadcrumb-item">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/shopcart">Giỏ hàng của bạn</Link>
            </li>
            <Breadcrumb.Item active>Thanh toán</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xs={12} lg={7} className="order-2 order-lg-1 mb-3">
              <Formik
                initialValues={{
                  fullName: "",
                  phone: "",
                  note: "",
                }}
                validationSchema={Yup.object({
                  fullName: Yup.string().required("Đây là trường bắt buộc"),
                  phone: Yup.string().required("Đây là trường bắt buộc"),
                })}
                onSubmit={async (values, { setSubmitting }) => {}}
              >
                <Form id="sign-up-form">
                  <AddressForm />
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
                          placeholder="Nhập họ và tên người nhận"
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
                </Form>
              </Formik>
            </Col>
            <Col xs={12} lg={5} className="order-1 order-lg-2">
              <CheckOutItem />
              <hr className="d-block d-lg-none"/>
            </Col>
          </Row>
        </Container>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )}
    </>
  );
}

export default React.memo(CheckOutPage);
