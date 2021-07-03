import UserApi from "api/UserApi";
import { login } from "app/slice/headerSlice";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "constants/index";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Form as BForm, Modal } from "react-bootstrap";
import { AiOutlineGoogle } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import * as Yup from "yup";

const LoginForm = (props) => {
  const handleClose = props.handleClose;
  const dispatch = useDispatch();
  const [badRequest, setBadRequest] = useState(false);
  const redirect = () => {
    localStorage.setItem("_pathname", window.location.pathname);
    localStorage.setItem("_search", window.location.search);
  };
  return (
    <div>
      <div>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Đây là trường bắt buộc"),
            password: Yup.string().required("Đây là trường bắt buộc"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await UserApi.login(values);
              const cookies = new Cookies();
              cookies.set("_token", res, { path: "/", maxAge: 3153600000 });
              // @ts-ignore
              dispatch(login(res));
              handleClose();
              setBadRequest(false);
            } catch (error) {
              setBadRequest(true);
            }
          }}
        >
          <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Đăng nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p className="text-danger text-center">
                  {badRequest ? "Sai tên đăng nhập hoặc mật khẩu" : null}
                </p>
                <BForm.Group className="mb-3" controlId="username">
                  <BForm.Label>Tên đăng nhập*:</BForm.Label>
                  <Field name="username">
                    {({ field }) => (
                      <BForm.Control
                        type="text"
                        {...field}
                        placeholder="Nhập tên đăng nhập hoặc email"
                      />
                    )}
                  </Field>
                  <BForm.Text className="text-danger">
                    <ErrorMessage name="username" />
                  </BForm.Text>
                </BForm.Group>
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
                <BForm.Text className="text-muted">
                  Bạn chưa là thành viên?{" "}
                  <a href="/sign-in">Hãy đăng ký ngay!</a>
                </BForm.Text>
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
                    variant="success"
                    className="w-50"
                    onClick={redirect}
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
            </Modal.Body>
          </Modal>
        </Formik>
      </div>
    </div>
  );
};
export default LoginForm;
