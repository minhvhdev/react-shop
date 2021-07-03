import React, { forwardRef, memo, useState } from "react";
import Message from "./Message";

function InputNumber(props, ref) {
  const [value, setValue] = useState(props.value || 1);
  const [show, setShow] = useState(0);
  const [oldValue, setOldValue] = useState(value);
  const [message, setMessage] = useState({ content: "", type: 0 });
  const index = props.index || 0;
  console.log("Render inputNum");
  const handleShowMessage = (message) => {
    setShow(1);
    setMessage(message);
    setTimeout(() => {
      setShow(-1);
    }, 20000);
  };
  const handleChange = (evt) => {
    setValue(evt.target.value);
  };
  const handleChangeExtra = props.onChange;
  const handleBlur = (evt) => {
    const value = +evt.target.value;
    if (!Number.isInteger(value)) {
      setValue(oldValue);
      handleShowMessage({
        content: "Vui lòng nhập số",
        type: 1,
      });
    } else if (value > 999 || value < 1) {
      handleShowMessage({
        content: "Nhập số từ 1-999",
        type: 1,
      });
      setValue(oldValue);
    } else {
      setOldValue(value);
      if (handleChangeExtra) {
        handleChangeExtra(value, index);
      }
    }
  };
  const handleIncrease = (evt) => {
    if (+value !== 999) {
      setValue(+value + 1);
      if (handleChangeExtra) {
        handleChangeExtra(value+1, index);
      }
    }
  };
  const handleDecrease = (evt) => {
    if (+value !== 1) {
      setValue(+value - 1);
      if (handleChangeExtra) {
        handleChangeExtra(value-1, index);
      }
    }
  };
  return (
    <>
      <ul className={`input--number ${props.className}`}>
        <li
          className={`qty-opt left ${+value <= 1 ? "" : "active"}`}
          onClick={handleDecrease}
        >
          <span className="icon icon-reduce">
            <i className="icon icon-minus"></i>
          </span>
        </li>
        <li>
          <input
            autoComplete="off"
            ref={ref}
            type="text"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            name="input"
            className="qty-num"
          />
        </li>
        <li
          role="button"
          className={`qty-opt right ${+value >= 999 ? "" : "active"}`}
          onClick={handleIncrease}
        >
          <span className="iconfont icon-add">
            <i className="icon icon-plus"></i>
          </span>
        </li>
      </ul>
      <Message content={message.content} show={show} type={message.type} />
    </>
  );
}

export default memo(forwardRef(InputNumber));
