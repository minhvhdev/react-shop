import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, Form as BForm, Row } from "react-bootstrap";
import { AiOutlineGoogle } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import * as Yup from "yup";

const SignUpForm = (props) => {
  const [badRequest, setBadRequest] = useState(false);
  return (
    <Container>
      <Formik
        initialValues={{
          username: "",
          password: "",
          fullName: "",
          email: "",
          rePassword: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Đây là trường bắt buộc"),
          password: Yup.string().required("Đây là trường bắt buộc"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setBadRequest(false);
          } catch (error) {
            setBadRequest(true);
          }
        }}
      >
        <Form id="sign-up-form" className="shadow my-2 px-sm-5">
          <p className="text-danger text-center">
            {badRequest ? "Sai tên đăng nhập hoặc mật khẩu" : null}
          </p>
          <h3 className="text-center">Đăng nhập</h3>
          <BForm.Group className="mb-3" controlId="username">
            <BForm.Label>Tên đăng nhập*:</BForm.Label>
            <Field name="username">
              {({ field }) => (
                <BForm.Control
                  type="text"
                  {...field}
                  placeholder="Nhập tên tài khoản để đăng nhập"
                />
              )}
            </Field>
            <BForm.Text className="text-danger">
              <ErrorMessage name="username" />
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
            <BForm.Check
              type="checkbox"
              label={
                <span>
                  Tôi đã đọc và đồng ý với <a href="/">chính sách</a> của LOGO
                </span>
              }
            />
          </BForm.Group>
          <Button variant="primary" className="w-100 my-3" type="submit">
            Đăng Ký
          </Button>
          <hr />
          <BForm.Text className="text-muted text-center d-block mb-3">
            Hoặc đăng nhập bằng tài khoản
          </BForm.Text>
          <div className="d-flex gap-2">
            <Button variant="success" className="w-50">
              <GrFacebookOption className="icon" />
              Facebook
            </Button>
            <Button variant="danger" className="w-50 text-white">
              <AiOutlineGoogle className="icon" /> Google
            </Button>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};
export default SignUpForm;
