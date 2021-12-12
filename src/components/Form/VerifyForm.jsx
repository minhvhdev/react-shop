import UserApi from "api/UserApi";
import { verifySuccess } from "app/slice/userSlice";
import store from "app/store";
import Message from "components/Message";
import Timer from "components/Timer";
import { NOTI } from "constants/index";
import Loading from "layout/Loading";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Form as BForm } from "react-bootstrap";
//@ts-ignore
import { store as noti } from "react-notifications-component";

function VerifyForm(props) {
  const handleClose = props.close;
  const handleTimeOut = () => {
    setTimeOut(true);
  };
  const [status, setStatus] = useState("idle");
  const [code, setCode] = useState("");
  const [timeOut, setTimeOut] = useState(false);
  const handleReSend = () => {
    setTimeOut(false);
    UserApi.sendVerify().then((jwtCode) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("_jwtCode", jwtCode);
      }
    });
  };
  const handleSubmit = () => {
    setStatus("loading");
    if (code === "") {
      setStatus("null");
    }
    let jwtCode = "";
    if (typeof window !== "undefined") {
      jwtCode = sessionStorage.getItem("_jwtCode");
    }
    UserApi.verify({ code, jwtCode })
      .then(() => {
        store.dispatch(verifySuccess());
        noti.addNotification({
          ...NOTI,
          message: <Message type="success" mess="Xác thực thành công" />,
          type: "success",
          dismiss: {
            duration: 2000,
          },
          width: 160,
        });
        handleClose();
      })
      .catch(() => {
        setStatus("wrong");
      });
  };
  const handleChange = (evt) => {
    setCode(evt.target.value);
  };
  return (
    <div>
      <BForm>
        <BForm.Group className="mb-3" controlId="email">
          <div className="position-relative text-danger text-center">
            {status === "loading" ? (
              <Loading type="inline" />
            ) : status === "wrong" ? (
              "Mã xác thực sai!"
            ) : null}
          </div>
          <BForm.Label>Mã xác thực*:</BForm.Label>
          <BForm.Control
            type="text"
            placeholder="Mã đã được gửi tới email của bạn"
            onChange={handleChange}
          />
          <BForm.Text className="text-danger">
            {status === "null" ? "Đây là trường bắt buộc" : null}
          </BForm.Text>
        </BForm.Group>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary w-50"
            disabled={!timeOut}
            onClick={handleReSend}
          >
            Gửi lại mã{" "}
            {!timeOut ? <Timer seconds={60} timeOut={handleTimeOut} /> : null}
          </Button>
          <Button variant="primary w-50" onClick={handleSubmit}>
            Xác thực
          </Button>
        </div>
      </BForm>
    </div>
  );
}

VerifyForm.propTypes = {
  close: PropTypes.func.isRequired,
};

export default VerifyForm;
