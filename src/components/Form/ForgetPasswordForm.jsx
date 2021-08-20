import UserApi from "api/UserApi";
import { login } from "app/slice/userSlice";
import store from "app/store";
import Message from "components/Message";
import Timer from "components/Timer";
import { NOTI } from "constants/index";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateEmail } from "lib/Helper";
import Loading from "pages/layout/Loading";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Form as BForm } from "react-bootstrap";
//@ts-ignore
import { store as noti } from "react-notifications-component";
import * as Yup from "yup";

function ForgetPasswordForm(props) {
  const handleClose = props.close;
  const handleTimeOut = () => {
    setTimeOut(true);
  };
  const [status, setStatus] = useState("idle");
  const [email, setEmail] = useState("");
  const [timeOut, setTimeOut] = useState(true);
  const handleReSend = () => {
    if (validateEmail(email)) {
      setStatus("idle")
      setTimeOut(false);
      UserApi.forgetPassword({ email }).catch(() => {
        setTimeOut(true);
        setStatus("wrongEmail");
      });
    }
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        email:"",
        password: "",
        newPasswor: "",
        rePassword: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Đây là trường bắt buộc")
          .email("Sai định dạng email"),
        password: Yup.string().required("Đây là trường bắt buộc"),
        newPassword: Yup.string().required("Đây là trường bắt buộc"),
        rePassword: Yup.string()
          .required("Đây là trường bắt buộc")
          .oneOf([Yup.ref("newPassword")], "Mật khẩu nhập lại không khớp"),
      })}
      onSubmit={(values) => {
        setStatus("loading");
        UserApi.forgetChangePassword(values)
          .then((res) => {
            store.dispatch(login(res));
            noti.addNotification({
              ...NOTI,
              message: (
                <Message type="success" mess="Thay đổi mật khẩu thành công" />
              ),
              type: "success",
              dismiss: {
                duration: 2000,
              },
              width: 160,
            });
            handleClose();
            setStatus("idle");
          })
          .catch((res) => {
            setStatus("wrong");
          });
      }}
    >
      <Form>
        <BForm.Group className="mb-3" controlId="email">
          <div className="position-relative text-danger text-center">
            {status === "loading" ? (
              <Loading type="inline" />
            ) : status === "wrong" ? (
              "Mật khẩu sai"
            ) : status === "wrongEmail" ? (
              "Email chưa được đăng ký"
            ) : null}
          </div>
          <BForm.Label>Nhập email của bạn*:</BForm.Label>
          <Field name="email">
            {({ field }) => (
              <BForm.Control
                type="text"
                {...field}
                onChange={(evt) => {
                  field.onChange(evt);
                  setEmail(evt.target.value);
                }}
                placeholder="Nhập email của bạn và bấm gửi lại mật khẩu!"
              />
            )}
          </Field>
          <BForm.Text className="text-danger">
            <ErrorMessage name="email" />
          </BForm.Text>
        </BForm.Group>
        <BForm.Group className="mb-3" controlId="password">
          <BForm.Label>Mật khẩu được gửi qua mail*:</BForm.Label>
          <Field name="password">
            {({ field }) => (
              <BForm.Control
                type="password"
                {...field}
                placeholder="Nhập mật khẩu đã được chúng tôi gửi tới mail!"
              />
            )}
          </Field>
          <BForm.Text className="text-danger">
            <ErrorMessage name="password" />
          </BForm.Text>
        </BForm.Group>
        <BForm.Group className="mb-3" controlId="newPassword">
          <BForm.Label>Mật khẩu mới*:</BForm.Label>
          <Field name="newPassword">
            {({ field }) => (
              <BForm.Control
                type="password"
                {...field}
                placeholder="Mã đã được gửi tới email của bạn"
              />
            )}
          </Field>
          <BForm.Text className="text-danger">
            <ErrorMessage name="newPassword" />
          </BForm.Text>
        </BForm.Group>
        <BForm.Group className="mb-3" controlId="rePassword">
          <BForm.Label>Nhập lại mật khẩu mới*:</BForm.Label>
          <Field name="rePassword">
            {({ field }) => (
              <BForm.Control
                type="password"
                {...field}
                placeholder="Nhập lại mật khẩu mới của bạn"
              />
            )}
          </Field>
          <BForm.Text className="text-danger">
            <ErrorMessage name="rePassword" />
          </BForm.Text>
        </BForm.Group>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary w-50"
            disabled={!timeOut}
            onClick={handleReSend}
          >
            Gửi lại mật khẩu{" "}
            {!timeOut ? <Timer seconds={60} timeOut={handleTimeOut} /> : null}
          </Button>
          <Button variant="primary w-50" type="submit">
            Đổi mật khẩu
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

ForgetPasswordForm.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ForgetPasswordForm;
