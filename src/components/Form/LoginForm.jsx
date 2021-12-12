import ShopcartApi from "api/ShopcartApi";
import UserApi from "api/UserApi";
import { asyncAddress } from "app/slice/addressSlice";
import { asyncCart } from "app/slice/shopcartSlice";
import { login } from "app/slice/userSlice";
import store from "app/store";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "constants/index";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { asyncShopcart } from "lib/Helper";
import Loading from "layout/Loading";
import React, { useEffect, useState } from "react";
import { Button, Form as BForm, Modal } from "react-bootstrap";
import { AiOutlineGoogle } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import * as Yup from "yup";
import ForgetPasswordForm from "./ForgetPasswordForm";

const LoginForm = (props) => {
  const handleClose = props.handleClose;
  const handleShowSignup = props.handleShowSignup;
  const handleForgetPassword = () => {
    setStatus("forget");
  };
  const [status, setStatus] = useState("idle");
  const redirect = () => {
    const isClient = typeof window !== "undefined";
    if (isClient) {
      localStorage.setItem("_pathname", window.location.pathname);
      localStorage.setItem("_search", window.location.search);
    }
  };
  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        fullscreen="sm-down"
        backdrop="static"
      >
        {console.log("render login form")}
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status === "forget" ? (
            <ForgetPasswordForm close={handleClose} />
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required("Đây là trường bắt buộc")
                  .email("Sai định dạng email"),
                password: Yup.string().required("Đây là trường bắt buộc"),
              })}
              onSubmit={(values) => {
                setStatus("loading");
                UserApi.login(values)
                  .then((res) => {
                    store.dispatch(login(res));
                    // @ts-ignore
                    if (res.role === "ROLE_ADMIN") {
                      // history.push("/#admin/pendingOrder");
                    }
                    const localCart =[];
                    //@ts-ignore
                    const serverCart = res.shopCart;
                    const shopCart = asyncShopcart(localCart, serverCart);
                    //@ts-ignore
                    const address = res.address;
                    store.dispatch(asyncCart(shopCart));
                    store.dispatch(asyncAddress(address));
                    ShopcartApi.asyncCart(shopCart);
                    handleClose();
                    setStatus("idle");
                  })
                  .catch((res) => {
                    setStatus("wrong");
                  });
              }}
            >
              <Form>
                {status === "loading" ? (
                  <div className="position-relative">
                    <Loading type="inline" />
                  </div>
                ) : (
                  <p className="text-danger text-center">
                    {status === "wrong"
                      ? "Sai tên đăng nhập hoặc mật khẩu"
                      : null}
                  </p>
                )}
                <BForm.Group className="mb-3" controlId="email">
                  <BForm.Label>Tên đăng nhập*:</BForm.Label>
                  <Field name="email">
                    {({ field }) => (
                      <BForm.Control
                        autoComplete="email"
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
                <BForm.Group className="mb-3" controlId="password">
                  <BForm.Label>Mật khẩu*:</BForm.Label>
                  <Field name="password">
                    {({ field }) => (
                      <BForm.Control
                        autoComplete="password"
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
                <div className="d-flex justify-content-between">
                  <BForm.Text className="text-muted">
                    Bạn chưa là thành viên?{" "}
                    <span
                      className="link-primary text-decoration-underline cursor--pointer"
                      onClick={() => {
                        handleClose();
                        handleShowSignup();
                      }}
                    >
                      Hãy đăng ký ngay!
                    </span>
                  </BForm.Text>
                  <BForm.Text className="text-muted">
                    <span
                      className="link-primary text-decoration-underline cursor--pointer"
                      onClick={() => {
                        handleForgetPassword();
                      }}
                    >
                      Quên mật khẩu?
                    </span>
                  </BForm.Text>
                </div>
                <Button variant="primary" className="w-100 my-3" type="submit">
                  Đăng nhập
                </Button>
                <hr />
                <BForm.Text className="text-muted text-center d-block mb-3">
                  Hoặc đăng nhập bằng tài khoản
                </BForm.Text>
                <div className="d-flex gap-2">
                  <Button
                    href={FACEBOOK_AUTH_URL}
                    className="w-50"
                    onClick={redirect}
                    style={{ backgroundColor: "#285091" }}
                  >
                    <GrFacebookOption className="icon" />
                    Facebook
                  </Button>
                  <Button
                    href={GOOGLE_AUTH_URL}
                    variant="danger"
                    className="w-50 text-white"
                    onClick={redirect}
                  >
                    <AiOutlineGoogle className="icon" /> Google
                  </Button>
                </div>
              </Form>
            </Formik>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default React.memo(LoginForm);
