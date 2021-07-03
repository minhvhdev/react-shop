import React from "react";
import { RiErrorWarningFill, RiInformationFill } from "react-icons/ri";
function Message (props) {
  const content = props.content;
  const type = props.type;
  const show = props.show;
  let icon = null;
  switch (type) {
    case 0:
      icon = <RiErrorWarningFill className="mess__icon error" />;
      break;
    case 1:
      icon = <RiErrorWarningFill className="mess__icon warning" />;
      break;
    default:
      icon = <RiInformationFill className="mess__icon info" />;
      break;
  }
  return (
    <div className="message__container">
      <div
        className={`message__noti ${
          show === 0 ? "" : show === -1 ? "disabled" : "active"
        }`}
      >
        {icon}
        <span>{content}</span>
      </div>
    </div>
  );
};

export default React.memo(Message);
