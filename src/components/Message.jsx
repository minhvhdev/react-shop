import React from "react";
import PropTypes from "prop-types";
import {
  MdWarning,
  MdErrorOutline,
  MdInfoOutline,
  MdCheckCircle,
} from "react-icons/md";

function Message(props) {
  const type = props.type;
  const mess = props.mess;
  let icon = null;
  switch (type) {
    case "error":
      icon = <MdErrorOutline className="icon" />;
      break;
    case "warning":
      icon = <MdWarning className="icon" />;
      break;
    case "info":
      icon = <MdInfoOutline className="icon" />;
      break;
    case "success":
      icon = <MdCheckCircle className="icon" />;
      break;
    default:
      break;
  }
  return (
    <div className="fs-6 text-center">
      {icon} {mess}
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  mess: PropTypes.string.isRequired,
};

export default React.memo(Message);
