import { NOTI } from "constants/index";
import React, { forwardRef, memo, useState } from "react";
//@ts-ignore
import { store as noti } from "react-notifications-component";
import Message from "./Message";

function InputNumber(props, ref) {
  const [value, setValue] = useState(props.value || 1);
  const [oldValue, setOldValue] = useState(value);
  const index = props.index || 0;
  const options = {
    ...NOTI,
    type: "warning",
    dismiss: {
      duration: 2000,
    },
  };
  const handleChange = (evt) => {
    setValue(evt.target.value);
  };
  const handleChangeExtra = props.onChange;
  const handleBlur = (evt) => {
    const value = +evt.target.value;
    if (!Number.isInteger(value)) {
      setValue(oldValue);
      noti.addNotification({
        ...options,
        message: <Message type="warning" mess="Vui lòng nhập số"/>,
      });
    } else if (value > 999 || value < 1) {
      noti.addNotification({
        ...options,
        message: <Message type="warning" mess="Vui lòng nhập số từ 1-999"/>,
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
        handleChangeExtra(value + 1, index);
      }
    }
  };
  const handleDecrease = (evt) => {
    if (+value !== 1) {
      setValue(+value - 1);
      if (handleChangeExtra) {
        handleChangeExtra(value - 1, index);
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
    </>
  );
}

export default memo(forwardRef(InputNumber));
