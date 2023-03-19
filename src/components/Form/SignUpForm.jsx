import ShopcartApi from "api/ShopcartApi";
import UserApi from "api/UserApi";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "constants/index";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loading from "layout/Loading";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Col, Form as BForm, Modal, Row } from "react-bootstrap";
import { AiOutlineGoogle } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { useSelector } from "react-redux";
import { login } from "redux/slice/userSlice";
import store from "redux/store";
import * as Yup from "yup";
import VerifyForm from "./VerifyForm";

const SignUpForm = (props) => {
  const handleClose = props.handleClose;
  const [status, setStatus] = useState("idle");
  //@ts-ignore
  const shopcart = useSelector((state) => state.shopcart).data;
  return (
    <Formik
      initialValues={{
        password: "",
        fullName: "",
        email: "",
        rePassword: "",
        policy: false,
      }}
      validationSchema={Yup.object({
        password: Yup.string().required("Đây là trường bắt buộc"),
        fullName: Yup.string().required("Đây là trường bắt buộc"),
        email: Yup.string()
          .required("Đây là trường bắt buộc")
          .email("Sai định dạng email"),
        rePassword: Yup.string()
          .required("Đây là trường bắt buộc")
          .oneOf([Yup.ref("password")], "Mật khẩu nhập lại không khớp"),
        policy: Yup.boolean()
          .required("Đây là trường bắt buộc")
          .oneOf([true], "Bạn cần chấp nhận các điều khoản"),
      })}
      onSubmit={(values) => {
        setStatus("loading");
        console.log(values);
        UserApi.signup({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
        })
          .then((res) => {
            setStatus("verify");
            UserApi.sendVerify().then((jwtCode) => {
              sessionStorage.setItem("_jwtCode", jwtCode);
            });
            if (shopcart.length !== 0) {
              ShopcartApi.asyncCart(shopcart);
            }
            store.dispatch(login(res));
          })
          .catch(() => {
            setStatus("badRequest");
          });
      }}
    >
      <Modal
        show={true}
        fullscreen="sm-down"
        backdrop="static"
        data-dismiss="modal"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status === "verify" ? (
            <VerifyForm close={handleClose} />
          ) : (
            <Form id="sign-up-form">
              <div className="position-relative text-danger text-center">
                {status === "loading" ? (
                  <Loading type="inline" />
                ) : status === "badRequest" ? (
                  "Email đã được sử dụng!"
                ) : null}
              </div>
              <BForm.Group className="mb-3" controlId="email">
                <BForm.Label>Email*:</BForm.Label>
                <Field name="email">
                  {({ field }) => (
                    <BForm.Control
                      type="text"
                      {...field}
                      placeholder="Nhập email của bạn"
                    />
                  )}
                </Field>
                <BForm.Text className="text-danger">
                  <ErrorMessage name="email" />
                </BForm.Text>
              </BForm.Group>
              <BForm.Group className="mb-3" controlId="fullName">
                <BForm.Label>Họ và tên*:</BForm.Label>
                <Field name="fullName">
                  {({ field }) => (
                    <BForm.Control
                      type="text"
                      {...field}
                      placeholder="Nhập họ và tên của bạn"
                    />
                  )}
                </Field>
                <BForm.Text className="text-danger">
                  <ErrorMessage name="fullName" />
                </BForm.Text>
              </BForm.Group>
              <Row>
                <Col md>
                  <BForm.Group className="mb-3" controlId="password">
                    <BForm.Label>Mật khẩu*:</BForm.Label>
                    <Field name="password">
                      {({ field }) => (
                        <BForm.Control
                          type="password"
                          {...field}
                          placeholder="Nhập mật khẩu"
                        />
                      )}
                    </Field>
                    <BForm.Text className="text-danger">
                      <ErrorMessage name="password" />
                    </BForm.Text>
                  </BForm.Group>
                </Col>
                <Col md>
                  <BForm.Group className="mb-3" controlId="rePassword">
                    <BForm.Label>Nhập lại mật khẩu*:</BForm.Label>
                    <Field name="rePassword">
                      {({ field }) => (
                        <BForm.Control
                          type="password"
                          {...field}
                          placeholder="Nhập lại mật khẩu"
                        />
                      )}
                    </Field>
                    <BForm.Text className="text-danger">
                      <ErrorMessage name="rePassword" />
                    </BForm.Text>
                  </BForm.Group>
                </Col>
              </Row>
              <BForm.Group controlId="readPolicy">
                <Field name="policy">
                  {({ field }) => (
                    <BForm.Check
                      {...field}
                      type="checkbox"
                      label={
                        <span>
                          Tôi đã đọc và đồng ý với{" "}
                          <Link href="/policy">
                            chính sách
                          </Link>{" "}
                          của Cà phê Thơ Dũng
                        </span>
                      }
                    />
                  )}
                </Field>
                <BForm.Text className="text-danger">
                  <ErrorMessage name="policy" />
                </BForm.Text>
              </BForm.Group>
              <Button variant="primary" className="w-100 my-3" type="submit">
                Đăng Ký
              </Button>
              <hr />
              <BForm.Text className="text-muted text-center d-block mb-3">
                Hoặc đăng nhập bằng tài khoản
              </BForm.Text>
              <div className="d-flex gap-2">
                <Button
                  style={{ backgroundColor: "#285091" }}
                  href={FACEBOOK_AUTH_URL}
                  className="w-50"
                >
                  <GrFacebookOption className="icon" />
                  Facebook
                </Button>
                <Button variant="danger w-50 text-white" href={GOOGLE_AUTH_URL}>
                  <AiOutlineGoogle className="icon" /> Google
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Formik>
  );
};
export default React.memo(SignUpForm);
