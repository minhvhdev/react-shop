import React, { memo, useState } from 'react';

interface Props {
  index?: number;
  value?: number;
  onChange?: (value: number, index: number) => void;
  className?: string;
}

const InputNumber = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const [value, setValue] = useState(props.value || 1);
  const [oldValue, setOldValue] = useState(value);
  const index = props.index || 0;

  const handleChangeExtra = props.onChange;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setValue(Number(evt.target.value));
  };

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const value = +evt.target.value;
    if (!Number.isInteger(value)) {
      setValue(oldValue);
      // noti.addNotification({
      //   ...options,
      //   message: <Message type="warning" mess="Vui lòng nhập số"/>,
      // });
    } else if (value > 999 || value < 1) {
      // noti.addNotification({
      //   ...options,
      //   message: <Message type="warning" mess="Vui lòng nhập số từ 1-999"/>,
      // });
      setValue(oldValue);
    } else {
      setOldValue(value);
      if (handleChangeExtra) {
        handleChangeExtra(value, index);
      }
    }
  };

  const handleIncrease = () => {
    if (+value !== 999) {
      setValue(+value + 1);
      if (handleChangeExtra) {
        handleChangeExtra(value + 1, index);
      }
    }
  };

  const handleDecrease = () => {
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
        <li className={`qty-opt left ${+value <= 1 ? '' : 'active'}`} onClick={handleDecrease}>
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
          className={`qty-opt right ${+value >= 999 ? '' : 'active'}`}
          onClick={handleIncrease}>
          <span className="iconfont icon-add">
            <i className="icon icon-plus"></i>
          </span>
        </li>
      </ul>
    </>
  );
});

InputNumber.displayName = 'InputNumber';
export default memo(InputNumber);
