import UserApi from "api/UserApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loading from "layout/Loading";
import { validateEmail } from "lib/Helper";
import React, { useEffect, useState } from "react";
import { Button, Col, Form as BForm, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { updateEmail, updateInfo } from "redux/slice/userSlice";
import store from "redux/store";
import * as Yup from "yup";
import DatePickerForm from "./Form/DatePickerForm";
import VerifyForm from "./Form/VerifyForm";

const InfoTab = (props) => {
  const [status, setStatus] = useState("idle");
  const [status1, setStatus1] = useState("idle");
  const [verify, setVerify] = useState(false);
  const [serverInfo, setServerInfo] = useState({ dob: null, email: null });
  const [email, setEmail] = useState("");
  const [change, setChange] = useState(false);
  const info = useSelector((state) => state.logged).data;
  const handleShowVerify = () => {
    setVerify(true);
    UserApi.sendVerify().then((jwtCode) => {
      sessionStorage.setItem("_jwtCode", jwtCode);
    });
  };
  const handleCloseVerify = () => {
    setVerify(false);
  };
  const handleChangeEmail = (evt) => {
    const value = evt.target.value;
    setEmail(value);
    if (value === serverInfo.email) {
      setChange(false);
    } else {
      setChange(true);
    }
  };
  const handleUpdateEmail = () => {
    setStatus1("loading");
    if (email !== serverInfo.email) {
      if (validateEmail(email)) {
        UserApi.updateEmail({ email })
          .then(() => {
            setStatus1("idle");
            serverInfo.email = email;
            setServerInfo(serverInfo);
            setChange(false);
            store.dispatch(updateEmail());
          })
          .catch(() => {
            setStatus1("bad");
          });
      } else {
        setStatus1("wrong");
      }
    }
  };
  useEffect(() => {
    UserApi.getUserInfo().then((res) => {
      setServerInfo(res);
      setEmail(res.email);
    });
  }, []);
  return (
    <>
      <Row>
        <Col xs={12} lg={6}>
          <div className="shadow p-3">
            <div className="d-flex">
              <div>
                <img width="96px" src={info?.avatarLink} alt="" />
              </div>
              <div className="ms-3 w-100">
                <BForm.Group className="mb-3" controlId="email">
                  <BForm.Label>Email*:</BForm.Label>
                  <BForm.Control
                    type="text"
                    defaultValue={serverInfo.email}
                    placeholder="Nhập email của bạn"
                    onChange={handleChangeEmail}
                  />
                  <BForm.Text className="text-danger"></BForm.Text>
                </BForm.Group>
              </div>
            </div>
            <div className="position-relative text-center text-danger">
              {status1 === "loading" ? (
                <Loading type="inline" />
              ) : status1 === "bad" ? (
                "Email đã được sử dụng"
              ) : status1 === "wrong" ? (
                "Sai định dạng email"
              ) : null}
            </div>
            <div className="d-flex mt-3 gap-3">
              {info?.emailVerify ? null : (
                <Button
                  variant="outline-primary w-100"
                  onClick={handleShowVerify}
                >
                  Xác minh
                </Button>
              )}
              <Button
                variant={`primary w-100 ${!change ? "disabled" : null} `}
                onClick={handleUpdateEmail}
              >
                Thay đổi
              </Button>
            </div>
          </div>
        </Col>
        <Col>
          <Formik
            enableReinitialize
            initialValues={{
              fullName: info?.fullName,
              dob: serverInfo.dob ? new Date(serverInfo.dob) : null,
              phone: info?.phone,
            }}
            validationSchema={Yup.object({
              fullName: Yup.string().required("Đây là trường bắt buộc"),
            })}
            onSubmit={(values) => {
              setStatus("loading");
              console.log(values);
              let data = { fullName: values.fullName };
              if (values.dob) {
                data.dob = values.dob.getTime();
              }
              if (values.phone) {
                data.phone = values.phone;
              }
              UserApi.updateInfo(data)
                .then((res) => {
                  setStatus("idle");
                  console.log(res);
                  store.dispatch(updateInfo(values));
                })
                .catch(() => {
                  setStatus("badRequest");
                });
            }}
          >
            <Form className="shadow px-5 py-3">
              <div className="position-relative text-danger text-center">
                {status === "loading" ? <Loading type="inline" /> : null}
              </div>
              <BForm.Group className="mb-3" controlId="email">
                <BForm.Label>Họ và tên*:</BForm.Label>
                <Field name="fullName">
                  {({ field }) => (
                    <BForm.Control
                      type="text"
                      {...field}
                      placeholder="Nhập tên của bạn"
                    />
                  )}
                </Field>
                <BForm.Text className="text-danger">
                  <ErrorMessage name="fullName" />
                </BForm.Text>
              </BForm.Group>
              <BForm.Group className="mb-3" controlId="fullName">
                <BForm.Label>Ngày sinh:</BForm.Label>
                <DatePickerForm
                  name="dob"
                  placeholder="Nhập ngày sinh (dd/MM/YYYY)"
                />
              </BForm.Group>
              <BForm.Group className="mb-3" controlId="fullName">
                <BForm.Label>Số điện thoại:</BForm.Label>
                <Field name="phone">
                  {({ field }) => (
                    <BForm.Control
                      type="text"
                      {...field}
                      placeholder="vd: 0123456789"
                    />
                  )}
                </Field>
              </BForm.Group>
              <Button variant="primary w-100 mt-3" type="submit">
                Cập nhật thông tin
              </Button>
            </Form>
          </Formik>
        </Col>
      </Row>
      <Modal show={verify} onHide={handleCloseVerify}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <VerifyForm close={handleCloseVerify} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default React.memo(InfoTab);
